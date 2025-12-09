"use client";

import Link from "next/link";
import { PartyPopper } from "lucide-react";

export default function WelcomePage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[#F2FFF2] p-4 text-center">
            <div className="w-full max-w-md space-y-8">
                <div className="space-y-4">
                    <p className="font-sans text-xs font-bold tracking-widest text-gray-500 uppercase">
                        Welcome Nsikan
                    </p>

                    <div className="flex flex-col items-center justify-center gap-2">
                        <div className="flex items-center justify-center gap-3">
                            <span className="text-4xl">🎉</span>
                            <h1 className="font-serif text-4xl text-[#013328]">
                                Your Account is Ready!
                            </h1>
                        </div>
                        <p className="font-sans text-sm text-gray-600 max-w-sm mx-auto">
                            You’re all set to connect with top legal minds. What’s next?
                        </p>
                    </div>
                </div>

                <div className="space-y-3 pt-4">
                    <Link
                        href="/"
                        className="block w-full rounded-lg bg-[#013328] py-4 text-sm font-medium text-white shadow-lg transition-all hover:bg-[#012a2b] hover:shadow-xl"
                    >
                        Explore Lawyer Up
                    </Link>

                    <Link
                        href="/profile-setup"
                        className="block w-full rounded-lg border border-transparent py-4 text-sm font-medium text-[#013328] transition-colors hover:bg-[#013328]/5"
                    >
                        Complete my profile
                    </Link>
                </div>
            </div>
        </main>
    );
}
