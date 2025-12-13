export interface Message {
    id: string;
    senderId: string;
    content: string;
    timestamp: string;
    type: 'text' | 'image';
    isMe: boolean;
}

export interface ChatThread {
    lawyerId: string;
    messages: Message[];
}

// Mock initial messages for demonstration
export const initialChats: Record<string, Message[]> = {
    "1": [ // Ralph Edwards
        {
            id: "m1",
            senderId: "lawyer",
            content: "Hello Nsikan, I've reviewed the documents you sent.",
            timestamp: "2024-05-15T10:30:00Z",
            type: "text",
            isMe: false
        },
        {
            id: "m2",
            senderId: "me",
            content: "Great! Do you think we have a strong case?",
            timestamp: "2024-05-15T10:32:00Z",
            type: "text",
            isMe: true
        }
    ],
    "2": [ // Annette Black
        {
            id: "m1",
            senderId: "lawyer",
            content: "Please send over the contract when you can.",
            timestamp: "2024-05-14T14:00:00Z",
            type: "text",
            isMe: false
        }
    ]
};
