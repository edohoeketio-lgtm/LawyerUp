export interface ForumThread {
    id: string;
    title: string;
    excerpt: string;
    author: {
        name: string;
        avatar: string;
        role: "Lawyer" | "Client" | "Student";
    };
    category: "General" | "Legal Advice" | "Career" | "Bar Exam" | "News";
    createdAt: string;
    upvotes: number;
    comments: number;
    isUpvoted?: boolean;
    isBookmarked?: boolean;
}

export const forumThreads: ForumThread[] = [
    {
        id: "1",
        title: "Tips for passing the NY Bar Exam on the first try?",
        excerpt: "I've been studying for 3 months using Barbri, but I still feel unprepared for the MBE section. Does anyone have specific strategies that helped them?",
        author: {
            name: "Sarah Chen",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Student"
        },
        category: "Bar Exam",
        createdAt: "2024-03-15T10:00:00Z",
        upvotes: 42,
        comments: 15
    },
    {
        id: "2",
        title: "Understanding IP Rights for Software Startups",
        excerpt: "Can someone explain the difference between copyright and patent protection for a SaaS platform? We are launching soon and want to be protected.",
        author: {
            name: "Alex Rivera",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Client"
        },
        category: "Legal Advice",
        createdAt: "2024-03-14T14:30:00Z",
        upvotes: 28,
        comments: 8
    },
    {
        id: "3",
        title: "Transitioning from Big Law to In-House",
        excerpt: "After 5 years in M&A, I'm considering moving in-house. What should I look for in a company culture, and how is the work-life balance comparison?",
        author: {
            name: "Emily Blunt",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Lawyer"
        },
        category: "Career",
        createdAt: "2024-03-12T09:15:00Z",
        upvotes: 85,
        comments: 32
    },
    {
        id: "4",
        title: "Supreme Court's latest ruling on digital privacy",
        excerpt: "A deep dive into the recent decision and its implications for tech companies storing user data. Let's discuss the dissenting opinion.",
        author: {
            name: "Marcus Johnson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Lawyer"
        },
        category: "News",
        createdAt: "2024-03-10T11:45:00Z",
        upvotes: 120,
        comments: 45
    },
    {
        id: "5",
        title: "Best networking events for law students in Chicago?",
        excerpt: "I'm a 2L at UChicago looking to expand my network in corporate law. Are there any upcoming mixers or bar association events recommended?",
        author: {
            name: "Jordan Lee",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            role: "Student"
        },
        category: "General",
        createdAt: "2024-03-09T16:20:00Z",
        upvotes: 12,
        comments: 3
    }
];
