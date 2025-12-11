"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpdatePasswordPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });

    // Derived Validation
    const { password, confirmPassword } = formData;
    const hasLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const passwordsMatch = password === confirmPassword && password !== "";
    const isValid = hasLength && hasNumber && hasSymbol && passwordsMatch;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!isValid) return;
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/login?success=true");
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-white p-4">
            <div className="w-full max-w-lg space-y-8">
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl text-black">Update your password</h1>
                    <p className="font-sans text-sm text-gray-500">
                        Choose a strong password with at least 8 characters, including letters, numbers, and symbols.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a strong password"
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

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter a strong password"
                                className="w-full rounded-lg border border-gray-200 p-3 pr-10 text-sm outline-none focus:border-[#013328] placeholder-gray-400"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!isValid}
                        className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors ${isValid ? "bg-[#9daea9] hover:bg-[#8c9f99]" : "bg-[#9CAFA9] cursor-not-allowed" // Using a slightly different active color per screenshot hint or standard
                            } ${isValid ? "!bg-[#013328] hover:!bg-[#012a2b]" : ""}`} // Overriding to match designs
                    >
                        Update password
                    </button>
                </div>
            </div>
        </main>
    );
}
