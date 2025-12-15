"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/utils/auth";
import { Check, ArrowRight, Clock, Video, X, Briefcase, Users, DollarSign, ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { bookings, getBookingLawyer } from "@/data/bookings";
import { useToast } from "@/context/ToastContext";
import StatusModal from "@/components/profile/StatusModal";

export default function LawyerDashboard({ user }: { user: User | null }) {
    const [greeting, setGreeting] = useState("Good morning");
    const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const { success } = useToast();
    const router = useRouter();

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date());
    const [calendarView, setCalendarView] = useState<'week' | 'month'>('week');

    // Profile Completion State
    const [showProfileCard, setShowProfileCard] = useState(true);
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);


    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");

        // Close dropdown when clicking outside
        function handleClickOutside(event: MouseEvent) {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
            start.setDate(1);
            const startDay = start.getDay();
            start.setDate(start.getDate() - startDay);
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

    // Filter relevant bookings for the Lawyer
    const relevantBookings = bookings;

    const getBookingForDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return relevantBookings.find(b => b.date === dateString && (b.status === 'confirmed' || b.status === 'pending'));
    };

    // Derived next booking for quick action or display
    const nextBooking = relevantBookings
        .filter(b => new Date(b.date) >= new Date() && b.status === "confirmed")
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0];

    // Mock Stats - "Practice Health"
    const stats = [
        {
            label: "Earnings",
            value: "₦150,000",
            subValue: "₦45,000 available",
            icon: DollarSign,
            color: "text-green-600",
            bg: "bg-green-50",
            action: { label: "Withdraw", onClick: () => success("Withdrawal initiated!") }
        },
        { label: "Profile Views (30d)", value: "124", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "R.E.P. Score", value: "4.9/5.0", icon: Check, color: "text-purple-600", bg: "bg-purple-50" },
    ];

    const rangeLabels = {
        "7d": "Last 7 Days",
        "30d": "Last 30 Days",
        "90d": "Last 3 Months"
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="font-serif text-3xl font-medium text-black">
                        {greeting}, {user ? `Barr. ${user.lastName}` : "Counsel"}
                    </h2>
                    <p className="text-sm text-gray-500">Here's what's happening in your practice today.</p>
                </div>
                {user?.verificationStatus === "pending" && (
                    <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-4 py-2 text-sm text-yellow-800 border border-yellow-100">
                        <Clock size={16} />
                        <span>Bar Verification Pending</span>
                    </div>
                )}
                {user?.verificationStatus === "verified" && (
                    <div className="flex items-center gap-2">
                        {user.customStatus && (
                            <div className="hidden md:flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 border border-gray-100 mr-2">
                                <span>{user.customStatus.emoji}</span>
                                <span className="font-medium">{user.customStatus.text}</span>
                                <span className="text-xs text-gray-400 border-l border-gray-200 pl-2 ml-1">
                                    {user.customStatus.clearAfter === 'never' ? 'Always' : user.customStatus.clearAfter}
                                </span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800 border border-green-100">
                            <Check size={16} />
                            <span>Verified Account</span>
                        </div>
                    </div>
                )}
                {user?.verificationStatus === "verified" && (
                    <div className="flex items-center gap-2">
                        {user.customStatus && (
                            <button
                                onClick={() => setIsStatusModalOpen(true)}
                                className="hidden md:flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 border border-gray-100 mr-2 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <span>{user.customStatus.emoji}</span>
                                <span className="font-medium">{user.customStatus.text}</span>
                                <span className="text-xs text-gray-400 border-l border-gray-200 pl-2 ml-1">
                                    {user.customStatus.clearAfter === 'never' ? 'Always' : user.customStatus.clearAfter}
                                </span>
                            </button>
                        )}
                        {!user?.customStatus && (
                            <button
                                onClick={() => setIsStatusModalOpen(true)}
                                className="hidden md:flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-700 border border-gray-100 mr-2 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                <Clock size={16} />
                                <span className="font-medium">Set your status</span>
                            </button>
                        )}
                        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800 border border-green-100">
                            <Check size={16} />
                            <span>Verified Account</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Profile Completion Card */}
            {showProfileCard && (() => {
                const hasBarVerification = user?.verificationStatus === "verified";
                const hasServices = user?.services && user?.services.length > 0;
                // Check if custom status is set
                const hasAvailability = !!user?.customStatus;

                const steps = [
                    {
                        done: hasBarVerification,
                        label: "Verify your Bar Identity",
                        subtext: "Required to appear in search",
                        action: () => router.push("/dashboard/account")
                    },
                    {
                        done: hasServices,
                        label: "Set up Services & Rates",
                        subtext: "Define what you offer to clients",
                        action: () => router.push("/dashboard/account?tab=services")
                    },
                    {
                        done: hasAvailability,
                        label: "Set Availability",
                        subtext: "Let clients know when you're free",
                        action: () => setIsStatusModalOpen(true)
                    }
                ];

                const completedCount = steps.filter(s => s.done).length;
                const percentComplete = Math.round((completedCount / steps.length) * 100);

                if (percentComplete === 100) return null; // Hide if complete

                return (
                    <div className="relative rounded-xl border border-[#FFEBC8] bg-[#FFF8EB] p-6 text-black">
                        <button
                            onClick={() => setShowProfileCard(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X size={18} />
                        </button>
                        <div className="mb-4">
                            <h3 className="font-serif text-lg font-medium">Complete your practice profile</h3>
                            <p className="text-xs text-gray-600">Complete these steps to start accepting client bookings.</p>
                        </div>

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
                            <div className="absolute left-[9px] top-2 h-[calc(100%-16px)] w-0.5 bg-[#8F6B20]"></div>

                            {steps.map((step, idx) => (
                                <div key={idx} className={`relative flex items-center gap-3 ${idx > 0 ? "pt-6" : ""}`}>
                                    {step.done ? (
                                        <>
                                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#8F6B20] text-white z-10">
                                                <Check size={12} strokeWidth={3} />
                                            </div>
                                            <span className="font-medium text-[#8F6B20] line-through decoration-2">{step.label}</span>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={step.action} className="h-5 w-5 rounded-full border-2 border-[#8F6B20] bg-[#FFF8EB] z-10 hover:bg-[#ffe0b2] transition-colors"></button>
                                            <div className="flex flex-col">
                                                <button onClick={step.action} className="font-medium text-[#4A3B18] text-left hover:underline">{step.label}</button>
                                                <span className="text-[10px] text-gray-500">{step.subtext}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })()}

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            {stat.action && (
                                <button
                                    onClick={stat.action.onClick}
                                    className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                >
                                    {stat.action.label}
                                </button>
                            )}
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            {stat.subValue && (
                                <p className="text-xs font-medium text-gray-400 mt-1">{stat.subValue}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Analytics & Actions Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Analytics Chart */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between overflow-visible relative z-10">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-base font-bold text-black">Profile Activity</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {timeRange === "7d" ? "135" : timeRange === "30d" ? "842" : "2,150"}
                                    <span className="text-sm font-medium text-gray-500 ml-1">views</span>
                                </h2>
                                <div className="flex items-center gap-1 text-xs text-[#006056] font-bold bg-[#E6F0EE] px-2 py-0.5 rounded-full">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    {timeRange === "7d" ? "12.5%" : "8.2%"}
                                </div>
                            </div>
                        </div>

                        {/* Filter Dropdown */}
                        <div className="relative" ref={filterRef}>
                            <button
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                                className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                                {rangeLabels[timeRange]}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
                            </button>

                            {isFilterOpen && (
                                <div className="absolute right-0 top-full mt-2 w-40 origin-top-right rounded-xl border border-gray-100 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                    <div className="py-1">
                                        {(Object.keys(rangeLabels) as Array<keyof typeof rangeLabels>).map((range) => (
                                            <button
                                                key={range}
                                                onClick={() => {
                                                    setTimeRange(range);
                                                    setIsFilterOpen(false);
                                                }}
                                                className={`flex w-full items-center px-4 py-2 text-sm ${timeRange === range ? "bg-gray-50 text-[#006056] font-bold" : "text-gray-700 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {rangeLabels[range]}
                                                {timeRange === range && <Check size={14} className="ml-auto" />}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="h-48 w-full">
                        <ActivityChart range={timeRange} />
                    </div>
                </div>

                {/* Quick Actions - Stacked */}
                <div className="flex flex-col gap-4 justify-between h-full z-0">
                    <button
                        onClick={() => router.push('/dashboard/account?tab=services')}
                        className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#006056] hover:shadow-md group items-center"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900 group-hover:bg-[#E6F0EE] group-hover:text-[#006056] transition-colors">
                                <Briefcase size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-base text-black group-hover:text-[#006056] transition-colors">Edit Services</h4>
                                <p className="text-sm text-gray-500">Manage rates & offerings</p>
                            </div>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#006056] group-hover:bg-[#006056] transition-all">
                            <ArrowRight size={14} className="text-gray-300 group-hover:text-white transition-colors" />
                        </div>
                    </button>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(`${window.location.origin}/dashboard/lawyer/${user?.id}`);
                            success("Profile link copied to clipboard!");
                        }}
                        className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#006056] hover:shadow-md group items-center"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900 group-hover:bg-[#E6F0EE] group-hover:text-[#006056] transition-colors">
                                <Users size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-base text-black group-hover:text-[#006056] transition-colors">Share Profile</h4>
                                <p className="text-sm text-gray-500">Copy public link</p>
                            </div>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#006056] group-hover:bg-[#006056] transition-all">
                            <ArrowRight size={14} className="text-gray-300 group-hover:text-white transition-colors" />
                        </div>
                    </button>

                    <button
                        onClick={() => setIsStatusModalOpen(true)}
                        className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-[#006056] hover:shadow-md group items-center"
                    >
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-gray-900 group-hover:bg-[#E6F0EE] group-hover:text-[#006056] transition-colors">
                                <Clock size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-base text-black group-hover:text-[#006056] transition-colors">Availability</h4>
                                <p className="text-sm text-gray-500">Set working hours</p>
                            </div>
                        </div>
                        <div className="h-8 w-8 rounded-full border border-gray-100 flex items-center justify-center group-hover:border-[#006056] group-hover:bg-[#006056] transition-all">
                            <ArrowRight size={14} className="text-gray-300 group-hover:text-white transition-colors" />
                        </div>
                    </button>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Upcoming Sessions (Calendar Widget) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg text-black">Upcoming Sessions</h3>
                        <Link href="/dashboard/bookings" className="text-xs font-medium text-gray-500 hover:text-black">View all</Link>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300">
                        <div className="mb-6 flex items-center justify-between text-black">
                            <div className="flex items-center gap-2">
                                <button onClick={() => navigateCalendar('prev')} className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"><ChevronLeft size={16} /></button>
                                <span className="font-medium min-w-[140px] text-center">{formatDateRange(currentDate, calendarView)}</span>
                                <button onClick={() => navigateCalendar('next')} className="rounded-full bg-gray-50 p-2 hover:bg-gray-100 transition-colors"><ChevronRight size={16} /></button>
                            </div>
                            <div className="flex rounded-lg bg-gray-50 p-1">
                                <button onClick={() => setCalendarView('week')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${calendarView === 'week' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}>Week</button>
                                <button onClick={() => setCalendarView('month')} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${calendarView === 'month' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-black'}`}>Month</button>
                            </div>
                        </div>

                        <div className={`grid gap-y-4 ${calendarView === 'week' ? 'grid-cols-7' : 'grid-cols-7'}`}>
                            {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                                <div key={day} className="text-center text-[10px] font-bold text-gray-400 mb-2">{day}</div>
                            ))}
                            {calendarDays.map((day, i) => {
                                const isToday = new Date().toDateString() === day.toDateString();
                                const booking = getBookingForDate(day);
                                const hasBooking = !!booking;
                                const bookingLawyer = booking ? getBookingLawyer(booking) : null;
                                const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                                return (
                                    <div key={i} className={`flex flex-col items-center space-y-1 ${!isCurrentMonth && calendarView === 'month' ? "opacity-30" : ""}`}>
                                        <div className={`group relative flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-all cursor-default ${isToday ? "bg-[#004d45] text-white shadow-md transform scale-105" : hasBooking ? "bg-[#E6F0EE] text-[#006056] font-bold border border-[#006056] cursor-help" : "text-gray-600 hover:bg-gray-50"}`}>
                                            {day.getDate()}
                                            {hasBooking && !isToday && <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#006056]"></div>}
                                            {hasBooking && (
                                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 hidden w-48 flex-col gap-1 rounded-lg bg-black/90 p-3 text-[10px] text-white shadow-xl group-hover:flex">
                                                    <div className="flex items-center gap-1.5 font-bold text-yellow-400"><Clock size={10} /> {booking.time}</div>
                                                    <div className="font-semibold truncate">Client Session</div>
                                                    <div className="text-gray-300 capitalize">{booking.type}</div>
                                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-black/90"></div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="mt-8 text-center border-t border-gray-50 pt-6">
                            {nextBooking ? (
                                <div className="inline-flex items-center gap-4 text-left p-3 rounded-xl bg-[#F2FFF2] border border-green-100 w-full">
                                    <div className="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-full bg-white text-[#006056]">
                                        <Video size={18} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-[#004d45]">Upcoming: {nextBooking.type === 'consultation' ? 'Consultation' : 'Mentorship'}</p>
                                        <p className="text-[10px] text-gray-500 truncate">{new Date(nextBooking.date).toLocaleDateString()} • {nextBooking.time}</p>
                                    </div>
                                    <button className="flex-shrink-0 rounded-lg bg-[#004d45] px-3 py-1.5 text-[10px] font-medium text-white hover:bg-[#003a34]">Join Call</button>
                                </div>
                            ) : (
                                <p className="text-xs text-gray-500">No upcoming sessions. Time to relax!</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Client Requests (Pending) */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg text-black">New Requests</h3>
                        <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600">3</span>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4 space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-3 border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-gray-200"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">John Doe</p>
                                        <p className="text-xs text-gray-500">Wants a consultation</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 rounded-lg bg-[#004d45] py-1.5 text-xs font-medium text-white hover:bg-[#003a34]">
                                        Accept
                                    </button>
                                    <button className="flex-1 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                                        Decline
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Status Modal */}
            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onSave={(data) => {
                    const updatedUser = { ...user, ...data };
                    // Dynamically import auth to assume client context
                    import("@/utils/auth").then(({ auth }) => {
                        auth.updateUser(data);
                        window.location.reload();
                    });
                }}
            />
        </div>
    );
}

function ActivityChart({ range }: { range: "7d" | "30d" | "90d" }) {
    // Mock Data based on range
    const mockData = {
        "7d": {
            data: [12, 16, 14, 22, 19, 28, 24],
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
            max: 35
        },
        "30d": {
            data: [45, 32, 55, 48, 62, 58, 75, 68, 80, 72, 65], // Simplified sample
            labels: ["1", "4", "7", "10", "13", "16", "19", "22", "25", "28", "31"],
            max: 100
        },
        "90d": {
            data: [120, 145, 132, 160, 185, 210, 195, 230, 250],
            labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9"],
            max: 300
        }
    };

    const { data, labels: days, max } = mockData[range];

    const height = 180;
    const width = 800;
    const padding = 20;
    const bottomPadding = 30;
    const leftPadding = 40;

    // Helper to map value to Y coordinate
    const getY = (val: number) => {
        return height - bottomPadding - ((val / max) * (height - bottomPadding - padding));
    };

    // Helper to map index to X coordinate
    const getX = (index: number) => {
        return leftPadding + (index * ((width - leftPadding - padding) / (data.length - 1)));
    };

    // Bezier control point calculation for smoothing
    const controlPoint = (current: number[], previous: number[], next: number[], reverse?: boolean) => {
        const p = previous || current;
        const n = next || current;
        const smoothing = 0.2;
        const opposedLine = [n[0] - p[0], n[1] - p[1]];
        const length = Math.sqrt(Math.pow(opposedLine[0], 2) + Math.pow(opposedLine[1], 2));
        const angle = Math.atan2(opposedLine[1], opposedLine[0]) + (reverse ? Math.PI : 0);
        const lengthX = length * smoothing * Math.cos(angle);
        const lengthY = length * smoothing * Math.sin(angle);
        return [current[0] + lengthX, current[1] + lengthY];
    };

    const points = data.map((val, i) => [getX(i), getY(val)]);
    const d = points.reduce((acc, point, i, a) =>
        i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${(() => {
            const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
            const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
        })()
            }`
        , "");

    const areaPath = `${d} L ${width - padding},${height - bottomPadding} L ${leftPadding},${height - bottomPadding} Z`;

    const yAxisTicks = [0, max / 3, max / 1.5, max].map(v => Math.round(v));

    return (
        <div className="h-full w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="appleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#006056" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#006056" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Y-Axis Lines & Labels */}
                {yAxisTicks.map((val) => (
                    <g key={val}>
                        <line
                            x1={leftPadding}
                            y1={getY(val)}
                            x2={width - padding}
                            y2={getY(val)}
                            stroke="#F3F4F6"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                        />
                        <text
                            x={leftPadding - 10}
                            y={getY(val) + 4}
                            textAnchor="end"
                            fontSize="11"
                            fill="#9CA3AF"
                            fontWeight="500"
                        >
                            {val}
                        </text>
                    </g>
                ))}

                {/* Area & Line */}
                <path d={areaPath} fill="url(#appleGradient)" stroke="none" />
                <path d={d} fill="none" stroke="#006056" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                {/* X-Axis Labels */}
                {days.map((day, i) => (
                    <text
                        key={i}
                        x={getX(i)}
                        y={height}
                        textAnchor="middle"
                        fontSize="11"
                        fontWeight="600"
                        fill="#6B7280"
                    >
                        {day}
                    </text>
                ))}

                {/* Interactive Overlay */}
                {data.map((val, i) => (
                    <g key={i} className="group cursor-pointer">
                        {/* Hover Trigger Zone (Wide) */}
                        <rect
                            x={getX(i) - 20}
                            y={0}
                            width="40"
                            height={height}
                            fill="transparent"
                        />

                        {/* Vertical Grid Indicator (appears on hover) */}
                        <line
                            x1={getX(i)}
                            y1={padding}
                            x2={getX(i)}
                            y2={height - bottomPadding}
                            stroke="#006056"
                            strokeWidth="1"
                            strokeDasharray="4 4"
                            className="opacity-0 transition-opacity duration-200 group-hover:opacity-30"
                        />

                        {/* The "Perfect Circle" Point */}
                        <circle
                            cx={getX(i)}
                            cy={getY(val)}
                            r="6"
                            fill="white"
                            stroke="#006056"
                            strokeWidth="3"
                            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 shadow-lg"
                        />

                        {/* Tooltip Label */}
                        <foreignObject
                            x={getX(i) - 40}
                            y={getY(val) - 50}
                            width="80"
                            height="40"
                            className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 overflow-visible"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <div className="bg-gray-900 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-xl translate-y-2">
                                    {val} views
                                </div>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-900 translate-y-2"></div>
                            </div>
                        </foreignObject>
                    </g>
                ))}
            </svg>
        </div>
    );
}
