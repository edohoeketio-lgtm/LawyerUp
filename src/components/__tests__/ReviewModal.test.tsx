import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewModal from '../ReviewModal';

describe('ReviewModal', () => {
    it('renders when open', () => {
        render(
            <ReviewModal
                isOpen={true}
                onClose={() => { }}
                onSubmit={() => { }}
                lawyerName="Test Lawyer"
            />
        );
        expect(screen.getByText(/How was your session with/)).toBeDefined();
        expect(screen.getByText('Test Lawyer')).toBeDefined();
    });

    it('does not render when closed', () => {
        render(
            <ReviewModal
                isOpen={false}
                onClose={() => { }}
                onSubmit={() => { }}
                lawyerName="Test Lawyer"
            />
        );
        expect(screen.queryByText('Test Lawyer')).toBeNull();
    });

    it('allows submission only after rating', () => {
        const handleSubmit = vi.fn();
        render(
            <ReviewModal
                isOpen={true}
                onClose={() => { }}
                onSubmit={handleSubmit}
                lawyerName="Test Lawyer"
            />
        );

        const submitBtn = screen.getByText('Submit Review') as HTMLButtonElement;
        expect(submitBtn.disabled).toBe(true);

        // Click 5th star
        const stars = screen.getAllByRole('button');
        // Close button (1) + 5 stars + Cancel + Submit = 8 buttons.
        // Stars are indices 1 to 5.

        fireEvent.click(stars[5]); // 5th star (index 5 if close is 0)

        expect(submitBtn.disabled).toBe(false);

        fireEvent.click(submitBtn);
        expect(handleSubmit).toHaveBeenCalledWith(5, "");
    });
});
