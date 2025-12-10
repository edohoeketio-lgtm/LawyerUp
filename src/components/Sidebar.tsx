"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { iconSrc: "/icons/home.png", label: "Home", href: "/dashboard" },
        { iconSrc: "/icons/bookmarks.png", label: "Discover", href: "/dashboard/discover" },
        { iconSrc: "/icons/account.png", label: "Forum", href: "/dashboard/forum" },
        { iconSrc: "/icons/forum.png", label: "Bookings", href: "/dashboard/bookings" },
        { iconSrc: "/icons/bookings.png", label: "Bookmarks", href: "/dashboard/bookmarks" },
        { iconSrc: "/icons/discover.png", label: "Account", href: "/dashboard/account" },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#E4E7EC] bg-[#013328] text-white transition-transform">
            {/* Logo */}
            <div className="flex h-16 items-center" style={{ paddingLeft: "23px" }}>
                <img
                    src="/logo_original.png"
                    alt="LawyerUp"
                    width={115}
                    height={40}
                    className="object-contain"
                />
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 px-3 py-6">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white hover:bg-white/5"
                                }`}
                        >
                            {item.iconSrc ? (
                                <img
                                    src={item.iconSrc}
                                    alt={item.label}
                                    className="h-5 w-5 object-contain"
                                />
                            ) : (
                                <item.icon className="h-5 w-5" />
                            )}
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Card */}
            <div className="p-4">
                <div className="rounded-xl bg-white/5 p-4">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
                        <img src="/icons/welcome_card.jpg" alt="" className="h-6 w-6 object-contain" />
                    </div>
                    <h3 className="mb-1 font-serif text-sm font-medium text-white">Welcome</h3>
                    <p className="mb-3 text-xs text-gray-400">
                        Get to know your Lawyer Up Dashboard with our short walkthrough course.
                    </p>
                    <div className="flex items-center justify-between">
                        <button className="text-xs font-medium text-[#c0f0bf] hover:underline">
                            Start Tutorial
                        </button>
                        <button className="text-xs text-gray-500 hover:text-gray-400">
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* User Profile Snippet (Bottom) */}
            <div className="mt-auto border-t border-white/10 p-4">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-white/10 p-1">
                        <img src="/avatars/user_placeholder.png" alt="User" className="h-full w-full rounded-full object-cover" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-white">Nsikan Etukudoh</p>
                        <p className="truncate text-xs text-gray-400">nsikan@lawyer.up</p>
                    </div>
                    <Link href="/logout" className="text-gray-400 hover:text-white">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
