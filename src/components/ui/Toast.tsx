"use client";

import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { ToastType } from "@/context/ToastContext";
import { useEffect, useState } from "react";

interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));
    }, []);

    const styleConfig = {
        success: {
            bg: "bg-white",
            border: "border-green-100",
            icon: <CheckCircle size={20} className="text-green-600" />,
            text: "text-gray-800"
        },
        error: {
            bg: "bg-white",
            border: "border-red-100",
            icon: <AlertCircle size={20} className="text-red-600" />,
            text: "text-gray-800"
        },
        info: {
            bg: "bg-white",
            border: "border-blue-100",
            icon: <Info size={20} className="text-blue-600" />,
            text: "text-gray-800"
        }
    };

    const config = styleConfig[type];

    return (
        <div
            className={`pointer-events-auto flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 transform ${config.bg} ${config.border} ${isVisible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
        >
            {config.icon}
            <p className={`text-sm font-medium ${config.text}`}>{message}</p>
            <button
                onClick={onClose}
                className="ml-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
                <X size={16} />
            </button>
        </div>
    );
}
