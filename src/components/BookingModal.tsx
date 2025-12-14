"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Lawyer } from "@/data/lawyers";
import { bookingManager } from "@/utils/bookingUtils";
import { Booking } from "@/data/bookings";

interface BookingModalProps {
    lawyer: Lawyer;
    isOpen: boolean;
    onClose: () => void;
    initialTopic?: string;
    initialDescription?: string;
    mode?: 'booking' | 'reschedule';
    rescheduleCount?: number;
    initialDate?: Date;
    initialTime?: string;
    onSubmitReschedule?: (date: Date, time: string, topic: string) => void;
}

export default function BookingModal({
    lawyer,
    isOpen,
    onClose,
    initialTopic = "",
    initialDescription = "",
    mode = 'booking',
    rescheduleCount = 0,
    initialDate,
    initialTime,
    onSubmitReschedule
}: BookingModalProps) {
    const [step, setStep] = useState(1);
    const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate || null);
    const [selectedTime, setSelectedTime] = useState<string | null>(initialTime || null);
    const [topic, setTopic] = useState(initialTopic);
    const [description, setDescription] = useState(initialDescription);

    // Sync state with props when modal opens or props change
    if (isOpen && topic !== initialTopic && initialTopic !== "") {
        setTopic(initialTopic);
    }
    if (isOpen && description !== initialDescription && initialDescription !== "") {
        setDescription(initialDescription);
    }

    // Reset or Initialize when opening
    if (isOpen && mode === 'reschedule' && (!selectedDate && initialDate)) {
        setSelectedDate(initialDate);
        setSelectedTime(initialTime || null);
    }

    if (!isOpen) return null;

    const handleNext = () => {
        if (step === 1 && selectedDate) setStep(2);
        else if (step === 2 && selectedTime) setStep(3);
        else if (step === 3) {
            if (mode === 'reschedule' && onSubmitReschedule && selectedDate && selectedTime) {
                onSubmitReschedule(selectedDate, selectedTime, topic);
                onClose();
            } else {
                // Create new booking
                if (selectedDate && selectedTime) {
                    const newBooking: Booking = {
                        id: Date.now().toString(),
                        lawyerId: lawyer.id,
                        date: selectedDate.toISOString().split('T')[0],
                        time: selectedTime,
                        duration: 60,
                        type: 'consultation', // Defaulting to consultation for now, could be dynamic
                        topic: topic,
                        price: lawyer.consultationPrice,
                        status: 'pending',
                        rescheduleCount: 0
                    };
                    bookingManager.addBooking(newBooking);
                }
                setStep(4);
            }
        }
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    // Calendar generation logic (Simplified for demo)
    const daysInMonth = 30; // Assuming 30 for simplicity or dynamic
    const currentMonth = "April 2025";
    const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

    // Time slots
    const morningSlots = ["8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM"];
    const eveningSlots = ["4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="flex h-[600px] w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                {/* Left Side: Summary Panel (35%) */}
                <div className="hidden w-[35%] flex-col border-r border-gray-100 bg-gray-50 p-8 lg:flex">
                    <button onClick={onClose} data-testid="close-modal-button" className="mb-6 w-fit rounded-full bg-white p-2 hover:bg-gray-100">
                        <X size={20} className="text-gray-500" />
                    </button>

                    <div className="mb-6 flex items-center gap-4">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white shadow-md">
                            <Image src={lawyer.image} alt={lawyer.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h3 className="font-serif text-lg font-bold text-gray-900">{lawyer.name}</h3>
                            <p className="text-xs text-gray-500">{lawyer.title}</p>
                        </div>
                    </div>

                    <div className="flex-1 space-y-6">
                        <div>
                            <h4 className="mb-2 text-sm font-bold text-gray-900">Session Details</h4>
                            <div className="space-y-3 rounded-xl bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Duration</span>
                                    <span className="font-medium text-gray-900">60 mins</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-500">Price</span>
                                    <span className="font-medium text-[#006056]">${lawyer.consultationPrice}</span>
                                </div>
                            </div>
                        </div>

                        {selectedDate && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <h4 className="mb-2 text-sm font-bold text-gray-900">Selected Time</h4>
                                <div className="rounded-xl bg-[#006056] p-4 text-white shadow-sm">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <CalendarIcon size={16} />
                                        {selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                    </div>
                                    {selectedTime && (
                                        <div className="mt-2 flex items-center gap-2 text-2xl font-bold">
                                            <Clock size={20} />
                                            {selectedTime}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Side: Flow Content (65%) */}
                <div className="flex flex-1 flex-col bg-white p-8">
                    {/* Header: Steps */}
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                                {step === 4 ? "Confirmed" : `Step ${step} of 3`}
                            </p>
                            <h2 className="font-serif text-2xl font-bold text-gray-900">
                                {step === 1 && "Choose a Date"}
                                {step === 2 && "Select a Time"}
                                {step === 3 && (initialTopic ? "Confirm Session Details" : "Session Topic")}
                                {step === 4 && "Booking Request Sent"}
                            </h2>
                            {mode === 'reschedule' && step === 1 && (
                                <div className="mt-2 rounded-lg bg-orange-50 p-3 text-xs text-orange-800 border border-orange-100">
                                    <p className="font-bold mb-1">Rescheduling Policy</p>
                                    <ul className="list-disc pl-4 space-y-0.5">
                                        <li>You have rescheduled <b>{rescheduleCount} times</b> previously.</li>
                                        {rescheduleCount >= 2 && (
                                            <li className="font-semibold">Notice: Rescheduling more than 2 times attracts a $50 fee.</li>
                                        )}
                                        {rescheduleCount >= 5 && (
                                            <li className="font-bold text-red-600">Warning: Excessive rescheduling (5+) will result in account suspension.</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                        {/* Mobile Close Button */}
                        <button onClick={onClose} className="rounded-full bg-gray-100 p-2 lg:hidden">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-y-auto">
                        {step === 1 && (
                            <div className="mx-auto max-w-md">
                                <div className="mb-4 flex items-center justify-between">
                                    <h3 className="text-lg font-medium">{currentMonth}</h3>
                                    <div className="flex gap-2">
                                        <button className="rounded-lg border p-2 hover:bg-gray-50"><ChevronLeft size={16} /></button>
                                        <button className="rounded-lg border p-2 hover:bg-gray-50"><ChevronRight size={16} /></button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center mb-2">
                                    {weekDays.map(d => <span key={d} className="text-xs font-medium text-gray-400">{d}</span>)}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {/* Offset for start of month (simulated) */}
                                    {[...Array(2)].map((_, i) => <div key={`empty-${i}`} />)}
                                    {[...Array(daysInMonth)].map((_, i) => {
                                        const day = i + 1;
                                        const date = new Date(2025, 3, day); // April 2025
                                        const isSelected = selectedDate?.getDate() === day;

                                        return (
                                            <button
                                                key={day}
                                                onClick={() => setSelectedDate(date)}
                                                className={`aspect-square rounded-lg flex items-center justify-center text-sm transition-all
                                                    ${isSelected
                                                        ? "bg-[#006056] text-white shadow-lg scale-105"
                                                        : "hover:bg-gray-100 text-gray-700 hover:scale-105"
                                                    }
                                                `}
                                            >
                                                {day}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="mx-auto max-w-md space-y-6">
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-gray-500">Morning</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {morningSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`rounded-lg border py-2.5 text-sm font-medium transition-all
                                                    ${selectedTime === time
                                                        ? "border-[#006056] bg-[#006056] text-white shadow-md ring-2 ring-[#006056] ring-offset-2"
                                                        : "border-gray-200 text-gray-600 hover:border-[#006056] hover:text-[#006056]"
                                                    }
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="mb-3 text-sm font-medium text-gray-500">Afternoon / Evening</h3>
                                    <div className="grid grid-cols-3 gap-3">
                                        {eveningSlots.map(time => (
                                            <button
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`rounded-lg border py-2.5 text-sm font-medium transition-all
                                                    ${selectedTime === time
                                                        ? "border-[#006056] bg-[#006056] text-white shadow-md ring-2 ring-[#006056] ring-offset-2"
                                                        : "border-gray-200 text-gray-600 hover:border-[#006056] hover:text-[#006056]"
                                                    }
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="mx-auto max-w-md space-y-6">
                                {initialTopic ? (
                                    <>
                                        <div className="rounded-xl bg-green-50 p-4 border border-green-100">
                                            <div className="flex gap-3">
                                                <div className="mt-0.5"><CheckCircle size={16} className="text-green-600" /></div>
                                                <p className="text-sm text-green-800">
                                                    You are booking a specific session. Please verify the details below.
                                                </p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Topic</label>
                                                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-700">
                                                    {topic}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                                                <div className="w-full rounded-xl border border-gray-200 bg-gray-50 p-3 text-gray-700 text-sm">
                                                    {description}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="rounded-xl bg-orange-50 p-4 border border-orange-100">
                                            <div className="flex gap-3">
                                                <div className="mt-0.5"><CheckCircle size={16} className="text-orange-600" /></div>
                                                <p className="text-sm text-orange-800">
                                                    Please describe your legal issue clearly. The lawyer will review this topic before confirming the session.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Topic Summary (e.g. Contract Review)</label>
                                                <input
                                                    type="text"
                                                    value={topic}
                                                    onChange={(e) => setTopic(e.target.value)}
                                                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#006056] focus:ring-1 focus:ring-[#006056]"
                                                    placeholder="Short title for your session"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-1 block text-sm font-medium text-gray-700">Detailed Description</label>
                                                <textarea
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    rows={6}
                                                    className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-[#006056] focus:ring-1 focus:ring-[#006056]"
                                                    placeholder="Describe your situation, what outcome you are looking for, and any specific questions you have..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {step === 4 && (
                            <div className="flex flex-col items-center justify-center h-full text-center space-y-6 animate-in zoom-in-95 duration-300">
                                <div className="h-24 w-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-sm">
                                    <CheckCircle size={48} strokeWidth={3} />
                                </div>
                                <div className="space-y-2 max-w-sm">
                                    <h3 className="text-xl font-bold text-gray-900">Request Sent Successfully!</h3>
                                    <p className="text-gray-500">
                                        Your request has been sent to <span className="font-bold text-gray-900">{lawyer.name}</span>.
                                        You will be notified once they accept your session.
                                    </p>
                                </div>

                                <div className="w-full max-w-xs space-y-3 pt-4">
                                    <button
                                        onClick={onClose}
                                        className="w-full rounded-xl bg-[#004d45] py-3 font-bold text-white shadow-lg hover:bg-[#003a34] hover:shadow-xl transition-all"
                                    >
                                        Done
                                    </button>
                                    <a
                                        href="/dashboard/bookings"
                                        className="block w-full rounded-xl border border-gray-200 py-3 font-medium text-gray-600 hover:bg-gray-50 transition-all"
                                    >
                                        View My Bookings
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer: Actions */}
                    {step < 4 && (
                        <div className="border-t border-gray-100 pt-6 flex justify-between items-center mt-auto">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-600 hover:bg-gray-50"
                                >
                                    <ChevronLeft size={18} /> Back
                                </button>
                            ) : <div></div>}

                            <button
                                onClick={handleNext}
                                disabled={(step === 1 && !selectedDate) || (step === 2 && !selectedTime)}
                                className={`flex items-center gap-2 rounded-xl px-8 py-3 font-medium text-white transition-all
                                ${((step === 1 && !selectedDate) || (step === 2 && !selectedTime))
                                        ? "bg-gray-300 cursor-not-allowed"
                                        : "bg-[#002f2a] hover:bg-black shadow-lg hover:shadow-xl"
                                    }
                            `}
                            >
                                {step === 3 ? "Send Request" : "Next"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
