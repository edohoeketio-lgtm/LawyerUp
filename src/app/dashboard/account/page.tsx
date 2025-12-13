"use client";

import { useState, useEffect } from "react";
import { auth, User } from "@/utils/auth";
import Image from "next/image";
import Link from "next/link";
import { Settings, Edit2, Briefcase, Calendar, MessageSquare, Clock, Check, Video } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import { bookings } from "@/data/bookings";
import LawyerCard from "@/components/LawyerCard";
import EditProfileModal from "@/components/profile/EditProfileModal";

// Helper for Bio expansion
function ContentExpander({ text }: { text: string }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const shouldTruncate = text.length > 250;

    return (
        <div className="text-sm text-gray-600 leading-relaxed">
            <p className={!isExpanded && shouldTruncate ? "line-clamp-3" : ""}>
                {text}
            </p>
            {shouldTruncate && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-1 font-bold text-[#004d45] hover:underline"
                >
                    {isExpanded ? "Show less" : "Show more"}
                </button>
            )}
        </div>
    );
}

// Helper to check if session is within 5 minutes
function isSessionJoinable(dateStr: string, timeStr: string) {
    // Parse date (YYYY-MM-DD or ISO)
    const sessionDate = new Date(dateStr);

    // Parse time (e.g., "10:00 AM")
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);

    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    sessionDate.setHours(hours, minutes, 0, 0);

    const now = new Date();
    const diffInMinutes = (sessionDate.getTime() - now.getTime()) / 60000;

    // Active if difference is between -60 (ongoing) and 5 (starting soon)
    return diffInMinutes <= 5 && diffInMinutes > -60;
}

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function ProfileContent() {
    const searchParams = useSearchParams();
    const shouldEdit = searchParams.get("edit") === "true";
    const [activeTab, setActiveTab] = useState<"Overview" | "Achievements" | "Consulted Lawyers">("Overview");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(auth.getSession());
        if (shouldEdit) {
            setIsEditModalOpen(true);
        }
    }, [shouldEdit]);

    // Get mock/real sessions
    const upcomingSessions = bookings.filter(b => b.status === 'confirmed').slice(0, 3);

    return (
        <div className="space-y-8">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(data) => {
                    const updatedUser: any = { ...data };
                    // Map 'legal_help' back to 'client' for auth user
                    if (updatedUser.role === "legal_help") {
                        updatedUser.role = "client";
                    }
                    auth.updateUser(updatedUser);
                    setUser(auth.getSession()); // Refresh local state
                    setIsEditModalOpen(false);
                }}
                initialData={user ? {
                    ...user,
                    role: user.role === "client" ? "legal_help" : user.role
                } as any : {}} // Cast to avoid index signature issues
            />

            {/* Header */}
            <div className="flex flex-col gap-6 rounded-2xl bg-white p-8 shadow-sm sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-6">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100">
                        <Image
                            src="/avatars/user_dp.png"
                            alt="Nsikan"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div>
                        <div className="mb-1 flex items-center gap-3">
                            <h1 className="font-serif text-2xl font-bold text-black">
                                {user ? `${user.firstName} ${user.lastName}` : "Guest User"}
                            </h1>
                            <Image
                                src="https://flagcdn.com/ng.svg"
                                alt="Nigeria"
                                width={20}
                                height={15}
                                className="object-contain"
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            {user?.jobTitle || "Member"} at <span className="font-bold text-black">{user?.workplace || "Lawyer Up"}</span>
                        </p>
                        <div className="mt-3">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                I need Legal help
                            </span>
                        </div>
                        {user?.bio && (
                            <p className="mt-4 max-w-2xl text-sm text-gray-600 leading-relaxed">
                                {user.bio}
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsEditModalOpen(true)}
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Edit2 size={16} />
                        Edit profile
                    </button>
                    <Link
                        href="/dashboard/account/settings"
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Settings size={16} />
                        Settings
                    </Link>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 rounded-full border border-gray-100 bg-white p-1 w-fit">
                {["Overview", "Achievements", "Consulted Lawyers"].map((tab) => (
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
            {activeTab === "Consulted Lawyers" && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {lawyers.slice(0, 4).map((lawyer) => (
                        <LawyerCard key={lawyer.id} lawyer={lawyer} />
                    ))}
                </div>
            )}

            {activeTab === "Overview" && (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Background */}
                        <div>
                            <h3 className="mb-4 font-serif text-lg font-bold text-[#004d45]">Background</h3>

                            {/* Legal Interests */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm mb-6">
                                <h4 className="mb-3 text-sm font-bold text-gray-500">Legal interests <span className="font-normal">(Based on your past sessions)</span></h4>
                                <div className="flex flex-wrap gap-2">
                                    {user?.legalInterests?.length ? (
                                        user.legalInterests.map(interest => (
                                            <span key={interest} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                                                {interest}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-400 italic">No interests selected</span>
                                    )}
                                </div>
                            </div>

                            {/* Languages */}
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <h4 className="mb-3 text-sm font-bold text-gray-500">Languages spoken</h4>
                                <div className="flex flex-wrap gap-2">
                                    {(user?.languages || ["English"]).map(lang => (
                                        <span key={lang} className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700">
                                            {lang}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-8">
                        {/* Statistics */}
                        <div>
                            <h3 className="mb-4 font-serif text-lg font-bold text-[#004d45]">Statistics</h3>
                            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start gap-3">
                                        <div className="relative h-10 w-10 shrink-0">
                                            <Image src="/icons/stat-stopwatch.png" alt="Session time" fill className="object-contain" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-black">1,392 <span className="text-xs font-normal text-gray-500">mins</span></div>
                                            <div className="text-[10px] text-gray-500 leading-tight mt-1">Total session time</div>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="relative h-10 w-10 shrink-0">
                                            <Image src="/icons/stat-check.png" alt="Sessions" fill className="object-contain" />
                                        </div>
                                        <div>
                                            <div className="text-xl font-bold text-black">374</div>
                                            <div className="text-[10px] text-gray-500 leading-tight mt-1">Sessions completed</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Sessions */}
                        <div>
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-serif text-lg font-bold text-[#004d45]">Upcoming sessions</h3>
                                <span className="text-xs text-gray-500">You have 3 upcoming sessions.</span>
                            </div>

                            <div className="space-y-4">
                                {upcomingSessions.map((session: any) => {
                                    const isJoinable = isSessionJoinable(session.date, session.time);

                                    return (
                                        <div key={session.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                                            <h4 className="mb-3 font-serif font-bold text-black">{session.topic || "General Consultation"}</h4>

                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 text-xs">
                                                    <span className={`rounded px-2 py-0.5 font-medium ${session.type === 'mentorship'
                                                        ? 'bg-purple-100 text-purple-700'
                                                        : 'bg-[#FFF8EB] text-[#8F6B20]'
                                                        }`}>
                                                        {session.type === 'mentorship' ? 'Mentorship' : 'Legal advice'}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-gray-500">
                                                        <Clock size={12} /> {session.duration} mins
                                                    </span>
                                                </div>

                                                <button
                                                    disabled={!isJoinable}
                                                    className={`flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${isJoinable
                                                        ? 'bg-[#004d45] text-white hover:bg-[#003a34]'
                                                        : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                                        }`}
                                                >
                                                    <Video size={16} /> Join Call
                                                </button>
                                            </div>
                                            <div className="mt-2 text-sm font-bold text-[#004d45]">${session.price}</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={<div>Loading profile...</div>}>
            <ProfileContent />
        </Suspense>
    );
}
