"use client";

import { X, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export default function DeleteModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Delete Comment",
    description = "Are you sure you want to delete this comment? This action cannot be undone."
}: DeleteModalProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 200); // Wait for animation
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-200 ${isOpen ? "bg-black/40 backdrop-blur-sm opacity-100" : "bg-black/0 backdrop-blur-none opacity-0 pointer-events-none"}`}
            onClick={onClose}
        >
            <div
                className={`w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-200 transform ${isOpen ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"}`}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 mx-auto">
                        <AlertTriangle size={24} />
                    </div>

                    <div className="text-center">
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                            {description}
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-700 shadow-red-200 transition-all active:scale-[0.98]"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
