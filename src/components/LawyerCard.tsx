import Link from "next/link";
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
                    <img
                        src={lawyer.image}
                        alt={lawyer.name}
                        className="h-full w-full object-cover"
                    />
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
