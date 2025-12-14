"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle, Scale, Shield, Users } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

export default function LawyerLandingPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-8">
                            <h1 className="font-serif text-5xl font-medium leading-tight text-black sm:text-6xl">
                                Grow your practice. <br />
                                <span className="text-[#004d45]">Mentor the next generation.</span>
                            </h1>
                            <p className="text-lg text-gray-600">
                                Join the premier network of legal professionals. Connect with clients seeking your expertise and shape the future of law by mentoring aspiring attorneys.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Link
                                    href="/signup?role=lawyer"
                                    className="inline-flex items-center justify-center rounded-xl bg-[#004d45] px-8 py-4 text-base font-medium text-white transition-all hover:bg-[#003a34] hover:shadow-lg hover:shadow-[#004d45]/20"
                                >
                                    Join as a Lawyer
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href="/login"
                                    className="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-8 py-4 text-base font-medium text-gray-900 transition-all hover:border-gray-300 hover:bg-gray-50"
                                >
                                    Log in
                                </Link>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-gray-200">
                                            <Image
                                                src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=100&h=100&fit=crop`}
                                                alt="Member"
                                                width={32}
                                                height={32}
                                                className="h-full w-full rounded-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                                <p>Join 2,000+ top legal professionals</p>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-2xl">
                                <Image
                                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80"
                                    alt="Lawyer working"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            {/* Floating Stats */}
                            <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-6 shadow-xl">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-green-600">
                                        <Scale size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Client Matches</p>
                                        <p className="text-2xl font-bold text-gray-900">150+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="bg-gray-50 py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <h2 className="font-serif text-3xl font-medium text-black sm:text-4xl">Why join LawyerUp?</h2>
                        <p className="mt-4 text-gray-600">Built for the modern legal professional.</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F0EE] text-[#006056]">
                                <Users size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">High-Quality Leads</h3>
                            <p className="text-gray-600">
                                Get matched with clients who specifically need your expertise. No more cold calling or vetting low-quality inquiries.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F0EE] text-[#006056]">
                                <Shield size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Verified & Trusted</h3>
                            <p className="text-gray-600">
                                Our verification process builds trust instantly. Showcase your Bar credentials and stand out to potential clients.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-white p-8 shadow-sm">
                            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#E6F0EE] text-[#006056]">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-gray-900">Mentorship Impact</h3>
                            <p className="text-gray-600">
                                Give back to the community by mentoring law students and junior associates. Build your reputation as a thought leader.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
