"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MessageSquare, ThumbsUp, ArrowRight, Bookmark } from "lucide-react";
import { forumThreads } from "@/data/forum";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";

// Mock saved IDs (Pre-populated for demo)
const initialSavedThreadIds = ["1", "4"];
const initialSavedLawyerIds = ["1", "3", "5"];

export default function BookmarksPage() {
    const [activeTab, setActiveTab] = useState<"discussions" | "lawyers">("discussions");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter threads
    const savedThreads = forumThreads.filter((t) => initialSavedThreadIds.includes(t.id));
    const filteredThreads = savedThreads.filter(t =>
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Filter lawyers
    const savedLawyers = lawyers.filter((l) => initialSavedLawyerIds.includes(l.id));
    const filteredLawyers = savedLawyers.filter(l =>
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.sector.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-black">Bookmarks</h1>
                    <p className="text-sm text-gray-500">Access your saved discussions and lawyer profiles.</p>
                </div>

                {/* Search */}
                <div className="relative w-full sm:w-72">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder={activeTab === "discussions" ? "Search saved discussions..." : "Search saved lawyers..."}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#004d45] focus:outline-none focus:ring-1 focus:ring-[#004d45]"
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab("discussions")}
                        className={`relative pb-4 text-sm font-medium transition-colors ${activeTab === "discussions"
                            ? "text-[#004d45]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Saved Discussions
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            {savedThreads.length}
                        </span>
                        {activeTab === "discussions" && (
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#004d45]"></div>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab("lawyers")}
                        className={`relative pb-4 text-sm font-medium transition-colors ${activeTab === "lawyers"
                            ? "text-[#004d45]"
                            : "text-gray-500 hover:text-gray-700"
                            }`}
                    >
                        Saved Lawyers
                        <span className="ml-2 rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
                            {savedLawyers.length}
                        </span>
                        {activeTab === "lawyers" && (
                            <div className="absolute bottom-0 left-0 h-0.5 w-full bg-[#004d45]"></div>
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div>
                {activeTab === "discussions" ? (
                    filteredThreads.length > 0 ? (
                        <div className="grid gap-4">
                            {filteredThreads.map((thread) => (
                                <div key={thread.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                                <Image src={thread.author.avatar} alt={thread.author.name} fill className="object-cover" />
                                            </div>
                                            <span className="text-xs font-medium text-gray-700">{thread.author.name}</span>
                                            <span className="text-[10px] text-gray-400">•</span>
                                            <span className="text-xs text-gray-500">{new Date(thread.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                                                {thread.category}
                                            </span>
                                            <button className="text-[#004d45]">
                                                <Bookmark size={16} fill="currentColor" />
                                            </button>
                                        </div>
                                    </div>

                                    <Link href={`/dashboard/forum/${thread.id}`}>
                                        <h3 className="mb-2 font-serif text-lg font-bold text-black hover:text-[#004d45] cursor-pointer">
                                            {thread.title}
                                        </h3>
                                    </Link>
                                    <p className="mb-6 text-sm text-gray-600 leading-relaxed line-clamp-2">
                                        {thread.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                            <ThumbsUp size={14} /> {thread.upvotes}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                                            <MessageSquare size={14} /> {thread.comments} Comments
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-gray-50">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-gray-400">
                                <Bookmark size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-black">No saved discussions</h3>
                            <p className="text-gray-500">Go to the forum to bookmark interesting topics.</p>
                            <Link href="/dashboard/forum" className="mt-4 rounded-lg bg-[#004d45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#003a34]">
                                Browse Forum
                            </Link>
                        </div>
                    )
                ) : (
                    filteredLawyers.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            {filteredLawyers.map((lawyer) => (
                                <div key={lawyer.id} className="relative group">
                                    <LawyerCard lawyer={lawyer} />
                                    {/* Override the heart to be filled since it is saved */}
                                    {/* Note: The mock functionality in LawyerCard doesn't support "filled" state via props yet, so this visual indicator on the card itself depends on LawyerCard implementation.
                                         For now, we know the button is there. Ideally we pass `isSaved` prop to LawyerCard.
                                         Let's just leave it as is, the user can click the heart to unsave (mock). 
                                     */}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-gray-50">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-gray-400">
                                <Bookmark size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-black">No saved lawyers</h3>
                            <p className="text-gray-500">Find and save lawyers to connect with them later.</p>
                            <Link href="/dashboard/discover" className="mt-4 rounded-lg bg-[#004d45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#003a34]">
                                Discover Lawyers
                            </Link>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}
