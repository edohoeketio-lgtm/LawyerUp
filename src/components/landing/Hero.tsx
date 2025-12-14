"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-[#013328]">
            {/* Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url('/pattern-grid.png')", // Assuming we might have a pattern or just noise
                        backgroundSize: "40px 40px"
                    }}
                ></div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#013328]/0 to-[#013328]"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#9FFF6F] text-xs font-bold uppercase tracking-wider border border-white/5">
                        <span className="w-2 h-2 rounded-full bg-[#9FFF6F] animate-pulse"></span>
                        Trusted by 5,000+ Clients
                    </div>

                    <h1 className="text-5xl lg:text-7xl font-serif text-white leading-[1.1]">
                        Justice, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9FFF6F] to-[#4ADE80]">Simplified.</span>
                    </h1>

                    <p className="text-lg text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                        Connect with verified top-tier lawyers for instant legal advice,
                        or find a mentor to guide your legal career. All in one secure platform.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                        <Link
                            href="/signup"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#9FFF6F] text-[#013328] font-bold text-lg hover:bg-[#8AFE5A] transition-all transform hover:scale-105 shadow-xl shadow-green-900/20 flex items-center justify-center gap-2"
                        >
                            Find a Lawyer <ArrowRight size={20} />
                        </Link>
                        <Link
                            href="/lawyer"
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10"
                        >
                            I'm a Lawyer
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#9FFF6F]" />
                            <span>Verified Experts</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#9FFF6F]" />
                            <span>Secure & Private</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 size={16} className="text-[#9FFF6F]" />
                            <span>Transparent Pricing</span>
                        </div>
                    </div>
                </div>

                {/* Hero Image / Graphic */}
                <div className="relative hidden lg:block h-[600px] w-full">
                    {/* Abstract Shapes */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#9FFF6F]/20 rounded-full blur-3xl animate-pulse"></div>

                    {/* App Mockup Placeholder - We can use a generated image here or a CSS composition */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-[380px] h-[780px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden transform rotate-[-6deg] hover:rotate-0 transition-all duration-700">
                            {/* Screen Content Mock */}
                            <div className="absolute inset-0 bg-white flex flex-col">
                                <div className="h-14 bg-[#013328] flex items-center justify-between px-4 pb-2 pt-6">
                                    <div className="w-16 h-4 bg-white/20 rounded"></div>
                                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                                </div>
                                <div className="p-4 space-y-4 bg-gray-50 flex-1">
                                    <div className="space-y-2">
                                        <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                                        <div className="h-20 w-full bg-white rounded-xl shadow-sm"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="h-32 bg-white rounded-xl shadow-sm"></div>
                                        <div className="h-32 bg-white rounded-xl shadow-sm"></div>
                                    </div>
                                    <div className="h-12 bg-[#004d45] rounded-lg mt-auto mx-auto w-1/2 opacity-20"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
