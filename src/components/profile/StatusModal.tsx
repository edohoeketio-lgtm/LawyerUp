"use client";

import { useState, useEffect } from "react";
import { User, auth } from "@/utils/auth";
import { X, Calendar, Bus, Smile, Palmtree, Users, Clock, Trash2 } from "lucide-react";

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: Partial<User>) => void;
}

export default function StatusModal({ isOpen, onClose, onSave }: StatusModalProps) {
    const [statusText, setStatusText] = useState("");
    const [statusEmoji, setStatusEmoji] = useState("💬");
    const [clearAfter, setClearAfter] = useState("never");
    const [recentStatuses, setRecentStatuses] = useState<any[]>([]);

    useEffect(() => {
        if (isOpen) {
            const user = auth.getSession();
            if (user?.customStatus) {
                setStatusText(user.customStatus.text);
                setStatusEmoji(user.customStatus.emoji);
                setClearAfter(user.customStatus.clearAfter || "never");
            } else {
                setStatusText("");
                setStatusEmoji("💬");
                setClearAfter("never");
            }
        }
    }, [isOpen]);

    const suggestions = [
        { emoji: "🗓️", text: "In a meeting", duration: "1 hour" },
        { emoji: "🚌", text: "Commuting", duration: "30 minutes" },
        { emoji: "🤒", text: "Out sick", duration: "Today" },
        { emoji: "🌴", text: "Vacationing", duration: "Don't clear" },
        { emoji: "🏡", text: "Working remotely", duration: "Today" }
    ];

    const clearOptions = [
        { id: "never", label: "Don't clear" },
        { id: "30_min", label: "30 minutes" },
        { id: "1_hour", label: "1 hour" },
        { id: "4_hours", label: "4 hours" },
        { id: "today", label: "Today" },
        { id: "week", label: "This week" },
    ];

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({
            customStatus: {
                emoji: statusEmoji,
                text: statusText,
                clearAfter
            }
        });
        onClose();
    };

    const handleClear = () => {
        onSave({ customStatus: undefined });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-4">
                    <h2 className="text-lg font-bold text-black">Set a status</h2>
                    <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-black">
                        <X size={20} />
                    </button>
                </div>

                {/* Input Area */}
                <div className="p-4">
                    <div className="relative mb-6">
                        <div className="flex items-center rounded-lg border border-gray-300 px-3 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                            <button className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-lg hover:bg-gray-200">
                                {statusEmoji}
                            </button>
                            <input
                                type="text"
                                placeholder="What's your status?"
                                value={statusText}
                                onChange={(e) => setStatusText(e.target.value)}
                                className="flex-1 text-sm text-black placeholder-gray-400 focus:outline-none"
                                autoFocus
                            />
                            {statusText && (
                                <button onClick={() => setStatusText("")} className="text-gray-400 hover:text-gray-600">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Suggestions */}
                    <div className="mb-6 space-y-1">
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">For LawyerUp Community</h3>
                        {suggestions.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setStatusText(item.text);
                                    setStatusEmoji(item.emoji);
                                }}
                                className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-gray-50"
                            >
                                <span className="text-lg">{item.emoji}</span>
                                <span className="flex-1 text-sm font-medium text-black">{item.text}</span>
                                <span className="text-xs text-gray-400">{item.duration}</span>
                            </button>
                        ))}
                    </div>

                    {/* Clear After */}
                    <div className="mb-6">
                        <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">Automatically Clear</h3>
                        <div className="relative">
                            <select
                                value={clearAfter}
                                onChange={(e) => setClearAfter(e.target.value)}
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                            >
                                {clearOptions.map(opt => (
                                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                                ))}
                            </select>
                            <Calendar size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        {statusText && (
                            <button
                                onClick={handleClear}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                Clear Status
                            </button>
                        )}
                        <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="rounded-lg bg-[#004d45] px-6 py-2 text-sm font-medium text-white hover:bg-[#003a34]"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
