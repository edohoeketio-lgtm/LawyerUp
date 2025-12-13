"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Bell, Calendar, Lock, Info, CheckCircle2, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function NotificationsPage() {
    // Mock Notifications - Expanded List
    const notifications = [
        {
            id: 1,
            type: 'booking',
            text: "Upcoming Session: 'Landlord Dispute' starts in 1 hour",
            time: "Just now",
            unread: true,
            detail: "Prepare your documents for the session with Barr. Sarah Jenkins."
        },
        {
            id: 2,
            type: 'message',
            text: "New message from Barr. Sarah James regarding your case",
            time: "25 mins ago",
            unread: true,
            detail: "Sarah: 'Please review the attached contract draft when you have a moment.'"
        },
        {
            id: 3,
            type: 'system',
            text: "Payment successful for session with Adv. Michael",
            time: "2 hours ago",
            unread: false,
            detail: "Transaction ID: #TXN-8842-221. Amount: $120.00"
        },
        {
            id: 4,
            type: 'system',
            text: "Action Required: Verify your email to enable video calls",
            time: "1 day ago",
            unread: false,
            detail: "We need to verify your email address (john@example.com) to ensure secure communications."
        },
        {
            id: 5,
            type: 'security',
            text: "New login attempt detected",
            time: "2 days ago",
            unread: false,
            detail: "We detected a login from a new device (MacBook Pro) in London, UK."
        },
        {
            id: 6,
            type: 'system',
            text: "Your profile is 80% complete",
            time: "3 days ago",
            unread: false,
            detail: "Add your legal interests to get better recommendations."
        }
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'booking': return <Calendar className="text-green-600" size={20} />;
            case 'message': return <MessageSquare className="text-blue-600" size={20} />;
            case 'security': return <Lock className="text-red-500" size={20} />;
            default: return <Info className="text-yellow-600" size={20} />;
        }
    };

    const getBgColor = (type: string) => {
        switch (type) {
            case 'booking': return "bg-green-50";
            case 'message': return "bg-blue-50";
            case 'security': return "bg-red-50";
            default: return "bg-yellow-50";
        }
    };

    return (
        <div className="max-w-[800px]">
            <Breadcrumbs
                items={[
                    { label: "Dashboard", href: "/dashboard" },
                    { label: "Notifications" }
                ]}
            />

            <div className="mb-6 flex items-center justify-between">
                <h1 className="font-serif text-2xl font-bold text-black">Notifications</h1>
                <button className="text-sm font-medium text-[#004d45] hover:underline">
                    Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`group relative flex gap-4 rounded-xl border p-4 transition-all hover:bg-gray-50 ${notification.unread ? "border-[#004d45]/20 bg-[#F0FDF4]/50" : "border-gray-100 bg-white"
                            }`}
                    >
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${getBgColor(notification.type)}`}>
                            {getIcon(notification.type)}
                        </div>

                        <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                                <h3 className={`text-base ${notification.unread ? "font-bold text-black" : "font-medium text-gray-900"}`}>
                                    {notification.text}
                                </h3>
                                <span className="text-xs text-gray-400 whitespace-nowrap">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                                {notification.detail}
                            </p>
                        </div>

                        {notification.unread && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600" title="Mark as read">
                                    <CheckCircle2 size={18} />
                                </button>
                            </div>
                        )}

                        {notification.unread && (
                            <div className="absolute right-4 top-4 h-2 w-2 rounded-full bg-blue-500 lg:hidden"></div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-xs text-gray-400">Showing last 30 days of activity</p>
            </div>
        </div>
    );
}
