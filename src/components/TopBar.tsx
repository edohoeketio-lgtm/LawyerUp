"use client";

import { Bell, Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

export default function TopBar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "client";

    const setView = (view: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("view", view);
        router.push(`?${params.toString()}`);
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E4E7EC] bg-white px-8">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <Image
                        src="/icons/home_icon.png"
                        alt="Home"
                        width={24}
                        height={24}
                        className="h-6 w-6 object-contain"
                    />
                </div>
                <h1 className="font-serif text-xl font-medium text-black">Home</h1>
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
                <button className="flex items-center gap-2 rounded-lg bg-[#013328] px-4 py-2 text-sm font-medium text-white hover:bg-[#012a2b]">
                    <Calendar size={18} />
                    Book a session
                </button>
            </div>
        </header>
    );
}
