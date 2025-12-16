"use client";

import { X, User, Mail, Phone, Calendar, Clock, MapPin, FileText, CheckCircle, Shield } from "lucide-react";

interface RequestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    request: {
        id: string;
        name: string;
        type: string;
        category: string;
        date: string;
        message: string;
        clientType: "Individual" | "Corporate";
        location: string;
        email?: string;
        phone?: string;
    } | null;
    onAccept: (id: string) => void;
    onDecline: (id: string) => void;
}

export default function RequestDetailsModal({ isOpen, onClose, request, onAccept, onDecline }: RequestDetailsModalProps) {
    if (!isOpen || !request) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-4 bg-gray-50/50">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-[#004d45]/10 flex items-center justify-center text-[#004d45]">
                            <FileText size={18} />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-black">Request Details</h2>
                            <p className="text-xs text-gray-500">ID: #{request.id}</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-black transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="overflow-y-auto p-6 space-y-6">
                    {/* Client Profile */}
                    <div className="flex items-start gap-4">
                        <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 text-xl font-bold border-2 border-white shadow-sm ring-1 ring-gray-100">
                            {request.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">{request.name}</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${request.clientType === 'Corporate'
                                    ? 'bg-blue-50 text-blue-700 border-blue-100'
                                    : 'bg-green-50 text-green-700 border-green-100'
                                    }`}>
                                    {request.clientType} Client
                                </span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin size={12} /> {request.location}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Request Summary Card */}
                    <div className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Service Type</p>
                                <p className="text-sm font-semibold text-gray-900">{request.type}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Legal Category</p>
                                <p className="text-sm font-semibold text-gray-900">{request.category}</p>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-gray-100">
                            <p className="text-xs text-gray-500 mb-1">Preferred Date</p>
                            <div className="flex items-center gap-2 text-sm font-medium text-black">
                                <Calendar size={14} className="text-[#004d45]" />
                                {request.date}
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#004d45]"></span> Client Message
                        </h4>
                        <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600 leading-relaxed shadow-sm">
                            "{request.message}"
                        </div>
                    </div>

                    {/* Safety Notice */}
                    <div className="rounded-lg bg-yellow-50 p-3 border border-yellow-100 flex gap-3 items-start">
                        <Shield size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div className="text-xs text-yellow-800">
                            <span className="font-bold">Compliance Note:</span> This is a preliminary inquiry. Accepting this request initiates a consultation session, not legal representation.
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-100 p-4 bg-white flex gap-3">
                    <button
                        onClick={() => onDecline(request.id)}
                        className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-red-600 hover:border-red-100 transition-all"
                    >
                        Decline
                    </button>
                    <button
                        onClick={() => onAccept(request.id)}
                        className="flex-[2] rounded-xl bg-[#004d45] py-3 text-sm font-bold text-white hover:bg-[#003a34] shadow-lg shadow-[#004d45]/20 flex items-center justify-center gap-2 transition-all"
                    >
                        <CheckCircle size={18} />
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    );
}
