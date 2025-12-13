import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[#FAFAFA]">
            <Sidebar />
            <div className="ml-64 flex min-h-screen flex-col">
                <Suspense>
                    <TopBar />
                </Suspense>
                <main className="flex-1 p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
