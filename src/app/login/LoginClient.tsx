"use client";

import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { auth } from "@/utils/auth";

export default function LoginClient() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const searchParams = useSearchParams();
    const success = searchParams.get("success");
    const router = useRouter();

    const validateForm = () => {
        if (formData.email.trim() === "" || formData.password.trim() === "") {
            setError("Please fill in all fields.");
            return false;
        }
        setError("");
        return true;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(""); // Clear error on input change
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            // Validate against local users
            auth.login(formData.email, formData.password);

            // Redirect based on role (for demo we just assume client dashboard for now or check user role)
            router.push("/dashboard");
        } catch (err: any) {
            setError(err.message || "Invalid email or password");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center bg-white p-4">
            {/* Success Banner (from Password Update) */}
            {success && (
                <div className="absolute top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-md animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="mx-4 flex items-center justify-center gap-2 rounded-lg bg-[#D1FADF] px-4 py-3 text-sm font-medium text-[#006056] shadow-sm ring-1 ring-[#006056]/10">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#039855] text-white">
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        Your password has been updated successfully!
                    </div>
                </div>
            )}

            {/* Loading Overlay */}
            <div className="w-full max-w-lg space-y-8">
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl text-black">Welcome back!</h1>
                    <p className="font-sans text-sm text-gray-500">
                        Enter your credentials to login to your account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="e.g. janedoe@email.com"
                            className="w-full rounded-lg border border-gray-200 p-3 text-sm outline-none focus:border-[#013328]"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className="w-full rounded-lg border border-gray-200 p-3 pr-10 text-sm outline-none focus:border-[#013328] placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-500">Can&apos;t access your account?</span>
                        <Link href="/recover-password" className="font-medium text-[#006056] hover:underline">
                            Recover password
                        </Link>
                    </div>

                    {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600 border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors ${!isSubmitting ? "bg-[#013328] hover:bg-[#012a2b]" : "bg-[#9CAFA9] cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? "Logging in..." : "Login"}
                    </button>

                    <p className="text-center text-xs text-gray-500">
                        Don&apos;t have an account?{" "}
                        <Link href="/signup" className="font-medium text-[#006056] hover:underline">
                            Create account
                        </Link>
                    </p>

                    <div className="text-xs text-gray-500 mt-8 leading-relaxed">
                        By continuing, you agree to the <Link href="#" className="text-black hover:underline">Terms of use</Link>,
                        <br />
                        <Link href="#" className="text-black hover:underline">Privacy Policy</Link>, and <Link href="#" className="text-black hover:underline">Community Standards</Link> of Lawyer Up.
                    </div>
                </form>
            </div>
        </main>
    );
}


