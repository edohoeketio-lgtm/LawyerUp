"use client";

import { useState, useEffect } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { lawyers } from "@/data/lawyers";
import LawyerCard from "@/components/LawyerCard";

export default function DiscoverPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSector, setSelectedSector] = useState("All");
    const [showFilter, setShowFilter] = useState(false);
    const [filterSearch, setFilterSearch] = useState("");
    const [blockedIds, setBlockedIds] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem("blockedLawyers");
        if (stored) {
            setBlockedIds(JSON.parse(stored));
        }
    }, []);

    // Extensive list of law sectors
    const allSectors = [
        "Administrative Law", "Admiralty & Maritime Law", "Agency Law", "Alcohol Law", "Alternative Dispute Resolution",
        "Animal Law", "Antitrust & Trade Regulation", "Appellate Practice", "Arbitration", "Art Law",
        "Animal Law", "Antitrust & Trade Regulation", "Appellate Practice", "Arbitration", "Art Law",
        "Aviation Law", "Banking & Finance Law", "Bankruptcy Law", "Biotechnology Law", "Business Law",
        "Cannabis Law", "Civil Rights Law", "Class Action Law", "Communications Law", "Compliance Law",
        "Computer & Internet Law", "Constitutional Law", "Construction Law", "Consumer Protection Law", "Contract Law",
        "Copyright Law", "Corporate Law", "Criminal Law", "Cryptocurrency & Blockchain Law", "Cybersecurity Law",
        "Defamation Law", "Derivatives & Futures Law", "Disability Law", "Drone Law", "E-Commerce Law",
        "Education Law", "Elder Law", "Election & Political Law", "Eminent Domain", "Employee Benefits (ERISA)",
        "Employment / Labour Law", "Energy & Natural Resources Law", "Entertainment & Media Law", "Environmental Law", "Equipment Finance Law",
        "Estate Planning", "Ethics & Professional Responsibility", "Family Law", "Fashion Law", "Federal Law",
        "Fintech Law", "Food & Drug Law", "Franchise Law", "Gaming Law", "Government Contracts",
        "Health Care Law", "Human Rights Law", "Immigration Law", "Import & Export Law", "Insurance Law",
        "Intellectual Property (IP) Law", "International Law", "Investment Management Law", "Juvenile Law", "Land Use & Zoning Law",
        "Landlord-Tenant Law", "Legal Malpractice Law", "Libel & Slander Law", "Life Sciences Law", "Litigation",
        "Media Law", "Medical Malpractice Law", "Mergers & Acquisitions (M&A)", "Military Law", "Mining Law",
        "Municipal Law", "Music Law", "Native American Law", "Non-Profit / Charity Law", "Occupational Safety & Health (OSHA)",
        "Oil & Gas Law", "Patent Law", "Personal Injury Law", "Pharmaceutical Law", "Privacy & Data Security Law",
        "Private Equity Law", "Product Liability Law", "Professional Liability Law", "Property Law", "Public Finance Law",
        "Public Interest Law", "Qui Tam / Whistleblower Law", "Railroad Law", "Real Estate Law", "Regulatory Law",
        "Religious Institutions Law", "Retirement Law", "Rocket & Space Law", "Securities Law", "Sexual Harassment Law",
        "Social Security Disability", "Space Law", "Sports Law", "Startups & Emerging Companies", "Tax Law",
        "Technology Law", "Telecommunications Law", "Tort Law", "Trademark Law", "Transportation Law",
        "Trusts & Estates Law", "Venture Capital Law", "Veterans Benefits", "Water Law", "White Collar Crime",
        "Workers' Compensation", "Zoning, Planning & Land Use"
    ].sort();

    // Combine with any unique ones from actual data if missing
    const availableSectors = Array.from(new Set([...allSectors, ...lawyers.map(l => l.sector)]));

    // Filter the pills displayed in the dropdown
    const visibleSectors = availableSectors.filter(s => s.toLowerCase().includes(filterSearch.toLowerCase()));

    const filteredLawyers = lawyers.filter(lawyer => {
        const matchesSearch = lawyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            lawyer.sector.toLowerCase().includes(searchQuery.toLowerCase());

        // Loose matching for sector to handle slight variations (e.g. "Corporate" vs "Corporate Law")
        const matchesSector = selectedSector === "All" || lawyer.sector.includes(selectedSector) || selectedSector.includes(lawyer.sector);

        return matchesSearch && matchesSector;
    });

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
                        <div className="absolute right-0 top-full z-50 mt-2 w-[600px] rounded-xl border border-[#006056] bg-white p-4 shadow-xl">
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
                            <div className="flex flex-wrap gap-2 max-h-[400px] overflow-y-auto custom-scrollbar">
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
                                            // Optional: close on select? User might want to browse. 
                                            // Let's keep it open or close? Design usually implies select one and go.
                                            // But for buttons, closing feels snappy.
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
