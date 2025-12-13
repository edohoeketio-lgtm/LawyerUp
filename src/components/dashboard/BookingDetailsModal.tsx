import { Booking, getBookingLawyer } from "@/data/bookings";
import { X, Calendar, Clock, Video, FileText, User, DollarSign, MapPin } from "lucide-react";
import Image from "next/image";

interface BookingDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    booking: Booking | null;
}

export default function BookingDetailsModal({ isOpen, onClose, booking }: BookingDetailsModalProps) {
    if (!isOpen || !booking) return null;

    const lawyer = getBookingLawyer(booking);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="relative border-b border-gray-100 bg-gray-50/50 p-6 text-center">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>

                    {lawyer && (
                        <div className="flex flex-col items-center">
                            <div className="relative mb-3 h-20 w-20 overflow-hidden rounded-full border-4 border-white shadow-md">
                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="font-serif text-xl font-bold text-black">{lawyer.name}</h3>
                            <p className="text-sm text-gray-500">{lawyer.title}</p>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Status Badge */}
                    <div className="flex justify-center">
                        <span className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide
                            ${booking.status === 'confirmed' ? "bg-green-100 text-green-800" :
                                booking.status === 'pending' ? "bg-yellow-100 text-yellow-800" :
                                    booking.status === 'completed' ? "bg-gray-100 text-gray-800" :
                                        booking.status === 'cancelled' ? "bg-red-50 text-red-600" :
                                            "bg-orange-100 text-orange-800"
                            }`}>
                            {booking.status}
                        </span>
                    </div>

                    {/* Details Grid */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="p-2 rounded-lg bg-white shadow-sm text-gray-500">
                                <FileText size={18} />
                            </div>
                            <div>
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Session Topic</p>
                                <p className="font-medium text-gray-900">{booking.topic || "General Consultation"}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <Calendar size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Date</p>
                                    <p className="text-sm font-medium text-gray-900">
                                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Clock size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Time</p>
                                    <p className="text-sm font-medium text-gray-900">{booking.time} ({booking.duration} min)</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Video size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Type</p>
                                    <p className="text-sm font-medium text-gray-900 capitalize">{booking.type}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <DollarSign size={18} className="text-gray-400 mt-0.5" />
                                <div>
                                    <p className="text-xs font-medium text-gray-500">Price</p>
                                    <p className="text-sm font-medium text-[#006056]">${booking.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 border-t border-gray-100">
                        {booking.status === 'confirmed' ? (
                            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004d45] py-3 text-sm font-medium text-white hover:bg-[#003a34] transition-colors shadow-md shadow-[#004d45]/10">
                                <Video size={18} /> Join Call
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                                Close Details
                            </button>
                        )}

                        {booking.status === 'confirmed' && (
                            <p className="mt-3 text-center text-[10px] text-gray-400">
                                You can join the call 5 minutes before the scheduled time.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
