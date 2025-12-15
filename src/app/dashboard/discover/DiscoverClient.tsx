"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, MapPin } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";
import { allSectors } from "@/data/sectors";
import { auth, User } from "@/utils/auth";
import { useSearchParams } from "next/navigation";

export default function DiscoverClient() {
    const searchParams = useSearchParams();
    const currentView = searchParams.get("view") || "client"; // 'client' = Legal Advice, 'lawyer' = Mentorship

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    const [blockedIds, setBlockedIds] = useState<string[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Set User
        setUser(auth.getSession());

        const stored = localStorage.getItem("blockedLawyers");
        if (stored) {
            // eslint-disable-next-line
            setBlockedIds(JSON.parse(stored));
        }

        const handleAuthChange = () => {
            setUser(auth.getSession());
        };

        window.addEventListener("auth-change", handleAuthChange);
        return () => window.removeEventListener("auth-change", handleAuthChange);
    }, []);

    // Toggle Bookmark Handler
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
        // Update local state
        setUser({ ...user, bookmarkedLawyerIds: newBookmarks });
    };

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);

    useEffect(() => {
        const handleResize = () => {
            setItemsPerPage(window.innerWidth >= 1024 ? 20 : 8);
        };

        // Set initial
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Combine with any unique ones from actual data if missing
    const availableSectors = Array.from(new Set([...allSectors, ...lawyers.map(l => l.sector)]));

    // Filter the pills displayed in the dropdown
    const visibleSectors = availableSectors.filter(s => s.toLowerCase().includes(filterSearch.toLowerCase()));

    // Pagination Logic
    const [allLawyers, setAllLawyers] = useState<any[]>(lawyers);

    useEffect(() => {
        // Fetch ALL local users to mix in with dummy data
        // This ensures any account created locally is immediately visible for testing
        const allLocalUsers = auth.getUsers();

        const mappedLawyers = allLocalUsers.map(u => ({
            id: u.id,
            name: `${u.firstName} ${u.lastName}`, // Clean name, no debug suffixes
            sector: u.legalInterests?.[0] || u.jobTitle || "General Practice",
            title: u.jobTitle || "Legal Professional",
            country: u.location || "Unknown",
            image: "/avatars/user_dp.png", // Use default avatar for local users
            stats: {
                sessions: 0,
                reviews: 0,
                rating: 5.0
            },
            tags: u.legalInterests || [],
            bio: u.bio || "No bio available",
            consultationPrice: u.consultationPrice || 0,
            mentorshipPrice: u.mentorshipPrice || 0,
            languages: u.languages || ["English"],
            services: u.services || [], // Include dynamic services
            verificationStatus: u.verificationStatus // Pass verification status
        }));

        // Merge with static lawyers
        // Local users first for visibility
        setAllLawyers([...mappedLawyers, ...lawyers]);
    }, []);

    const filteredLawyers = allLawyers.filter(lawyer => {
        // Trim search query to avoid "Michael Anyi " failing to match "Michael Anyi"
        const cleanQuery = searchQuery.toLowerCase().trim();
        const matchesSearch = lawyer.name.toLowerCase().includes(cleanQuery) ||
            lawyer.sector.toLowerCase().includes(cleanQuery);
        const matchesSector = selectedSector === "All" || lawyer.sector === selectedSector;
        const isBlocked = blockedIds.includes(lawyer.id);

        // Tab/View Filter based on Global URL Param
        // view='client' -> Legal Advice
        // view='lawyer' -> Mentorship

        // Dynamic visibility logic:
        // 1. Static lawyers check price/services
        // 2. Local lawyers (id > 10 chars) from auth.ts
        const isLocal = typeof lawyer.id === 'string' && lawyer.id.length > 10;

        // VERIFICATION GATE:
        // Only show lawyers who are explicitly 'verified'.
        // For static data (which lacks verificationStatus), we assume they are verified (or you can add a field).
        // For local users, we check the actual status.
        const isVerified = isLocal ? (lawyer as any).verificationStatus === 'verified' : true;

        const hasServices = lawyer.services && lawyer.services.length > 0;
        let hasService = false;
        if (currentView === "client") {
            hasService = (lawyer.consultationPrice > 0) || hasServices;
        } else {
            hasService = (lawyer.mentorshipPrice > 0);
        }

        // The "Free Pass": isLocal users show up regardless of price/service configuration IF VERIFIED
        return matchesSearch && matchesSector && !isBlocked && isVerified && (hasService || isLocal);
    }).sort((a, b) => {
        // 1. Priority: Local Users first (so you can find your test accounts easily)
        const aIsLocal = typeof a.id === 'string' && a.id.length > 10;
        const bIsLocal = typeof b.id === 'string' && b.id.length > 10;
        if (aIsLocal && !bIsLocal) return -1;
        if (!aIsLocal && bIsLocal) return 1;

        // 2. Priority: Smart Match based on User Interest
        const userInterests = user?.legalInterests || [];
        if (userInterests.length > 0) {
            const aMatches = userInterests.includes(a.sector);
            const bMatches = userInterests.includes(b.sector);
            if (aMatches && !bMatches) return -1;
            if (!aMatches && bMatches) return 1;
        }

        return 0;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
    const paginatedLawyers = filteredLawyers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset page when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedSector, itemsPerPage, currentView]);

    return (
        <div className="space-y-8" onClick={() => setShowFilter(false)}>
            {/* Header */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-black">
                            {user?.role === 'lawyer' ? 'Legal Network' : `Discover ${currentView === 'lawyer' ? 'Mentors' : 'Lawyers'}`}
                        </h1>
                    </div>
                    <p className="text-gray-500">
                        {user?.role === 'lawyer'
                            ? "Connect with peers, find mentors, and grow your professional circle"
                            : `Find the perfect ${currentView === 'lawyer' ? 'mentor' : 'legal expert'} for your needs`
                        }
                    </p>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row relative">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, expertise, or keywords..."
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none focus:border-[#006056] focus:ring-1 focus:ring-[#006056]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="relative" onClick={(e) => e.stopPropagation()}>
                    <button
                        onClick={() => setShowFilter(!showFilter)}
                        className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors
                            ${showFilter || selectedSector !== "All"
                                ? "border-[#006056] bg-[#E6F0EE] text-[#006056]"
                                : "border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
                            }
                        `}
                    >
                        <SlidersHorizontal size={18} />
                        {selectedSector !== "All" ? selectedSector : "Filter"}
                    </button>

                    {/* Filter Popover */}
                    {showFilter && (
                        <div className="absolute right-0 top-full z-50 mt-2 w-[300px] sm:w-[600px] rounded-xl border border-[#006056] bg-white p-4 shadow-xl">
                            {/* Filter Search */}
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search sector..."
                                    className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-4 text-sm outline-none focus:border-[#006056]"
                                    value={filterSearch}
                                    onChange={(e) => setFilterSearch(e.target.value)}
                                    autoFocus
                                />
                            </div>

                            {/* Tags Grid */}
                            <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                                <button
                                    onClick={() => {
                                        setSelectedSector("All");
                                        setShowFilter(false);
                                    }}
                                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors
                                        ${selectedSector === "All"
                                            ? "border-[#006056] bg-[#E6F0EE] text-[#006056]"
                                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                        }
                                    `}
                                >
                                    All Sectors
                                </button>
                                {visibleSectors.map(sector => (
                                    <button
                                        key={sector}
                                        onClick={() => {
                                            setSelectedSector(selectedSector === sector ? "All" : sector);
                                            setShowFilter(false);
                                        }}
                                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors
                                            ${selectedSector === sector
                                                ? "border-[#006056] bg-[#E6F0EE] text-[#006056]"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                                            }
                                        `}
                                    >
                                        {sector}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {paginatedLawyers.map((lawyer) => (
                    <LawyerCard
                        key={lawyer.id}
                        lawyer={lawyer}
                        isBookmarked={user?.bookmarkedLawyerIds?.includes(lawyer.id)}
                        onToggleBookmark={toggleBookmark}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">Page {currentPage} of {totalPages}</span>
                        <button
                            className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
