"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { auth, User } from "@/utils/auth";
import ClientDashboard from "./ClientDashboard";
import LawyerDashboard from "./LawyerDashboard";

export default function DashboardClient() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = auth.getSession();
        setUser(session);
        setLoading(false);

        // Listen for auth changes
        const handleAuthChange = () => {
            setUser(auth.getSession());
        };
        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    if (loading) {
        return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    if (!user) {
        // Fallback for unauthenticated access type safety, though generic layout might show guest
        return <ClientDashboard user={null} />;
    }

    // Role-based rendering
    if (user.role === 'lawyer') {
        return <LawyerDashboard user={user} />;
    }

    return <ClientDashboard user={user} />;
}
