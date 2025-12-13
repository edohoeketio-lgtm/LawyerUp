import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronDown, Map, Search } from "lucide-react";
import { allSectors } from "@/data/sectors";
import { allLanguages } from "@/data/languages";
import { allCountries } from "@/data/countries";
import { allTimezones } from "@/data/timezones";

interface ProfileData {
    role: string;
    jobTitle: string;
    workplace: string;
    gender: string;
    location: string;
    languages: string[];
    bio: string;
    firstName?: string;
    lastName?: string;
    legalInterests?: string[];
    timezone?: string;
    availability?: {
        days: string[];
        startTime: string;
        endTime: string;
    };
    [key: string]: unknown;
}

interface EditProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ProfileData) => void;
    initialData?: Partial<ProfileData>;
}

export default function EditProfileModal({ isOpen, onClose, onSave, initialData }: EditProfileModalProps) {
    const [formData, setFormData] = useState<ProfileData>({
        role: "legal_help",
        firstName: "",
        lastName: "",
        jobTitle: "",
        workplace: "",
        gender: "Prefer not to say",
        location: "",
        languages: [],
        bio: "",
        legalInterests: [],
        timezone: "",
        availability: {
            days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
            startTime: "09:00",
            endTime: "17:00"
        },
        ...initialData
    });

    useEffect(() => {
        if (isOpen && initialData) {
            setFormData(prev => ({
                ...prev,
                ...initialData
            }));
        }
    }, [isOpen, initialData]);

    const [sectorSearch, setSectorSearch] = useState("");
    const [showSectorDropdown, setShowSectorDropdown] = useState(false);
    const filteredSectors = allSectors.filter(s => s.toLowerCase().includes(sectorSearch.toLowerCase()));

    const [languageSearch, setLanguageSearch] = useState("");
    const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
    const filteredLanguages = allLanguages.filter(l => l.toLowerCase().includes(languageSearch.toLowerCase()));

    if (!isOpen) return null;

    const handleAddInterest = (sector: string) => {
        const currentInterests = formData.legalInterests || [];
        if (currentInterests.length >= 5) return;
        if (currentInterests.includes(sector)) return;

        setFormData({ ...formData, legalInterests: [...currentInterests, sector] });
        setSectorSearch("");
        setShowSectorDropdown(false);
    };

    const handleRemoveInterest = (sector: string) => {
        const currentInterests = formData.legalInterests || [];
        setFormData({ ...formData, legalInterests: currentInterests.filter(i => i !== sector) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 p-6">
                    <h2 className="font-serif text-2xl font-medium text-black">Edit profile</h2>
                    <button onClick={onClose} className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Photo - Static as per screenshot? Or editable? Screenshot shows "Edit photo" button next to avatar */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">Profile photo</label>
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 overflow-hidden rounded-2xl bg-[#C1E1D2]">
                                    <Image
                                        src="/avatars/user_dp.png"
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <button type="button" className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-black hover:bg-gray-50">
                                    <Edit2Icon size={14} />
                                    Edit photo
                                </button>
                            </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500">First name</label>
                                <input
                                    type="text"
                                    value={formData.firstName || ""}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500">Last name</label>
                                <input
                                    type="text"
                                    value={formData.lastName || ""}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                />
                            </div>
                        </div>


                        {/* Role Selection */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">What best describes you?</label>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role: "legal_help" })}
                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${formData.role === "legal_help"
                                        ? "border-[#004d45] bg-[#F0FDF4] text-[#004d45]"
                                        : "border-gray-200 text-gray-500 hover:border-gray-300"
                                        }`}
                                >
                                    I need legal help
                                </button>
                                {/* Only show Aspiring Lawyer option if they are ALREADY a lawyer/aspiring lawyer */}
                                {initialData?.role === "lawyer" && (
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, role: "lawyer" })}
                                        className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${formData.role === "lawyer"
                                            ? "border-[#004d45] bg-[#F0FDF4] text-[#004d45]"
                                            : "border-gray-200 text-gray-500 hover:border-gray-300"
                                            }`}
                                    >
                                        Aspiring / young lawyer
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Legal Interests (Multi-select) */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">I am interested in (Max 5)</label>
                            <p className="text-[10px] text-gray-400">This helps us recommend the right lawyers for you.</p>

                            {/* Selected Interests Pills */}
                            <div className="flex flex-wrap gap-2 mb-2">
                                {(formData.legalInterests || []).map(interest => (
                                    <span key={interest} className="flex items-center gap-1 rounded-full bg-[#E6F0EE] px-3 py-1 text-xs font-medium text-[#006056]">
                                        {interest}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveInterest(interest)}
                                            className="ml-1 hover:text-red-500"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="relative">
                                <div className="flex items-center rounded-lg border border-gray-200 px-3 bg-white">
                                    <Search size={16} className="text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder={(formData.legalInterests || []).length >= 5 ? "Limit reached" : "Search to add interest..."}
                                        value={sectorSearch}
                                        onChange={(e) => {
                                            setSectorSearch(e.target.value);
                                            setShowSectorDropdown(true);
                                        }}
                                        onFocus={() => setShowSectorDropdown(true)}
                                        disabled={(formData.legalInterests || []).length >= 5}
                                        className="w-full py-2.5 text-sm font-medium text-black focus:outline-none disabled:bg-white disabled:cursor-not-allowed"
                                    />
                                    <ChevronDown className={`text-gray-400 transition-transform ${showSectorDropdown ? "rotate-180" : ""}`} size={16} />
                                </div>

                                {showSectorDropdown && (
                                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {filteredSectors.length > 0 ? (
                                            filteredSectors.map(sector => (
                                                <button
                                                    key={sector}
                                                    type="button"
                                                    onClick={() => handleAddInterest(sector)}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black"
                                                >
                                                    {sector}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-gray-400">No matches found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            {(formData.legalInterests || []).length >= 5 && (
                                <p className="text-[10px] text-red-500">Maximum 5 interests selected.</p>
                            )}
                        </div>

                        {/* Job & Workplace */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500">Job title</label>
                                <input
                                    type="text"
                                    value={formData.jobTitle}
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-gray-500">Name of workplace</label>
                                <input
                                    type="text"
                                    value={formData.workplace}
                                    onChange={(e) => setFormData({ ...formData, workplace: e.target.value })}
                                    className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500">Gender</label>
                            <div className="relative">
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                >
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Non-binary</option>
                                    <option>Prefer not to say</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {/* Location (Country Only) */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500">Country</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                    <Map className="text-gray-400" size={16} />
                                </div>
                                <select
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white pl-10 pr-10 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                >
                                    <option value="" disabled>Select country</option>
                                    {allCountries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {/* Tiimezone */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500">Timezone</label>
                            <div className="relative">
                                <select
                                    value={formData.timezone as string || ""}
                                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                    className="w-full appearance-none rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                >
                                    <option value="" disabled>Select timezone</option>
                                    {allTimezones.map(tz => (
                                        <option key={tz} value={tz}>{tz}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500">Languages spoken</label>

                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.languages.map((lang: string) => (
                                    <span key={lang} className="flex items-center gap-1 rounded bg-gray-100 px-2 py-1 text-xs font-medium text-gray-700">
                                        {lang}
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, languages: formData.languages.filter((l: string) => l !== lang) })}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="relative">
                                <div className="flex items-center rounded-lg border border-gray-200 px-3 bg-white">
                                    <Search size={16} className="text-gray-400 mr-2" />
                                    <input
                                        type="text"
                                        placeholder="Search languages..."
                                        value={languageSearch}
                                        onChange={(e) => {
                                            setLanguageSearch(e.target.value);
                                            setShowLanguageDropdown(true);
                                        }}
                                        onFocus={() => setShowLanguageDropdown(true)}
                                        className="w-full py-2.5 text-sm font-medium text-black focus:outline-none"
                                    />
                                    <ChevronDown className={`text-gray-400 transition-transform ${showLanguageDropdown ? "rotate-180" : ""}`} size={16} />
                                </div>

                                {showLanguageDropdown && (
                                    <div className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
                                        {filteredLanguages.length > 0 ? (
                                            filteredLanguages.map(lang => (
                                                <button
                                                    key={lang}
                                                    type="button"
                                                    onClick={() => {
                                                        if (!formData.languages.includes(lang)) {
                                                            setFormData({ ...formData, languages: [...formData.languages, lang] });
                                                        }
                                                        setLanguageSearch("");
                                                        setShowLanguageDropdown(false);
                                                    }}
                                                    className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 text-black"
                                                >
                                                    {lang}
                                                </button>
                                            ))
                                        ) : (
                                            <div className="px-4 py-2 text-sm text-gray-400">No matches found</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Availability (Lawyers Only) */}
                        {formData.role === "lawyer" && (
                            <div className="space-y-3 pt-2 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-gray-900">Availability</h3>

                                {/* Days Selector */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500">Available Days</label>
                                    <div className="flex flex-wrap gap-2">
                                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => {
                                            const isSelected = (formData.availability?.days || []).includes(day);
                                            return (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        const currentDays = formData.availability?.days || [];
                                                        const newDays = isSelected
                                                            ? currentDays.filter(d => d !== day)
                                                            : [...currentDays, day];

                                                        setFormData({
                                                            ...formData,
                                                            availability: {
                                                                startTime: formData.availability?.startTime || "09:00",
                                                                endTime: formData.availability?.endTime || "17:00",
                                                                days: newDays
                                                            }
                                                        });
                                                    }}
                                                    className={`h-8 w-10 text-xs font-medium rounded-lg border transition-colors ${isSelected
                                                        ? "bg-[#004d45] text-white border-[#004d45]"
                                                        : "bg-white text-gray-600 border-gray-200 hover:border-gray-300"
                                                        }`}
                                                >
                                                    {day}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Time Range */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500">Start Time</label>
                                        <input
                                            type="time"
                                            value={formData.availability?.startTime || "09:00"}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                availability: {
                                                    days: formData.availability?.days || [],
                                                    endTime: formData.availability?.endTime || "17:00",
                                                    startTime: e.target.value
                                                }
                                            })}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500">End Time</label>
                                        <input
                                            type="time"
                                            value={formData.availability?.endTime || "17:00"}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                availability: {
                                                    days: formData.availability?.days || [],
                                                    startTime: formData.availability?.startTime || "09:00",
                                                    endTime: e.target.value
                                                }
                                            })}
                                            className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Bio */}
                        <div className="space-y-1">
                            <label className="text-xs font-bold text-gray-500">Bio</label>
                            <textarea
                                rows={4}
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="w-full rounded-lg border border-gray-200 p-3 text-sm font-medium text-black focus:border-[#004d45] focus:outline-none"
                            />
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 p-6">
                    <button
                        type="button"
                        onClick={(e) => handleSubmit(e as unknown as React.FormEvent)}
                        className="w-full rounded-lg bg-[#013328] px-4 py-3 text-sm font-bold text-white hover:bg-[#012a2b]"
                    >
                        Update profile
                    </button>
                </div>
            </div>
        </div>
    );
}

// Icon helper
function Edit2Icon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
        </svg>
    )
}
