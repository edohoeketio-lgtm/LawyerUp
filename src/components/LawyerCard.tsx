import Link from "next/link";
import Image from "next/image";
import { FileText, Clock } from "lucide-react";
import { Lawyer } from "@/data/lawyers";

interface LawyerCardProps {
    lawyer: Lawyer;
}

export default function LawyerCard({ lawyer }: LawyerCardProps) {
    return (
        <Link href={`/dashboard/lawyer/${lawyer.id}`}>
            <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md hover:ring-2 hover:ring-gray-200">
                <div className="aspect-[4/5] relative">
                    <Image
                        src={lawyer.image}
                        alt={lawyer.name}
                        fill
                        className="object-cover"
                    />
                    <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors z-10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
                    </button>
                </div>
                <div className="p-3">
                    <h4 className="font-medium text-black text-sm mb-1">{lawyer.name} {getFlag(lawyer.country)}</h4>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1">
                        <FileText size={10} /> {lawyer.sector}
                    </p>
                    <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={10} /> {lawyer.stats.sessions} sessions ({lawyer.stats.reviews} reviews)
                    </p>
                    <div className="mt-2 flex gap-1 flex-wrap">
                        {lawyer.tags.slice(0, 2).map((tag, t) => (
                            <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
                                {tag}
                            </span>
                        ))}
                        {lawyer.tags.length > 2 && (
                            <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">
                                +{lawyer.tags.length - 2}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

function getFlag(countryCode: string) {
    const flags: { [key: string]: string } = {
        "US": "🇺🇸",
        "NG": "🇳🇬",
        "ES": "🇪🇸",
        "IL": "🇮🇱",
        "UK": "🇬🇧",
        "GB": "🇬🇧"
    };
    return flags[countryCode] || "";
}
