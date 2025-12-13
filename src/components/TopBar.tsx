"use client";

import { Bell, Calendar } from "lucide-react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function TopBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "client";

    const isDiscover = pathname === "/dashboard/discover" || pathname?.startsWith("/dashboard/lawyer");
    const title = isDiscover ? "Discover" : "Home";
    const iconSrc = isDiscover ? "/icons/discover.svg" : "/icons/home.svg";

    const setView = (view: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", view);
        router.push(`?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E4E7EC] bg-white px-8">
            <div className="flex items-center gap-3">
                <div className="flex items-center justify-center">
                    <Image
                        src={iconSrc}
                        alt={title}
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain brightness-0"
                    />
                </div>
                <h1 className="font-serif text-xl font-medium text-black">{title}</h1>
            </div>

            <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-1">
                <button
                    onClick={() => setView("client")}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${currentView === "client"
                        ? "bg-white text-[#013328] shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                >
                    Legal advice
                </button>
                <button
                    onClick={() => setView("lawyer")}
                    className={`rounded-md px-4 py-1.5 text-sm font-medium transition-all ${currentView === "lawyer"
                        ? "bg-white text-[#013328] shadow-sm ring-1 ring-gray-200"
                        : "text-gray-500 hover:text-gray-900"
                        }`}
                >
                    Mentorship
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button className="relative rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200">
                    <Bell size={20} />
                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>
                {!pathname?.startsWith("/dashboard/lawyer/") && pathname !== "/dashboard/discover" && (
                    <Link
                        href="/dashboard/discover"
                        className="flex items-center gap-2 rounded-lg bg-[#013328] px-4 py-2 text-sm font-medium text-white hover:bg-[#012a2b]"
                    >
                        <Calendar size={18} />
                        Book a session
                    </Link>
                )}
            </div>
        </header>
    );
}
