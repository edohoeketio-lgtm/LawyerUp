"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Conversation, mockConversations } from '@/data/messages';

interface MessageContextType {
    conversations: Conversation[];
    unreadTotal: number;
    markAsRead: (lawyerId: string) => void;
    addMessage: (lawyerId: string, content: string, senderId?: string) => void; // Optional for now
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: React.ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    // Load mock data on client side to avoid hydration mismatch with Dates
    useEffect(() => {
        setConversations(mockConversations);
    }, []);

    const unreadTotal = conversations.reduce((acc, curr) => acc + curr.unreadCount, 0);

    const markAsRead = (lawyerId: string) => {
        setConversations(prev => prev.map(conv => {
            if (conv.lawyerId === lawyerId) {
                return {
                    ...conv,
                    unreadCount: 0,
                    messages: conv.messages.map(m => ({ ...m, isRead: true }))
                };
            }
            return conv;
        }));
    };

    const addMessage = (lawyerId: string, content: string, senderId: string = "me") => {
        setConversations(prev => prev.map(conv => {
            if (conv.lawyerId === lawyerId) {
                const newMessage = {
                    id: Date.now().toString(),
                    senderId,
                    content,
                    timestamp: new Date().toISOString(),
                    isRead: true, // Mine are always read
                    isMe: senderId === "me",
                    type: 'text' as const
                };
                return {
                    ...conv,
                    lastMessage: content,
                    lastMessageDate: "Just now",
                    messages: [...conv.messages, newMessage]
                };
            }
            return conv;
        }));
    };

    return (
        <MessageContext.Provider value={{ conversations, unreadTotal, markAsRead, addMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessages() {
    const context = useContext(MessageContext);
    if (context === undefined) {
        throw new Error('useMessages must be used within a MessageProvider');
    }
    return context;
}
