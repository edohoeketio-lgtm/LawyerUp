import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LawyerCard from '../LawyerCard';
import { lawyers } from '../../data/lawyers';

// Mock Next.js Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

const mockLawyer = lawyers[0]; // Sarah Jenkins

describe('LawyerCard Component', () => {
    it('renders lawyer information correctly', () => {
        render(<LawyerCard lawyer={mockLawyer} />);

        // Name and Flag (flag might be text or part of string)
        expect(screen.getByText(/Sarah Jenkins/)).toBeDefined();

        // Sector
        expect(screen.getByText('Criminal Defense')).toBeDefined();

        // Stats
        expect(screen.getByText(/4 sessions \(4 reviews\)/)).toBeDefined();
    });

    it('links to the correct lawyer profile', () => {
        render(<LawyerCard lawyer={mockLawyer} />);

        // The accessible role for a Link is usually 'link'
        const link = screen.getByRole('link');
        expect(link.getAttribute('href')).toBe(`/dashboard/lawyer/${mockLawyer.id}`);
    });
});
