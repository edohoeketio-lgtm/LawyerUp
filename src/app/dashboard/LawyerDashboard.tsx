"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "@/utils/auth";
import { Check, ArrowRight, Clock, Video, X, Briefcase, Users, DollarSign } from "lucide-react";
import { bookings } from "@/data/bookings";

export default function LawyerDashboard({ user }: { user: User | null }) {
    const [greeting, setGreeting] = useState("Good morning");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting("Good Morning");
        else if (hour < 18) setGreeting("Good Afternoon");
        else setGreeting("Good Evening");
    }, []);

    // Mock Stats
    const stats = [
        { label: "Pending Requests", value: "3", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
        { label: "Upcoming Sessions", value: "5", icon: Clock, color: "text-orange-600", bg: "bg-orange-50" },
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

            <div className="grid gap-8 lg:grid-cols-3">
                {/* Upcoming Sessions (List View) */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-lg text-black">Upcoming Sessions</h3>
                        <Link href="/dashboard/bookings" className="text-xs font-medium text-gray-500 hover:text-black">View all</Link>
                    </div>

                    <div className="rounded-xl border border-gray-100 bg-white shadow-sm overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-gray-50 p-4 last:border-0 hover:bg-gray-50">
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
