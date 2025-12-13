"use client";

import Link from "next/link";
import { ChevronDown, Map } from "lucide-react";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allCountries } from "@/data/countries";
import { auth } from "@/utils/auth";

export default function ProfileSetupClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get("name") || "Guest";
    const [formData, setFormData] = useState({
        country: "Nigeria",
        language: "English",
        timezone: "GMT (Greenwich Mean Time)",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleComplete = () => {
        if (typeof window !== "undefined") {
            const currentUser = auth.getSession();
            if (currentUser) {
                auth.updateUser({
                    location: formData.country,
                    languages: [formData.language],
                    timezone: formData.timezone
                });
            }
        }
        router.push("/dashboard");
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="font-serif text-3xl text-black">Set up your profile</h1>
                    <Link href="/dashboard" className="text-sm font-medium text-[#013328] hover:underline">
                        Skip for now
                    </Link>
                </div>

                <p className="font-sans text-sm text-gray-500">
                    Complete your profile to connect with the right legal experts—just a few more details!
                </p>

                {/* User Card */}
                <div className="flex items-center gap-4 py-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A2BE2] text-white font-medium text-lg">
                        {name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-serif text-lg text-black">{name}</h3>
                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            I need Legal help
                        </span>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-medium text-gray-500">
                                Country
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <Map size={18} />
                                </div>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 pl-12 pr-10 text-sm outline-none focus:border-[#013328]"
                                >
                                    {allCountries.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                            </div>
                        </div>


                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Preferred Language
                        </label>
                        <div className="relative">
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#013328]"
                            >
                                <option>English</option>
                                <option>French</option>
                                <option>Spanish</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Time zone
                        </label>
                        <div className="relative">
                            <select
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-3 px-4 text-sm outline-none focus:border-[#013328]"
                            >
                                <option>GMT (Greenwich Mean Time)</option>
                                <option>WAT (West Africa Time)</option>
                                <option>EST (Eastern Standard Time)</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleComplete}
                        className="w-full rounded-lg bg-[#013328] py-3 text-sm font-medium text-white transition-colors hover:bg-[#012a2b]"
                    >
                        Complete profile setup
                    </button>
                </form>
            </div>
        </main>
    );
}


