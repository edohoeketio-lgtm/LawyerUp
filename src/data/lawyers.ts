export interface Review {
    id: string;
    userName: string;
    userInitial: string;
    userColor: string;
    rating: number;
    timeAgo: string;
    tag: "Legal advice" | "Mentorship" | "Consultation";
    content: string;
}

export interface Achievement {
    id: string;
    title: string;
    iconType: "consultation_blue" | "mentorship_red" | "consultation_green" | "mentorship_orange" | "consultation_purple" | "consultation_gold" | "session_blue";
    date: string;
}

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
    reviews?: Review[];
    achievements?: Achievement[];
}

// 20 Unique Lawyers
export const lawyers: Lawyer[] = [
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
        mentorshipPrice: 150,
        bio: "With over a decade of experience in criminal defense, I specialize in helping individuals navigate complex legal situations.",
        languages: ["English", "Spanish", "French"],
        experience: [
            { role: "Senior Attorney", company: "Legal Partners", period: "2018 - Present" },
            { role: "Junior Associate", company: "Law Firm Co.", period: "2015 - 2018" }
        ],
        education: [
            { degree: "J.D.", school: "Harvard Law School", period: "2012 - 2015" },
            { degree: "B.A. Political Science", school: "Yale University", period: "2008 - 2012" }
        ],
        reviews: [
            { id: "1", userName: "Esther H.", userInitial: "E", userColor: "bg-orange-600", rating: 5, timeAgo: "1 day", tag: "Legal advice", content: "Extremely knowledgeable and reassuring. She explained everything clearly and gave me a solid plan of action. Highly recommended!" },
            { id: "2", userName: "Mark D.", userInitial: "M", userColor: "bg-blue-600", rating: 4, timeAgo: "3 days", tag: "Mentorship", content: "Great session. Sarah is very experienced and gave me good career advice. A bit pricey, but worth it." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "100 Consultation minutes", date: "Jan 2024" },
            { id: "2", iconType: "mentorship_red", title: "50 Mentorship sessions", date: "Feb 2024" },
            { id: "3", iconType: "consultation_green", title: "Top Rated Lawyer 2023", date: "Mar 2024" }
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
        // EMPTY STATE
        stats: { sessions: 0, reviews: 0, consultationMinutes: 0, mentoringMinutes: 0 },
        tags: ["Finance", "Startups"],
        consultationPrice: 120,
        mentorshipPrice: 90,
        bio: "Specializing in corporate law and finance within African markets. Ready to help startups scale.",
        languages: ["English", "French"],
        experience: [{ role: "Partner", company: "Lagos Legal", period: "2019 - Present" }],
        education: [{ degree: "LL.B", school: "University of Lagos", period: "2012 - 2016" }],
        reviews: [],
        achievements: []
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
        experience: [{ role: "Senior Associate", company: "Rodriguez Law", period: "2016 - Present" }],
        education: [{ degree: "LL.M", school: "University of Madrid", period: "2011 - 2012" }],
        reviews: [
            { id: "1", userName: "Ana G.", userInitial: "A", userColor: "bg-red-600", rating: 5, timeAgo: "2 days", tag: "Legal advice", content: "Maria was incredibly supportive during my custody battle." }
        ],
        achievements: [
            { id: "1", iconType: "session_blue", title: "First 100 Sessions", date: "Jun 2024" }
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
        bio: "Securing your legacy for future generations with comprehensive estate planning.",
        languages: ["English", "Hebrew"],
        experience: [{ role: "Independent Advisor", company: "Cohen Estates", period: "2020 - Present" }],
        education: [{ degree: "J.D.", school: "Tel Aviv University", period: "2014 - 2018" }],
        reviews: [
            { id: "1", userName: "David L.", userInitial: "D", userColor: "bg-blue-800", rating: 5, timeAgo: "1 week", tag: "Legal advice", content: "Very thorough and detail-oriented." }
        ],
        achievements: []
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
        experience: [{ role: "IP Counsel", company: "Tech Giants Ltd", period: "2017 - Present" }],
        education: [{ degree: "LL.B", school: "Oxford University", period: "2013 - 2016" }],
        reviews: [
            { id: "1", userName: "TechStart Inc.", userInitial: "T", userColor: "bg-purple-600", rating: 5, timeAgo: "5 days", tag: "Consultation", content: "Saved us from a major copyright infringement lawsuit." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_purple", title: "Expert Consultant", date: "Aug 2023" }
        ]
    },
    {
        id: "6",
        name: "Anita Singh",
        image: "/avatars/lawyer_1.jpg", // Recycling avatar for now as distinct images aren't available
        sector: "Immigration Law",
        title: "Immigration Specialist",
        country: "IN",
        countryName: "India",
        stats: { sessions: 120, reviews: 110, consultationMinutes: 3000, mentoringMinutes: 500 },
        tags: ["Visa", "Residency"],
        consultationPrice: 80,
        mentorshipPrice: 60,
        bio: "Navigating complex immigration pathways to help you build a new life.",
        languages: ["English", "Hindi", "Punjabi"],
        experience: [{ role: "Senior Consultant", company: "Global Access", period: "2015 - Present" }],
        education: [{ degree: "LL.B", school: "Delhi University", period: "2010 - 2014" }],
        reviews: [
            { id: "1", userName: "Raj P.", userInitial: "R", userColor: "bg-orange-500", rating: 5, timeAgo: "2 days", tag: "Legal advice", content: "Anita made the visa process so simple." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_green", title: "Top Rated 2024", date: "Jan 2024" }
        ]
    },
    {
        id: "7",
        name: "Michael Chang",
        image: "/avatars/lawyer_2.jpg",
        sector: "Real Estate Law",
        title: "Real Estate Attorney",
        country: "SG",
        countryName: "Singapore",
        stats: { sessions: 40, reviews: 35, consultationMinutes: 800, mentoringMinutes: 200 },
        tags: ["Commercial", "Leasing"],
        consultationPrice: 180,
        mentorshipPrice: 130,
        bio: "Expert advice on commercial leasing and property acquisition in Asia.",
        languages: ["English", "Mandarin"],
        experience: [{ role: "Associate", company: "Skyline Properties", period: "2018 - Present" }],
        education: [{ degree: "J.D.", school: "NUS", period: "2014 - 2017" }],
        reviews: [
            { id: "1", userName: "Lim W.", userInitial: "L", userColor: "bg-blue-500", rating: 4, timeAgo: "1 month", tag: "Consultation", content: "Precise and to the point." }
        ],
        achievements: []
    },
    {
        id: "8",
        name: "Olivia Dunham",
        image: "/avatars/lawyer_3.jpg",
        sector: "Civil Rights",
        title: "Civil Rights Activist",
        country: "US",
        countryName: "United States",
        // EMPTY STATE
        stats: { sessions: 0, reviews: 0, consultationMinutes: 0, mentoringMinutes: 0 },
        tags: ["Discrimination", "Privacy"],
        consultationPrice: 110,
        mentorshipPrice: 0,
        bio: "Fighting for justice and equality for all citizens.",
        languages: ["English"],
        experience: [{ role: "Staff Attorney", company: "ACLU", period: "2021 - Present" }],
        education: [{ degree: "J.D.", school: "Columbia Law", period: "2017 - 2020" }],
        reviews: [],
        achievements: []
    },
    {
        id: "9",
        name: "Marcus Thorne",
        image: "/avatars/lawyer_4.png",
        sector: "Employment Law",
        title: "Labor Law Expert",
        country: "AU",
        countryName: "Australia",
        stats: { sessions: 55, reviews: 40, consultationMinutes: 1100, mentoringMinutes: 300 },
        tags: ["Contracts", "Disputes"],
        consultationPrice: 140,
        mentorshipPrice: 100,
        bio: "Ensuring fair treatment in the workplace for employees and employers.",
        languages: ["English"],
        experience: [{ role: "Partner", company: "Thorne & Associates", period: "2016 - Present" }],
        education: [{ degree: "LL.B", school: "University of Sydney", period: "2011 - 2015" }],
        reviews: [
            { id: "1", userName: "Sarah K.", userInitial: "S", userColor: "bg-green-600", rating: 5, timeAgo: "3 weeks", tag: "Legal advice", content: "Helped me understand my contract perfectly." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_orange", title: "Dedicated Mentor", date: "Dec 2023" }
        ]
    },
    {
        id: "10",
        name: "Elena Popov",
        image: "/avatars/lawyer_5.png",
        sector: "Tax Law",
        title: "Tax Consultant",
        country: "RU",
        countryName: "Russia",
        stats: { sessions: 30, reviews: 20, consultationMinutes: 600, mentoringMinutes: 100 },
        tags: ["International Tax", "Audit"],
        consultationPrice: 160,
        mentorshipPrice: 120,
        bio: "Navigating complex international tax regulations for expats.",
        languages: ["Russian", "English", "German"],
        experience: [{ role: "Senior Consultant", company: "Global Tax Solutions", period: "2017 - Present" }],
        education: [{ degree: "Master of Taxation", school: "Moscow State University", period: "2013 - 2015" }],
        reviews: [
            { id: "1", userName: "Dmitry V.", userInitial: "D", userColor: "bg-red-700", rating: 4, timeAgo: "2 months", tag: "Legal advice", content: "Very knowledgeable about double taxation treaties." }
        ],
        achievements: []
    },
    {
        id: "11",
        name: "Samuel Stern",
        image: "/avatars/lawyer_1.jpg",
        sector: "Bankruptcy Law",
        title: "Financial Restructuring Advisor",
        country: "US",
        countryName: "United States",
        stats: { sessions: 15, reviews: 10, consultationMinutes: 300, mentoringMinutes: 50 },
        tags: ["Debt", "Restructuring"],
        consultationPrice: 130,
        mentorshipPrice: 90,
        bio: "Helping businesses and individuals find a fresh financial start.",
        languages: ["English"],
        experience: [{ role: "Associate", company: "Stern Legal", period: "2019 - Present" }],
        education: [{ degree: "J.D.", school: "NYU Law", period: "2015 - 2018" }],
        reviews: [],
        // Keeping low stats but essentially visible. Actually let's give him one review.
        achievements: []
    },
    {
        id: "12",
        name: "Isabella Rossi",
        image: "/avatars/lawyer_2.jpg",
        sector: "International Law",
        title: "International Trade Counsel",
        country: "IT",
        countryName: "Italy",
        stats: { sessions: 80, reviews: 75, consultationMinutes: 1500, mentoringMinutes: 400 },
        tags: ["Trade", "Arbitration"],
        consultationPrice: 220,
        mentorshipPrice: 180,
        bio: "Expert in cross-border disputes and international trade regulations.",
        languages: ["Italian", "English", "French"],
        experience: [{ role: "Partner", company: "Rossi Global", period: "2015 - Present" }],
        education: [{ degree: "LL.M", school: "University of Bologna", period: "2010 - 2011" }],
        reviews: [
            { id: "1", userName: "Marco P.", userInitial: "M", userColor: "bg-green-700", rating: 5, timeAgo: "5 days", tag: "Consultation", content: "Eccellente! Solved our import issue quickly." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_gold", title: "Premium Advisor", date: "Sep 2023" }
        ]
    },
    {
        id: "13",
        name: "Arthur Morgan",
        image: "/avatars/lawyer_3.jpg",
        sector: "Environmental Law",
        title: "Environmental Policy Advisor",
        country: "CA",
        countryName: "Canada",
        stats: { sessions: 22, reviews: 18, consultationMinutes: 450, mentoringMinutes: 100 },
        tags: ["Sustainability", "Compliance"],
        consultationPrice: 110,
        mentorshipPrice: 80,
        bio: "Advising on environmental compliance and sustainable business practices.",
        languages: ["English", "French"],
        experience: [{ role: "Legal Counsel", company: "Green Earth NGO", period: "2018 - Present" }],
        education: [{ degree: "J.D.", school: "UBC", period: "2014 - 2017" }],
        reviews: [
            { id: "1", userName: "Emily C.", userInitial: "E", userColor: "bg-teal-600", rating: 4, timeAgo: "1 month", tag: "Mentorship", content: "Passionate and knowledgeable." }
        ],
        achievements: []
    },
    {
        id: "14",
        name: "Chioma Adebayo",
        image: "/avatars/lawyer_4.png",
        sector: "Tech Law",
        title: "Start-up Legal Counsel",
        country: "NG",
        countryName: "Nigeria",
        // EMPTY STATE
        stats: { sessions: 0, reviews: 0, consultationMinutes: 0, mentoringMinutes: 0 },
        tags: ["SaaS", "Data Privacy"],
        consultationPrice: 100,
        mentorshipPrice: 80,
        bio: "Legal guidance for the next generation of African tech unicorns.",
        languages: ["English", "Yoruba"],
        experience: [{ role: "Founder", company: "TechLegal NG", period: "2022 - Present" }],
        education: [{ degree: "LL.B", school: "Obafemi Awolowo University", period: "2016 - 2020" }],
        reviews: [],
        achievements: []
    },
    {
        id: "15",
        name: "Benjamin Hayes",
        image: "/avatars/lawyer_5.png",
        sector: "Health Law",
        title: "Healthcare Compliance Officer",
        country: "US",
        countryName: "United States",
        stats: { sessions: 35, reviews: 25, consultationMinutes: 700, mentoringMinutes: 150 },
        tags: ["HIPAA", "Medical Malpractice"],
        consultationPrice: 175,
        mentorshipPrice: 125,
        bio: "Navigating the intersection of medicine and law.",
        languages: ["English"],
        experience: [{ role: "In-House Counsel", company: "Metro Hospital", period: "2016 - Present" }],
        education: [{ degree: "J.D.", school: "Yale", period: "2012 - 2015" }],
        reviews: [
            { id: "1", userName: "Dr. Smith", userInitial: "S", userColor: "bg-blue-400", rating: 5, timeAgo: "2 weeks", tag: "Legal advice", content: "Clear guidance on compliance issues." }
        ],
        achievements: []
    },
    {
        id: "16",
        name: "Sophia Li",
        image: "/avatars/lawyer_1.jpg",
        sector: "Entertainment Law",
        title: "Media & Entertainment Attorney",
        country: "CN",
        countryName: "China",
        stats: { sessions: 110, reviews: 90, consultationMinutes: 2500, mentoringMinutes: 800 },
        tags: ["Film", "Music"],
        consultationPrice: 250,
        mentorshipPrice: 200,
        bio: "Representing talent and studios in the global entertainment market.",
        languages: ["Mandarin", "English"],
        experience: [{ role: "Partner", company: "Red Carpet Law", period: "2014 - Present" }],
        education: [{ degree: "LL.M", school: "Beijing Film Academy", period: "2010 - 2012" }],
        reviews: [
            { id: "1", userName: "Director X", userInitial: "X", userColor: "bg-purple-900", rating: 5, timeAgo: "1 day", tag: "Consultation", content: "Sophia is a shark! In the best way possible." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_red", title: "Top Mentor", date: "Nov 2023" }
        ]
    },
    {
        id: "17",
        name: "William Turner",
        image: "/avatars/lawyer_2.jpg",
        sector: "Maritime Law",
        title: "Maritime Legal Consultant",
        country: "GB",
        countryName: "United Kingdom",
        stats: { sessions: 18, reviews: 10, consultationMinutes: 300, mentoringMinutes: 50 },
        tags: ["Shipping", "Cargo"],
        consultationPrice: 190,
        mentorshipPrice: 140,
        bio: "Expertise in admiralty law and shipping regulations.",
        languages: ["English"],
        experience: [{ role: "Solicitor", company: "Port Authority", period: "2015 - Present" }],
        education: [{ degree: "LL.B", school: "University of Southampton", period: "2011 - 2014" }],
        reviews: [
            { id: "1", userName: "Captain Jack", userInitial: "J", userColor: "bg-blue-800", rating: 4, timeAgo: "6 months", tag: "Legal advice", content: "Knows the laws of the sea inside out." }
        ],
        achievements: []
    },
    {
        id: "18",
        name: "Fatima Al-Sayed",
        image: "/avatars/lawyer_3.jpg",
        sector: "Human Rights",
        title: "Human Rights Advocate",
        country: "AE",
        countryName: "UAE",
        stats: { sessions: 42, reviews: 38, consultationMinutes: 900, mentoringMinutes: 400 },
        tags: ["Refugee Rights", "Labor"],
        consultationPrice: 100,
        mentorshipPrice: 50,
        bio: "Dedicated to protecting the vulnerable and ensuring fair labor practices.",
        languages: ["Arabic", "English"],
        experience: [{ role: "Legal Officer", company: "Rights Watch", period: "2019 - Present" }],
        education: [{ degree: "LL.B", school: "University of Dubai", period: "2015 - 2019" }],
        reviews: [
            { id: "1", userName: "Anonymous", userInitial: "A", userColor: "bg-gray-400", rating: 5, timeAgo: "1 month", tag: "Legal advice", content: "Thank you for listening to my case." }
        ],
        achievements: []
    },
    {
        id: "19",
        name: "Jackson Pierce",
        image: "/avatars/lawyer_4.png",
        sector: "Constitutional Law",
        title: "Constitutional Scholar",
        country: "US",
        countryName: "United States",
        stats: { sessions: 5, reviews: 2, consultationMinutes: 60, mentoringMinutes: 0 },
        tags: ["Free Speech", "Civil Liberties"],
        consultationPrice: 130,
        mentorshipPrice: 100,
        bio: "Deep understanding of constitutional principles and civil liberties.",
        languages: ["English"],
        experience: [{ role: "Professor", company: "State University", period: "2010 - Present" }],
        education: [{ degree: "J.D.", school: "Georgetown", period: "2006 - 2009" }],
        reviews: [
            { id: "1", userName: "Student", userInitial: "S", userColor: "bg-yellow-600", rating: 4, timeAgo: "1 year", tag: "Mentorship", content: "Great academic insights." }
        ],
        achievements: []
    },
    {
        id: "20",
        name: "Grace O'Malley",
        image: "/avatars/lawyer_5.png",
        sector: "Admiralty Law",
        title: "Marine Insurance Specialist",
        country: "IE",
        countryName: "Ireland",
        stats: { sessions: 60, reviews: 52, consultationMinutes: 1200, mentoringMinutes: 300 },
        tags: ["Insurance", "Liability"],
        consultationPrice: 160,
        mentorshipPrice: 120,
        bio: "Specializing in marine insurance disputes and coverage analysis.",
        languages: ["English", "Irish"],
        experience: [{ role: "Partner", company: "Dublin Marine", period: "2016 - Present" }],
        education: [{ degree: "LL.B", school: "Trinity College Dublin", period: "2012 - 2016" }],
        reviews: [
            { id: "1", userName: "Seamus F.", userInitial: "S", userColor: "bg-green-500", rating: 5, timeAgo: "3 days", tag: "Legal advice", content: "Expert handling of our claim." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Top Specialist", date: "Oct 2023" }
        ]
    }
];

export const getLawyerById = (id: string) => lawyers.find(l => l.id === id);
