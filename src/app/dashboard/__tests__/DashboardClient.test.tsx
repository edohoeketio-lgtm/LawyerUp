import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashboardClient from '../DashboardClient';

// Mock SearchParams
vi.mock('next/navigation', () => ({
    useSearchParams: () => new URLSearchParams(),
    useRouter: () => ({ push: vi.fn() }) // Assuming Link might use router context
}));

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

// Mock Data
vi.mock('@/data/lawyers', () => ({
    lawyers: [
        { id: '1', name: 'Lawyer One', stats: { sessions: 1, reviews: 1 }, tags: ['Tag1'], image: '/test1.jpg' },
        { id: '2', name: 'Lawyer Two', stats: { sessions: 2, reviews: 2 }, tags: ['Tag2'], image: '/test2.jpg' },
        { id: '3', name: 'Blocked Lawyer', stats: { sessions: 3, reviews: 3 }, tags: ['Tag3'], image: '/test3.jpg' },
    ],
    getLawyerById: vi.fn()
}));

// Mock LawyerCard to simplify test (or use real one if testing integration)
// Using real one requires mocking its dependencies. Let's shallow mock it to check presence.
vi.mock('@/components/LawyerCard', () => ({
    default: ({ lawyer }: { lawyer: any }) => <div data-testid="lawyer-card">{lawyer.name}</div>
}));

describe('DashboardClient', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('renders the dashboard with greeting', () => {
        render(<DashboardClient />);
        expect(screen.getByText(/Good morning Nsikan/)).toBeDefined();
    });

    it('renders suggested lawyers', () => {
        render(<DashboardClient />);
        // Should show all 3 mock lawyers
        expect(screen.getByText('Lawyer One')).toBeDefined();
        expect(screen.getByText('Lawyer Two')).toBeDefined();
    });

    it('filters out blocked lawyers from storage', () => {
        // Setup local storage with blocked ID '3'
        localStorage.setItem("blockedLawyers", JSON.stringify(["3"]));

        render(<DashboardClient />);

        expect(screen.getByText('Lawyer One')).toBeDefined();
        // Blocked Lawyer should NOT be present (filtered out)
        expect(screen.queryByText('Blocked Lawyer')).toBeNull();
    });
});
