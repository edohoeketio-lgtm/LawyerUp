"use client";

import Breadcrumbs from "@/components/Breadcrumbs";
import { Bell, Calendar, Lock, Info, CheckCircle2, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useNotifications } from "@/context/NotificationContext";

export default function NotificationsPage() {
    const router = useRouter();
    const { notifications, markAsRead, markAllAsRead } = useNotifications();

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
                <button
                    onClick={markAllAsRead}
                    className="text-sm font-medium text-[#004d45] hover:underline"
                >
                    Mark all as read
                </button>
            </div>

            <div className="space-y-4">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className={`group relative flex gap-4 rounded-xl border p-4 transition-all hover:bg-gray-50 ${notification.unread ? "border-[#004d45]/20 bg-[#F0FDF4]/50" : "border-gray-100 bg-white"
                            }`}
                        onClick={() => {
                            if (notification.link) {
                                markAsRead(notification.id);
                                router.push(notification.link);
                            }
                        }}
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
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                    }}
                                    className="rounded-full p-2 text-gray-400 hover:bg-gray-200 hover:text-gray-600" title="Mark as read">
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
