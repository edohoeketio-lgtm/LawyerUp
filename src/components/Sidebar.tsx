"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { iconSrc: "/icons/home.svg", label: "Home", href: "/dashboard" },
        { iconSrc: "/icons/discover.svg", label: "Discover", href: "/dashboard/discover" },
        { iconSrc: "/icons/forum.svg", label: "Forum", href: "/dashboard/forum" },
        { iconSrc: "/icons/bookings.svg", label: "Bookings", href: "/dashboard/bookings" },
        { iconSrc: "/icons/bookmarks.svg", label: "Bookmarks", href: "/dashboard/bookmarks" },
        { iconSrc: "/icons/account.svg", label: "Account", href: "/dashboard/account" },
    ];

    return (
        <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[#E4E7EC] bg-[#013328] text-white transition-transform">
            {/* Logo */}
            <div className="flex h-16 items-center" style={{ paddingLeft: "23px" }}>
                <Image
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
                    let isActive = pathname === item.href;

                    // Special case: Keep "Discover" active when viewing a lawyer profile
                    if (item.label === "Discover" && pathname?.startsWith("/dashboard/lawyer/")) {
                        isActive = true;
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white hover:bg-white/5"
                                }`}
                        >
                            <Image
                                src={item.iconSrc}
                                alt={item.label}
                                width={20}
                                height={20}
                                className="h-5 w-5 object-contain"
                            />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Card */}
            <div className="p-4">
                <div className="relative overflow-hidden rounded-2xl bg-[#022c22] p-5 shadow-lg">
                    {/* Background Element */}
                    <div className="absolute right-0 top-0 h-24 w-24 opacity-40 mix-blend-multiply relative">
                        <Image src="/icons/sidebar-card-bg.png" alt="" fill className="object-contain object-top-right" />
                    </div>

                    <div className="relative z-10 mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                        <Image src="/icons/welcome_card.jpg" alt="" width={24} height={24} className="h-6 w-6 object-contain" />
                    </div>

                    <h3 className="relative z-10 mb-2 font-serif text-lg font-medium text-white">Welcome</h3>
                    <p className="relative z-10 mb-6 text-sm leading-relaxed text-gray-300">
                        Get to know your Lawyer Up Dashboard with our short walkthrough course.
                    </p>

                    <div className="relative z-10 flex items-center gap-6">
                        <button className="text-sm font-bold text-[#9FFF6F] hover:text-[#b4ff8f] hover:underline">
                            Start Tutorial
                        </button>
                        <button className="text-sm font-medium text-gray-400 hover:text-white">
                            Close
                        </button>
                    </div>
                </div>
            </div>

            {/* User Profile Snippet (Bottom) */}
            <div className="mt-auto border-t border-white/10 p-4">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 flex-shrink-0">
                        <Image
                            src="/avatars/user_dp.png"
                            alt="User"
                            fill
                            className="rounded-full object-cover"
                        />
                        <div
                            className={`absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-[#013328] ${true ? "bg-green-500" : "bg-red-500"}`} // Toggle true/false here to test
                        ></div>
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
