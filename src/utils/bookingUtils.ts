import { Booking, bookings as mockBookings } from "@/data/bookings";

const BOOKINGS_STORAGE_KEY = "lawyerup_bookings";

export const bookingManager = {
    getBookings: (): Booking[] => {
        if (typeof window === "undefined") return mockBookings;

        const stored = localStorage.getItem(BOOKINGS_STORAGE_KEY);
        if (!stored) {
            // Initialize with mock data
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(mockBookings));
            return mockBookings;
        }

        try {
            const parsed = JSON.parse(stored);
            // Verify it's an array
            return Array.isArray(parsed) ? parsed : mockBookings;
        } catch (e) {
            console.error("Failed to parse bookings from local storage", e);
            return mockBookings;
        }
    },

    addBooking: (booking: Booking): Booking[] => {
        const current = bookingManager.getBookings();
        const updated = [booking, ...current];
        if (typeof window !== "undefined") {
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
            // Dispatch event for reactive updates across components
            window.dispatchEvent(new CustomEvent("bookings-updated"));
        }
        return updated;
    },

    updateBooking: (id: string, updates: Partial<Booking>): Booking[] => {
        const current = bookingManager.getBookings();
        const updated = current.map(b => b.id === id ? { ...b, ...updates } : b);
        if (typeof window !== "undefined") {
            localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updated));
            window.dispatchEvent(new CustomEvent("bookings-updated"));
        }
        return updated;
    },

    // Subscribe to changes
    subscribe: (callback: () => void) => {
        if (typeof window === "undefined") return () => { };
        window.addEventListener("bookings-updated", callback);
        return () => window.removeEventListener("bookings-updated", callback);
    }
};
