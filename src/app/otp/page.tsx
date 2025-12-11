import { Suspense } from "react";
import OTPClient from "./OTPClient";

export const dynamic = "force-dynamic";

export default function OTPPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <OTPClient />
        </Suspense>
    );
}
