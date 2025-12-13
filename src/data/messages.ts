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
                timestamp: "Yesterday, 2:00 PM",
                isRead: true
            },
            {
                id: "m2",
                senderId: "me",
                content: "That's great news! What are the next steps?",
                timestamp: "Yesterday, 2:15 PM",
                isRead: true
            },
            {
                id: "m3",
                senderId: "1",
                content: "I've drafted a motion to dismiss. Please take a look when you can.",
                timestamp: "Yesterday, 4:00 PM",
                isRead: true
            },
            {
                id: "m4",
                senderId: "me",
                content: "Received. I will send over the signed copies tomorrow.",
                timestamp: "Today, 9:00 AM",
                isRead: true
            },
            {
                id: "m5",
                senderId: "1",
                content: "Thank you for the update. I'll review the documents.",
                timestamp: "10:30 AM",
                isRead: false
            }
        ]
    },
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
                timestamp: "Mon, 10:00 AM",
                isRead: true
            },
            {
                id: "m2",
                senderId: "me",
                content: "Hi Maria, I have some questions about custody arrangements.",
                timestamp: "Mon, 10:30 AM",
                isRead: true
            },
            {
                id: "m3",
                senderId: "3",
                content: "I specialize in that area. Let's schedule a call for next week.",
                timestamp: "Yesterday, 3:00 PM",
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
                timestamp: "Tue, 1:00 PM",
                isRead: true
            },
            {
                id: "m2",
                senderId: "5",
                content: "Yes, final checks are done. The patent filing has been submitted.",
                timestamp: "Wed, 9:00 AM",
                isRead: true
            }
        ]
    }
];
