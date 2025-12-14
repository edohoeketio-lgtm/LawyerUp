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
        stats: { sessions: 4, reviews: 4, consultationMinutes: 180, mentoringMinutes: 60 },
        tags: ["Business", "Corporate"],
        consultationPrice: 100,
        mentorshipPrice: 0,
        bio: "With over a decade of experience in criminal defense, I specialize in helping individuals navigate complex legal situations. My approach is client-centered, ensuring that you understand every step of the legal process. I have successfully defended hundreds of clients facing charges ranging from white-collar crimes to major felonies. I believe in fighting tirelessly for justice and upholding the presumption of innocence. Whether you need immediate legal representation or long-term defense strategy, I am here to protect your rights and future.",
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
            { id: "2", userName: "Mark D.", userInitial: "M", userColor: "bg-blue-600", rating: 4, timeAgo: "3 days", tag: "Mentorship", content: "Great session. Sarah is very experienced and gave me good career advice. A bit pricey, but worth it." },
            { id: "3", userName: "John S.", userInitial: "J", userColor: "bg-green-600", rating: 5, timeAgo: "1 week", tag: "Consultation", content: "Helped me out of a tough spot." },
            { id: "4", userName: "Lisa M.", userInitial: "L", userColor: "bg-purple-600", rating: 4, timeAgo: "2 weeks", tag: "Legal advice", content: "Very professional." }
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
        stats: { sessions: 2, reviews: 2, consultationMinutes: 90, mentoringMinutes: 30 },
        tags: ["Finance", "Startups"],
        consultationPrice: 120,
        mentorshipPrice: 0,
        bio: "Specializing in corporate law and finance within African markets. Ready to help startups scale. I provide strategic legal counsel to emerging companies, venture capital firms, and multinational corporations looking to do business in Nigeria and West Africa. My expertise covers regulatory compliance, mergers and acquisitions, and corporate governance. I am passionate about empowering African entrepreneurs and ensuring their businesses are built on solid legal foundations to attract global investment.",
        languages: ["English", "French"],
        experience: [{ role: "Partner", company: "Lagos Legal", period: "2019 - Present" }],
        education: [{ degree: "LL.B", school: "University of Lagos", period: "2012 - 2016" }],
        reviews: [
            { id: "1", userName: "Chidi O.", userInitial: "C", userColor: "bg-green-700", rating: 5, timeAgo: "2 weeks", tag: "Legal advice", content: "Excellent advice for my startup." },
            { id: "2", userName: "Ngozi A.", userInitial: "N", userColor: "bg-red-600", rating: 4, timeAgo: "1 month", tag: "Mentorship", content: "Learned a lot about IP in Nigeria." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_gold", title: "Startup Advisor", date: "Dec 2023" }
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
        stats: { sessions: 3, reviews: 3, consultationMinutes: 120, mentoringMinutes: 60 },
        tags: ["Divorce", "Custody"],
        consultationPrice: 90,
        mentorshipPrice: 70,
        bio: "Helping families resolve disputes with compassion and expertise. I understand that family law matters are deeply personal and emotional. My practice focuses on divorce mediation, child custody arrangements, and spousal support. I aim to achieve amicable resolutions whenever possible to minimize conflict and stress for all parties involved. However, when litigation is necessary, I am a fierce advocate for my clients' interests in court. I am committed to guiding you through this difficult chapter with dignity and respect.",
        languages: ["English", "Spanish", "Portuguese"],
        experience: [{ role: "Senior Associate", company: "Rodriguez Law", period: "2016 - Present" }],
        education: [{ degree: "LL.M", school: "University of Madrid", period: "2011 - 2012" }],
        reviews: [
            { id: "1", userName: "Ana G.", userInitial: "A", userColor: "bg-red-600", rating: 5, timeAgo: "2 days", tag: "Legal advice", content: "Maria was incredibly supportive during my custody battle." },
            { id: "2", userName: "Carlos R.", userInitial: "C", userColor: "bg-blue-500", rating: 5, timeAgo: "3 weeks", tag: "Consultation", content: "Very clear and kind." },
            { id: "3", userName: "Elena M.", userInitial: "E", userColor: "bg-yellow-500", rating: 4, timeAgo: "1 month", tag: "Legal advice", content: "Good service." }
        ],
        achievements: [
            { id: "1", iconType: "session_blue", title: "First 100 Sessions", date: "Jun 2024" },
            { id: "2", iconType: "consultation_purple", title: "Family Law Expert", date: "Jan 2024" }
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
        stats: { sessions: 4, reviews: 4, consultationMinutes: 200, mentoringMinutes: 40 },
        tags: ["Wills", "Trusts"],
        consultationPrice: 150,
        mentorshipPrice: 0,
        bio: "Securing your legacy for future generations with comprehensive estate planning.",
        languages: ["English", "Hebrew"],
        experience: [{ role: "Independent Advisor", company: "Cohen Estates", period: "2020 - Present" }],
        education: [{ degree: "J.D.", school: "Tel Aviv University", period: "2014 - 2018" }],
        reviews: [
            { id: "1", userName: "David L.", userInitial: "D", userColor: "bg-blue-800", rating: 5, timeAgo: "1 week", tag: "Legal advice", content: "Very thorough and detail-oriented. Helped us navigate a complex family trust." },
            { id: "2", userName: "Sarah M.", userInitial: "S", userColor: "bg-green-600", rating: 5, timeAgo: "2 weeks", tag: "Consultation", content: "Rabbi Cohen was incredibly patient and explained everything in terms we could understand." },
            { id: "3", userName: "Jonathan K.", userInitial: "J", userColor: "bg-purple-600", rating: 4, timeAgo: "1 month", tag: "Legal advice", content: "Professional service, though booking was a bit tight." },
            { id: "4", userName: "Rachel B.", userInitial: "R", userColor: "bg-orange-500", rating: 5, timeAgo: "2 months", tag: "Mentorship", content: "Great insights into estate law." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_gold", title: "Top Estate Planner", date: "Jan 2024" },
            { id: "2", iconType: "session_blue", title: "50+ Sessions", date: "Mar 2024" }
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
        stats: { sessions: 5, reviews: 5, consultationMinutes: 250, mentoringMinutes: 50 },
        tags: ["Tech", "Copyright"],
        consultationPrice: 200,
        mentorshipPrice: 150,
        bio: "Protecting ideas and innovation in the digital age.",
        languages: ["English"],
        experience: [{ role: "IP Counsel", company: "Tech Giants Ltd", period: "2017 - Present" }],
        education: [{ degree: "LL.B", school: "Oxford University", period: "2013 - 2016" }],
        reviews: [
            { id: "1", userName: "TechStart Inc.", userInitial: "T", userColor: "bg-purple-600", rating: 5, timeAgo: "5 days", tag: "Consultation", content: "Saved us from a major copyright infringement lawsuit. Highly recommended." },
            { id: "2", userName: "DevStudio", userInitial: "D", userColor: "bg-blue-500", rating: 5, timeAgo: "2 weeks", tag: "Legal advice", content: "James knows his stuff. Best IP lawyer we've worked with." },
            { id: "3", userName: "IndieGame Dev", userInitial: "I", userColor: "bg-green-500", rating: 4, timeAgo: "3 weeks", tag: "Mentorship", content: "Great advice on protecting game assets." },
            { id: "4", userName: "CreateCorp", userInitial: "C", userColor: "bg-red-500", rating: 5, timeAgo: "1 month", tag: "Consultation", content: "Worth every penny." },
            { id: "5", userName: "AppWorks", userInitial: "A", userColor: "bg-yellow-500", rating: 4, timeAgo: "2 months", tag: "Legal advice", content: "Solid legal counsel." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_purple", title: "Expert Consultant", date: "Aug 2023" },
            { id: "2", iconType: "mentorship_red", title: "Top Mentor", date: "Dec 2023" }
        ]
    },
    {
        id: "6",
        name: "Anita Singh",
        image: "/avatars/lawyer_6.jpg",
        sector: "Immigration Law",
        title: "Immigration Specialist",
        country: "IN",
        countryName: "India",
        stats: { sessions: 3, reviews: 3, consultationMinutes: 140, mentoringMinutes: 40 },
        tags: ["Visa", "Residency"],
        consultationPrice: 80,
        mentorshipPrice: 0,
        bio: "Navigating complex immigration pathways to help you build a new life.",
        languages: ["English", "Hindi", "Punjabi"],
        experience: [{ role: "Senior Consultant", company: "Global Access", period: "2015 - Present" }],
        education: [{ degree: "LL.B", school: "Delhi University", period: "2010 - 2014" }],
        reviews: [
            { id: "1", userName: "Raj P.", userInitial: "R", userColor: "bg-orange-500", rating: 5, timeAgo: "2 days", tag: "Legal advice", content: "Anita made the visa process so simple." },
            { id: "2", userName: "Priya K.", userInitial: "P", userColor: "bg-pink-600", rating: 5, timeAgo: "1 week", tag: "Consultation", content: "Highly recommended for US visa applications." },
            { id: "3", userName: "Amit S.", userInitial: "A", userColor: "bg-blue-600", rating: 4, timeAgo: "2 weeks", tag: "Legal advice", content: "Good service." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_green", title: "Top Rated 2024", date: "Jan 2024" },
            { id: "2", iconType: "mentorship_orange", title: "Community Leader", date: "Feb 2024" }
        ]
    },
    {
        id: "7",
        name: "Michael Chang",
        image: "/avatars/lawyer_7.jpg",
        sector: "Real Estate Law",
        title: "Real Estate Attorney",
        country: "SG",
        countryName: "Singapore",
        stats: { sessions: 2, reviews: 2, consultationMinutes: 90, mentoringMinutes: 30 },
        tags: ["Commercial", "Leasing"],
        consultationPrice: 180,
        mentorshipPrice: 130,
        bio: "Expert advice on commercial leasing and property acquisition in Asia.",
        languages: ["English", "Mandarin"],
        experience: [{ role: "Associate", company: "Skyline Properties", period: "2018 - Present" }],
        education: [{ degree: "J.D.", school: "NUS", period: "2014 - 2017" }],
        reviews: [
            { id: "1", userName: "Lim W.", userInitial: "L", userColor: "bg-blue-500", rating: 4, timeAgo: "1 month", tag: "Consultation", content: "Precise and to the point." },
            { id: "2", userName: "Tan S.", userInitial: "T", userColor: "bg-red-500", rating: 5, timeAgo: "2 months", tag: "Legal advice", content: "Great local knowledge." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Property Expert", date: "Sep 2023" }
        ]
    },
    {
        id: "8",
        name: "Olivia Dunham",
        image: "/avatars/lawyer_8.jpg",
        sector: "Civil Rights",
        title: "Civil Rights Activist",
        country: "US",
        countryName: "United States",
        stats: { sessions: 1, reviews: 1, consultationMinutes: 60, mentoringMinutes: 0 },
        tags: ["Discrimination", "Privacy"],
        consultationPrice: 110,
        mentorshipPrice: 0,
        bio: "Fighting for justice and equality for all citizens.",
        languages: ["English"],
        experience: [{ role: "Staff Attorney", company: "ACLU", period: "2021 - Present" }],
        education: [{ degree: "J.D.", school: "Columbia Law", period: "2017 - 2020" }],
        reviews: [
            { id: "1", userName: "Alex J.", userInitial: "A", userColor: "bg-purple-600", rating: 5, timeAgo: "3 months", tag: "Legal advice", content: "Passionate about justice." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_red", title: "Justice Warrior", date: "Jan 2024" }
        ]
    },
    {
        id: "9",
        name: "Marcus Thorne",
        image: "/avatars/lawyer_9.jpg",
        sector: "Employment Law",
        title: "Labor Law Expert",
        country: "AU",
        countryName: "Australia",
        stats: { sessions: 2, reviews: 2, consultationMinutes: 90, mentoringMinutes: 30 },
        tags: ["Contracts", "Disputes"],
        consultationPrice: 140,
        mentorshipPrice: 100,
        bio: "Ensuring fair treatment in the workplace for employees and employers.",
        languages: ["English"],
        experience: [{ role: "Partner", company: "Thorne & Associates", period: "2016 - Present" }],
        education: [{ degree: "LL.B", school: "University of Sydney", period: "2011 - 2015" }],
        reviews: [
            { id: "1", userName: "Sarah K.", userInitial: "S", userColor: "bg-green-600", rating: 5, timeAgo: "3 weeks", tag: "Legal advice", content: "Helped me understand my contract perfectly." },
            { id: "2", userName: "Mike T.", userInitial: "M", userColor: "bg-blue-600", rating: 4, timeAgo: "1 month", tag: "Consultation", content: "Good advice on redundancy." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_orange", title: "Dedicated Mentor", date: "Dec 2023" }
        ]
    },
    {
        id: "10",
        name: "Elena Popov",
        image: "/avatars/lawyer_10.jpg",
        sector: "Tax Law",
        title: "Tax Consultant",
        country: "RU",
        countryName: "Russia",
        stats: { sessions: 2, reviews: 2, consultationMinutes: 100, mentoringMinutes: 20 },
        tags: ["International Tax", "Audit"],
        consultationPrice: 160,
        mentorshipPrice: 0,
        bio: "Navigating complex international tax regulations for expats.",
        languages: ["Russian", "English", "German"],
        experience: [{ role: "Senior Consultant", company: "Global Tax Solutions", period: "2017 - Present" }],
        education: [{ degree: "Master of Taxation", school: "Moscow State University", period: "2013 - 2015" }],
        reviews: [
            { id: "1", userName: "Dmitry V.", userInitial: "D", userColor: "bg-red-700", rating: 4, timeAgo: "2 months", tag: "Legal advice", content: "Very knowledgeable about double taxation treaties." },
            { id: "2", userName: "Olga S.", userInitial: "O", userColor: "bg-blue-600", rating: 5, timeAgo: "3 months", tag: "Consultation", content: "Saved me a lot of money." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_green", title: "Tax Expert", date: "Nov 2023" }
        ]
    },
    {
        id: "11",
        name: "Samuel Stern",
        image: "/avatars/lawyer_1.jpg",
        sector: "Bankruptcy Law",
        title: "Financial Restructuring Advisor",
        country: "US",
        countryName: "United States",
        stats: { sessions: 1, reviews: 1, consultationMinutes: 45, mentoringMinutes: 15 },
        tags: ["Debt", "Restructuring"],
        consultationPrice: 130,
        mentorshipPrice: 90,
        bio: "Helping businesses and individuals find a fresh financial start.",
        languages: ["English"],
        experience: [{ role: "Associate", company: "Stern Legal", period: "2019 - Present" }],
        education: [{ degree: "J.D.", school: "NYU Law", period: "2015 - 2018" }],
        reviews: [
            { id: "1", userName: "Business Corp", userInitial: "B", userColor: "bg-gray-600", rating: 5, timeAgo: "1 month", tag: "Consultation", content: "Helped us restructure our debt effectively." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Financial Aid", date: "Jan 2024" }
        ]
    },
    {
        id: "12",
        name: "Isabella Rossi",
        image: "/avatars/lawyer_2.jpg",
        sector: "International Law",
        title: "International Trade Counsel",
        country: "IT",
        countryName: "Italy",
        stats: { sessions: 3, reviews: 3, consultationMinutes: 150, mentoringMinutes: 30 },
        tags: ["Trade", "Arbitration"],
        consultationPrice: 220,
        mentorshipPrice: 0,
        bio: "Expert in cross-border disputes and international trade regulations.",
        languages: ["Italian", "English", "French"],
        experience: [{ role: "Partner", company: "Rossi Global", period: "2015 - Present" }],
        education: [{ degree: "LL.M", school: "University of Bologna", period: "2010 - 2011" }],
        reviews: [
            { id: "1", userName: "Marco P.", userInitial: "M", userColor: "bg-green-700", rating: 5, timeAgo: "5 days", tag: "Consultation", content: "Eccellente! Solved our import issue quickly." },
            { id: "2", userName: "Trade Ltd", userInitial: "T", userColor: "bg-blue-600", rating: 4, timeAgo: "2 weeks", tag: "Legal advice", content: "Very professional." },
            { id: "3", userName: "Giulia F.", userInitial: "G", userColor: "bg-red-500", rating: 5, timeAgo: "1 month", tag: "Mentorship", content: "Great mentor." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_gold", title: "Premium Advisor", date: "Sep 2023" },
            { id: "2", iconType: "session_blue", title: "100 Sessions", date: "Dec 2023" }
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
        stats: { sessions: 2, reviews: 2, consultationMinutes: 90, mentoringMinutes: 30 },
        tags: ["Sustainability", "Compliance"],
        consultationPrice: 110,
        mentorshipPrice: 80,
        bio: "Advising on environmental compliance and sustainable business practices.",
        languages: ["English", "French"],
        experience: [{ role: "Legal Counsel", company: "Green Earth NGO", period: "2018 - Present" }],
        education: [{ degree: "J.D.", school: "UBC", period: "2014 - 2017" }],
        reviews: [
            { id: "1", userName: "Emily C.", userInitial: "E", userColor: "bg-teal-600", rating: 4, timeAgo: "1 month", tag: "Mentorship", content: "Passionate and knowledgeable." },
            { id: "2", userName: "EcoFriendly Inc", userInitial: "E", userColor: "bg-green-600", rating: 5, timeAgo: "2 months", tag: "Consultation", content: "Great advice on new regulations." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_green", title: "Green Energy Advocate", date: "Feb 2024" }
        ]
    },
    {
        id: "14",
        name: "Chioma Adebayo",
        image: "/avatars/lawyer_4.png",
        sector: "Tech Law",
        title: "Start-up Legal Counsel",
        country: "NG",
        countryName: "Nigeria",
        stats: { sessions: 1, reviews: 1, consultationMinutes: 50, mentoringMinutes: 10 },
        tags: ["SaaS", "Data Privacy"],
        consultationPrice: 100,
        mentorshipPrice: 80,
        bio: "Legal guidance for the next generation of African tech unicorns.",
        languages: ["English", "Yoruba"],
        experience: [{ role: "Founder", company: "TechLegal NG", period: "2022 - Present" }],
        education: [{ degree: "LL.B", school: "Obafemi Awolowo University", period: "2016 - 2020" }],
        reviews: [
            { id: "1", userName: "Startup Hub", userInitial: "S", userColor: "bg-purple-600", rating: 5, timeAgo: "2 weeks", tag: "Mentorship", content: "Inspiring journey." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_orange", title: "Tech Mentor", date: "Jan 2024" }
        ]
    },
    {
        id: "15",
        name: "Benjamin Hayes",
        image: "/avatars/lawyer_5.png",
        sector: "Health Law",
        title: "Healthcare Compliance Officer",
        country: "US",
        countryName: "United States",
        stats: { sessions: 2, reviews: 2, consultationMinutes: 100, mentoringMinutes: 20 },
        tags: ["HIPAA", "Medical Malpractice"],
        consultationPrice: 175,
        mentorshipPrice: 125,
        bio: "Navigating the intersection of medicine and law.",
        languages: ["English"],
        experience: [{ role: "In-House Counsel", company: "Metro Hospital", period: "2016 - Present" }],
        education: [{ degree: "J.D.", school: "Yale", period: "2012 - 2015" }],
        reviews: [
            { id: "1", userName: "Dr. Smith", userInitial: "S", userColor: "bg-blue-400", rating: 5, timeAgo: "2 weeks", tag: "Legal advice", content: "Clear guidance on compliance issues." },
            { id: "2", userName: "Nurse Joy", userInitial: "J", userColor: "bg-pink-400", rating: 4, timeAgo: "1 month", tag: "Consultation", content: "Very helpful." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Health Compliance", date: "Mar 2024" }
        ]
    },
    {
        id: "16",
        name: "Sophia Li",
        image: "/avatars/lawyer_1.jpg",
        sector: "Entertainment Law",
        title: "Media & Entertainment Attorney",
        country: "CN",
        countryName: "China",
        stats: { sessions: 3, reviews: 3, consultationMinutes: 140, mentoringMinutes: 40 },
        tags: ["Film", "Music"],
        consultationPrice: 250,
        mentorshipPrice: 200,
        bio: "Representing talent and studios in the global entertainment market.",
        languages: ["Mandarin", "English"],
        experience: [{ role: "Partner", company: "Red Carpet Law", period: "2014 - Present" }],
        education: [{ degree: "LL.M", school: "Beijing Film Academy", period: "2010 - 2012" }],
        reviews: [
            { id: "1", userName: "Director X", userInitial: "X", userColor: "bg-purple-900", rating: 5, timeAgo: "1 day", tag: "Consultation", content: "Sophia is a shark! In the best way possible." },
            { id: "2", userName: "Actress Y", userInitial: "Y", userColor: "bg-pink-500", rating: 5, timeAgo: "1 week", tag: "Legal advice", content: "She protected my rights." },
            { id: "3", userName: "Band Z", userInitial: "B", userColor: "bg-blue-800", rating: 4, timeAgo: "2 weeks", tag: "Mentorship", content: "Good advice on contracts." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_red", title: "Top Mentor", date: "Nov 2023" },
            { id: "2", iconType: "consultation_gold", title: "Top Entertainment Lawyer", date: "Jan 2024" }
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
        stats: { sessions: 1, reviews: 1, consultationMinutes: 60, mentoringMinutes: 0 },
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
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Maritime Specialist", date: "Feb 2024" }
        ]
    },
    {
        id: "18",
        name: "Fatima Al-Sayed",
        image: "/avatars/lawyer_3.jpg",
        sector: "Human Rights",
        title: "Human Rights Advocate",
        country: "AE",
        countryName: "UAE",
        stats: { sessions: 2, reviews: 2, consultationMinutes: 100, mentoringMinutes: 20 },
        tags: ["Refugee Rights", "Labor"],
        consultationPrice: 100,
        mentorshipPrice: 0,
        bio: "Dedicated to protecting the vulnerable and ensuring fair labor practices.",
        languages: ["Arabic", "English"],
        experience: [{ role: "Legal Officer", company: "Rights Watch", period: "2019 - Present" }],
        education: [{ degree: "LL.B", school: "University of Dubai", period: "2015 - 2019" }],
        reviews: [
            { id: "1", userName: "Anonymous", userInitial: "A", userColor: "bg-gray-400", rating: 5, timeAgo: "1 month", tag: "Legal advice", content: "Thank you for listening to my case." },
            { id: "2", userName: "Worker", userInitial: "W", userColor: "bg-orange-500", rating: 4, timeAgo: "2 months", tag: "Consultation", content: "Very helpful." }
        ],
        achievements: [
            { id: "1", iconType: "mentorship_orange", title: "Rights Advocate", date: "Dec 2023" }
        ]
    },
    {
        id: "19",
        name: "Jackson Pierce",
        image: "/avatars/lawyer_4.png",
        sector: "Constitutional Law",
        title: "Constitutional Scholar",
        country: "US",
        countryName: "United States",
        stats: { sessions: 1, reviews: 1, consultationMinutes: 60, mentoringMinutes: 0 },
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
        achievements: [
            { id: "1", iconType: "mentorship_red", title: "Academic Excellence", date: "May 2023" }
        ]
    },
    {
        id: "20",
        name: "Grace O'Malley",
        image: "/avatars/lawyer_5.png",
        sector: "Admiralty Law",
        title: "Marine Insurance Specialist",
        country: "IE",
        countryName: "Ireland",
        stats: { sessions: 3, reviews: 3, consultationMinutes: 150, mentoringMinutes: 30 },
        tags: ["Insurance", "Liability"],
        consultationPrice: 160,
        mentorshipPrice: 120,
        bio: "Specializing in marine insurance disputes and coverage analysis.",
        languages: ["English", "Irish"],
        experience: [{ role: "Partner", company: "Dublin Marine", period: "2016 - Present" }],
        education: [{ degree: "LL.B", school: "Trinity College Dublin", period: "2012 - 2016" }],
        reviews: [
            { id: "1", userName: "Seamus F.", userInitial: "S", userColor: "bg-green-500", rating: 5, timeAgo: "3 days", tag: "Legal advice", content: "Expert handling of our claim." },
            { id: "2", userName: "Insurance Co", userInitial: "I", userColor: "bg-blue-600", rating: 4, timeAgo: "1 week", tag: "Consultation", content: "Reliable." },
            { id: "3", userName: "Patrick M.", userInitial: "P", userColor: "bg-red-500", rating: 4, timeAgo: "2 weeks", tag: "Legal advice", content: "Good." }
        ],
        achievements: [
            { id: "1", iconType: "consultation_blue", title: "Top Specialist", date: "Oct 2023" },
            { id: "2", iconType: "mentorship_orange", title: "Marine Mentor", date: "Dec 2023" }
        ]
    },
    // Adding more mock lawyers to populate "Similar Lawyers"
    {
        id: "21",
        name: "Sarah Jenkins",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        sector: "Criminal Defense",
        title: "Criminal Defense Attorney",
        country: "GB",
        countryName: "United Kingdom",
        stats: { sessions: 45, reviews: 32 },
        tags: ["Criminal Law", "Defense"],
        consultationPrice: 180,
        mentorshipPrice: 0,
        bio: "Experienced defense attorney.",
        languages: ["English"],
        experience: [],
        education: [],
        reviews: [],
        achievements: []
    },
    {
        id: "22",
        name: "Michael Chen",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        sector: "Corporate Law",
        title: "Corporate Attorney",
        country: "US",
        countryName: "United States",
        stats: { sessions: 88, reviews: 70 },
        tags: ["Business", "Corporate"],
        consultationPrice: 250,
        mentorshipPrice: 200,
        bio: "Specialist in corporate mergers.",
        languages: ["English", "Mandarin"],
        experience: [],
        education: [],
        reviews: [],
        achievements: []
    },
    {
        id: "23",
        name: "Amara Okeke",
        image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        sector: "Criminal Defense",
        title: "Senior Defense Counsel",
        country: "NG",
        countryName: "Nigeria",
        stats: { sessions: 120, reviews: 98 },
        tags: ["Criminal Law", "Litigation"],
        consultationPrice: 100,
        mentorshipPrice: 80,
        bio: "High profile criminal defense expertise.",
        languages: ["English", "Igbo"],
        experience: [],
        education: [],
        reviews: [],
        achievements: []
    }
];

export const getLawyerById = (id: string) => lawyers.find(l => l.id === id);
