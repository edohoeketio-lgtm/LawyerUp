export interface Lawyer {
    id: string;
    name: string;
    image: string;
    sector: string;
    title: string;
    country: string; // e.g., "NG", "US", "GB" for flag
    countryName: string;
    stats: {
        sessions: number;
        reviews: number;
        mentoringMinutes?: number;
        consultationMinutes?: number;
    };
    tags: string[];
    bgImage?: string; // For detail page background if needed
    bio: string;
    consultationPrice: number;
    mentorshipPrice: number;
    languages: string[];
    experience: {
        role: string;
        company: string;
        period: string;
    }[];
    education: {
        degree: string;
        school: string;
        period: string;
    }[];
}

const baseLawyers: Lawyer[] = [
    {
        id: "1",
        name: "Sarah Jenkins",
        image: "/avatars/lawyer_1.jpg",
        sector: "Criminal Defense",
        title: "Senior Defense Attorney",
        country: "US",
        countryName: "United States",
        stats: { sessions: 71, reviews: 55, consultationMinutes: 1392, mentoringMinutes: 691 },
        tags: ["Business", "Corporate"],
        consultationPrice: 100,
        mentorshipPrice: 80,
        bio: "With over a decade of experience in criminal defense, I specialize in helping individuals navigate complex legal situations.",
        languages: ["English", "Spanish"],
        experience: [
            { role: "Senior Defense Attorney", company: "Jenkins & Co", period: "2018 - Present" },
            { role: "Legal Consultant", company: "Freelance", period: "2015 - 2018" }
        ],
        education: [
            { degree: "Juris Doctor (J.D.)", school: "Harvard Law School", period: "2010 - 2013" },
            { degree: "Bachelor of Laws", school: "University of California", period: "2006 - 2010" }
        ]
    },
    {
        id: "2",
        name: "David Okon",
        image: "/avatars/lawyer_2.jpg",
        sector: "Corporate Law",
        title: "Corporate Legal Advisor",
        country: "NG",
        countryName: "Nigeria",
        stats: { sessions: 45, reviews: 32, consultationMinutes: 850, mentoringMinutes: 300 },
        tags: ["Finance", "Startups"],
        consultationPrice: 120,
        mentorshipPrice: 90,
        bio: "Specializing in corporate law and finance within African markets.",
        languages: ["English", "French"],
        experience: [
            { role: "Partner", company: "Lagos Legal", period: "2019 - Present" }
        ],
        education: [
            { degree: "LL.B", school: "University of Lagos", period: "2012 - 2016" }
        ]
    },
    {
        id: "3",
        name: "Maria Rodriguez",
        image: "/avatars/lawyer_3.jpg",
        sector: "Family Law",
        title: "Family Law Specialist",
        country: "ES",
        countryName: "Spain",
        stats: { sessions: 93, reviews: 88, consultationMinutes: 2000, mentoringMinutes: 1000 },
        tags: ["Divorce", "Custody"],
        consultationPrice: 90,
        mentorshipPrice: 70,
        bio: "Helping families resolve disputes with compassion and expertise.",
        languages: ["English", "Spanish", "Portuguese"],
        experience: [
            { role: "Senior Associate", company: "Rodriguez Law", period: "2016 - Present" }
        ],
        education: [
            { degree: "LL.M", school: "University of Madrid", period: "2011 - 2012" }
        ]
    },
    {
        id: "4",
        name: "Rabbi Cohen",
        image: "/avatars/lawyer_4.png",
        sector: "Estate Planning",
        title: "Estate Planner",
        country: "IL",
        countryName: "Israel",
        stats: { sessions: 28, reviews: 15, consultationMinutes: 400, mentoringMinutes: 100 },
        tags: ["Wills", "Trusts"],
        consultationPrice: 150,
        mentorshipPrice: 120,
        bio: "Securing your legacy for future generations.",
        languages: ["English", "Hebrew"],
        experience: [
            { role: "Independent Advisor", company: "Cohen Estates", period: "2020 - Present" }
        ],
        education: [
            { degree: "J.D.", school: "Tel Aviv University", period: "2014 - 2018" }
        ]
    },
    {
        id: "5",
        name: "James Carter",
        image: "/avatars/lawyer_5.png",
        sector: "Intellectual Property",
        title: "IP Attorney",
        country: "UK",
        countryName: "United Kingdom",
        stats: { sessions: 62, reviews: 49, consultationMinutes: 1200, mentoringMinutes: 500 },
        tags: ["Tech", "Copyright"],
        consultationPrice: 200,
        mentorshipPrice: 150,
        bio: "Protecting ideas and innovation in the digital age.",
        languages: ["English"],
        experience: [
            { role: "IP Counsel", company: "Tech Giants Ltd", period: "2017 - Present" }
        ],
        education: [
            { degree: "LL.B", school: "Oxford University", period: "2013 - 2016" }
        ]
    }
];

// Generate 20 lawyers by cycling through the base 5
export const lawyers: Lawyer[] = Array.from({ length: 20 }, (_, i) => {
    const base = baseLawyers[i % baseLawyers.length];
    return {
        ...base,
        id: (i + 1).toString(),
        name: i < 5 ? base.name : `${base.name.split(' ')[0]} ${String.fromCharCode(65 + i)}.` // Varied names for duplicates
    };
});

export const getLawyerById = (id: string) => lawyers.find(l => l.id === id);
