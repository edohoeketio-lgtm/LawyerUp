"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import Toast from '@/components/ui/Toast';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
    id: string;
    message: string;
    type: ToastType;
    actionUrl?: string;
}

interface ToastContextType {
    addToast: (message: string, type: ToastType, actionUrl?: string) => void;
    removeToast: (id: string) => void;
    success: (message: string, actionUrl?: string) => void;
    error: (message: string, actionUrl?: string) => void;
    info: (message: string, actionUrl?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastType, actionUrl?: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type, actionUrl }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [removeToast]);

    const success = useCallback((message: string, actionUrl?: string) => addToast(message, 'success', actionUrl), [addToast]);
    const error = useCallback((message: string, actionUrl?: string) => addToast(message, 'error', actionUrl), [addToast]);
    const info = useCallback((message: string, actionUrl?: string) => addToast(message, 'info', actionUrl), [addToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast, success, error, info }}>
            {children}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        id={toast.id}
                        message={toast.message}
                        type={toast.type}
                        actionUrl={toast.actionUrl}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
