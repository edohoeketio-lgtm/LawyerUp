"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Send, Paperclip, MoreVertical, Phone, Video, Image as ImageIcon, X, Clock } from "lucide-react";
import { mockConversations, Message } from "@/data/messages";
import { lawyers } from "@/data/lawyers";
import { bookings, getBookingLawyer } from "@/data/bookings";

// Helper to get lawyer details
const getLawyerDetails = (id: string) => {
    // Try to find in lawyers data first
    const lawyer = lawyers.find(l => l.id === id);
    if (lawyer) return lawyer;

    // Fallback Mock
    return {
        id,
        name: "Lawyer",
        image: "/avatars/lawyer_1.png",
        title: "Legal Professional",
        country: "US"
    };
};

export default function ChatPage() {
    const params = useParams();
    const router = useRouter();
    const lawyerId = params?.id as string;

    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isAttaching, setIsAttaching] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const lawyer = getLawyerDetails(lawyerId);

    useEffect(() => {
        if (lawyerId) {
            const conversation = mockConversations.find(c => c.lawyerId === lawyerId);
            if (conversation) {
                // Ensure messages have 'type' and 'isMe' for UI compatibility if data doesn't have it
                // My mock data has senderId: 'me' | lawyerId
                const formattedMessages: Message[] = conversation.messages.map(m => ({
                    ...m,
                    type: "text", // Default to text for compatibility
                    isMe: m.senderId === "me"
                } as any));
                setMessages(formattedMessages);
            } else {
                setMessages([]);
            }
        }
    }, [lawyerId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            senderId: "me",
            content: newMessage,
            timestamp: new Date().toISOString(),
            type: "text",
            isMe: true,
            isRead: true
        };

        setMessages([...messages, msg]);
        setNewMessage("");
    };

    const handleSendImage = () => {
        // Simulate image upload
        const msg: Message = {
            id: Date.now().toString(),
            senderId: "me",
            content: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=400&q=80", // Mock image doc
            timestamp: new Date().toISOString(),
            type: "image",
            isMe: true,
            isRead: true
        };
        setMessages([...messages, msg]);
        setIsAttaching(false);
    };

    if (!lawyer) {
        return <div>Lawyer not found</div>;
    }

    return (
        <div className="flex h-[calc(100vh-120px)] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {/* Chat Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-4">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/bookings" className="text-gray-400 hover:text-gray-600">
                        <ArrowLeft size={20} />
                    </Link>
                    <Link href={`/dashboard/lawyer/${lawyer.id}?source=chat`} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="relative">
                            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-gray-100">
                                <Image src={lawyer.image} alt={lawyer.name} fill className="object-cover" />
                            </div>
                            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500"></span>
                        </div>
                        <div>
                            <h2 className="font-bold text-black">{lawyer.name}</h2>
                            <p className="text-xs text-green-600 font-medium">Online</p>
                        </div>
                    </Link>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="hover:text-gray-600"><MoreVertical size={20} /></button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                        <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${msg.isMe
                            ? "bg-[#013328] text-white rounded-br-none"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                            }`}>
                            {msg.type === 'text' ? (
                                <p className="text-sm">{msg.content}</p>
                            ) : (
                                <div className="relative w-full aspect-square sm:w-64 overflow-hidden rounded-lg">
                                    <Image src={msg.content} alt="Attachment" fill className="object-cover" />
                                </div>
                            )}
                            <p className={`mt-1 text-[10px] ${msg.isMe ? "text-green-200" : "text-gray-400"}`}>
                                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            {/* Input Area or Read-Only Banner */}
            <div className="border-t border-gray-100 bg-white p-4">
                {(() => {
                    // Check booking status
                    const lawyerBookings = bookings
                        .filter(b => b.lawyerId === lawyer.id)
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

                    const latestBooking = lawyerBookings[0];
                    const isArchived = !latestBooking || latestBooking.status === "completed" || latestBooking.status === "cancelled";

                    if (isArchived) {
                        return (
                            <div className="flex flex-col items-center justify-center gap-3 rounded-xl bg-gray-50 py-6 text-center">
                                <div className="rounded-full bg-gray-200 p-2 text-gray-500">
                                    <Clock size={20} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-gray-900">This session has ended</h3>
                                    <p className="text-xs text-gray-500">The conversation is read-only.</p>
                                </div>
                                <Link
                                    href={`/dashboard/lawyer/${lawyer.id}`}
                                    className="mt-1 rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34] transition-colors"
                                >
                                    Book another session
                                </Link>
                            </div>
                        );
                    }

                    return (
                        <>
                            {isAttaching && (
                                <div className="mb-2 flex gap-2 overflow-x-auto p-2">
                                    <button onClick={handleSendImage} className="relative flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-gray-300 bg-gray-50 text-xs text-gray-500 hover:bg-gray-100">
                                        <ImageIcon size={20} />
                                        Send Mock Img
                                    </button>
                                </div>
                            )}

                            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsAttaching(!isAttaching)}
                                    aria-label="Attach image"
                                    className={`rounded-full p-2 transition-colors ${isAttaching ? "bg-gray-100 text-black" : "text-gray-400 hover:bg-gray-100"}`}
                                >
                                    <Paperclip size={20} />
                                </button>
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    placeholder="Type a message..."
                                    className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-[#004d45] focus:bg-white"
                                />
                                <button
                                    type="submit"
                                    aria-label="Send message"
                                    className="rounded-full bg-[#004d45] p-2.5 text-white shadow-sm transition-colors hover:bg-[#003a34]"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </>
                    );
                })()}
            </div>
        </div>
    );
}
