import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingsPage from '../page';

// Mock Data
vi.mock('@/data/bookings', () => ({
    bookings: [
        { id: '1', lawyerId: '1', status: 'confirmed', date: '2025-01-01', time: '10:00 AM', type: 'consultation', price: 100, duration: 60 },
        { id: '2', lawyerId: '1', status: 'completed', date: '2024-01-01', time: '10:00 AM', type: 'mentorship', price: 100, duration: 60 },
        { id: '3', lawyerId: '1', status: 'cancelled', date: '2024-01-01', time: '10:00 AM', type: 'consultation', price: 100, duration: 60 },
    ],
    getBookingLawyer: () => ({ name: 'Test Lawyer', title: 'Title', image: '/img.jpg' })
}));

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

// Mock Link
vi.mock('next/link', () => ({
    default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('BookingsPage', () => {
    it('renders and defaults to upcoming bookings', () => {
        render(<BookingsPage />);
        // Should show confirmed booking (id 1)
        expect(screen.getByText('Test Lawyer')).toBeDefined();
        // Should NOT show completed/cancelled (ids 2, 3) - simplistically assuming names are same but we can check count if we used different lawyer names.
        // But here all have same lawyer name "Test Lawyer".
        // Let's rely on status badge text if rendered
        expect(screen.getByText('confirmed')).toBeDefined();
        expect(screen.queryByText('completed')).toBeNull();
    });

    it('switches tabs to past bookings', () => {
        render(<BookingsPage />);

        const pastTab = screen.getByText('Past');
        fireEvent.click(pastTab);

        expect(screen.getByText('completed')).toBeDefined();
        expect(screen.queryByText('confirmed')).toBeNull();
    });

    it('switches tabs to cancelled bookings', () => {
        render(<BookingsPage />);

        const cancelledTab = screen.getByText('Cancelled');
        fireEvent.click(cancelledTab);

        expect(screen.getByText('cancelled')).toBeDefined();
    });
});
