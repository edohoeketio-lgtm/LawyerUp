"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, ThumbsUp, MessageSquare, Bookmark, ShieldCheck } from "lucide-react";
import { forumThreads, ForumThread } from "@/data/forum";
import StartDiscussionModal from "@/components/dashboard/StartDiscussionModal";
import { auth, User } from "@/utils/auth";

export default function ForumPage() {
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [threads, setThreads] = useState(forumThreads);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        setUser(auth.getSession());
        const handleAuthChange = () => setUser(auth.getSession());
        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    // Sync threads with user bookmarks
    useEffect(() => {
        if (user) {
            const bookmarkedIds = user.bookmarkedThreadIds || [];
            setThreads(prev => prev.map(t => ({
                ...t,
                isBookmarked: bookmarkedIds.includes(t.id)
            })));
        }
    }, [user]);

    const categories = ["All", "General", "Legal Advice", "Career", "Bar Exam", "News"];

    const filteredThreads = threads.filter(thread => {
        const matchesCategory = selectedCategory === "All" || thread.category === selectedCategory;
        const matchesSearch = thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            thread.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleUpvote = (id: string) => {
        setThreads(threads.map(t => {
            if (t.id === id) {
                const isUpvoted = !t.isUpvoted;
                return {
                    ...t,
                    isUpvoted,
                    upvotes: isUpvoted ? t.upvotes + 1 : t.upvotes - 1
                };
            }
            return t;
        }));
    };

    const handleBookmark = (id: string) => {
        if (!user) return;

        const currentBookmarks = user.bookmarkedThreadIds || [];
        const isBookmarked = currentBookmarks.includes(id);

        let newBookmarks;
        if (isBookmarked) {
            newBookmarks = currentBookmarks.filter(bookmarkId => bookmarkId !== id);
        } else {
            newBookmarks = [...currentBookmarks, id];
        }

        // Optimistic UI update
        setThreads(threads.map(t =>
            t.id === id ? { ...t, isBookmarked: !isBookmarked } : t
        ));

        // Persist
        auth.updateUser({ bookmarkedThreadIds: newBookmarks });
    };

    const handleNewDiscussion = (data: { title: string; category: string; content: string; isAnonymous: boolean }) => {
        const newThread: ForumThread = {
            id: Date.now().toString(),
            title: data.title,
            excerpt: data.content.substring(0, 150) + (data.content.length > 150 ? "..." : ""),
            author: {
                name: data.isAnonymous ? "Anonymous User" : "You", // Mock user
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                role: "Client"
            },
            category: data.category as any,
            createdAt: new Date().toISOString(),
            upvotes: 0,
            comments: 0
        };

        setThreads([newThread, ...threads]);
        setIsModalOpen(false);
        // In a real app, you would also toast here
    };

    return (
        <div className="flex flex-col gap-8 lg:flex-row">
            <StartDiscussionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleNewDiscussion}
            />

            {/* Left Sidebar: Navigation & Filters */}
            <aside className="w-full space-y-8 lg:w-64 lg:shrink-0">
                <div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#004d45] px-4 py-3 text-sm font-medium text-white hover:bg-[#003a34] shadow-sm"
                    >
                        <Plus size={18} />
                        Start Discussion
                    </button>
                </div>

                <div className="space-y-4">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Categories</h3>
                    <nav className="space-y-1">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors ${selectedCategory === category
                                    ? "bg-gray-100 text-[#004d45]"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                            >
                                {category}
                                {selectedCategory === category && (
                                    <div className="h-1.5 w-1.5 rounded-full bg-[#004d45]"></div>
                                )}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="rounded-xl bg-[#F0FDF4] p-4 text-[#166534]">
                    <h4 className="mb-1 text-sm font-bold">Forum Rules</h4>
                    <p className="text-xs opacity-90">
                        Be respectful. No confidential case details. This is a community for support and verification, not legal representation.
                    </p>
                </div>
            </aside>

            {/* Main Content: Feed */}
            <div className="flex-1 space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="font-serif text-2xl font-medium text-black">Community Feed</h2>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search topics..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#004d45] focus:outline-none focus:ring-1 focus:ring-[#004d45]"
                        />
                    </div>
                </div>

                {/* Thread List */}
                <div className="space-y-4">
                    {filteredThreads.length > 0 ? (
                        filteredThreads.map((thread) => (
                            <div key={thread.id} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-gray-200 hover:shadow-md">
                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="relative h-6 w-6 overflow-hidden rounded-full">
                                            <Image src={thread.author.avatar} alt={thread.author.name} fill className="object-cover" />
                                        </div>
                                        <span className="text-xs font-medium text-gray-700 flex items-center gap-1">
                                            {thread.author.name}
                                            {thread.author.role === "Lawyer" && (
                                                <ShieldCheck size={12} className="text-blue-500" fill="currentColor" fillOpacity={0.2} />
                                            )}
                                        </span>
                                        <span className="text-[10px] text-gray-400">•</span>
                                        <span className="text-xs text-gray-500">{new Date(thread.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-medium text-gray-600">
                                            {thread.category}
                                        </span>
                                        <button
                                            onClick={() => handleBookmark(thread.id)}
                                            className={`transition-colors ${thread.isBookmarked ? "text-[#004d45] fill-[#004d45]" : "text-gray-400 hover:text-[#004d45]"}`}
                                        >
                                            <Bookmark size={16} className={thread.isBookmarked ? "fill-current" : ""} />
                                        </button>
                                    </div>
                                </div>

                                <Link href={`/dashboard/forum/${thread.id}`}>
                                    <h3 className="mb-2 font-serif text-lg font-bold text-black hover:text-[#004d45] cursor-pointer">
                                        {thread.title}
                                    </h3>
                                </Link>
                                <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                                    {thread.excerpt}
                                </p>

                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleUpvote(thread.id)}
                                        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${thread.isUpvoted
                                            ? "bg-[#E6FFFA] text-[#004d45]"
                                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                            }`}
                                    >
                                        <ThumbsUp size={14} className={thread.isUpvoted ? "fill-current" : ""} />
                                        {thread.upvotes}
                                    </button>
                                    <Link
                                        href={`/dashboard/forum/${thread.id}`}
                                        className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
                                    >
                                        <MessageSquare size={14} />
                                        {thread.comments} Comments
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-gray-50">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm text-gray-400">
                                <Search size={24} />
                            </div>
                            <h3 className="text-lg font-bold text-black">No topics found</h3>
                            <p className="text-gray-500">Try adjusting your search or category filter.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
