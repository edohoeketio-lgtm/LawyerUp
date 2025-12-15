"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useSearchParams } from "next/navigation";
import {
    ChevronLeft, MoreHorizontal, Globe, Linkedin,
    ArrowLeft, ArrowRight, Star, ChevronDown, Clock,
    Medal, ExternalLink, Info, Award, MessageSquare, Heart,
    MapPin, Shield, ChevronRight, Share2, Flag, CheckCircle, Calendar, Edit
} from "lucide-react";
import { auth, User } from "@/utils/auth";
import { getLawyerById, Lawyer } from "@/data/lawyers";
import { useToast } from "@/context/ToastContext";
import LawyerCard from "@/components/LawyerCard";
import BookingModal from "@/components/BookingModal";
import ReportModal from "../../../../components/ReportModal";
import Breadcrumbs from "@/components/Breadcrumbs";
import { lawyers } from "@/data/lawyers";

export default function LawyerDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { success } = useToast();

    // Try to find in static data first, then local storage
    let lawyer: any = getLawyerById(id);
    if (!lawyer && typeof window !== 'undefined') {
        const localUser = auth.getUsers().find(u => u.id === id);
        if (localUser) {
            lawyer = {
                id: localUser.id,
                name: `${localUser.firstName} ${localUser.lastName}`,
                image: "/avatars/user_dp.png",
                sector: localUser.jobTitle || "General Practice",
                title: localUser.jobTitle || "Lawyer",
                country: localUser.barState || "US",
                countryName: "United States",
                stats: { sessions: 0, reviews: 0, consultationMinutes: 0, mentoringMinutes: 0 },
                tags: localUser.legalInterests || [],
                bio: localUser.bio || "No bio available.",
                consultationPrice: localUser.consultationPrice || 0,
                mentorshipPrice: localUser.mentorshipPrice || 0,
                languages: localUser.languages || ["English"],
                experience: [],
                education: [],
                reviews: [],
                achievements: [],
                services: localUser.services || []
            };
        }
    }
    const searchParams = useSearchParams();
    const source = searchParams.get("source");

    const [user, setUser] = useState<User | null>(null);

    const [activeTab, setActiveTab] = useState("Overview");
    const [showMoreMenu, setShowMoreMenu] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingParams, setBookingParams] = useState<{ topic?: string, description?: string }>({});
    const [reportReason, setReportReason] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);


    useEffect(() => {
        setUser(auth.getSession());
        const handleAuthChange = () => {
            setUser(auth.getSession());
        };
        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    const toggleBookmark = (lawyerId: string) => {
        if (!user) return;
        const currentBookmarks = user.bookmarkedLawyerIds || [];
        const isBookmarked = currentBookmarks.includes(lawyerId);

        let newBookmarks;
        if (isBookmarked) {
            newBookmarks = currentBookmarks.filter(id => id !== lawyerId);
        } else {
            newBookmarks = [...currentBookmarks, lawyerId];
        }

        auth.updateUser({ bookmarkedLawyerIds: newBookmarks });
        setUser({ ...user, bookmarkedLawyerIds: newBookmarks });
    };

    const isBookmarked = user?.bookmarkedLawyerIds?.includes(lawyer?.id || "");

    if (!lawyer) {
        notFound();
    }

    // Normalize sector for comparison (some might be "Criminal Defense" vs "Criminal Defense Attorney")
    // Normalize sector for comparison
    const similarLawyers = lawyers.filter(l => {
        if (l.id === lawyer.id) return false;
        return l.sector === lawyer.sector;
    }).slice(0, 2);

    return (
        <div className="space-y-8 pb-12">
            <BookingModal
                lawyer={lawyer}
                isOpen={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                initialTopic={bookingParams.topic}
                initialDescription={bookingParams.description}
            />
            {/* Breadcrumb / Back Navigation */}
            <Breadcrumbs
                items={[
                    { label: "Discover", href: "/dashboard/discover" + (searchParams.get("view") ? "?view=" + searchParams.get("view") : "") },
                    { label: lawyer.name }
                ]}
            />

            {/* Header Profile Card */}
            <div className="rounded-xl border border-gray-100 bg-white p-6 md:flex md:items-start md:justify-between">
                <div className="flex gap-6">
                    <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-gray-50">
                        <Image src={lawyer.image} alt={lawyer.name} fill className="object-cover" />
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
                    {/* CTA Button Logic */}
                    {user?.id === lawyer.id ? (
                        <div className="flex gap-2">
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/dashboard/lawyer/${user?.id}`);
                                    success("Profile link copied to clipboard!");
                                }}
                                className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 hover:bg-gray-50"
                            >
                                <Share2 size={18} /> Share
                            </button>
                            <button
                                onClick={() => document.getElementById("edit-profile-trigger")?.click() || window.dispatchEvent(new CustomEvent('open-edit-profile'))}
                                className="flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-6 py-2 font-medium text-white hover:bg-gray-800"
                            >
                                <Edit size={18} /> Edit Profile
                            </button>
                        </div>
                    ) : user?.role === "lawyer" ? (
                        /* Read-Only View for Competitor Analysis */
                        <div className="flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-6 py-2 font-medium text-gray-500 cursor-default">
                            <span className="text-xs">Competitor View (Read Only)</span>
                        </div>
                    ) : source === "chat" ? (
                        <Link
                            href={`/dashboard/messages/${lawyer.id}`}
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#004d45] px-6 py-2 font-medium text-white hover:bg-[#003a34]"
                        >
                            <MessageSquare size={18} /> Chat
                        </Link>
                    ) : (
                        <button
                            onClick={() => setShowBookingModal(true)}
                            className="flex items-center justify-center gap-2 rounded-lg bg-[#004d45] px-6 py-2 font-medium text-white hover:bg-[#003a34]"
                        >
                            <Image src="/icons/bookings.svg" alt="Book" width={18} height={18} className="h-[18px] w-[18px] object-contain" /> Book a session
                        </button>
                    )}

                    {/* Bookmark Button */}
                    <button
                        onClick={() => toggleBookmark(lawyer.id)}
                        className={`flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 bg-white transition-colors
                            ${isBookmarked ? "text-red-500 border-red-100 bg-red-50 hover:bg-red-100" : "text-gray-500"}
                        `}
                    >
                        <Heart size={20} fill={isBookmarked ? "currentColor" : "none"} />
                    </button>

                    <div className="relative">
                        <button
                            onClick={() => setShowMoreMenu(!showMoreMenu)}
                            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 hover:bg-gray-50 bg-white"
                        >
                            <MoreHorizontal size={20} className="text-gray-500" />
                        </button>

                        {showMoreMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMoreMenu(false)}
                                />
                                <div className="absolute right-0 top-full z-20 mt-2 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-black/5">
                                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-black hover:bg-gray-50">
                                        <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white">
                                            <Linkedin size={14} fill="currentColor" className="stroke-0" />
                                        </div>
                                        Share on LinkedIn
                                    </button>
                                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-black hover:bg-gray-50">
                                        <div className="flex h-6 w-6 items-center justify-center rounded bg-black text-white">
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231h0.001zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
                                            </svg>
                                        </div>
                                        Post this X
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowMoreMenu(false);
                                            setShowReportModal(true);
                                        }}
                                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50"
                                    >
                                        <div className="flex h-6 w-6 items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                                                <line x1="4" y1="22" x2="4" y2="15" />
                                            </svg>
                                        </div>
                                        Report profile
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Report Modal */}
            {showReportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="mb-2 text-xl font-bold text-black">Report Profile</h3>
                        <p className="mb-6 text-sm text-gray-500">
                            Please select a reason for reporting this profile. This will be reviewed by our trust and safety team.
                        </p>

                        <div className="space-y-3">
                            {["Fake profile or impersonation", "Inappropriate content", "Harassment or bullying", "Scam or fraud", "Other"].map((reason) => (
                                <div key={reason}>
                                    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50">
                                        <input
                                            type="radio"
                                            name="report_reason"
                                            className="h-4 w-4 border-gray-300 text-[#004d45] focus:ring-[#006056]"
                                            checked={reportReason === reason}
                                            onChange={() => setReportReason(reason)}
                                        />
                                        <span className="text-sm font-medium text-gray-700">{reason}</span>
                                    </label>
                                    {reason === "Other" && reportReason === "Other" && (
                                        <textarea
                                            className="mt-2 w-full rounded-lg border border-gray-200 p-2 text-sm focus:border-[#006056] focus:outline-none focus:ring-1 focus:ring-[#006056]"
                                            placeholder="Please provide more details..."
                                            rows={3}
                                            onClick={(e) => e.stopPropagation()} // Prevent bubbling if needed
                                        ></textarea>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowReportModal(false);

                                    // Block the lawyer locally
                                    const blocked = JSON.parse(localStorage.getItem("blockedLawyers") || "[]");
                                    if (!blocked.includes(lawyer.id)) {
                                        blocked.push(lawyer.id);
                                        localStorage.setItem("blockedLawyers", JSON.stringify(blocked));
                                    }

                                    alert("Report submitted. You will no longer see this profile.");
                                    success("Report submitted. You will no longer see this profile.");
                                    window.location.href = "/dashboard"; // Force reload/redirect to clear state
                                }}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                            >
                                Submit Report
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Left Column: Content Tabs */}
                <div className="lg:col-span-3 space-y-8">
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
                    <div className="min-h-[400px]">
                        {activeTab === "Overview" && <OverviewTab lawyer={lawyer} similarLawyers={similarLawyers} setActiveTab={setActiveTab} onBook={(t, d) => { setBookingParams({ topic: t, description: d }); setShowBookingModal(true); }} user={user} toggleBookmark={toggleBookmark} />}
                        {activeTab === "Reviews" && <ReviewsTab lawyer={lawyer} />}
                        {activeTab === "Achievements" && <AchievementsTab lawyer={lawyer} />}
                    </div>
                </div>
            </div>
        </div>
    );
}

function OverviewTab({ lawyer, similarLawyers, onBook, user, toggleBookmark }: { lawyer: Lawyer, similarLawyers: Lawyer[], activeTab?: string, setActiveTab: (tab: string) => void, onBook: (topic?: string, description?: string) => void, user: User | null, toggleBookmark: (id: string) => void }) {
    // Note: setActiveTab kept in interface for compatibility
    const [showRepInfo, setShowRepInfo] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Truncation logic
    const MAX_BIO_LENGTH = 150;
    const shouldTruncate = lawyer.bio.length > MAX_BIO_LENGTH;
    const displayBio = isExpanded || !shouldTruncate ? lawyer.bio : `${lawyer.bio.slice(0, MAX_BIO_LENGTH)}...`;

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                <div className="prose prose-sm max-w-none text-gray-600">
                    <p>{displayBio}</p>
                    {shouldTruncate && (
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="font-medium text-[#006056] hover:underline mt-1"
                        >
                            {isExpanded ? "Show less" : "Show more"}
                        </button>
                    )}
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

            {/* Right Column: Stats & Similar */}
            <div className="space-y-8">
                {/* Stats Card */}
                <div className="rounded-xl border border-gray-100 bg-white p-6">
                    <h3 className="mb-4 font-serif text-lg text-black">Statistics</h3>
                    <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div className="flex items-start gap-3">
                            <div className="relative h-10 w-10 shrink-0">
                                <Image src="/icons/stat-stopwatch.png" alt="Consultation" fill className="object-contain" />
                            </div>
                            <div>
                                <p className="font-bold text-black text-lg">{lawyer.stats.consultationMinutes}</p>
                                <p className="text-xs text-gray-500">Total consultation mins</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="relative h-10 w-10 shrink-0">
                                <Image src="/icons/stat-books.png" alt="Mentoring" fill className="object-contain" />
                            </div>
                            <div>
                                <p className="font-bold text-black text-lg">{lawyer.stats.mentoringMinutes}</p>
                                <p className="text-xs text-gray-500">Total mentoring mins</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="relative h-10 w-10 shrink-0">
                                <Image src="/icons/stat-check.png" alt="Sessions" fill className="object-contain" />
                            </div>
                            <div>
                                <p className="font-bold text-black text-lg">{lawyer.stats.sessions}</p>
                                <p className="text-xs text-gray-500">Sessions completed</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 relative" onMouseLeave={() => setShowRepInfo(false)}>
                            <div className="relative h-10 w-10 shrink-0">
                                <Image src="/icons/stat-medal.png" alt="R.E.P Score" fill className="object-contain" />
                            </div>
                            <div>
                                <p className="font-bold text-black text-lg">
                                    {lawyer.reviews && lawyer.reviews.length > 0
                                        ? Math.round(lawyer.reviews.reduce((acc, r) => acc + r.rating, 0) / lawyer.reviews.length * 20)
                                        : "N/A"}
                                </p>
                                <div className="flex items-center gap-1">
                                    <p className="text-xs text-gray-500">R.E.P Score</p>
                                    <button onClick={() => setShowRepInfo(true)} className="text-gray-400 hover:text-gray-600">
                                        <Info size={12} />
                                    </button>
                                </div>
                                {showRepInfo && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-10 text-center">
                                        Reliability, Expertise, and Professionalism Score based on client feedback (0-100).
                                        {/* Arrow */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Available Sessions */}
                <div className="space-y-4">
                    <h3 className="font-serif text-lg text-black">Available sessions</h3>
                    <p className="text-xs text-gray-500">Book 1:1 sessions from the options based on your needs</p>

                    {/* Dynamic Services */}
                    {lawyer.services?.map((service: any) => (
                        <div key={service.id} className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-black">{service.title}</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className={`px-2 py-0.5 rounded ${service.type === 'mentorship' ? 'bg-pink-100 text-pink-800' : 'bg-[#FFEBC8] text-[#523300]'}`}>
                                    {service.type === 'mentorship' ? 'Mentorship' : 'Legal advice'}
                                </span>
                                <span className="flex items-center text-gray-500"><Clock size={12} className="mr-1" /> {service.duration} mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[#006056] text-lg">${service.price}</span>
                                {user?.role !== "lawyer" && (
                                    <button
                                        onClick={() => onBook(service.title, service.description)}
                                        className="bg-[#004d45] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#003a34]"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                            <p className="mt-2 text-xs text-gray-500 line-clamp-2">{service.description}</p>
                        </div>
                    ))}

                    {/* Fallback Legacy Services (Generic) */}
                    {(!lawyer.services || lawyer.services.length === 0) && lawyer.consultationPrice > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-black">General Consultation</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className="bg-[#FFEBC8] text-[#523300] px-2 py-0.5 rounded">Legal advice</span>
                                <span className="flex items-center text-gray-500"><Clock size={12} className="mr-1" /> 60 mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[#006056] text-lg">${lawyer.consultationPrice}</span>
                                {user?.role !== "lawyer" && (
                                    <button
                                        onClick={() => onBook("General Consultation", "Standard consultation session with " + lawyer.name)}
                                        className="bg-[#004d45] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#003a34]"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {(!lawyer.services || lawyer.services.length === 0) && lawyer.mentorshipPrice > 0 && (
                        <div className="rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-[#006056] hover:shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <h4 className="font-bold text-sm text-black">Mentorship Session</h4>
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-xs">
                                <span className="bg-pink-100 text-pink-800 px-2 py-0.5 rounded">Mentorship</span>
                                <span className="flex items-center text-gray-500"><Clock size={12} className="mr-1" /> 60 mins</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-bold text-[#006056] text-lg">${lawyer.mentorshipPrice}</span>
                                {user?.role !== "lawyer" && (
                                    <button
                                        onClick={() => onBook("Mentorship Session", "Mentorship session with " + lawyer.name)}
                                        className="bg-[#004d45] text-white text-xs font-medium px-4 py-2 rounded-lg hover:bg-[#003a34]"
                                    >
                                        Book
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Similar Lawyers */}
                {similarLawyers.length > 0 && (
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
                                <LawyerCard
                                    key={l.id}
                                    lawyer={l}
                                    isBookmarked={user?.bookmarkedLawyerIds?.includes(l.id)}
                                    onToggleBookmark={toggleBookmark}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ReviewsTab({ lawyer }: { lawyer: Lawyer }) {
    const [showReviewInfo, setShowReviewInfo] = useState(false);
    const [visibleCount, setVisibleCount] = useState(4); // Start with 4 reviews

    if (!lawyer.reviews || lawyer.reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                    <Star size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-black">No reviews found</h3>
                <p className="text-gray-500">This lawyer has no reviews yet</p>
            </div>
        );
    }

    // Dynamic calculations
    const totalReviews = lawyer.reviews.length;
    const averageRating = lawyer.reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews;
    const satisfactionPercentage = Math.round((lawyer.reviews.filter(r => r.rating >= 4).length / totalReviews) * 100);

    const visibleReviews = lawyer.reviews.slice(0, visibleCount);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">
            {/* Left Sidebar: Ratings & Skills */}
            <div className="lg:col-span-4 space-y-8">
                <div>
                    <div className="flex items-end gap-2">
                        <h2 className="text-4xl font-bold text-black">{averageRating.toFixed(1)}</h2>
                        <div className="flex flex-col mb-1">
                            <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill="currentColor"
                                        className={i < Math.round(averageRating) ? "text-yellow-400" : "text-gray-200"}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-black">{satisfactionPercentage}%</h3>
                    <p className="text-gray-500 text-sm">of users are satisfied with this lawyer</p>
                </div>

                <div className="space-y-6">
                    {[
                        { label: "Communication", score: 98, icon: "🗣️" },
                        { label: "Problem Solving", score: 92, icon: "🧠" },
                        { label: "Subject Knowledge", score: 100, icon: "📚" },
                        { label: "Professionalism", score: 95, icon: "🤝" }
                    ].map((skill, index) => (
                        <div key={index}>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm">{skill.icon}</span>
                                <span className="text-sm font-bold text-gray-700">{skill.label}</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-[#006056]"
                                    style={{ width: `${skill.score}%` }}
                                />
                            </div>
                            <div className="text-right mt-1">
                                <span className="text-xs font-bold text-black">{skill.score}%</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Content: Reviews List */}
            <div className="lg:col-span-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-4">
                        <h3 className="text-lg font-bold text-black">{totalReviews} Reviews</h3>
                        <button
                            onClick={() => setShowReviewInfo(true)}
                            className="hidden md:block text-sm text-gray-500 underline hover:text-black"
                        >
                            Learn how reviews work
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleReviews.map((review) => (
                        <div key={review.id} className="rounded-xl border border-gray-100 bg-white p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${review.userColor} text-white font-bold`}>
                                        {review.userInitial}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-black text-sm">{review.userName}</h4>
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={12}
                                                    fill="currentColor"
                                                    className={i < review.rating ? "text-yellow-400" : "text-gray-200"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <span className="text-xs text-gray-400">{review.timeAgo}</span>
                            </div>
                            <div className="mt-2 mb-3">
                                <span className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded ${review.tag === "Legal advice" ? "bg-[#FFEBC8] text-[#523300]" : "bg-pink-100 text-pink-800"
                                    }`}>
                                    {review.tag}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 line-clamp-3">
                                {review.content}
                            </p>
                        </div>
                    ))}
                </div>

                {visibleCount < totalReviews && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setVisibleCount(prev => prev + 4)}
                            className="rounded-lg border border-gray-200 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                        >
                            Show more <ChevronDown size={14} />
                        </button>
                    </div>
                )}
            </div>

            {/* Review Info Modal */}
            {showReviewInfo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setShowReviewInfo(false)}>
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-bold text-black">How Reviews Work</h3>
                            <button onClick={() => setShowReviewInfo(false)} className="text-gray-400 hover:text-black">
                                <span className="sr-only">Close</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                        <div className="space-y-4 text-sm text-gray-600">
                            <p>
                                At LawyerUp, we take trust seriously. Here&apos;s how our review process works to ensure authenticity:
                            </p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li><strong>Verified Sessions Only:</strong> Reviews can only be submitted by clients who have completed a booked session with the lawyer.</li>
                                <li><strong>Independent Feedback:</strong> Lawyers cannot edit or delete reviews. We only remove content that violates our community guidelines (e.g., hate speech).</li>
                                <li><strong>Anonymity Options:</strong> Clients can choose to display their initials instead of their full name for privacy.</li>
                            </ul>
                            <p className="pt-2">
                                This ensures that the ratings you see reflect genuine client experiences.
                            </p>
                        </div>
                        <div className="mt-6">
                            <button
                                onClick={() => setShowReviewInfo(false)}
                                className="w-full rounded-lg bg-[#006056] py-2 font-medium text-white hover:bg-[#004d45]"
                            >
                                Got it
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function AchievementsTab({ lawyer }: { lawyer: Lawyer }) {
    if (!lawyer.achievements || lawyer.achievements.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                    <Medal size={48} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-bold text-black">No achievements found</h3>
                <p className="text-gray-500">This lawyer has no achievements yet</p>
            </div>
        );
    }

    const getIcon = (type: string) => {
        // const size = 40; // removed unused

        switch (type) {
            // Mapping new 3D icons to types
            case "consultation_blue":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-stopwatch-blue.png" alt="Icon" fill className="object-contain" /></div>;
            case "consultation_purple":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-stopwatch-purple.png" alt="Icon" fill className="object-contain" /></div>;

            case "consultation_green":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-shield-green.png" alt="Icon" fill className="object-contain" /></div>;

            case "mentorship_red":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-shield-red-chat.png" alt="Icon" fill className="object-contain" /></div>;

            case "mentorship_orange":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-shield-orange-chat.png" alt="Icon" fill className="object-contain" /></div>;

            case "session_blue":
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-medal-1-blue.png" alt="Icon" fill className="object-contain" /></div>;

            case "consultation_gold":
                // Fallback to darkgreen or another available if gold not provided, or reuse an existing logic if acceptable.
                // Let's use the darkgreen one here as it is "Top Rated" usually associated with distinct color.
                return <div className="relative h-10 w-10 shrink-0"><Image src="/icons/achv-shield-darkgreen.png" alt="Icon" fill className="object-contain" /></div>;

            default:
                // Default fallback
                return <div className="p-3 bg-gray-100 rounded-lg"><Award size={24} className="text-gray-600" /></div>;
        }
    };

    return (
        <div>
            <h3 className="mb-6 text-lg font-medium text-[#006056]">Achievements racked up by {lawyer.name.split(' ')[0]}</h3>
            <div className="space-y-4">
                {lawyer.achievements.map((achievement) => (
                    <div key={achievement.id} className="flex items-center justify-between rounded-xl border border-gray-100 bg-white p-4">
                        <div className="flex items-center gap-4">
                            {getIcon(achievement.iconType)}
                            <div>
                                <h4 className="font-bold text-black text-base">{achievement.title}</h4>
                                <a href="#" className="flex items-center gap-1 text-xs text-gray-500 hover:text-[#006056]">
                                    See credentials <ExternalLink size={10} />
                                </a>
                            </div>
                        </div>
                        <span className="rounded-lg bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">{achievement.date}</span>
                    </div>
                ))}
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
