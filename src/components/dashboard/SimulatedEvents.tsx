"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/context/ToastContext";
import { MessageSquare } from "lucide-react";

export default function SimulatedEvents() {
    const { addToast } = useToast();
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Only trigger once per session/reload to avoid annoyance
        if (hasTriggered) return;

        const timer = setTimeout(() => {
            addToast(
                "New message from Sarah: 'I've reviewed the documents...'",
                "info",
                "/dashboard/messages"
            );
            setHasTriggered(true);
        }, 15000); // Trigger after 15 seconds

        return () => clearTimeout(timer);
    }, [addToast, hasTriggered]);

    return null; // Invisible component
}
