"use client";

import { NAV_ITEMS } from "@/data/navigation";
import { Bell, Calendar, Menu, MessageSquare, Info } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth, User } from "@/utils/auth";
import { getLawyerById } from "@/data/lawyers";
import { useNotifications } from "@/context/NotificationContext";

interface TopBarProps {
    onMenuClick?: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "client";

    // Notification State
    const [showNotifications, setShowNotifications] = useState(false);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
    // Use first 4 notifications for the dropdown
    const recentNotifications = notifications.slice(0, 4);

    const [user, setUser] = useState<User | null>(null);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Initial load
        setUser(auth.getSession());

        // Listen for updates
        const handleAuthChange = () => {
            setUser(auth.getSession());
        };
        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    // Find active nav item
    const activeItem = NAV_ITEMS.find(item => pathname === item.href) ||
        NAV_ITEMS.find(item => item.label === "Discover" && pathname?.startsWith("/dashboard/lawyer"));

    const title = activeItem ? activeItem.label : "Overview";
    const iconSrc = activeItem ? activeItem.iconSrc : "/icons/home.svg";

    const setView = (view: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", view);
        router.push(`?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E4E7EC] bg-white px-4 md:px-8">
            <div className="flex items-center gap-3">
                <button onClick={onMenuClick} className="mr-2 text-black md:hidden">
                    <Menu size={24} />
                </button>
                <div className="flex items-center justify-center">
                    <Image
                        src={iconSrc}
                        alt={title}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain brightness-0"
                    />
                </div>
                <h1 className="font-serif text-xl font-medium text-black">
                    {title === "Overview" && user ? `Hello, ${user.firstName}` : title}
                </h1>
            </div>

            {/* Toggle removed as per user request */}

            <div className="flex items-center gap-4">
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className={`relative rounded-full p-2 transition-colors ${showNotifications ? "bg-gray-200 text-black" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        <Bell size={20} />
                        {mounted && unreadCount > 0 && (
                            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                        )}
                    </button>

                    {/* Notification Dropdown */}
                    {showNotifications && (
                        <>
                            <div
                                className="fixed inset-0 z-40"
                                onClick={() => setShowNotifications(false)}
                            ></div>
                            <div className="absolute right-0 top-full mt-2 z-50 w-80 rounded-xl border border-gray-100 bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95 duration-200">
                                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                                    <h3 className="font-serif text-sm font-bold text-black">Notifications</h3>
                                    <button onClick={markAllAsRead} className="text-xs text-[#004d45] hover:underline">Mark all as read</button>
                                </div>
                                <div className="max-h-[320px] overflow-y-auto py-2">
                                    {recentNotifications.map((notification) => (
                                        <div
                                            key={notification.id}
                                            className="relative flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer group"
                                            onClick={() => {
                                                if (notification.link) {
                                                    markAsRead(notification.id);
                                                    router.push(notification.link);
                                                    setShowNotifications(false);
                                                }
                                            }}
                                        >
                                            <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${notification.type === 'booking' ? 'bg-green-50 text-green-600' :
                                                notification.type === 'message' ? 'bg-blue-50 text-blue-600' :
                                                    'bg-yellow-50 text-yellow-600'
                                                }`}>
                                                {notification.type === 'booking' && <Calendar size={14} />}
                                                {notification.type === 'message' && <MessageSquare size={14} />}
                                                {notification.type === 'system' && <Info size={14} />}
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <p className={`text-sm leading-snug ${notification.unread ? 'font-medium text-black' : 'text-gray-600'}`}>
                                                    {notification.text}
                                                </p>
                                                <p className="text-xs text-gray-400">{notification.time}</p>
                                            </div>
                                            {notification.unread && (
                                                <div className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-500"></div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-100 px-4 py-2 text-center">
                                    <Link
                                        href="/dashboard/notifications"
                                        className="text-xs font-medium text-gray-500 hover:text-black"
                                        onClick={() => setShowNotifications(false)}
                                    >
                                        View all notifications
                                    </Link>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {!pathname?.startsWith("/dashboard/lawyer/") && pathname !== "/dashboard/discover" && (
                    <Link
                        href={`/dashboard/discover?view=${currentView}`}
                        className="hidden items-center gap-2 rounded-lg bg-[#013328] px-4 py-2 text-sm font-medium text-white hover:bg-[#012a2b] md:flex"
                    >
                        <Calendar size={18} />
                        Book a session
                    </Link>
                )}
            </div>
        </header>
    );
}
