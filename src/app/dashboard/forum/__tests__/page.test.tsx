import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ForumPage from '../page';

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

describe('ForumPage', () => {
    it('renders the forum feed', () => {
        render(<ForumPage />);
        // Header
        expect(screen.getByText('Community Feed')).toBeDefined();
        // Check for at least one mock thread title
        expect(screen.getByText('Tips for passing the NY Bar Exam on the first try?')).toBeDefined();
    });

    it('filters by category', () => {
        render(<ForumPage />);

        // Initial state (All) should show Bar Exam topic
        expect(screen.getByText('Tips for passing the NY Bar Exam on the first try?')).toBeDefined();

        // Switch to 'Legal Advice'
        // Switch to 'Legal Advice' - it's a button in the nav
        // Use getAllByText returns array, filter needed or just be more specific?
        // Let's use getByRole for the category button. 
        // Or cleaner: scope search to sidebar? 
        // Simplest: use query for button with name.
        const filterBtn = screen.getByRole('button', { name: 'Legal Advice' });
        fireEvent.click(filterBtn);

        // Should show 'Understanding IP Rights'
        expect(screen.getByText('Understanding IP Rights for Software Startups')).toBeDefined();

        // Should NOT show Bar Exam topic anymore
        expect(screen.queryByText('Tips for passing the NY Bar Exam on the first try?')).toBeNull();
    });

    it('filters by search query', () => {
        render(<ForumPage />);

        const searchInput = screen.getByPlaceholderText('Search topics...');
        fireEvent.change(searchInput, { target: { value: 'Supreme Court' } });

        // Should show matching thread
        expect(screen.getByText("Supreme Court's latest ruling on digital privacy")).toBeDefined();

        // Should NOT show unrelated thread
        expect(screen.queryByText('Tips for passing the NY Bar Exam on the first try?')).toBeNull();
    });

    it('handles upvote interaction', () => {
        render(<ForumPage />);

        // Find specific upvote button (first one, count is 42)
        const upvoteBtns = screen.getAllByRole('button').filter(b => b.textContent?.includes('42'));
        const btn = upvoteBtns[0];

        // Click to upvote
        fireEvent.click(btn);

        // Should increment to 43
        expect(screen.getByText('43')).toBeDefined();
    });
});
