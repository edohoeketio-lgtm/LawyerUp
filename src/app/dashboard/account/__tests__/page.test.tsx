import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../page';

// Mock Image and Link
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

describe('ProfilePage', () => {
    it('renders profile header', () => {
        render(<ProfilePage />);
        expect(screen.getByText('Nsikan Etukudoh')).toBeDefined();
        expect(screen.getByText('Lawyer Up')).toBeDefined();
        const link = screen.getByText('Settings').closest('a');
        expect(link?.getAttribute('href')).toBe('/dashboard/account/settings');
    });

    it('renders Consulted Lawyers tab by default', () => {
        render(<ProfilePage />);
        expect(screen.getByText('Consulted Lawyers')).toBeDefined();
        // Check for specific lawyer card mock data
        expect(screen.getByText('Ralph Edwards')).toBeDefined();
        expect(screen.getByText('Wade Warren')).toBeDefined();
    });

    it('switches tabs', () => {
        render(<ProfilePage />);

        const overviewTab = screen.getByText('Overview');
        fireEvent.click(overviewTab);

        // Should show placeholder
        expect(screen.getByText('Content for Overview coming soon...')).toBeDefined();
        // Should NOT show lawyer card
        expect(screen.queryByText('Ralph Edwards')).toBeNull();
    });
});
