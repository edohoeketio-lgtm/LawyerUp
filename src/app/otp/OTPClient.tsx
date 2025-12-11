"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OTPClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const name = searchParams.get("name");
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(299); // 4:59 in seconds
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        // Focus first input on mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

        // Timer logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs.toString().padStart(2, "0")}`;
    };

    const handleChange = (element: HTMLInputElement, index: number) => {
        if (isNaN(Number(element.value))) return false;

        const newOtp = [...otp];
        newOtp[index] = element.value;
        setOtp(newOtp);

        // Focus next input
        if (element.value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            // Focus previous input on backspace if current is empty
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        if (pastedData.every((char) => !isNaN(Number(char)))) {
            const newOtp = [...otp];
            pastedData.forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);
            // Focus the last filled input or the first empty one
            const nextFocus = Math.min(pastedData.length, 5);
            inputRefs.current[nextFocus]?.focus();
        }
    };

    const isComplete = otp.every((digit) => digit !== "");

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="space-y-2">
                    <h1 className="font-serif text-4xl text-black">We sent you a code</h1>
                    <p className="font-sans text-sm text-gray-500">
                        Check your email and type in the code.
                    </p>
                </div>

                <div className="space-y-4">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        Verification Code
                    </label>
                    <div className="flex items-center justify-between gap-4">
                        {/* First Group of 3 */}
                        <div className="flex gap-3">
                            {otp.slice(0, 3).map((digit, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => { inputRefs.current[index] = el }}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onPaste={handlePaste}
                                    className={`h-16 w-14 rounded-xl border text-center text-3xl font-normal outline-none transition-all duration-200 ${digit
                                        ? "border-[#013328] text-[#013328] bg-white"
                                        : "border-gray-200 bg-white text-gray-900"
                                        } focus:border-[#013328] focus:ring-1 focus:ring-[#013328] focus:ring-offset-0`}
                                />
                            ))}
                        </div>

                        <span className="text-gray-300 text-2xl font-light">-</span>

                        {/* Second Group of 3 */}
                        <div className="flex gap-3">
                            {otp.slice(3, 6).map((digit, index) => (
                                <input
                                    key={index + 3}
                                    type="text"
                                    maxLength={1}
                                    ref={(el) => { inputRefs.current[index + 3] = el }}
                                    value={digit}
                                    onChange={(e) => handleChange(e.target, index + 3)}
                                    onKeyDown={(e) => handleKeyDown(e, index + 3)}
                                    onPaste={handlePaste}
                                    className={`h-16 w-14 rounded-xl border text-center text-3xl font-normal outline-none transition-all duration-200 ${digit
                                        ? "border-[#013328] text-[#013328] bg-white"
                                        : "border-gray-200 bg-white text-gray-900"
                                        } focus:border-[#013328] focus:ring-1 focus:ring-[#013328] focus:ring-offset-0`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <p className="text-xs text-gray-500">
                        Didn&apos;t get the code?{" "}
                        <button className="font-serif italic text-sm text-[#013328] hover:underline ml-1">
                            Resend in {formatTime(timeLeft)}
                        </button>
                    </p>

                    <button
                        disabled={!isComplete}
                        onClick={() => {
                            const redirectUrl = name ? `/welcome?name=${encodeURIComponent(name)}` : "/welcome";
                            router.push(redirectUrl);
                        }}
                        className={`w-full rounded-lg py-4 text-sm font-medium text-white transition-all duration-200 ${isComplete ? "bg-[#013328] shadow-lg hover:bg-[#012a2b] hover:shadow-xl" : "bg-[#8CA39D] cursor-not-allowed opacity-80"
                            }`}
                    >
                        Verify account
                    </button>
                </div>
            </div>
        </main>
    );
}


