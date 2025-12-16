
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Check, ArrowRight, Clock, Video, X, Briefcase, Users, DollarSign, ChevronDown, ChevronLeft, ChevronRight, Calendar as CalendarIcon, AlertCircle, Eye } from "lucide-react";
import { bookings, getBookingLawyer } from "@/data/bookings";
import { useToast } from "@/context/ToastContext";
import StatusModal from "@/components/profile/StatusModal";
import RequestDetailsModal from "@/components/dashboard/RequestDetailsModal";
import { auth, User } from "@/utils/auth";

export default function LawyerDashboard({ user: initialUser }: { user: User | null }) {
    const [user, setUser] = useState<User | null>(initialUser);
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

    // Request Modal State
    const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState<any>(null);

    // Rich Mock Data for Requests
    const clientRequests = [
        {
            id: "REQ-001",
            name: "John Doe",
            type: "Consultation",
            category: "Corporate Law",
            date: "Tomorrow, 2:00 PM",
            clientType: "Corporate",
            location: "Lagos, Nigeria",
            message: "We are looking to incorporate a new subsidiary and need advice on the regulatory requirements and tax implications for a tech entity."
        },
        {
            id: "REQ-002",
            name: "Sarah Smith",
            type: "Mentorship",
            category: "Career Advice",
            date: "Fri, 10:00 AM",
            clientType: "Individual",
            location: "Abuja, Nigeria",
            message: "I am a law student in my final year and would love to get some guidance on specializing in intellectual property law."
        },
        {
            id: "REQ-003",
            name: "Mike Johnson",
            type: "Case Review",
            category: "Property Law",
            date: "Mon, 11:30 AM",
            clientType: "Individual",
            location: "Lekki, Lagos",
            message: "I need someone to review a lease agreement for a commercial property. There are some clauses I am unsure about regarding liability."
        }
    ];

    const handleViewRequest = (request: any) => {
        setSelectedRequest(request);
        setIsRequestModalOpen(true);
    };

    const handleAcceptRequest = (id: string) => {
        setIsRequestModalOpen(false);
        success("Request accepted! Setup meeting link sent.");
    };

    const handleDeclineRequest = (id: string) => {
        setIsRequestModalOpen(false);
        success("Request declined.");
    };

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
        return `${start.toLocaleDateString('en-GB', options)} - ${end.toLocaleDateString('en-GB', options)} `;
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
                        {greeting}, {user ? `Barr.${user.lastName} ` : "Counsel"}
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
                        {user.customStatus ? (
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
                        ) : (
                            <button
                                onClick={() => setIsStatusModalOpen(true)}
                                className="hidden md:flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700 border border-green-200 mr-2 hover:bg-green-100 transition-colors cursor-pointer"
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-green-600 animate-pulse"></div>
                                <span className="font-medium">Available</span>
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Profile Completion Card */}
            {showProfileCard && (() => {
                const hasBarVerification = user?.verificationStatus === "verified";
                const hasServices = user?.services && user?.services.length > 0;
                const hasPayout = false; // Mock status

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
                        done: hasPayout,
                        label: "Connect Payout Account",
                        subtext: "Receive earnings directly to your bank",
                        action: () => success("Redirecting to secure banking portal...")
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
                                    style={{ width: `${percentComplete}% ` }}
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

            {/* Row 1: Business Overview (Earnings & Active Requests) */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Earnings Hero Card */}
                {/* Earnings Card (Compressed to 1 Col) */}
                <div className="rounded-xl bg-[#004d45] p-6 text-white shadow-lg relative overflow-hidden group flex flex-col justify-between min-h-[300px]">
                    {/* Decorative Background Texture */}
                    <div className="absolute top-0 right-0 p-24 bg-[#006056] rounded-full -mr-12 -mt-12 opacity-50 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="absolute bottom-0 left-0 w-full h-24 opacity-20 pointer-events-none">
                        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full text-emerald-400 fill-current">
                            <path d="M0 100 V 60 Q 30 40 50 70 T 100 50 V 100 H 0 Z" />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        <p className="text-sm font-medium text-emerald-100 flex items-center gap-2">
                            <DollarSign size={16} /> Total Earnings
                        </p>
                        <h3 className="text-3xl font-serif font-bold mt-2">₦150,000</h3>
                        <p className="text-xs text-emerald-200 mt-1">Available: <span className="text-white font-bold">₦45,000</span></p>

                        <div className="mt-4 space-y-3">
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-emerald-200">This Month</span>
                                <span className="font-bold">₦45,000</span>
                            </div>
                            <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                                <span className="text-emerald-200">Pending</span>
                                <span className="font-bold">₦12,500</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-emerald-200">Growth</span>
                                <span className="font-bold text-emerald-300 flex items-center gap-1">
                                    <span className="text-[10px]">▲</span> 12.5%
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => success("Withdrawal initiated!")}
                        className="relative z-10 w-full mt-6 bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/10 transition-colors flex items-center justify-center gap-2"
                    >
                        Withdraw Funds <ArrowRight size={14} />
                    </button>
                </div>

                {/* Active Requests (Leads) */}
                {/* Active Requests (Expanded to 2 Cols) */}
                <div className="lg:col-span-2 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <h3 className="font-serif text-lg text-black">New Requests</h3>
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-bold text-red-600 animate-pulse">3 PENDING</span>
                        </div>
                        <Link href="/dashboard/bookings" className="text-xs font-medium text-gray-500 hover:text-black">View All</Link>
                    </div>

                    <div className="flex-1 rounded-xl border border-gray-100 bg-white shadow-sm p-4 overflow-y-auto min-h-[300px]">
                        {clientRequests.map((req, i) => (
                            <div key={i} className="group relative flex items-start gap-4 border-b border-gray-50 pb-4 last:border-0 last:pb-0 mb-4 last:mb-0 hover:bg-gray-50/50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className="h-12 w-12 flex-shrink-0 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-lg">
                                    {req.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                {req.name}
                                                <span className="text-[10px] font-normal text-gray-400">• {req.date}</span>
                                            </p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded-md border border-gray-200">{req.category}</span>
                                                <span className="text-[10px] text-gray-400">• {req.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2 line-clamp-1 pr-4">"{req.message}"</p>

                                    <div className="flex gap-3 mt-3">
                                        <button
                                            onClick={() => handleViewRequest(req)}
                                            className="px-4 py-1.5 rounded-lg bg-[#004d45] text-xs font-bold text-white hover:bg-[#003a34] transition-colors"
                                        >
                                            View Details
                                        </button>
                                        <button
                                            onClick={() => handleDeclineRequest(req.id)}
                                            className="px-4 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-white hover:border-red-200 hover:text-red-600 transition-colors"
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Row 2: Calendar (The Work) */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="font-serif text-lg text-black">Upcoming Sessions</h3>
                        <p className="text-xs text-gray-500">Manage your schedule</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard/bookings" className="text-xs font-medium text-gray-500 hover:text-black mr-4">View All</Link>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                            <button onClick={() => navigateCalendar('prev')} className="rounded-md p-1 hover:bg-white hover:shadow-sm transition-all"><ChevronLeft size={16} /></button>
                            <span className="text-xs font-medium min-w-[120px] text-center">{formatDateRange(currentDate, calendarView)}</span>
                            <button onClick={() => navigateCalendar('next')} className="rounded-md p-1 hover:bg-white hover:shadow-sm transition-all"><ChevronRight size={16} /></button>
                        </div>
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
                        const isCurrentMonth = day.getMonth() === currentDate.getMonth();

                        return (
                            <div key={i} className={`flex flex-col items-center space-y-1 ${!isCurrentMonth && calendarView === 'month' ? "opacity-30" : ""}`}>
                                <div className={`group relative flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-all cursor-default ${isToday ? "bg-[#004d45] text-white shadow-md transform scale-105" : hasBooking ? "bg-[#E6F0EE] text-[#006056] font-bold border border-[#006056] cursor-help" : "text-gray-600 hover:bg-gray-50"}`}>
                                    {day.getDate()}
                                    {hasBooking && !isToday && <div className="absolute -bottom-1 h-1 w-1 rounded-full bg-[#006056]"></div>}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Row 3: Growth & Quick Actions */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Mini Metrics */}
                <div className="space-y-4">
                    <div className="rounded-xl border border-gray-100 bg-white p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-medium">Profile Views (30d)</p>
                            <h4 className="text-2xl font-bold text-gray-900 mt-1">1,240</h4>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-100 bg-white p-5 flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500 font-medium">R.E.P. Score</p>
                            <h4 className="text-2xl font-bold text-gray-900 mt-1">4.9/5</h4>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                            <Check size={20} />
                        </div>
                    </div>
                    {/* Condensed Quick Actions */}
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => router.push('/dashboard/account?tab=services')}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-md group"
                        >
                            <Briefcase size={20} className="text-gray-400 group-hover:text-[#006056]" />
                            <span className="text-xs font-bold text-gray-700">Services</span>
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin} /dashboard/lawyer / ${user?.id} `);
                                success("Link copied!");
                            }}
                            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-md group"
                        >
                            <Users size={20} className="text-gray-400 group-hover:text-[#006056]" />
                            <span className="text-xs font-bold text-gray-700">Share</span>
                        </button>
                    </div>
                </div>

                {/* Chart (Demoted to 2/3 width) */}
                <div className="lg:col-span-2 rounded-xl border border-gray-100 bg-white p-6 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-gray-900">Traffic History</h3>
                        <div className="flex items-center gap-2">
                            {(Object.keys(rangeLabels) as Array<keyof typeof rangeLabels>).map((range) => (
                                <button
                                    key={range}
                                    onClick={() => setTimeRange(range)}
                                    className={`text-xs px-2 py-1 rounded-md transition-colors ${timeRange === range ? "bg-[#004d45] text-white" : "text-gray-500 hover:bg-gray-100"}`}
                                >
                                    {range}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-48 w-full">
                        <ActivityChart range={timeRange} />
                    </div>
                </div>
            </div>

            {/* Status Modal */}
            <StatusModal
                isOpen={isStatusModalOpen}
                onClose={() => setIsStatusModalOpen(false)}
                onSave={(data) => {
                    if (user) {
                        const updatedUser = { ...user, ...data };
                        auth.updateUser(data);
                        setUser(updatedUser);
                    }
                    setIsStatusModalOpen(false);
                    success("Status updated successfully");
                }}
            />

            {/* Request Details Modal */}
            <RequestDetailsModal
                isOpen={isRequestModalOpen}
                onClose={() => setIsRequestModalOpen(false)}
                request={selectedRequest}
                onAccept={handleAcceptRequest}
                onDecline={handleDeclineRequest}
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
        i === 0 ? `M ${point[0]},${point[1]} ` : `${acc} ${(() => {
            const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point);
            const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true);
            return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`;
        })()
            } `
        , "");

    const areaPath = `${d} L ${width - padding},${height - bottomPadding} L ${leftPadding},${height - bottomPadding} Z`;

    const yAxisTicks = [0, max / 3, max / 1.5, max].map(v => Math.round(v));

    return (
        <div className="h-full w-full">
            <svg viewBox={`0 0 ${width} ${height} `} className="h-full w-full overflow-visible" preserveAspectRatio="none">
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
