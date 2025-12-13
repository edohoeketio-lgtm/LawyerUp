"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ThumbsUp, MessageSquare, MoreHorizontal, Share2, Flag, Bookmark, ShieldCheck } from "lucide-react";
import { forumThreads, ForumThread } from "@/data/forum";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const thread = forumThreads.find(t => t.id === id);

    const [commentText, setCommentText] = useState("");
    const [localComments, setLocalComments] = useState<{ id: string, author: string, content: string, date: string, avatar: string, role: string }[]>([
        {
            id: "c1",
            author: "Michael Ross",
            role: "Lawyer",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "Great question. In my experience, focusing on the MBE early is key. Don't just do questions, review WHY you got them wrong.",
            date: "2 days ago"
        },
        {
            id: "c2",
            author: "Jessica Pearson",
            role: "Partner", // Custom role
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: "I agree with Michael. Practice under timed conditions is also essential. You need to build stamina.",
            date: "1 day ago"
        }
    ]);

    if (!thread) {
        // Fallback for demo: if ID not found (e.g. new mock thread), show a generic one or 404
        // For better demo experience, let's show the first one if not found, or actually 404
        // return notFound();
        // EDIT: Let's stick to strict 404 to avoid confusion, but since new threads are local-only state in the previous page,
        // they won't appear here after refresh. That's a known limitation of mock data. 
        // We will just use the find logic.
        if (id.length > 5) { // Assuming high ID means new mock thread
            // Mock render for "new" threads not in static data
            return (
                <div className="space-y-6">
                    <Breadcrumbs items={[{ label: "Forum", href: "/dashboard/forum" }, { label: "Discussion" }]} />
                    <div className="p-8 text-center text-gray-500">
                        Thread data not persistent in demo. Go back to see static threads.
                    </div>
                </div>
            )
        }
        return notFound();
    }

    const handlePostComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        const newComment = {
            id: Date.now().toString(),
            author: "You",
            role: "Client",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: commentText,
            date: "Just now"
        };

        setLocalComments([...localComments, newComment]);
        setCommentText("");
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <Breadcrumbs
                items={[
                    { label: "Forum", href: "/dashboard/forum" },
                    { label: "Discussion" }
                ]}
            />

            {/* Main Thread */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                            <Image src={thread.author.avatar} alt={thread.author.name} fill className="object-cover" />
                        </div>
                        <div>
                            <h1 className="text-sm font-bold text-black flex items-center gap-2">
                                {thread.author.name}
                                {thread.author.role === "Lawyer" && (
                                    <ShieldCheck size={12} className="text-blue-500" fill="currentColor" fillOpacity={0.2} />
                                )}
                            </h1>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>{thread.author.role}</span>
                                <span>•</span>
                                <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                        {thread.category}
                    </span>
                </div>

                <h2 className="mb-4 font-serif text-2xl font-bold text-black">
                    {thread.title}
                </h2>
                <div className="prose prose-sm max-w-none text-gray-700 mb-6">
                    <p>{thread.excerpt} {thread.excerpt}</p> {/* Doubling for visual length */}
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                            <ThumbsUp size={14} /> {thread.upvotes} Upvotes
                        </button>
                        <button className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                            <MessageSquare size={14} /> {localComments.length} Comments
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full">
                            <Bookmark size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-black hover:bg-gray-50 rounded-full">
                            <Share2 size={18} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded-full">
                            <Flag size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Comments Section */}
            <div>
                <h3 className="mb-4 text-lg font-bold text-black">Comments ({localComments.length})</h3>

                {/* Comment Input */}
                <div className="mb-8 flex gap-4">
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                        <Image src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="You" fill className="object-cover" />
                    </div>
                    <form onSubmit={handlePostComment} className="flex-1">
                        <textarea
                            rows={3}
                            placeholder="Add to the discussion..."
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        ></textarea>
                        <div className="mt-2 flex justify-end">
                            <button
                                type="submit"
                                disabled={!commentText.trim()}
                                className="rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Post Comment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Comment List */}
                <div className="space-y-4">
                    {localComments.map((comment) => (
                        <div key={comment.id} className="flex gap-4 rounded-xl bg-white p-6 border border-gray-50">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                                <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-1 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <h4 className="font-bold text-black text-sm">{comment.author}</h4>
                                        {comment.role === "Lawyer" && (
                                            <div className="flex items-center gap-0.5 rounded bg-blue-100 px-1 py-0.5 text-[10px] font-medium text-blue-700">
                                                <ShieldCheck size={10} />
                                                Verified
                                            </div>
                                        )}
                                        {comment.role !== "Lawyer" && (
                                            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-600">{comment.role}</span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-400">{comment.date}</span>
                                </div>
                                <p className="text-sm text-gray-700 leading-relaxed">{comment.content}</p>
                                <div className="mt-3 flex items-center gap-4">
                                    <button className="text-xs font-medium text-gray-500 hover:text-black">Reply</button>
                                    <button className="text-xs font-medium text-gray-500 hover:text-black">Like</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
