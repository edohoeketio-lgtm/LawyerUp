"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronRight, Calendar, Bell, Trash2 } from "lucide-react";

export default function AccountSettingsPage() {
    const [activeTab, setActiveTab] = useState<"Personal" | "Security" | "Privacy">("Personal");

    // Mock User Data matching screenshot
    const user = {
        name: "Nsikan Etukudoh",
        email: "nsikan@lawyer.up",
        location: "Lagos, Nigeria",
        language: "English",
        timezone: "GMT (Greenwich Mean Time)"
    };

    return (
        <div className="max-w-[700px]">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
                <button className="hover:text-black">Back</button>
                <ChevronRight size={14} />
                <span>Account</span>
                <ChevronRight size={14} />
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-black">Settings</span>
            </div>

            <h1 className="mb-6 font-serif text-2xl font-bold text-black">Settings</h1>

            {/* Tabs */}
            <div className="mb-8 flex items-center gap-1 rounded-full border border-gray-100 bg-white p-1 w-fit">
                {["Personal", "Security", "Privacy"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${activeTab === tab
                            ? "bg-black text-white"
                            : "bg-transparent text-gray-500 hover:text-black"
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">

                {activeTab === "Personal" && (
                    <div className="space-y-8">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">First and last name</label>
                            <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-black">
                                {user.name}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-400">Email address</label>
                                <span className="text-xs font-medium text-gray-400">Verified</span>
                            </div>
                            <div className="rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-black">
                                {user.email}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400">City, Country</label>
                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-black">
                                <Image
                                    src="https://flagcdn.com/ng.svg"
                                    alt="Nigeria"
                                    width={16}
                                    height={12}
                                    className="object-contain"
                                />
                                {user.location}
                            </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-400">Preferred Language</label>
                                <button className="text-xs font-medium text-[#004d45] underline decoration-1 underline-offset-2">Change</button>
                            </div>
                            <div className="w-fit rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-black">
                                {user.language}
                            </div>
                        </div>

                        {/* Timezone */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-400">Timezone</label>
                                <button className="text-xs font-medium text-[#004d45] underline decoration-1 underline-offset-2">Change</button>
                            </div>
                            <div className="w-fit rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-black">
                                {user.timezone}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600">
                                <Trash2 size={16} />
                                Delete your account
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "Privacy" && (
                    <div className="space-y-8">
                        {/* Profile Visibility */}
                        <div>
                            <h3 className="mb-4 text-base font-medium text-[#004d45]">Profile Visibility</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Public (For community features like Q&A upvotes)</span>
                                    <input type="radio" name="visibility" className="h-5 w-5 accent-[#004d45] border-gray-300" />
                                </label>
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Private (Default)</span>
                                    <input type="radio" name="visibility" defaultChecked className="h-5 w-5 accent-[#004d45] border-gray-300" />
                                </label>
                            </div>
                        </div>

                        {/* Q&A Activity */}
                        <div>
                            <h3 className="mb-4 text-base font-medium text-[#004d45]">Q&A Activity</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Allow others to see the questions I've asked</span>
                                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Show my display name on public answers I've tipped</span>
                                    <input type="checkbox" className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                            </div>
                        </div>

                        {/* Communication */}
                        <div>
                            <h3 className="mb-4 text-base font-medium text-[#004d45]">Communication Preferences</h3>
                            <div className="space-y-3">
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Receive updates about session tips & reminders</span>
                                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <span className="text-sm font-bold text-gray-500">Receive occasional product news and platform updates</span>
                                    <input type="checkbox" className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Security" && (
                    <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                        <div className="mb-4 rounded-full bg-gray-50 p-4">
                            <div className="h-6 w-6 border-2 border-gray-300 rounded"></div>
                        </div>
                        <p>Security settings coming soon</p>
                    </div>
                )}

            </div>
        </div>
    );
}
