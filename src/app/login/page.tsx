"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-md space-y-8 text-center">
                <h1 className="font-serif text-4xl text-black">Welcome Back</h1>
                <p className="font-sans text-sm text-gray-500">
                    Sign in to your Lawyer Up account
                </p>

                <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
                    <p className="text-gray-400 italic">Login form placeholder</p>
                </div>

                <div className="mt-8">
                    <Link href="/signup" className="flex items-center justify-center gap-2 text-sm text-[#013328] hover:underline">
                        <ArrowLeft size={16} /> Back to Sign Up
                    </Link>
                </div>
            </div>
        </main>
    );
}
