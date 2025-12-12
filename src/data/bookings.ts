import { Lawyer, getLawyerById } from "./lawyers";

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type SessionType = "consultation" | "mentorship";

export interface Booking {
    id: string;
    lawyerId: string;
    date: string; // ISO string or just a date string like "2025-04-15"
    time: string;
    type: SessionType;
    status: BookingStatus;
    price: number;
    duration: number; // in minutes
    meetingLink?: string;
    topic?: string;
}

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const lastMonth = new Date(today);
lastMonth.setMonth(today.getMonth() - 1);

export const bookings: Booking[] = [
    {
        id: "bk_1",
        lawyerId: "1", // Sarah Jenkins
        date: nextWeek.toISOString().split('T')[0], // Next week
        time: "10:00 AM",
        type: "consultation",
        status: "confirmed",
        price: 100,
        duration: 60,
        meetingLink: "https://zoom.us/j/123456789",
        topic: "Contract Review for Startup"
    },
    {
        id: "bk_2",
        lawyerId: "3", // Michael Ross
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString().split('T')[0], // 3 days from now
        time: "2:00 PM",
        type: "mentorship",
        status: "pending",
        price: 180,
        duration: 60,
        topic: "Career pivoting advice"
    },
    {
        id: "bk_3",
        lawyerId: "2", // David Okon
        date: lastMonth.toISOString().split('T')[0], // Last month
        time: "11:00 AM",
        type: "consultation",
        status: "completed",
        price: 120,
        duration: 60,
        topic: "Property Dispute"
    },
    {
        id: "bk_4",
        lawyerId: "5", // James Carter
        date: "2024-12-01",
        time: "09:00 AM",
        type: "mentorship",
        status: "cancelled",
        price: 130,
        duration: 45,
        topic: "Initial Mentorship Session"
    }
];

export function getBookingLawyer(booking: Booking): Lawyer | undefined {
    return getLawyerById(booking.lawyerId);
}
