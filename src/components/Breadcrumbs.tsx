"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
    return (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <div key={index} className="flex items-center gap-2">
                        {index > 0 && <ChevronRight size={14} />}

                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="hover:text-black transition-colors"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span className={isLast ? "rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-black" : ""}>
                                {item.label}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
