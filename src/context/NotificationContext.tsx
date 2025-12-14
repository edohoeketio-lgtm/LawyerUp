"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
    id: number;
    type: string;
    text: string;
    time: string;
    unread: boolean;
    detail?: string;
    link?: string;
}

// Initial Mock Data
const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 1,
        type: 'booking',
        text: "Upcoming Session: 'Landlord Dispute' starts in 1 hour",
        time: "Just now",
        unread: true,
        detail: "Prepare your documents for the session with Barr. Sarah Jenkins.",
        link: "/dashboard/bookings"
    },
    {
        id: 2,
        type: 'message',
        text: "New message from Barr. Sarah James regarding your case",
        time: "25 mins ago",
        unread: true,
        detail: "Sarah: 'Please review the attached contract draft when you have a moment.'",
        link: "/dashboard/messages"
    },
    {
        id: 3,
        type: 'system',
        text: "Payment successful for session with Adv. Michael",
        time: "2 hours ago",
        unread: false,
        detail: "Transaction ID: #TXN-8842-221. Amount: $120.00",
        link: "/dashboard/account"
    },
    {
        id: 4,
        type: 'system',
        text: "Action Required: Verify your email to enable video calls",
        time: "1 day ago",
        unread: false,
        detail: "We need to verify your email address (john@example.com) to ensure secure communications.",
        link: "/dashboard/account"
    },
    {
        id: 5,
        type: 'security',
        text: "New login attempt detected",
        time: "2 days ago",
        unread: false,
        detail: "We detected a login from a new device (MacBook Pro) in London, UK.",
        link: "/dashboard/account/settings"
    },
    {
        id: 6,
        type: 'system',
        text: "Your profile is 80% complete",
        time: "3 days ago",
        unread: false,
        detail: "Add your legal interests to get better recommendations.",
        link: "/dashboard/account"
    }
];

interface NotificationContextType {
    notifications: Notification[];
    unreadCount: number;
    markAsRead: (id: number) => void;
    markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // Initialize with mock data on mount to avoid hydration mismatch
    useEffect(() => {
        setNotifications(MOCK_NOTIFICATIONS);
    }, []);

    const unreadCount = notifications.filter(n => n.unread).length;

    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    };

    return (
        <NotificationContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
            {children}
        </NotificationContext.Provider>
    );
}

export function useNotifications() {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
}
