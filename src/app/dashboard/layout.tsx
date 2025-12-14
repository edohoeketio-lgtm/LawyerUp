"use client";

import { Suspense, useState } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

import SimulatedEvents from "@/components/dashboard/SimulatedEvents";
import { ToastProvider } from "@/context/ToastContext";
import { MessageProvider } from "@/context/MessageContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <ToastProvider>
                <MessageProvider>
                    <NotificationProvider>
                        <Suspense>
                            <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
                        </Suspense>
                        <div className="flex min-h-screen flex-col md:ml-64">
                            <Suspense>
                                <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
                            </Suspense>
                            <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                                <div className="flex-1 p-8">
                                    {children}
                                    <Suspense fallback={null}>
                                        <SimulatedEvents />
                                    </Suspense>
                                </div>
                            </main>
                        </div>
                    </NotificationProvider>
                </MessageProvider>
            </ToastProvider>
        </div>
    );
}
