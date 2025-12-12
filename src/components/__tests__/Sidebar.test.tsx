import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Sidebar from '../Sidebar';

// Mock Next.js usePathname
vi.mock('next/navigation', () => ({
    usePathname: () => '/dashboard',
}));

// Mock Next.js Image component to act like a normal img for testing
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

describe('Sidebar Component', () => {
    it('renders the sidebar navigation', () => {
        render(<Sidebar />);

        // Check for main navigation items text (which might be in alt tags or text)
        // Adjust selectors based on actual Sidebar implementation
        expect(screen.getByText('Discover')).toBeDefined();
        expect(screen.getByText('Forum')).toBeDefined();
        expect(screen.getByText('Bookings')).toBeDefined();
    });

    it('renders the user profile section', () => {
        render(<Sidebar />);
        expect(screen.getByText('Nsikan Etukudoh')).toBeDefined();
    });
});
