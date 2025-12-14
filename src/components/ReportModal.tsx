"use client";

import { X } from "lucide-react";

interface ReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    lawyerName?: string; // Kept for backward compatibility
    targetName?: string;
    title?: string;
    description?: string;
}

export default function ReportModal({
    isOpen,
    onClose,
    lawyerName,
    targetName,
    title,
    description
}: ReportModalProps) {
    if (!isOpen) return null;

    const finalTargetName = targetName || lawyerName || "this item";
    const finalTitle = title || `Report ${finalTargetName}`;
    const finalDescription = description || `Please describe the issue you are facing with ${finalTargetName}. We take all reports seriously and will investigate.`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 duration-200">
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-gray-900">{finalTitle}</h3>
                    <button onClick={onClose} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>
                <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                        {finalDescription}
                    </p>
                    <textarea
                        className="h-32 w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                        placeholder="Describe reason for reporting..."
                    ></textarea>
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl border border-gray-200 py-2.5 font-medium text-gray-600 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl bg-red-600 py-2.5 font-medium text-white hover:bg-red-700"
                        >
                            Submit Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
