"use client";

import { useState } from "react";
import { X, Calendar, Clock, Video, AlertCircle } from "lucide-react";
import Image from "next/image";
import { Booking, getBookingLawyer } from "@/data/bookings";

interface CancelBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
    onConfirm: () => void;
}

export default function CancelBookingModal({ isOpen, onClose, booking, onConfirm }: CancelBookingModalProps) {
    const [isAgreed, setIsAgreed] = useState(false);

    if (!isOpen || !booking) return null;

    const lawyer = getBookingLawyer(booking);

    // Format Date/Time (Reusing logic or simple format)
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString("en-US", { weekday: "long", day: "numeric" });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="font-serif text-2xl font-bold text-gray-900">Cancel session</h2>
                    <button onClick={onClose} className="rounded-full bg-gray-50 p-2 hover:bg-gray-100">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="mb-4 text-lg font-bold text-gray-900">Are you sure you want to cancel this booking?</h3>
                    <ul className="mb-6 list-outside list-disc space-y-2 pl-5 text-sm text-gray-600">
                        <li>The session will be removed from your schedule.</li>
                        <li>The lawyer will be notified of the cancellation.</li>
                        <li>You may need to rebook if you wish to reschedule later.</li>
                    </ul>

                    {/* Booking Card */}
                    <div className="mb-6 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
                        <div className="mb-3">
                            <span className={`rounded-md px-2 py-1 text-xs font-medium ${booking.type === 'mentorship' ? 'bg-purple-100 text-purple-700' : 'bg-[#FFF8EB] text-[#8F6B20]'
                                }`}>
                                {booking.type === 'mentorship' ? 'Mentorship' : 'Legal advice'}
                            </span>
                        </div>

                        <h4 className="mb-2 font-serif text-lg font-bold text-gray-900 line-clamp-1">
                            {booking.topic || "General Consultation"}
                        </h4>

                        {lawyer && (
                            <div className="mb-3 flex items-center gap-2">
                                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                    <Image src={lawyer.image} alt={lawyer.name} fill className="object-cover" />
                                </div>
                                <span className="text-sm font-medium text-gray-600">{lawyer.name}</span>
                                <Image
                                    src={`https://flagcdn.com/${lawyer.country.toLowerCase()}.svg`}
                                    alt={lawyer.country}
                                    width={14}
                                    height={10}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                            <div className="flex items-center gap-1">
                                <Calendar size={14} />
                                <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock size={14} />
                                <span>{booking.time} - {booking.duration}m</span>
                            </div>
                        </div>

                        <div className="text-lg font-bold text-[#006056]">${booking.price}</div>
                    </div>

                    {/* Agreement */}
                    <div className="mb-6 rounded-lg bg-gray-50 p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="mt-1 h-4 w-4 rounded border-gray-300 text-[#006056] focus:ring-[#006056]"
                                checked={isAgreed}
                                onChange={(e) => setIsAgreed(e.target.checked)}
                            />
                            <span className="text-sm text-gray-600">
                                I accept the terms of Session Cancellation as mentioned on the <a href="#" className="font-medium text-gray-900 underline">Privacy policy</a>
                            </span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3">
                        <button
                            onClick={onConfirm}
                            disabled={!isAgreed}
                            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors
                                ${isAgreed
                                    ? "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }
                            `}
                        >
                            <AlertCircle size={16} />
                            Cancel booking
                        </button>
                        <button
                            onClick={onClose}
                            className="rounded-xl border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Keep session
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
