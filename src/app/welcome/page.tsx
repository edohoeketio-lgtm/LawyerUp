import { Suspense } from "react";
import WelcomeClient from "./WelcomeClient";

export const dynamic = "force-dynamic";

export default function WelcomePage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <WelcomeClient />
        </Suspense>
    );
}
