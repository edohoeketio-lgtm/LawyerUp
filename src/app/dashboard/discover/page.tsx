import { Suspense } from "react";
import DiscoverClient from "./DiscoverClient";

export const dynamic = "force-dynamic";

export default function DiscoverPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <DiscoverClient />
        </Suspense>
    );
}
