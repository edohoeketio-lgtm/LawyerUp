import { Suspense } from "react";
import ProfileSetupClient from "./ProfileSetupClient";

export const dynamic = "force-dynamic";

export default function ProfileSetupPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <ProfileSetupClient />
        </Suspense>
    );
}
