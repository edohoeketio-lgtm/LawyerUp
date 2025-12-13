"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookings, Booking, getBookingLawyer, BookingStatus } from "@/data/bookings";
import { Calendar, Clock, Video, MoreHorizontal, FileText, AlertCircle, MessageSquare } from "lucide-react";
import ReviewModal from "@/components/ReviewModal";

import BookingDetailsModal from "@/components/dashboard/BookingDetailsModal";
import BookingModal from "@/components/BookingModal";
import CancelBookingModal from "@/components/dashboard/CancelBookingModal";

export default function BookingsPage() {
    const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "cancelled" | "rescheduled">("upcoming");
    const [isReviewOpen, setIsReviewOpen] = useState(false);
    const [selectedBookingForReview, setSelectedBookingForReview] = useState<Booking | null>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [selectedBookingForDetails, setSelectedBookingForDetails] = useState<Booking | null>(null);
    const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
    const [selectedBookingForReschedule, setSelectedBookingForReschedule] = useState<Booking | null>(null);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [selectedBookingForCancel, setSelectedBookingForCancel] = useState<Booking | null>(null);

    const filteredBookings = bookings.filter(b => {
        if (activeTab === "upcoming") return b.status === "confirmed" || b.status === "pending";
        if (activeTab === "past") return b.status === "completed";
        if (activeTab === "cancelled") return b.status === "cancelled";
        if (activeTab === "rescheduled") return b.status === "rescheduled";
        return false;
    });

    const handleOpenReview = (booking: Booking) => {
        setSelectedBookingForReview(booking);
        setIsReviewOpen(true);
    };

    const handleSubmitReview = (rating: number, review: string) => {
        console.log("Submitting review for:", selectedBookingForReview?.id, { rating, review });
        alert("Thanks for your review! It has been submitted.");
        setIsReviewOpen(false);
        setSelectedBookingForReview(null);
    };

    const handleOpenDetails = (booking: Booking) => {
        setSelectedBookingForDetails(booking);
        setIsDetailsOpen(true);
    };

    const handleOpenReschedule = (booking: Booking) => {
        const bookingDate = new Date(`${booking.date}T${booking.time.replace(" AM", ":00").replace(" PM", ":00")}`); // simplified parsing
        const now = new Date();
        const diffInHours = (bookingDate.getTime() - now.getTime()) / 1000 / 60 / 60;

        if (diffInHours < 1) {
            alert("You cannot reschedule less than 1 hour before the session.");
            return;
        }

        setSelectedBookingForReschedule(booking);
        setIsRescheduleOpen(true);
    };

    const handleOpenCancel = (booking: Booking) => {
        setSelectedBookingForCancel(booking);
        setIsCancelOpen(true);
    };

    const handleCancelConfirm = () => {
        if (selectedBookingForCancel) {
            // Mock cancellation
            alert(`Booking for ${selectedBookingForCancel.topic} has been cancelled.`);
            // In a real app, you would verify this status update in the UI
            selectedBookingForCancel.status = 'cancelled';
            setIsCancelOpen(false);
        }
    };

    const handleSubmitReschedule = (date: Date, time: string, topic: string) => {
        // In a real app, this would be an API call
        if (selectedBookingForReschedule) {
            // Mock update locally for demo (in reality, state management needed or refetch)
            alert(`Reschedule request sent for ${date.toDateString()} at ${time}. Status updated to Pending.`);
            setIsRescheduleOpen(false);
            // Force refresh or update local list logic would be here
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="font-serif text-3xl font-medium text-black">Your Bookings</h2>
                <p className="text-sm text-gray-500">Manage your upcoming sessions and view past history</p>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8">
                    {["upcoming", "past", "rescheduled", "cancelled"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as typeof activeTab)}
                            className={`pb-4 text-sm font-medium transition-all relative ${activeTab === tab
                                ? "text-black"
                                : "text-gray-500 hover:text-gray-700"
                                }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            {activeTab === tab && (
                                <span className="absolute bottom-0 left-0 h-0.5 w-full bg-black"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="min-h-[400px]">
                {filteredBookings.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredBookings.map((booking) => (
                            <BookingCard
                                key={booking.id}
                                booking={booking}
                                onLeaveReview={() => handleOpenReview(booking)}
                                onViewDetails={() => handleOpenDetails(booking)}
                                onReschedule={() => handleOpenReschedule(booking)}
                                onCancel={() => handleOpenCancel(booking)}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm text-gray-400">
                            <Calendar size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-black">No {activeTab} bookings</h3>
                        <p className="text-gray-500 max-w-xs mx-auto mb-6">
                            You don&apos;t have any {activeTab} sessions at the moment.
                        </p>
                        {activeTab === "upcoming" && (
                            <Link
                                href="/dashboard/discover"
                                className="rounded-lg bg-[#004d45] px-6 py-2 text-sm font-medium text-white hover:bg-[#003a34]"
                            >
                                Find a Lawyer
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Review Modal */}
            {selectedBookingForReview && (
                <ReviewModal
                    isOpen={isReviewOpen}
                    onClose={() => setIsReviewOpen(false)}
                    onSubmit={handleSubmitReview}
                    lawyerName={getBookingLawyer(selectedBookingForReview)?.name || "Lawyer"}
                />
            )}

            {/* Details Modal */}
            <BookingDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                booking={selectedBookingForDetails}
            />

            {/* Reschedule Modal */}
            {selectedBookingForReschedule && (
                <BookingModal
                    lawyer={getBookingLawyer(selectedBookingForReschedule)!}
                    isOpen={isRescheduleOpen}
                    onClose={() => setIsRescheduleOpen(false)}
                    initialTopic={selectedBookingForReschedule.topic}
                    initialDate={new Date(selectedBookingForReschedule.date)}
                    initialTime={selectedBookingForReschedule.time}
                    mode="reschedule"
                    rescheduleCount={selectedBookingForReschedule.rescheduleCount || 0}
                    onSubmitReschedule={handleSubmitReschedule}
                />
            )}

            {/* Cancel Modal */}
            <CancelBookingModal
                isOpen={isCancelOpen}
                onClose={() => setIsCancelOpen(false)}
                booking={selectedBookingForCancel}
                onConfirm={handleCancelConfirm}
            />
        </div>
    );
}

function BookingCard({ booking, onLeaveReview, onViewDetails, onReschedule, onCancel }: { booking: Booking, onLeaveReview?: () => void, onViewDetails?: () => void, onReschedule?: () => void, onCancel?: () => void }) {
    const lawyer = getBookingLawyer(booking);
    const [showMenu, setShowMenu] = useState(false);

    if (!lawyer) return null;

    const statusColors: Record<BookingStatus, string> = {
        confirmed: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        completed: "bg-gray-100 text-gray-800",
        cancelled: "bg-red-50 text-red-600",
        rescheduled: "bg-orange-100 text-orange-800"
    };

    return (
        <div className="group relative flex flex-col gap-6 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Info */}
            <div className="flex items-start gap-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-gray-100">
                    <Image src={lawyer.image} alt={lawyer.name} fill className="object-cover" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif text-lg font-bold text-black">{lawyer.name}</h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${statusColors[booking.status]}`}>
                            {booking.status}
                        </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{lawyer.title}</p>

                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} className="text-gray-400" />
                            <span className="font-medium">
                                {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} className="text-gray-400" />
                            <span className="font-medium">{booking.time} ({booking.duration} mins)</span>
                        </div>
                        {booking.type && (
                            <div className="flex items-center gap-1.5">
                                <FileText size={14} className="text-gray-400" />
                                <span className="capitalize">{booking.type}</span>
                            </div>
                        )}
                    </div>
                    {booking.topic && (
                        <div className="mt-3 text-xs text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded border border-gray-100">
                            Topic: <span className="font-medium text-gray-700">{booking.topic}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-col items-end gap-3 sm:w-auto">
                <div className="text-right mb-1">
                    <span className="block text-xs text-gray-400">Total Price</span>
                    <span className="font-bold text-[#006056]">${booking.price}</span>
                </div>

                <div className="flex gap-2 w-full sm:w-auto relative">
                    {booking.status === "confirmed" && (
                        <>
                            <Link
                                href={`/dashboard/messages/${lawyer.id}`}
                                className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <MessageSquare size={16} />
                            </Link>
                            <button className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34]">
                                <Video size={16} /> Join Call
                            </button>
                        </>
                    )}
                    {booking.status === "completed" && (
                        <button
                            onClick={onLeaveReview}
                            className="flex flex-1 sm:flex-none items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Leave Review
                        </button>
                    )}
                    {(booking.status === "confirmed" || booking.status === "pending") && (
                        <>
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-500 hover:bg-gray-50 transition-colors"
                            >
                                <MoreHorizontal size={18} />
                            </button>

                            {showMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-10"
                                        onClick={() => setShowMenu(false)}
                                    ></div>
                                    <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-gray-100 bg-white p-1 shadow-lg z-20">
                                        <button
                                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => {
                                                if (onViewDetails) onViewDetails();
                                                setShowMenu(false);
                                            }}
                                        >
                                            <FileText size={14} />
                                            View details
                                        </button>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                            onClick={() => {
                                                if (onReschedule) onReschedule();
                                                setShowMenu(false);
                                            }}
                                        >
                                            <Calendar size={14} />
                                            Reschedule
                                        </button>
                                        <div className="my-1 h-px bg-gray-100"></div>
                                        <button
                                            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                                            onClick={() => {
                                                if (onCancel) onCancel();
                                                setShowMenu(false);
                                            }}
                                        >
                                            <AlertCircle size={14} />
                                            Cancel session
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
