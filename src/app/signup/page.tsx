"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
    const [role, setRole] = useState<"client" | "lawyer">("client");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [isValid, setIsValid] = useState(false);

    // Validation Logic
    useEffect(() => {
        const newErrors = {
            name: "",
            email: "",
            password: "",
        };

        let valid = true;

        // Name Validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            valid = false;
        }

        // Password Validation
        const hasNumber = /\d/.test(formData.password);
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(formData.password);

        if (!formData.password) {
            newErrors.password = "Password is required";
            valid = false;
        } else if (!hasNumber || !hasSymbol) {
            newErrors.password = "Password must contain at least one number and one symbol";
            valid = false;
        }

        setErrors(newErrors);
        setIsValid(valid);
    }, [formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isValid) {
            setIsSubmitting(true);
            // Handle valid submission with simulation delay
            console.log("Form submitted", formData, role);

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 2000));

            const encodedName = encodeURIComponent(formData.name);
            router.push(`/otp?name=${encodedName}`);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center bg-white p-4">
            {/* Loading Overlay */}
            {isSubmitting && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-md transition-all duration-500">
                    <div className="flex flex-col items-center gap-2 animate-pulse">
                        <img
                            src="/logo.svg"
                            alt="Lawyer Up Logo"
                            width={60}
                            height={60}
                            className="text-[#013328]"
                        />
                        <span className="font-serif text-sm tracking-widest text-[#013328] uppercase">Lawyer Up</span>
                    </div>
                </div>
            )}

            <div className={`w-full max-w-lg space-y-8 transition-opacity duration-500 ${isSubmitting ? "opacity-50" : "opacity-100"}`}>
                {/* Header */}
                <div className="space-y-2">
                    <h1 className="font-serif text-4xl text-black">Create an account</h1>
                    <p className="font-sans text-sm text-gray-500">
                        Let&apos;s get started on your journey towards well-being.
                    </p>
                </div>

                {/* Role Selection */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-gray-500">
                        What would you like to do on Lawyer Up?
                    </label>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setRole("client")}
                            className={`flex-1 rounded-lg border px-4 py-3 text-sm transition-all ${role === "client"
                                ? "border-green-800 bg-green-50 text-green-900"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            I need legal help
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole("lawyer")}
                            className={`flex-1 rounded-lg border px-4 py-3 text-sm transition-all ${role === "lawyer"
                                ? "border-green-800 bg-green-50 text-green-900"
                                : "border-gray-200 text-gray-600 hover:border-gray-300"
                                }`}
                        >
                            I&apos;m new to practice
                        </button>
                    </div>
                </div>

                {/* Form Inputs */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            First and last name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. Jane Doe"
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-green-800 ${touched.name && errors.name ? "border-red-500" : "border-gray-200"
                                }`}
                        />
                        {touched.name && errors.name && (
                            <p className="text-xs text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-500">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="e.g. janedoe@email.com"
                            className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-green-800 ${touched.email && errors.email ? "border-red-500" : "border-gray-200"
                                }`}
                        />
                        {touched.email && errors.email && (
                            <p className="text-xs text-red-500">{errors.email}</p>
                        )}
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
                                onBlur={handleBlur}
                                placeholder="Enter a strong password"
                                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-green-800 ${touched.password && errors.password ? "border-red-500" : "border-gray-200"
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {touched.password && errors.password && (
                            <p className="text-xs text-red-500">{errors.password}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        className={`w-full rounded-lg py-3 text-sm font-medium text-white transition-colors ${isValid && !isSubmitting ? "bg-[#013334] hover:bg-[#012a2b]" : "bg-[#9CAFA9] cursor-not-allowed"
                            }`}
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </form>

                {/* Footer */}
                <div className="space-y-4">
                    <div className="text-sm text-gray-500">
                        Already have an account?{" "}
                        <Link href="/login" className="font-medium text-[#013328] hover:underline">
                            Login
                        </Link>
                    </div>

                    <p className="text-xs text-gray-500">
                        By continuing, you agree to the{" "}
                        <Link href="/terms" className="font-medium text-gray-900">Terms of use</Link>
                        ,<br />
                        <Link href="/privacy" className="font-medium text-gray-900">Privacy Policy</Link>
                        , and{" "}
                        <Link href="/community" className="font-medium text-gray-900">Community Standards</Link>
                        {" "}of Lawyer Up.
                    </p>
                </div>
            </div>
        </main>
    );
}
