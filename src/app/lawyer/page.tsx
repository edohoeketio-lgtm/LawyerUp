"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LawyerPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white p-4 text-center">
            <div className="max-w-md space-y-6">
                <h1 className="font-serif text-5xl text-black">
                    Join as a Lawyer
                </h1>
                <p className="font-sans text-sm text-gray-600">
                    Connect with clients and grow your practice.
                </p>

                <div className="flex justify-center pt-8">
                    <Link href="/" className="flex items-center gap-2 text-sm text-[#013328] hover:underline">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>
            </div>
        </main>
    );
}
