import { Lawyer, getLawyerById } from "./lawyers";

export type BookingStatus = "confirmed" | "pending" | "completed" | "cancelled" | "rescheduled";
export type SessionType = "consultation" | "mentorship";

export interface Booking {
    id: string;
    lawyerId: string;
    date: string; // ISO date string YYYY-MM-DD
    time: string;
    duration: number; // in minutes
    type: 'consultation' | 'mentorship';
    meetingLink?: string; // only if confirmed status
    topic?: string;
    price: number;
    status: BookingStatus;
    rescheduleCount?: number;
}

const today = new Date();
const nextWeek = new Date(today);
nextWeek.setDate(today.getDate() + 7);
const lastMonth = new Date(today);
lastMonth.setMonth(today.getMonth() - 1);

export const bookings: Booking[] = [
    {
        id: "1",
        lawyerId: "1", // Sarah Jenkins
        date: nextWeek.toISOString().split('T')[0], // Next week
        time: "10:00 AM",
        duration: 60,
        type: "consultation",
        topic: "Intellectual Property Dispute",
        price: 150,
        status: "confirmed",
        rescheduleCount: 0
    },
    {
        id: "2",
        lawyerId: "3", // David Chen
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3).toISOString().split('T')[0], // 3 days from now
        time: "2:00 PM",
        duration: 45,
        type: "mentorship",
        topic: "Career guidance in Corporate Law",
        price: 100,
        status: "pending",
        rescheduleCount: 0
    },
    {
        id: "3",
        lawyerId: "2", // MichaelRoss
        date: lastMonth.toISOString().split('T')[0], // Past
        time: "11:00 AM",
        duration: 60,
        type: "consultation",
        topic: "Contract Review",
        price: 200,
        status: "completed",
        rescheduleCount: 0
    },
    {
        id: "4",
        lawyerId: "4", // Rabbi Cohen
        date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 20).toISOString().split('T')[0], // 20 days from now
        time: "4:00 PM",
        duration: 30,
        type: "consultation",
        topic: "Family Law Consultation",
        price: 120,
        status: "rescheduled",
        rescheduleCount: 1
    }
];

export function getBookingLawyer(booking: Booking): Lawyer | undefined {
    return getLawyerById(booking.lawyerId);
}
