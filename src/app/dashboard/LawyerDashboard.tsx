"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/utils/auth";
import { Check, ArrowRight, Clock, Video, X, Briefcase, Users, DollarSign } from "lucide-react";
import { bookings } from "@/data/bookings";
import { useToast } from "@/context/ToastContext";

export default function LawyerDashboard({ user }: { user: User | null }) {
    const [greeting, setGreeting] = useState("Good morning");
    const { success } = useToast();

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    // Mock Stats - "Practice Health"
    const stats = [
        { label: "Profile Views (30d)", value: "124", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "R.E.P. Score", value: "4.9/5.0", icon: Check, color: "text-purple-600", bg: "bg-purple-50" },
        { label: "Total Earnings", value: "₦150k", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
    ];

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
                    <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-800 border border-green-100">
                        <Check size={16} />
                        <span>Verified Account</span>
                    </div>
                )}
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                        <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    </div>
                ))}
            </div>

            {/* Analytics & Actions Grid */}
            <div className="grid gap-8 lg:grid-cols-2">
                {/* Analytics Chart */}
                <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-base font-bold text-black">Profile Activity</h3>
                            <div className="flex items-center gap-2 mt-1">
                                <h2 className="text-2xl font-bold text-gray-900">135 <span className="text-sm font-medium text-gray-500">views</span></h2>
                                <div className="flex items-center gap-1 text-xs text-[#006056] font-bold bg-[#E6F0EE] px-2 py-0.5 rounded-full">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                                        <polyline points="17 6 23 6 23 12"></polyline>
                                    </svg>
                                    12.5%
                                </div>
                            </div>
                        </div>
                        <button className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            Last 7 Days
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </button>
                    </div>

                    <div className="h-48 w-full">
                        <ActivityChart />
                    </div>
                </div>

                {/* Quick Actions - Stacked */}
                <div className="flex flex-col gap-4 justify-between h-full">
                    <button
                        onClick={() => document.getElementById("edit-profile-trigger")?.click() || window.dispatchEvent(new CustomEvent('open-edit-profile'))}
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

                    <div className="flex flex-1 items-center justify-between rounded-xl border border-gray-200 bg-gray-50 p-5 opacity-75 cursor-not-allowed items-center">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-gray-400">
                                <Clock size={22} />
                            </div>
                            <div className="text-left">
                                <h4 className="font-bold text-base text-gray-500">Availability</h4>
                                <p className="text-sm text-gray-400">Coming soon</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Upcoming Sessions (List View) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg text-black">Upcoming Sessions</h3>
                        <Link href="/dashboard/bookings" className="text-xs font-medium text-gray-500 hover:text-black">View all</Link>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-50 p-4 last:border-0 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-lg bg-[#E6F0EE] text-[#006056] text-xs font-bold">
                                        <span>12</span>
                                        <span>DEC</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900">Consultation with Client {i}</h4>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <Clock size={12} /> 10:00 AM • 45 mins
                                        </div>
                                    </div>
                                </div>
                                <button className="rounded-lg bg-[#004d45] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003a34]">
                                    Join Call
                                </button>
                            </div>
                        ))}
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
        </div>
    );
}

function ActivityChart() {
    // Smoother Mock Data
    const data = [12, 16, 14, 22, 19, 28, 24];
    const max = 35; // Fixed max for cleaner look
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const height = 180;
    const width = 800;
    const padding = 20;
    const bottomPadding = 30;
    const leftPadding = 40; // Added space for Y-axis labels

    const getY = (val: number) => height - bottomPadding - ((val / max) * (height - bottomPadding - padding));
    const getX = (index: number) => leftPadding + (index * ((width - leftPadding - padding) / (data.length - 1)));

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

    return (
        <div className="h-full w-full">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full overflow-visible" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="appleGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#006056" stopOpacity="0.15" />
                        <stop offset="100%" stopColor="#006056" stopOpacity="0" />
                    </linearGradient>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                    </filter>
                </defs>

                {/* Y-Axis Lines & Labels */}
                {[0, 10, 20, 30].map((val) => (
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
