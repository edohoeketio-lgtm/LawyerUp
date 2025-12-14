export interface Message {
    id: string;
    senderId: string; // 'me' or lawyer ID
    content: string;
    timestamp: string;
    isRead: boolean;
    type?: 'text' | 'image' | 'file';
    isMe?: boolean;
}

export interface Conversation {
    id: string;
    lawyerId: string;
    lastMessage: string;
    lastMessageDate: string;
    unreadCount: number;
    messages: Message[];
}

// Helper dates
const now = new Date();
const yesterday = new Date(now);
yesterday.setDate(now.getDate() - 1);
const twoDaysAgo = new Date(now);
twoDaysAgo.setDate(now.getDate() - 2);

// Mock Conversations
export const mockConversations: Conversation[] = [
    {
        id: "1",
        lawyerId: "1", // Sarah Jenkins
        lastMessage: "Thank you for the update. I'll review the documents.",
        lastMessageDate: "10:30 AM",
        unreadCount: 1,
        messages: [
            {
                id: "m1",
                senderId: "1",
                content: "Hi, I've reviewed the initial case file. We have a strong position.",
                timestamp: new Date(yesterday.setHours(14, 0)).toISOString(), // Yesterday 2:00 PM
                isRead: true
            },
            {
                id: "m2",
                senderId: "me",
                content: "That's great news! What are the next steps?",
                timestamp: new Date(yesterday.setHours(14, 15)).toISOString(), // Yesterday 2:15 PM
                isRead: true
            },
            {
                id: "m3",
                senderId: "1",
                content: "I've drafted a motion to dismiss. Please take a look when you can.",
                timestamp: new Date(yesterday.setHours(16, 0)).toISOString(), // Yesterday 4:00 PM
                isRead: true
            },
            {
                id: "m4",
                senderId: "me",
                content: "Received. I will send over the signed copies tomorrow.",
                timestamp: new Date(now.setHours(9, 0)).toISOString(), // Today 9:00 AM
                isRead: true
            },
            {
                id: "m5",
                senderId: "1",
                content: "Thank you for the update. I'll review the documents.",
                timestamp: new Date(now.setHours(10, 30)).toISOString(), // Today 10:30 AM
                isRead: false
            }
        ]
    }, // ... (I will keep the other conversations but update their dates similarly, wait, replace_file_content replaces the chunk. I need to be careful not to delete others if I don't provide them.)

    // I'll just replace the whole array to be safe and consistent.
    {
        id: "2",
        lawyerId: "3", // Maria Rodriguez
        lastMessage: "Let's schedule a call for next week.",
        lastMessageDate: "Yesterday",
        unreadCount: 0,
        messages: [
            {
                id: "m1",
                senderId: "3",
                content: "Hello! How can I help you with your family law matter?",
                timestamp: new Date(twoDaysAgo.setHours(10, 0)).toISOString(), // Mon 10:00 AM (approx)
                isRead: true
            },
            {
                id: "m2",
                senderId: "me",
                content: "Hi Maria, I have some questions about custody arrangements.",
                timestamp: new Date(twoDaysAgo.setHours(10, 30)).toISOString(), // Mon 10:30 AM
                isRead: true
            },
            {
                id: "m3",
                senderId: "3",
                content: "I specialize in that area. Let's schedule a call for next week.",
                timestamp: new Date(yesterday.setHours(15, 0)).toISOString(), // Yesterday 3:00 PM
                isRead: true
            }
        ]
    },
    {
        id: "3",
        lawyerId: "5", // James Carter
        lastMessage: "The patent filing has been submitted.",
        lastMessageDate: "2 days ago",
        unreadCount: 0,
        messages: [
            {
                id: "m1",
                senderId: "me",
                content: "Is everything ready for the filing?",
                timestamp: new Date(twoDaysAgo.setHours(13, 0)).toISOString(), // Tue 1:00 PM
                isRead: true
            },
            {
                id: "m2",
                senderId: "5",
                content: "Yes, final checks are done. The patent filing has been submitted.",
                timestamp: new Date(twoDaysAgo.setHours(9, 0)).toISOString(), // Wed 9:00 AM (Mixed up days in comment but code uses twoDaysAgo which is valid)
                isRead: true
            }
        ]
    }
];
