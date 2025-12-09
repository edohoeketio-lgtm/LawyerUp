"use client";

import Link from "next/link";
import { User, Map, ChevronDown, Globe, Clock, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ProfileSetupPage() {
    const [formData, setFormData] = useState({
        location: "",
        language: "English",
        timezone: "GMT (Greenwich Mean Time)",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="flex items-center justify-between">
                    <h1 className="font-serif text-3xl text-black">Set up your profile</h1>
                    <Link href="/" className="text-sm font-medium text-[#013328] hover:underline">
                        Skip for now
                    </Link>
                </div>

                <p className="font-sans text-sm text-gray-500">
                    Complete your profile to connect with the right legal experts—just a few more details!
                </p>

                {/* User Card */}
                <div className="flex items-center gap-4 py-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A2BE2] text-white font-medium text-lg">
                        N
                    </div>
                    <div>
                        <h3 className="font-serif text-lg text-black">Nsikan</h3>
                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            I need Legal help
                        </span>
                    </div>
                </div>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            City, Country
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#013328]">
                                <span className="font-bold border-l-2 border-[#013328] pl-2 h-4 italic text-sm">🇳🇬</span>
                            </div>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Lagos, Nigeria"
                                className="w-full rounded-lg border border-gray-200 py-3 pl-12 pr-10 text-sm outline-none focus:border-[#013328]"
                            />
                            <Map size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
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
                        type="button" // Change to submit when connecting to backend
                        className="w-full rounded-lg bg-[#013328] py-3 text-sm font-medium text-white transition-colors hover:bg-[#012a2b]"
                    >
                        Complete profile setup
                    </button>
                </form>
            </div>
        </main>
    );
}
