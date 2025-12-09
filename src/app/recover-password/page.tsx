"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RecoverPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");

    const handleSubmit = async () => {
        if (!email) return;
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/update-password");
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl text-black">Recover password</h1>
                    <p className="font-sans text-sm text-gray-500">
                        Don&apos;t worry, happens to the best of us.<br />
                        Enter your email and we&apos;ll send the instruction.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="e.g. janedoe@email.com"
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#013328]"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!email}
                        className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors ${email ? "bg-[#9daea9] hover:bg-[#8c9f99]" : "bg-[#9CAFA9] cursor-not-allowed" // Initial active state color to match screenshot hint if any, or reusing design system
                            } ${email ? "!bg-[#9daea9]" : ""}`} // Adjusted to match the greyish-green in screenshot. Actually, let's use the standard primary if filled, but the screenshot shows a muted green. I'll stick to the system green for consistency or the specific hex if visible. The screenshot button is disabled-looking grey. Let's use the standard disabled/active logic.
                    >
                        Recover password
                    </button>
                    {/* Re-styling button to match screenshot specifically: Looks like #9CAFA9 when active/hover? Or maybe standard green. I will use standard green for active state for consistency, unless directed otherwise. Wait, the screenshot shows "Recover password" button as greyish. It might be the disabled state. I will use standard active green. */}

                    <p className="text-center text-xs text-gray-500">
                        Oh I remember my password now!{" "}
                        <Link href="/login" className="font-medium text-[#006056] hover:underline">
                            Go back to Login
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
