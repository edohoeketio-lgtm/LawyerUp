"use client";

import { auth, User } from "@/utils/auth";
import { allCountries } from "@/data/countries";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, Calendar, Bell, Trash2 } from "lucide-react";

import Breadcrumbs from "@/components/Breadcrumbs";
import EditProfileModal from "@/components/profile/EditProfileModal";

export default function AccountSettingsPage() {
    const [activeTab, setActiveTab] = useState<"Personal" | "Security" | "Privacy">("Personal");
    const [user, setUser] = useState<User | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        setUser(auth.getSession());
    }, []);

    const handleUpdateProfile = (data: any) => {
        if (!user) return;
        auth.updateUser(data);
        // Local state update for immediate feedback
        setUser(prev => prev ? ({ ...prev, ...data }) : null);
        setShowEditModal(false);
    };

    if (!user) return null; // Or loading state

    return (
        <div className="max-w-[700px]">
            {/* Modal */}
            <EditProfileModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                onSave={handleUpdateProfile}
                initialData={user as any}
            />

            {/* Breadcrumb */}
            <Breadcrumbs
                items={[
                    { label: "Account", href: "/dashboard/account" },
                    { label: "Settings" }
                ]}
            />

            <h1 className="mb-6 font-serif text-2xl font-bold text-black">Settings</h1>

            {/* Tabs */}
            <div className="mb-8 flex items-center gap-1 rounded-full border border-gray-100 bg-white p-1 w-fit">
                {["Personal", "Security", "Privacy"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as typeof activeTab)}
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
                                {user.firstName} {user.lastName}
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
                            <label className="text-sm font-bold text-gray-400">Country</label>
                            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-black">
                                <Image
                                    src="https://flagcdn.com/ng.svg" // Could make this dynamic later based on selection
                                    alt="Flag"
                                    width={16}
                                    height={12}
                                    className="object-contain"
                                />
                                {user.location || "Select country"}
                            </div>
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-400">Preferred Language</label>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="text-xs font-medium text-[#004d45] underline decoration-1 underline-offset-2"
                                >
                                    Change
                                </button>
                            </div>
                            <div className="w-fit rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-black">
                                {(user.languages || ["English"]).join(", ")}
                            </div>
                        </div>

                        {/* Timezone */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-bold text-gray-400">Timezone</label>
                                <button
                                    onClick={() => setShowEditModal(true)}
                                    className="text-xs font-medium text-[#004d45] underline decoration-1 underline-offset-2"
                                >
                                    Change
                                </button>
                            </div>
                            <div className="w-fit rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-black">
                                {user.timezone || "GMT"}
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
                                    <div className="flex items-center gap-3">
                                        <Bell size={18} className="text-gray-400" />
                                        <span className="text-sm font-bold text-gray-500">Email notifications for new messages</span>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                                <label className="flex items-center justify-between rounded-lg border border-gray-100 p-4 hover:bg-gray-50 cursor-pointer">
                                    <div className="flex items-center gap-3">
                                        <Calendar size={18} className="text-gray-400" />
                                        <span className="text-sm font-bold text-gray-500">Reminders for upcoming sessions</span>
                                    </div>
                                    <input type="checkbox" defaultChecked className="h-5 w-5 rounded accent-[#004d45] border-gray-300" />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "Security" && (
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-2 text-base font-medium text-black">Password</h3>
                            <p className="mb-4 text-sm text-gray-500">Last changed 3 months ago</p>
                            <button className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-50">
                                Change password
                            </button>
                        </div>

                        <div>
                            <h3 className="mb-2 text-base font-medium text-black">Two-Factor Authentication</h3>
                            <p className="mb-4 text-sm text-gray-500">Add an extra layer of security to your account</p>
                            <button className="rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34]">
                                Enable 2FA
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
