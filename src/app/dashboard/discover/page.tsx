"use client";

import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("All");

    const sectors = ["All", ...Array.from(new Set(lawyers.map(l => l.sector)))];

    const filteredLawyers = lawyers.filter(lawyer => {
        const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.sector.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSector = selectedSector === "All" || lawyer.sector === selectedSector;
        return matchesSearch && matchesSector;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="font-serif text-3xl font-medium text-black">Discover</h2>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                        Top Rated
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-[#004d45] px-4 py-2 text-sm font-medium text-white hover:bg-[#003a34]">
                        Book a session
                    </button>
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="flex flex-col gap-4 sm:flex-row">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search here..."
                        className="w-full rounded-lg border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-black outline-none focus:border-[#006056] focus:ring-1 focus:ring-[#006056]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <button className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <SlidersHorizontal size={18} /> Filter
                </button>
            </div>

            {/* Categories (Optional - visual only for now) */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {sectors.slice(0, 6).map(sector => (
                    <button
                        key={sector}
                        onClick={() => setSelectedSector(sector)}
                        className={`whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-colors
                            ${selectedSector === sector
                                ? "bg-[#006056] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                        `}
                    >
                        {sector}
                    </button>
                ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
                {filteredLawyers.map((lawyer) => (
                    <LawyerCard key={lawyer.id} lawyer={lawyer} />
                ))}
            </div>

            {/* Pagination Visual */}
            <div className="mt-8 flex justify-center">
                <div className="flex items-center gap-2">
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:bg-gray-50" disabled>
                        Previous
                    </button>
                    <span className="text-sm text-gray-600">Page 1 of 1</span>
                    <button className="rounded-lg border border-gray-200 p-2 text-gray-400 hover:bg-gray-50" disabled>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
