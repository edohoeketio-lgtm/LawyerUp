"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ChevronLeft } from "lucide-react";
import VerificationForm from "@/components/lawyer/VerificationForm";
import { auth, User } from "@/utils/auth";

export default function VerificationPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const currentUser = auth.getSession();
        if (!currentUser) {
            router.push("/login");
            return;
        }
        if (currentUser.role !== "lawyer") {
            router.push("/dashboard");
            return;
        }
        setUser(currentUser);
    }, [router]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Header */}
            <header className="bg-[#013328] text-white">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <Link href="/dashboard" className="flex items-center gap-2 text-white/80 hover:text-white">
                        <ChevronLeft size={20} />
                        <span className="text-sm font-medium">Back to dashboard</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="relative h-8 w-32">
                            <Image
                                src="/logo_original.png"
                                alt="LawyerUp"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </div>
                    <div className="w-20"></div> {/* Spacer for center alignment */}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 py-12 px-4 sm:px-6">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E6F0EE] text-[#006056]">
                            <ShieldCheck size={32} />
                        </div>
                        <h1 className="text-3xl font-serif font-medium text-gray-900">Verify your Profile</h1>
                        <p className="mt-2 text-gray-600">
                            To ensure trust and safety in our community, we need to verify your Bar membership.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                        <div className="border-b border-gray-100 bg-gray-50/50 px-8 py-4">
                            <div className="flex items-center gap-3">
                                <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                                <span className="text-sm font-medium text-gray-600">Verification Pending</span>
                            </div>
                        </div>
                        <div className="p-8">
                            <VerificationForm user={user} />
                        </div>
                    </div>

                    <p className="mt-8 text-center text-xs text-gray-400">
                        By submitting your information, you agree to our Terms of Service and Privacy Policy.
                        Your ID will be securely stored and only used for verification.
                    </p>
                </div>
            </main>
        </div>
    );
}
