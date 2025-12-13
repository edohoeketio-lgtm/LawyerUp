"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Settings, Edit2, Briefcase, Calendar, MessageSquare } from "lucide-react";

// Mock Lawyer data based on card screenshot
const consultedLawyers = [
    {
        id: "1",
        name: "Ralph Edwards",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        country: "gb", // UK flag
        specialty: "Criminal Defense Attorney",
        sessions: 71,
        reviews: 55,
        tags: ["Business Law", "+3"]
    },
    {
        id: "2",
        name: "Annette Black",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        country: "jp", // Japan flag
        specialty: "Criminal Defense Attorney",
        sessions: 71,
        reviews: 55,
        tags: ["Business Law", "+3"]
    },
    {
        id: "3",
        name: "Wade Warren",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        country: "no", // Norway flag
        specialty: "Criminal Defense Attorney",
        sessions: 71,
        reviews: 55,
        tags: ["Business Law", "+3"]
    },
    {
        id: "4",
        name: "Darrell Steward",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        country: "us",
        specialty: "Family Law Attorney",
        sessions: 42,
        reviews: 38,
        tags: ["Family Law", "+2"]
    },
];

import EditProfileModal from "@/components/profile/EditProfileModal";

export default function ProfilePage() {
    const [activeTab, setActiveTab] = useState<"Overview" | "Achievements" | "Consulted Lawyers">("Consulted Lawyers");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    return (
        <div className="space-y-8">
            <EditProfileModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={(data) => {
                    console.log("Saved profile:", data);
                    setIsEditModalOpen(false);
                }}
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
                            <h1 className="font-serif text-2xl font-bold text-black">Nsikan Etukudoh</h1>
                            <Image
                                src="https://flagcdn.com/ng.svg"
                                alt="Nigeria"
                                width={20}
                                height={15}
                                className="object-contain" // Simplified flag
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-500">
                            Creative at <span className="font-bold text-black">Lawyer Up</span>
                        </p>
                        <div className="mt-3">
                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                                I need Legal help
                            </span>
                        </div>
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
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {consultedLawyers.map((lawyer) => (
                        <div key={lawyer.id} className="overflow-hidden rounded-xl bg-white shadow-sm transition-all hover:shadow-md">
                            {/* Card Image */}
                            <div className="relative h-48 w-full bg-gray-100">
                                <Image
                                    src={lawyer.image}
                                    alt={lawyer.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Card Content */}
                            <div className="p-4">
                                <div className="mb-1 flex items-center gap-2">
                                    <h3 className="font-bold text-black">{lawyer.name}</h3>
                                    <Image
                                        src={`https://flagcdn.com/${lawyer.country}.svg`}
                                        alt={lawyer.country}
                                        width={14}
                                        height={10}
                                        className="object-cover rounded-sm"
                                    />
                                </div>
                                <div className="mb-3 flex items-center gap-2 text-xs text-gray-500">
                                    <Briefcase size={12} />
                                    <span>{lawyer.specialty}</span>
                                </div>

                                <div className="mb-4 flex items-center gap-2 text-xs text-gray-500">
                                    <Calendar size={12} />
                                    <span>{lawyer.sessions} sessions ({lawyer.reviews} reviews)</span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {lawyer.tags.map((tag) => (
                                        <span key={tag} className="rounded-md bg-gray-100 px-2.5 py-1 text-[10px] font-medium text-gray-600">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab !== "Consulted Lawyers" && (
                <div className="flex h-64 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50">
                    <p className="text-gray-400">Content for {activeTab} coming soon...</p>
                </div>
            )}
        </div>
    );
}
