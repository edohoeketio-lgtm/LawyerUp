"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ClientPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push("/signup");
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-[#F2FFF2] p-4 text-center">
            <div className="space-y-6">
                <p className="font-sans text-xs font-medium tracking-[0.2em] text-gray-500 uppercase">
                    You&apos;re on your way to
                </p>
                <h1 className="font-serif text-6xl text-[#013328]">
                    Get Legal Support
                </h1>
                <div className="flex justify-center pt-8">
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                        <img
                            src="/logo.svg"
                            alt="Lawyer Up Logo"
                            width={60}
                            height={60}
                            className="text-[#013328]"
                        />
                        <span className="font-serif text-sm tracking-widest text-[#013328] uppercase">Lawyer Up</span>
                    </div>
                </div>
            </div>
        </main>
    );
}
