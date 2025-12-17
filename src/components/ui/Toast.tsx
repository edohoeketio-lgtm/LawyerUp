"use client";

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';
import { ToastType } from '@/context/ToastContext';

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    actionUrl?: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, actionUrl, onClose }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        // Wait for animation to finish before removing
        setTimeout(onClose, 300);
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            case 'error':
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case 'info':
                return <Info className="w-5 h-5 text-blue-500" />;
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success':
                return 'border-green-500/20';
            case 'error':
                return 'border-red-500/20';
            case 'info':
                return 'border-blue-500/20';
        }
    };

    return (
        <div
            className={`
                pointer-events-auto
                flex items-center gap-3 w-fit max-w-sm
                bg-white dark:bg-gray-900 
                border ${getBorderColor()}
                shadow-lg rounded-lg p-4 pr-10
                transition-all duration-300 ease-in-out transform
                ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
            `}
            role="alert"
        >
            <div className="flex-shrink-0">
                {getIcon()}
            </div>
            
            <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {message}
                </p>
                {actionUrl && (
                    <Link 
                        href={actionUrl}
                        className="text-xs font-semibold text-primary hover:underline"
                    >
                        View details
                    </Link>
                )}
            </div>

            <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="Close"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};

export default Toast;
