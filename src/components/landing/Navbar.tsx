"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <Image
                        src="/logo_original.png"
                        alt="Lawyer Up"
                        width={140}
                        height={40}
                        className={`object-contain transition-all ${isScrolled ? "brightness-0" : "brightness-0 invert"}`}
                    />
                </Link>

                {/* Desktop Nav */}
                <div className={`hidden md:flex items-center gap-8 text-sm font-medium ${isScrolled ? "text-gray-600" : "text-white/90"}`}>
                    <Link href="#features" className="hover:text-[#004d45] transition-colors">Features</Link>
                    <Link href="#how-it-works" className="hover:text-[#004d45] transition-colors">How it works</Link>
                    <Link href="#for-lawyers" className="hover:text-[#004d45] transition-colors">For Lawyers</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/login"
                        className={`text-sm font-medium transition-colors ${isScrolled ? "text-gray-900 hover:text-[#004d45]" : "text-white hover:text-white/80"}`}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${isScrolled
                            ? "bg-[#004d45] text-white hover:bg-[#003a34]"
                            : "bg-white text-[#004d45] hover:bg-gray-100"
                            }`}
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className={`md:hidden ${isScrolled ? "text-black" : "text-white"}`}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden shadow-xl animate-in fade-in slide-in-from-top-4">
                    <div className="flex flex-col space-y-4">
                        <Link href="#features" className="text-gray-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Features</Link>
                        <Link href="#how-it-works" className="text-gray-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>How it works</Link>
                        <hr className="border-gray-100" />
                        <Link href="/login" className="text-gray-900 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Log in</Link>
                        <Link
                            href="/signup"
                            className="bg-[#004d45] text-white px-4 py-3 rounded-lg text-center font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
