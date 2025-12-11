"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ChevronLeft, MoreHorizontal, Globe, Linkedin, Clock, CheckCircle,
    Award, ArrowLeft, ArrowRight, Book
} from "lucide-react";
import { getLawyerById, Lawyer } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";
import { lawyers } from "@/data/lawyers";

export default function LawyerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const lawyer = getLawyerById(id);
    const [activeTab, setActiveTab] = useState("Overview");

    if (!lawyer) {
        notFound();
    }

    const similarLawyers = lawyers.filter(l => l.sector === lawyer.sector && l.id !== lawyer.id).slice(0, 2);

    return (
        <div className="space-y-8 pb-12">
            {/* Breadcrumb / Back Navigation */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
                <Link href="/dashboard" className="hover:text-black">Back</Link>
                <ChevronLeft size={14} />
                <Link href="/dashboard/discover" className="hover:text-black">Discover</Link>
                <ChevronLeft size={14} />
                <span className="font-medium text-black">{lawyer.name}</span>
            </div>

            {/* Header Profile Card */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 md:flex md:items-start md:justify-between">
                <div className="flex gap-6">
                    <div className="h-24 w-24 overflow-hidden rounded-full ring-4 ring-gray-50">
                        <img src={lawyer.image} alt={lawyer.name} className="h-full w-full object-cover" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-bold text-black">{lawyer.name}</h1>
                            <span className="text-xl">{getFlag(lawyer.country)}</span>
                        </div>
                        <p className="text-gray-500">{lawyer.title}</p>

                        <div className="mt-4 flex gap-2">
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <Linkedin size={16} />
                            </button>
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200">
                                <Globe size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex gap-3 md:mt-0">
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-center md:text-right">
                        <span className="block text-xs font-medium text-gray-500">Legal Advice</span>
                        <span className="block text-sm font-bold text-[#006056]">${lawyer.consultationPrice}</span>
                    </div>
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-center md:text-right">
                        <span className="block text-xs font-medium text-gray-500">Mentorship</span>
                        <span className="block text-sm font-bold text-[#006056]">${lawyer.mentorshipPrice}</span>
                    </div>
                    <button className="flex items-center justify-center gap-2 rounded-lg bg-[#004d45] px-6 py-2 font-medium text-white hover:bg-[#003a34]">
                        <Book size={18} /> Book a session
                    </button>
                    <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50">
                        <MoreHorizontal size={20} className="text-gray-500" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Content Tabs */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        {["Overview", "Reviews", "Achievements"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 
                                    ${activeTab === tab
                                        ? "border-black text-black"
                                        : "border-transparent text-gray-500 hover:text-black"
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="space-y-8">
                        <div className="prose prose-sm max-w-none text-gray-600">
                            <p>{lawyer.bio} With over a decade of experience in corporate law, I specialize in helping businesses navigate legal complexities, from contract negotiations to regulatory compliance. I've worked with startups, Fortune 500 companies, and international clients, ensuring airtight legal strategies...</p>
                            <button className="font-medium text-[#006056] hover:underline">Show more</button>
                        </div>

                        {/* Background Section */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#006056]">Background</h3>

                            <div className="mb-6">
                                <h4 className="mb-2 text-sm font-medium text-gray-400">Expertise</h4>
                                <div className="flex flex-wrap gap-2">
                                    {lawyer.tags.map(tag => (
                                        <span key={tag} className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{tag}</span>
                                    ))}
                                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">+3</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="mb-2 text-sm font-medium text-gray-400">Discipline</h4>
                                <div className="flex flex-wrap gap-2">
                                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">Mediation & Dispute Resolution</span>
                                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">Contract Drafting</span>
                                    <span className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">+4</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="mb-2 text-sm font-medium text-gray-400">Languages spoken</h4>
                                <div className="flex flex-wrap gap-2">
                                    {lawyer.languages.map(lang => (
                                        <span key={lang} className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">{lang}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Experience Section */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#006056]">Experience</h3>
                            <div className="space-y-4">
                                {lawyer.experience.map((exp, i) => (
                                    <div key={i} className="flex items-start justify-between rounded-lg border border-gray-100 bg-white p-4">
                                        <div className="flex gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-900/10 text-amber-900">
                                                💼
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{exp.role}</h4>
                                                <p className="text-sm text-gray-500">{exp.company}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">{exp.period}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education Section */}
                        <div>
                            <h3 className="mb-4 text-lg font-bold text-[#006056]">Education</h3>
                            <div className="space-y-4">
                                {lawyer.education.map((edu, i) => (
                                    <div key={i} className="flex items-start justify-between rounded-lg border border-gray-100 bg-white p-4">
                                        <div className="flex gap-4">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                                                🎓
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{edu.degree}</h4>
                                                <p className="text-sm text-gray-500">{edu.school}</p>
                                            </div>
                                        </div>
                                        <span className="text-xs font-medium text-gray-400 bg-gray-50 px-2 py-1 rounded">{edu.period}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Right Column: Stats & Similar */}
                <div className="space-y-8">
                    {/* Stats Card */}
                    <div className="rounded-xl border border-gray-100 bg-white p-6">
                        <h3 className="mb-4 font-serif text-lg text-black">Statistics</h3>
                        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-50 rounded-full text-gray-500"><Clock size={20} /></div>
                                <div>
                                    <p className="font-bold text-black text-lg">{lawyer.stats.consultationMinutes}</p>
                                    <p className="text-xs text-gray-500">Total consultation mins</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-gray-50 rounded-full text-gray-500"><Book size={20} /></div>
                                <div>
                                    <p className="font-bold text-black text-lg">{lawyer.stats.mentoringMinutes}</p>
                                    <p className="text-xs text-gray-500">Total mentoring mins</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-green-50 rounded-full text-green-600"><CheckCircle size={20} /></div>
                                <div>
                                    <p className="font-bold text-black text-lg">{lawyer.stats.sessions}</p>
                                    <p className="text-xs text-gray-500">Sessions completed</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-yellow-50 rounded-full text-yellow-600"><Award size={20} /></div>
                                <div>
                                    <p className="font-bold text-black text-lg">24</p>
                                    <p className="text-xs text-gray-500">R.E.P Score</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Available Sessions */}
                    <div className="space-y-4">
                        <h3 className="font-serif text-lg text-black">Available sessions</h3>
                        <p className="text-xs text-gray-500">Book 1:1 sessions from the options based on your needs</p>

                        <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-black">Landlord vs. Tenant: Know Your Legal Rights</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className="bg-[#FFEBC8] text-[#523300] px-2 py-0.5 rounded">Legal advice</span>
                                <span className="flex items-center text-gray-500"><Clock size={12} className="mr-1" /> 60 mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[#006056] text-lg">${lawyer.consultationPrice}</span>
                                <button className="bg-[#003a34] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-black">Book</button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-black">Ethical Dilemmas in Law & How to Handle Them</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded">Mentorship</span>
                                <span className="flex items-center text-gray-500"><Clock size={12} className="mr-1" /> 60 mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[#006056] text-lg">${lawyer.mentorshipPrice}</span>
                                <button className="bg-[#003a34] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-black">Book</button>
                            </div>
                        </div>
                    </div>

                    {/* Similar Lawyers */}
                    <div>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="font-serif text-lg text-black">Similar Lawyer profiles</h3>
                            <div className="flex gap-2">
                                <button className="rounded-full border border-gray-200 p-1.5 hover:bg-gray-50"><ArrowLeft size={16} /></button>
                                <button className="rounded-full border border-gray-200 p-1.5 hover:bg-gray-50"><ArrowRight size={16} /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            {similarLawyers.map(l => (
                                <LawyerCard key={l.id} lawyer={l} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function getFlag(countryCode: string) {
    const flags: { [key: string]: string } = {
        "US": "🇺🇸", "NG": "🇳🇬", "ES": "🇪🇸", "IL": "🇮🇱", "UK": "🇬🇧", "GB": "🇬🇧"
    };
    return flags[countryCode] || "";
}
