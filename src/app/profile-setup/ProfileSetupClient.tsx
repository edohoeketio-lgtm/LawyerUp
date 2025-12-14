"use client";

import Link from "next/link";
import { ChevronDown, Map } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { allCountries } from "@/data/countries";
import { auth } from "@/utils/auth";

export default function ProfileSetupClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlName = searchParams.get("name") || "Guest";

    const [user, setUser] = useState<any>(null); // Quick fix for type, ideally User import
    const [step, setStep] = useState(1);

    useEffect(() => {
        const session = auth.getSession();
        if (session) {
            setUser(session);
        }
    }, []);

    const role = user?.role || "client";
    const displayName = user ? `${user.firstName} ${user.lastName}` : urlName;

    const [formData, setFormData] = useState({
        country: "Nigeria",
        language: "English",
        timezone: "GMT (Greenwich Mean Time)",
        barState: "Lagos",
        barId: "",
        consultationPrice: "50000",
        mentorshipPrice: "0", // Free by default?
        yearsExperience: "1",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleNext = () => {
        if (role === 'lawyer' && step < 3) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };

    const handleComplete = () => {
        if (typeof window !== "undefined") {
            const currentUser = auth.getSession();
            if (currentUser) {
                auth.updateUser({
                    location: formData.country,
                    languages: [formData.language],
                    timezone: formData.timezone,
                    ...(role === 'lawyer' ? {
                        barState: formData.barState,
                        barId: formData.barId,
                        consultationPrice: parseInt(formData.consultationPrice) || 0,
                        mentorshipPrice: parseInt(formData.mentorshipPrice) || 0,
                        verificationStatus: 'pending'
                    } : {})
                });
            }
        }
        router.push("/dashboard");
    };

    const isLastStep = role === 'client' || step === 3;

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h1 className="font-serif text-3xl text-black">
                            {step === 1 && "Set up your profile"}
                            {step === 2 && "Verify your credentials"}
                            {step === 3 && "Set your rates"}
                        </h1>
                        <p className="font-sans text-sm text-gray-500">
                            {step === 1 && "Complete your profile to connect with the right people."}
                            {step === 2 && "We need to verify your Bar membership to activate your account."}
                            {step === 3 && "Set your standard rates for sessions."}
                        </p>
                    </div>
                    {step === 1 && (
                        <Link href="/dashboard" className="text-sm font-medium text-[#013328] hover:underline">
                            Skip for now
                        </Link>
                    )}
                </div>

                {/* User Card */}
                <div className="flex items-center gap-4 py-2 border-b border-gray-100 pb-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8A2BE2] text-white font-medium text-lg">
                        {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h3 className="font-serif text-lg text-black">{displayName}</h3>
                        <span className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600 capitalize">
                            {role === 'lawyer' ? 'Legal Professional' : 'I need Legal help'}
                        </span>
                    </div>
                </div>

                <form className="space-y-6">
                    {/* Step 1: Basic Info (Everyone) */}
                    {step === 1 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Country</label>
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
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Preferred Language</label>
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
                                <label className="text-xs font-medium text-gray-500">Time zone</label>
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
                        </>
                    )}

                    {/* Step 2: Bar Verification (Lawyers) */}
                    {step === 2 && (
                        <>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Bar State / Jurisdiction</label>
                                <input
                                    type="text"
                                    name="barState"
                                    value={formData.barState}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#013328]"
                                    placeholder="e.g. Lagos, Abuja"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Bar ID / Enrollment Number</label>
                                <input
                                    type="text"
                                    name="barId"
                                    value={formData.barId}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#013328]"
                                    placeholder="e.g. SCN001234"
                                />
                            </div>
                        </>
                    )}

                    {/* Step 3: Rates (Lawyers) */}
                    {step === 3 && (
                        <>
                            <div className="rounded-lg bg-yellow-50 p-4 text-xs text-yellow-800 mb-4">
                                <b>Note:</b> You can change these later in your settings.
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Consultation Rate (NGN / hr)</label>
                                <input
                                    type="number"
                                    name="consultationPrice"
                                    value={formData.consultationPrice}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#013328]"
                                    placeholder="e.g. 50000"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-gray-500">Mentorship Rate (NGN / hr)</label>
                                <input
                                    type="number"
                                    name="mentorshipPrice"
                                    value={formData.mentorshipPrice}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#013328]"
                                    placeholder="e.g. 0 for pro bono"
                                />
                                <p className="text-[10px] text-gray-400">Set to 0 for free mentorship.</p>
                            </div>
                        </>
                    )}

                    <div className="flex gap-3">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={handleBack}
                                className="w-1/3 rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            onClick={handleNext}
                            className="flex-1 rounded-lg bg-[#013328] py-3 text-sm font-medium text-white transition-colors hover:bg-[#012a2b]"
                        >
                            {isLastStep ? "Complete profile setup" : "Continue"}
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}


