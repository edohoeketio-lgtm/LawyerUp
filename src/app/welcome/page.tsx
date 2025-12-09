"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PartyPopper } from "lucide-react";

export default function WelcomePage() {
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "";
    const nameDisplay = name ? ` ${name.toUpperCase()}` : "";
    const profileSetupUrl = name ? `/profile-setup?name=${encodeURIComponent(name)}` : "/profile-setup";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
            <div className="max-w-md space-y-6">
                {/* Celebration Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-green-50 p-6">
                        <PartyPopper size={48} className="text-[#013328]" />
                    </div>
                </div>

                <div className="space-y-4">
                    <p className="font-serif text-sm tracking-widest text-[#013328] uppercase">
                        WELCOME{nameDisplay}
                    </p>
                    <h1 className="font-serif text-4xl text-black">
                        🎉 Your Account is Ready!
                    </h1>
                    <p className="font-sans text-sm text-gray-500">
                        We&apos;re excited to have you. You can verify your profile now or explore available lawyers.
                    </p>
                </div>

                <div className="space-y-3 pt-8">
                    <Link
                        href="/"
                        className="block w-full rounded-lg bg-[#013328] py-4 text-sm font-medium text-white transition-all duration-200 hover:bg-[#012a2b] shadow-lg hover:shadow-xl"
                    >
                        Explore LawyerUp
                    </Link>

                    <Link
                        href={profileSetupUrl}
                        className="block w-full rounded-lg py-4 text-sm font-medium text-gray-500 transition-colors hover:text-black hover:bg-gray-50"
                    >
                        Complete my profile
                    </Link>
                </div>
            </div>
        </main>
    );
}
