"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { auth, User } from "@/utils/auth";
import { Check, ArrowRight, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, Video } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";
import { bookings, getBookingLawyer } from "@/data/bookings";

export default function DashboardClient() {
    const searchParams = useSearchParams();
    const view = searchParams?.get("view") || "client"; // 'client' (Legal Advice) or 'lawyer' (Mentorship)
    const isLawyerView = view === "lawyer";
    const [user, setUser] = useState<User | null>(null);
    const [greeting, setGreeting] = useState("Good morning");

    // Blocking State
    const [blockedIds, setBlockedIds] = useState<string[]>([]);

    useEffect(() => {
        // Set User
        setUser(auth.getSession());

        // Set Greeting based on time
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        const stored = localStorage.getItem("blockedLawyers");
        if (stored) {
            // eslint-disable-next-line
            setBlockedIds(JSON.parse(stored));
        }
    }, []);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarView, setCalendarView] = useState<'week' | 'month'>('week');

    // Get Next Upcoming Booking
    const nextBooking = bookings
        .filter(b => new Date(b.date) >= new Date() && b.status === "confirmed")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    const nextBookingLawyer = nextBooking ? getBookingLawyer(nextBooking) : null;

    // Calendar Helpers
    const getCalendarDays = (date: Date, viewType: 'week' | 'month') => {
        const start = new Date(date);
        const days = [];

        if (viewType === 'week') {
            start.setDate(start.getDate() - start.getDay()); // Start on Sunday
            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(d.getDate() + i);
                days.push(d);
            }
        } else {
            // Month view: Start from the first day of the month
            start.setDate(1); // 1st of the month
            const startDay = start.getDay(); // Day of week (0-6)

            // Go back to previous Sunday to fill grid
            start.setDate(start.getDate() - startDay);

            // Generate 42 days (6 weeks) to cover any month
            for (let i = 0; i < 42; i++) {
                const d = new Date(start);
                d.setDate(d.getDate() + i);
                days.push(d);
            }
        }
        return days;
    };

    const calendarDays = getCalendarDays(currentDate, calendarView);

    const formatDateRange = (date: Date, viewType: 'week' | 'month') => {
        if (viewType === 'month') {
            return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
        }
        const start = getCalendarDays(date, 'week')[0];
        const end = getCalendarDays(date, 'week')[6];
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        return `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)}`;
    };

    const navigateCalendar = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        if (calendarView === 'week') {
            newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        } else {
            newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        }
        setCurrentDate(newDate);
    };

    const hasBookingOnDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return bookings.some(b => b.date === dateString && (b.status === 'confirmed' || b.status === 'pending'));
    };

    const getBookingForDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return bookings.find(b => b.date === dateString && (b.status === 'confirmed' || b.status === 'pending'));
    };

    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div>
                <h2 className="font-serif text-3xl font-medium text-black">
                    {greeting} {user ? user.firstName : "Guest"}
                </h2>
                {nextBooking && nextBookingLawyer ? (
                    <div className="mt-1 flex items-center gap-2 text-sm text-[#006056]">
                        <Clock size={16} />
                        <span>
                            Next session: <b>{new Date(nextBooking.date).toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' })} at {nextBooking.time}</b> with {nextBookingLawyer.name}
                        </span>
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">You have no upcoming sessions</p>
                )}
            </div>

            {/* Profile Completion Card */}
            <div className="rounded-xl border border-[#FFEBC8] bg-[#FFF8EB] p-6 text-black">
                <div className="mb-4">
                    <h3 className="font-serif text-lg font-medium">Complete your profile</h3>
                    <p className="text-xs text-gray-600">Get more by setting up a profile that portrays you</p>
                </div>

                {(() => {
                    // Determine completion status
                    const hasLanguageAndTimezone = user?.languages && user?.languages.length > 0 && user?.timezone;
                    const hasLegalInterests = user?.legalInterests && user?.legalInterests.length > 0;
                    const hasBookedSession = bookings.some(b => b.status === "confirmed" || b.status === "completed");

                    const completedCount = [
                        hasLanguageAndTimezone,
                        hasLegalInterests,
                        hasBookedSession
                    ].filter(Boolean).length;

                    const totalSteps = isLawyerView ? 4 : 3; // Lawyers have bar membership step
                    const percentComplete = Math.round((completedCount / totalSteps) * 100);

                    return (
                        <>
                            <div className="mb-6 flex items-center gap-4">
                                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f7c164]">
                                    <div
                                        className="h-full rounded-full bg-[#523300] transition-all duration-300"
                                        style={{ width: `${percentComplete}%` }}
                                    ></div>
                                </div>
                                <span className="text-xs font-medium">{percentComplete}% complete</span>
                            </div>

                            <div className="relative space-y-0 text-sm">
                                {/* Vertical Line */}
                                <div className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-0.5 bg-[#8F6B20]"></div>

                                {/* Step 1: Language & Timezone */}
                                <div className="relative flex items-center gap-3">
                                    {hasLanguageAndTimezone ? (
                                        <>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8F6B20] text-white z-10">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="font-medium text-[#8F6B20] line-through decoration-2">Set preferred language & timezone</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                                            <span className="font-medium text-[#4A3B18]">Set preferred language & timezone</span>
                                        </>
                                    )}
                                </div>

                                {/* Step 2: Bar Membership (Conditional for Lawyers) */}
                                {isLawyerView && (
                                    <div className="relative flex items-center gap-3 pt-6">
                                        <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                                        <span className="font-medium text-[#4A3B18]">Bar membership No.</span>
                                    </div>
                                )}

                                {/* Step 3: Legal Interests */}
                                <div className="relative flex items-center gap-3 pt-6">
                                    {hasLegalInterests ? (
                                        <>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8F6B20] text-white z-10">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="font-medium text-[#8F6B20] line-through decoration-2">
                                                {isLawyerView ? "Set your preferred mentorship topics" : "Set your preferred legal topics"}
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                                            <span className="font-medium text-[#4A3B18]">
                                                {isLawyerView ? "Set your preferred mentorship topics" : "Set your preferred legal topics"}
                                            </span>
                                        </>
                                    )}
                                </div>

                                {/* Step 4: First Session */}
                                <div className="relative flex items-center gap-3 pt-6">
                                    {hasBookedSession ? (
                                        <>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8F6B20] text-white z-10">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="font-medium text-[#8F6B20] line-through decoration-2">
                                                Book your first session - <span className="font-normal">Speak to an expert</span>
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                                            <span className="font-medium text-[#4A3B18]">
                                                Book your first session - <span className="font-normal text-gray-600">Speak to an expert</span>
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    );
                })()}
            </div>

            {/* Upcoming Sessions */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-lg text-black">Upcoming sessions</h3>
                    {nextBooking && (
                        <Link href="/dashboard/bookings" className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black">
                            View all bookings <ArrowRight size={14} />
                        </Link>
                    )}
                </div>

                {/* Interactive Calendar (Existing) */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 transition-all duration-300">
                    <div className="mb-6 flex items-center justify-between text-black">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => navigateCalendar('prev')}
                                className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <span className="font-medium min-w-[140px] text-center">{formatDateRange(currentDate, calendarView)}</span>
                            <button
                                onClick={() => navigateCalendar('next')}
                                className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* View Toggle */}
                        <div className="flex rounded-lg bg-gray-50 p-1">
                            <button
                                onClick={() => setCalendarView('week')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${calendarView === 'week' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                Week
                            </button>
                            <button
                                onClick={() => setCalendarView('month')}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${calendarView === 'month' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'
                                    }`}
                            >
                                Month
                            </button>
                        </div>
                    </div>

                    <div className={`grid gap-y-4 ${calendarView === 'week' ? 'grid-cols-7' : 'grid-cols-7'}`}>
                        {/* Weekday Headers */}
                        {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                            <div key={day} className="text-center text-[10px] font-bold text-gray-400 mb-2">
                                {day}
                            </div>
                        ))}

                        {/* Calendar Days */}
                        {calendarDays.map((day, i) => {
                            const isToday = new Date().toDateString() === day.toDateString();
                            const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                            const booking = getBookingForDate(day);
                            const hasBooking = !!booking;
                            const bookingLawyer = booking ? getBookingLawyer(booking) : null;

                            // Visual fading for dates not in current month (only relevant for month view mostly)
                            const opacityClass = (calendarView === 'month' && !isCurrentMonth) ? "opacity-30" : "opacity-100";

                            return (
                                <div key={i} className={`flex flex-col items-center space-y-1 ${opacityClass}`}>
                                    <div
                                        className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all cursor-default
                                            ${isToday
                                                ? "bg-[#004d45] text-white shadow-md transform scale-105"
                                                : hasBooking
                                                    ? "bg-[#E6F0EE] text-[#006056] font-bold border border-[#006056] cursor-help"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            }
                                        `}
                                    >
                                        {day.getDate()}
                                        {hasBooking && !isToday && (
                                            <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#006056]"></div>
                                        )}

                                        {/* Tooltip */}
                                        {hasBooking && bookingLawyer && (
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 hidden w-48 flex-col gap-1 rounded-lg bg-black/90 p-3 text-[10px] text-white shadow-xl group-hover:flex">
                                                <div className="flex items-center gap-1.5 font-bold text-yellow-400">
                                                    <Clock size={10} /> {booking.time}
                                                </div>
                                                <div className="font-semibold truncate">{bookingLawyer.name}</div>
                                                <div className="text-gray-300 capitalize">{booking.type}</div>
                                                {/* Arrow */}
                                                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-black/90"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center border-t border-gray-50 pt-6">
                        {nextBooking && (
                            <div className="inline-flex items-center gap-4 text-left p-3 rounded-xl bg-[#F2FFF2] border border-green-100">
                                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-white text-[#006056]">
                                    <Video size={18} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#004d45]">Upcoming: {nextBooking.type === 'consultation' ? 'Consultation' : 'Mentorship'}</p>
                                    <p className="text-[10px] text-gray-500">
                                        {new Date(nextBooking.date).toLocaleDateString()} • {nextBooking.time} with {nextBookingLawyer?.name}
                                    </p>
                                </div>
                                <button className="ml-2 rounded-lg bg-[#004d45] px-3 py-1.5 text-[10px] font-medium text-white hover:bg-[#003a34]">
                                    Join
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Suggested Lawyers */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-lg text-black">Suggested Lawyers</h3>
                    <Link href="/dashboard/discover" className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black">
                        Explore Lawyers <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {lawyers
                        .filter(l => !blockedIds.includes(l.id))
                        .slice(0, 5)
                        .map((lawyer) => (
                            <LawyerCard key={lawyer.id} lawyer={lawyer} />
                        ))}
                </div>
            </div>

            {/* Bottom Grid: Achievements & Invite */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Achievements */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg text-black">Achievements</h3>
                    <div className="flex h-48 flex-col items-center justify-center rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100 text-center">
                        <div className="mb-3 rounded-lg bg-gray-100 p-3 grayscale opacity-50">
                            <span className="text-2xl">🏰</span>
                        </div>
                        <h4 className="mb-1 text-sm font-medium text-black">No achievement found</h4>
                        <p className="text-xs text-gray-400">Progress will show when an activity commences.</p>
                    </div>
                </div>

                {/* Invite */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between h-7"> {/* Spacer to align with Achievements Header */}</div>
                    <div className="relative h-48 overflow-hidden rounded-xl bg-[#F2FFF2] p-6">
                        <div className="relative z-10 max-w-[60%] space-y-2">
                            <h3 className="font-serif text-lg font-medium text-black">Invite a friend</h3>
                            <p className="text-xs text-gray-600">
                                Help a friend or loved one find the guidance they need by inviting them to join Lawyer Up today.
                            </p>
                            <button className="text-xs font-medium text-[#006056] underline hover:text-[#004d45]">
                                Share invite
                            </button>
                        </div>
                        {/* Decorative Graphic */}
                        <div className="absolute -bottom-4 -right-4 h-32 w-32 bg-gray-200">
                            {/* Placeholder for the chat bubble graphic */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


