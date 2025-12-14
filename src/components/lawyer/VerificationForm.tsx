"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Check, Loader2, FileText, X, ChevronDown, Map } from "lucide-react";
import { auth, User } from "@/utils/auth";
import { allCountries } from "@/data/countries";
import { countryRegions } from "@/data/regions";

export default function VerificationForm({ user }: { user: User }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [barCountry, setBarCountry] = useState("United States");
    const [barNumber, setBarNumber] = useState("");
    const [barState, setBarState] = useState("");
    const [yearAdmitted, setYearAdmitted] = useState("");
    const [idFile, setIdFile] = useState<File | null>(null);

    // Get regions for selected country
    const availableRegions = countryRegions[barCountry] || [];

    // Reset state when country changes
    const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setBarCountry(e.target.value);
        setBarState(""); // Clear state/jurisdiction on country switch
    };

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setIdFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Mock API Call / Latency
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Update User
        auth.updateUser({
            verificationStatus: "verified", // Auto-verify for demo
            barCountry,
            barNumber,
            barState
        });

        setIsLoading(false);
        router.refresh();
        router.push("/dashboard?view=lawyer"); // Redirect to dashboard
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Bar Details */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Country Selection */}
                <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Country of Bar Admission</label>
                    <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            <Map size={18} />
                        </div>
                        <select
                            value={barCountry}
                            onChange={handleCountryChange}
                            className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-10 text-sm outline-none transition-all focus:border-[#004d45] focus:ring-1 focus:ring-[#004d45]"
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

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Bar / Roll Number</label>
                    <input
                        type="text"
                        required
                        value={barNumber}
                        onChange={(e) => setBarNumber(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#004d45] focus:ring-1 focus:ring-[#004d45]"
                        placeholder="e.g. 123456"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                        Jurisdiction / State / Province
                    </label>
                    {availableRegions.length > 0 ? (
                        <div className="relative">
                            <select
                                value={barState}
                                onChange={(e) => setBarState(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#004d45] focus:ring-1 focus:ring-[#004d45]"
                            >
                                <option value="" disabled>Select Region</option>
                                {availableRegions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    ) : (
                        <input
                            type="text"
                            required
                            value={barState}
                            onChange={(e) => setBarState(e.target.value)}
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#004d45] focus:ring-1 focus:ring-[#004d45]"
                            placeholder="e.g. London / Ontario"
                        />
                    )}
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Year Admitted</label>
                    <input
                        type="number"
                        required
                        value={yearAdmitted}
                        onChange={(e) => setYearAdmitted(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-all focus:border-[#004d45] focus:ring-1 focus:ring-[#004d45]"
                        placeholder="e.g. 2018"
                    />
                </div>
            </div>

            {/* ID Upload */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Upload Bar Card or Government ID</label>
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded-xl border-2 border-dashed p-8 text-center transition-all 
                        ${idFile ? "border-[#004d45] bg-[#F2FFF2]" : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"}`}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                    />

                    {idFile ? (
                        <div className="flex items-center gap-3 text-[#004d45]">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#004d45] text-white">
                                <Check size={20} />
                            </div>
                            <div className="text-left">
                                <p className="text-sm font-medium">{idFile.name}</p>
                                <p className="text-xs opacity-70">{(idFile.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIdFile(null);
                                }}
                                className="ml-4 rounded-full p-1 hover:bg-red-100 hover:text-red-600"
                            >
                                <X size={16} />
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-200">
                                <Upload size={20} className="text-gray-500" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (max. 800x400px)</p>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading || !idFile}
                className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-base font-bold text-white transition-all
                    ${(isLoading || !idFile)
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-[#013328] hover:bg-[#004d45] shadow-lg shadow-[#013328]/20"}`}
            >
                {isLoading ? (
                    <>
                        <Loader2 size={20} className="animate-spin" /> Verifying...
                    </>
                ) : (
                    "Verify & Continue"
                )}
            </button>
        </form>
    );
}
