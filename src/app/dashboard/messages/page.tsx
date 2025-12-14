"use client";

import Link from "next/link";
import Image from "next/image";
import { lawyers } from "@/data/lawyers";
import { Search } from "lucide-react";
import { useState } from "react";
import { useMessages } from "@/context/MessageContext";

export default function MessagesIndexPage() {
    const { conversations } = useMessages();
    const [searchQuery, setSearchQuery] = useState("");
    const [filterType, setFilterType] = useState<"all" | "consultation" | "mentorship">("all");

    const filteredConversations = conversations.filter(conversation => {
        const lawyer = lawyers.find(l => l.id === conversation.lawyerId);
        if (!lawyer) return false;

        const matchesName = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesMessage = conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === "all" || conversation.type === filterType;

        return (matchesName || matchesMessage) && matchesType;
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-3xl font-medium text-black">Messages</h1>
                    <p className="text-sm text-gray-500">Your conversations with lawyers.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Filter Tabs */}
                    <div className="flex rounded-lg bg-gray-100 p-1">
                        <button
                            onClick={() => setFilterType("all")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${filterType === "all"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType("consultation")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${filterType === "consultation"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Legal Advice
                        </button>
                        <button
                            onClick={() => setFilterType("mentorship")}
                            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${filterType === "mentorship"
                                ? "bg-white text-black shadow-sm"
                                : "text-gray-500 hover:text-black"
                                }`}
                        >
                            Mentorship
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-64">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white py-2 pl-10 pr-4 text-sm focus:border-[#004d45] focus:outline-none focus:ring-1 focus:ring-[#004d45]"
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-4">
                {filteredConversations.length > 0 ? (
                    filteredConversations.map((conversation) => {
                        const lawyer = lawyers.find((l) => l.id === conversation.lawyerId);
                        if (!lawyer) return null;

                        return (
                            <Link
                                key={conversation.id}
                                href={`/dashboard/messages/${lawyer.id}`}
                                className="group flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:border-gray-200 hover:shadow-md"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-100">
                                            <Image
                                                src={lawyer.image}
                                                alt={lawyer.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Status Dot */}
                                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <h3 className="font-bold text-black group-hover:text-[#004d45]">
                                                {lawyer.name}
                                            </h3>
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${conversation.type === 'mentorship'
                                                ? 'bg-purple-50 text-purple-700'
                                                : 'bg-blue-50 text-blue-700'
                                                }`}>
                                                {conversation.type === 'mentorship' ? 'Mentorship' : 'Legal Advice'}
                                            </span>
                                        </div>
                                        <p className={`line-clamp-1 text-sm ${conversation.unreadCount > 0 ? "font-semibold text-gray-900" : "text-gray-500"}`}>
                                            {conversation.unreadCount > 0 && <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>}
                                            {conversation.lastMessage}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs text-gray-400">{conversation.lastMessageDate}</span>
                                    {conversation.unreadCount > 0 && (
                                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#004d45] text-[10px] font-medium text-white">
                                            {conversation.unreadCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="py-10 text-center text-gray-500 bg-white rounded-xl border border-gray-100">
                        No messages found matching criteria
                    </div>
                )}
            </div>

            {conversations.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-xl bg-gray-50">
                    <h3 className="text-lg font-bold text-black">No messages yet</h3>
                    <p className="text-gray-500">Book a session to start chatting with a lawyer.</p>
                    <Link href="/dashboard/discover" className="mt-4 rounded-lg bg-[#004d45] px-6 py-2.5 text-sm font-medium text-white hover:bg-[#003a34]">
                        Find a Lawyer
                    </Link>
                </div>
            )}
        </div>
    );
}
