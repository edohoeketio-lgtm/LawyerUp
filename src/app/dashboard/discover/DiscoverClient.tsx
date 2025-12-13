"use client";

import { useState, useEffect } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";
import { allSectors } from "@/data/sectors";
import { auth } from "@/utils/auth";

export default function DiscoverClient() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    const [blockedIds, setBlockedIds] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("blockedLawyers");
        if (stored) {
            // eslint-disable-next-line
            setBlockedIds(JSON.parse(stored));
        }
    }, []);

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

    const filteredLawyers = lawyers.filter(lawyer => {
        const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.sector.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = selectedSector === "All" || lawyer.sector === selectedSector;
        const isBlocked = blockedIds.includes(lawyer.id);

        return matchesSearch && matchesSector && !isBlocked;
    }).sort((a, b) => { // smart sort based on user interest
        const userInterests = auth.getSession()?.legalInterests || [];
        if (userInterests.length === 0) return 0;

        const aMatches = userInterests.includes(a.sector);
        const bMatches = userInterests.includes(b.sector);

        if (aMatches && !bMatches) return -1;
        if (!aMatches && bMatches) return 1;
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
    }, [searchQuery, selectedSector, itemsPerPage]);

    return (
        <div className="space-y-6" onClick={() => setShowFilter(false)}>
            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row relative">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search lawyers by name..."
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
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
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
