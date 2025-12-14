"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ThumbsUp, MessageSquare, Bookmark, Share2, Flag, ShieldCheck, Trash2, Link as LinkIcon } from "lucide-react";
import { forumThreads } from "@/data/forum";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useToast } from "@/context/ToastContext";

interface Comment {
    id: string;
    author: string;
    content: string;
    date: string;
    avatar: string;
    role: string;
    likes: number;
    isLiked: boolean;
    lawyerId?: string;
    replies?: Comment[];
}

interface ThreadCommentProps {
    comment: Comment;
    depth?: number;
    onReply: (parentId: string, text: string) => void;
    onLike: (commentId: string) => void;
    onDelete: (commentId: string) => void;
}

// Extracted Component to prevent re-render focus loss bugs
function ThreadComment({ comment, depth = 0, onReply, onLike, onDelete }: ThreadCommentProps) {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);

    const hasReplies = comment.replies && comment.replies.length > 0;
    const isCurrentUser = comment.author === "You"; // Simple check for demo

    const handleSubmitReply = (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim()) return;
        onReply(comment.id, replyText);
        setReplyText("");
        setIsReplying(false);
        setIsExpanded(true); // Auto expand to show new reply
    };

    return (
        <div className={`flex gap-4 rounded-xl ${depth === 0 ? "bg-white p-6 border border-gray-50 from-gray-50/50" : "bg-transparent mt-4"}`}>
            {/* Avatar */}
            {comment.lawyerId ? (
                <Link href={`/dashboard/lawyer/${comment.lawyerId}`} className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full hover:opacity-80 transition-opacity">
                    <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                </Link>
            ) : (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
                    <Image src={comment.avatar} alt={comment.author} fill className="object-cover" />
                </div>
            )}

            <div className="flex-1">
                <div className="mb-1 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {/* Name */}
                        {comment.lawyerId ? (
                            <Link href={`/dashboard/lawyer/${comment.lawyerId}`} className="font-bold text-black text-sm hover:text-[#004d45] hover:underline">
                                {comment.author}
                            </Link>
                        ) : (
                            <h4 className="font-bold text-black text-sm">{comment.author}</h4>
                        )}

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

                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{comment.content}</p>

                <div className="mt-3 flex items-center gap-4">
                    <button
                        onClick={() => setIsReplying(!isReplying)}
                        className={`text-xs font-medium hover:text-black transition-colors ${isReplying ? "text-[#004d45]" : "text-gray-500"}`}
                    >
                        Reply
                    </button>
                    <button
                        onClick={() => onLike(comment.id)}
                        className={`flex items-center gap-1 text-xs font-medium transition-colors ${comment.isLiked ? "text-[#004d45]" : "text-gray-500 hover:text-black"}`}
                    >
                        <ThumbsUp size={12} className={comment.isLiked ? "fill-current" : ""} />
                        {comment.likes > 0 ? `${comment.likes} Likes` : "Like"}
                    </button>

                    {isCurrentUser && (
                        <button
                            onClick={() => onDelete(comment.id)}
                            className="text-xs font-medium text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                            <Trash2 size={12} />
                            Delete
                        </button>
                    )}

                    {hasReplies && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="text-xs font-medium text-gray-500 hover:text-black flex items-center gap-1"
                        >
                            <MessageSquare size={12} />
                            {isExpanded ? "Hide Replies" : `View ${comment.replies!.length} Replies`}
                        </button>
                    )}
                </div>

                {/* Inline Reply Input */}
                {isReplying && (
                    <div className="mt-4">
                        <form onSubmit={handleSubmitReply}>
                            <textarea
                                rows={2}
                                autoFocus
                                placeholder={`Replying to ${comment.author}...`}
                                className="w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-[#006056] focus:outline-none"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                            ></textarea>
                            <div className="mt-2 flex gap-2 justify-end">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsReplying(false);
                                        setReplyText("");
                                    }}
                                    className="px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-black"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={!replyText.trim()}
                                    className="rounded-md bg-[#004d45] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#003a34] disabled:opacity-50"
                                >
                                    Reply
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Nested Replies */}
                {hasReplies && isExpanded && (
                    <div className="mt-4 border-l-2 border-gray-100 pl-4 space-y-4">
                        {comment.replies!.map(reply => (
                            <ThreadComment
                                key={reply.id}
                                comment={reply}
                                depth={depth + 1}
                                onReply={onReply}
                                onLike={onLike}
                                onDelete={onDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

import DeleteModal from "@/components/DeleteModal";
import ReportModal from "@/components/ReportModal";

// ... (keep interface Comment and ThreadComment component as they are)

export default function ThreadDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { success } = useToast();
    const threadData = forumThreads.find(t => t.id === id);
    const [thread, setThread] = useState(threadData);

    // Sync if data changes
    if (!thread && threadData) setThread(threadData);

    const [commentText, setCommentText] = useState("");

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState<string | null>(null);

    // Share Menu State
    const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);

    // Report Modal State
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const [localComments, setLocalComments] = useState<Comment[]>([
        {
            id: "c1",
            author: "Sarah Jenkins",
            role: "Lawyer",
            lawyerId: "1",
            avatar: "/avatars/lawyer_1.jpg",
            content: "Great question. In my experience, focusing on the MBE early is key. Don't just do questions, review WHY you got them wrong.",
            date: "2 days ago",
            likes: 12,
            isLiked: false,
            replies: [
                {
                    id: "c1-r1",
                    author: "Michael Ross",
                    role: "Student",
                    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                    content: "Totally agree! I spent way too much time just burning through questions without analyzing them properly.",
                    date: "1 day ago",
                    likes: 3,
                    isLiked: false,
                    replies: []
                }
            ]
        },
        {
            id: "c2",
            author: "David Okon",
            role: "Lawyer",
            lawyerId: "2",
            avatar: "/avatars/lawyer_2.jpg",
            content: "I agree with Sarah. Practice under timed conditions is also essential. You need to build stamina.",
            date: "1 day ago",
            likes: 8,
            isLiked: true,
            replies: []
        }
    ]);

    if (!thread) {
        if (id.length > 5) {
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

        const newComment: Comment = {
            id: Date.now().toString(),
            author: "You",
            role: "Client",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: commentText,
            date: "Just now",
            likes: 0,
            isLiked: false,
            replies: []
        };

        setLocalComments([...localComments, newComment]);
        setCommentText("");
    };

    const handleReply = (parentId: string, text: string) => {
        const newReply: Comment = {
            id: Date.now().toString(),
            author: "You",
            role: "Client",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            content: text,
            date: "Just now",
            likes: 0,
            isLiked: false,
            replies: []
        };

        const addReplyToComments = (comments: Comment[]): Comment[] => {
            return comments.map(comment => {
                if (comment.id === parentId) {
                    return {
                        ...comment,
                        replies: [...(comment.replies || []), newReply]
                    };
                } else if (comment.replies && comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: addReplyToComments(comment.replies)
                    };
                }
                return comment;
            });
        };

        setLocalComments(addReplyToComments(localComments));
    };

    const handleDeleteCommentClick = (commentId: string) => {
        setCommentToDelete(commentId);
        setIsDeleteModalOpen(true);
    };

    const confirmDeleteComment = () => {
        if (!commentToDelete) return;

        const deleteFromComments = (comments: Comment[]): Comment[] => {
            return comments
                .filter(c => c.id !== commentToDelete)
                .map(c => ({
                    ...c,
                    replies: c.replies ? deleteFromComments(c.replies) : []
                }));
        };

        setLocalComments(deleteFromComments(localComments));
        setCommentToDelete(null);
    };

    const handleUpvote = () => {
        if (!thread) return;
        const isUpvoted = !thread.isUpvoted;
        setThread({
            ...thread,
            isUpvoted,
            upvotes: isUpvoted ? thread.upvotes + 1 : thread.upvotes - 1
        });
    };

    const handleLikeComment = (commentId: string) => {
        const toggleLikeInComments = (comments: Comment[]): Comment[] => {
            return comments.map(c => {
                if (c.id === commentId) {
                    const isLiked = !c.isLiked;
                    return {
                        ...c,
                        isLiked,
                        likes: isLiked ? c.likes + 1 : c.likes - 1
                    };
                } else if (c.replies && c.replies.length > 0) {
                    return {
                        ...c,
                        replies: toggleLikeInComments(c.replies)
                    };
                }
                return c;
            })
        };
        setLocalComments(toggleLikeInComments(localComments));
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
                    <p>{thread.excerpt} {thread.excerpt}</p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                </div>

                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleUpvote}
                            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${thread.isUpvoted
                                ? "bg-[#E6FFFA] text-[#004d45]"
                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
                        >
                            <ThumbsUp size={14} className={thread.isUpvoted ? "fill-current" : ""} /> {thread.upvotes} Upvotes
                        </button>
                        <button className="flex items-center gap-1.5 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100">
                            <MessageSquare size={14} /> {localComments.length} Comments
                        </button>
                    </div>
                    <div className="flex gap-2 relative">
                        <button
                            onClick={() => {
                                setThread({ ...thread, isBookmarked: !thread.isBookmarked });
                            }}
                            className={`p-2 rounded-full transition-colors ${thread.isBookmarked
                                ? "text-[#004d45] bg-[#E6FFFA]"
                                : "text-gray-400 hover:text-black hover:bg-gray-50"}`}
                        >
                            <Bookmark size={18} className={thread.isBookmarked ? "fill-current" : ""} />
                        </button>

                        {/* Share Button & Popover */}
                        <div className="relative">
                            <button
                                onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                                className={`p-2 rounded-full transition-colors ${isShareMenuOpen ? "text-black bg-gray-100" : "text-gray-400 hover:text-black hover:bg-gray-50"}`}
                            >
                                <Share2 size={18} />
                            </button>

                            {isShareMenuOpen && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setIsShareMenuOpen(false)}></div>
                                    <div className="absolute right-0 top-full mt-2 z-20 w-48 rounded-xl border border-gray-100 bg-white p-2 shadow-xl animate-in fade-in zoom-in-95 duration-100">
                                        <button
                                            onClick={() => {
                                                const url = window.location.href;
                                                const text = `Check out this discussion on LawyerUp: ${thread.title}`;
                                                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                                                setIsShareMenuOpen(false);
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                            </svg>
                                            Twitter
                                        </button>
                                        <button
                                            onClick={() => {
                                                const url = window.location.href;
                                                window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
                                                setIsShareMenuOpen(false);
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                                            </svg>
                                            LinkedIn
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                setIsShareMenuOpen(false);
                                                success("Link copied to clipboard");
                                            }}
                                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                        >
                                            <LinkIcon size={16} />
                                            Copy Link
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => setIsReportModalOpen(true)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-50 rounded-full"
                        >
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
                        <ThreadComment
                            key={comment.id}
                            comment={comment}
                            onReply={handleReply}
                            onLike={handleLikeComment}
                            onDelete={handleDeleteCommentClick}
                        />
                    ))}
                </div>
            </div>

            <DeleteModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDeleteComment}
            />

            <ReportModal
                isOpen={isReportModalOpen}
                onClose={() => setIsReportModalOpen(false)}
                targetName={thread.title}
                title="Report Thread"
                description={`Are you sure you want to report the thread "${thread.title}"? Please describe the issue below.`}
            />
        </div>
    );
}
