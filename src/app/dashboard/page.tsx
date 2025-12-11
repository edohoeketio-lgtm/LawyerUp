"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Check, ArrowRight, UserPlus, FileText, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";

export default function DashboardPage() {
    const searchParams = useSearchParams();
    const view = searchParams?.get("view") || "client"; // 'client' (Legal Advice) or 'lawyer' (Mentorship)
    const isLawyerView = view === "lawyer";

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());

    // Calendar Helpers
    const getWeekDays = (date: Date) => {
        const start = new Date(date);
        start.setDate(start.getDate() - start.getDay()); // Start on Sunday
        return Array.from({ length: 7 }, (_, i) => {
            const d = new Date(start);
            d.setDate(d.getDate() + i);
            return d;
        });
    };

    const weekDays = getWeekDays(currentDate);
    const startOfWeek = weekDays[0];
    const endOfWeek = weekDays[6];

    const formatDateRange = (start: Date, end: Date) => {
        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
        return `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)}`;
    };

    const navigateWeek = (direction: 'prev' | 'next') => {
        const newDate = new Date(currentDate);
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        setCurrentDate(newDate);
    };

    return (
        <div className="space-y-8">
            {/* Greeting */}
            <div>
                <h2 className="font-serif text-3xl font-medium text-black">Good morning Nsikan</h2>
                <p className="text-sm text-gray-500">You have no upcoming sessions</p>
            </div>

            {/* Profile Completion Card */}
            <div className="rounded-xl border border-[#FFEBC8] bg-[#FFF8EB] p-6 text-black">
                <div className="mb-4">
                    <h3 className="font-serif text-lg font-medium">Complete your profile</h3>
                    <p className="text-xs text-gray-600">Get more by setting up a profile that portrays you</p>
                </div>

                <div className="mb-6 flex items-center gap-4">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#f7c164]">
                        <div className="h-full w-1/4 rounded-full bg-[#523300]"></div>
                    </div>
                    <span className="text-xs font-medium">25% complete</span>
                </div>

                <div className="relative space-y-0 text-sm">
                    {/* Vertical Line */}
                    <div className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-0.5 bg-[#8F6B20]"></div>

                    {/* Step 1: Done */}
                    <div className="relative flex items-center gap-3">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8F6B20] text-white z-10">
                            <Check size={12} strokeWidth={3} />
                        </div>
                        <span className="font-medium text-[#8F6B20] line-through decoration-2">Set preferred language & timezone</span>
                    </div>

                    {/* Step 2: Bar Membership (Conditional) */}
                    {isLawyerView && (
                        <div className="relative flex items-center gap-3 pt-6">
                            <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                            <span className="font-medium text-[#4A3B18]">Bar membership No.</span>
                        </div>
                    )}

                    {/* Step 3: Mentorship Topics / Preferences */}
                    <div className="relative flex items-center gap-3 pt-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                        <span className="font-medium text-[#4A3B18]">
                            {isLawyerView ? "Set your preferred mentorship topics" : "Set your preferred legal topics"}
                        </span>
                    </div>

                    {/* Step 4: First Session */}
                    <div className="relative flex items-center gap-3 pt-6">
                        <div className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10"></div>
                        <span className="font-medium text-[#4A3B18]">
                            Book your first session - <span className="font-normal text-gray-600">Speak to an expert</span>
                        </span>
                    </div>
                </div>
            </div>

            {/* Upcoming Sessions (Interactive Calendar) */}
            <div>
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="font-serif text-lg text-black">Upcoming Sessions</h3>
                    <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-black">
                        View all bookings <ArrowRight size={14} />
                    </button>
                </div>

                <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <div className="mb-6 flex items-center justify-between text-black">
                        <button
                            onClick={() => navigateWeek('prev')}
                            className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <span className="font-medium">{formatDateRange(startOfWeek, endOfWeek)}</span>
                        <button
                            onClick={() => navigateWeek('next')}
                            className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="grid grid-cols-7 text-center">
                        {weekDays.map((day, i) => {
                            const isToday = new Date().toDateString() === day.toDateString();

                            return (
                                <div key={i} className="space-y-2">
                                    <span className={`text-xs font-medium ${isToday ? "text-green-700" : "text-gray-400"}`}>
                                        {day.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase()}
                                    </span>
                                    <div
                                        className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full text-sm
                                            ${isToday
                                                ? "bg-green-50 text-green-700 font-bold"
                                                : "text-gray-400"
                                            }
                                        `}
                                    >
                                        {day.getDate()}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-xs text-gray-400">
                            No upcoming sessions this week <a href="#" className="font-medium text-[#006056] underline hover:text-[#004d45]">Book a session</a>
                        </p>
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

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                    {lawyers.slice(0, 5).map((lawyer) => (
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
