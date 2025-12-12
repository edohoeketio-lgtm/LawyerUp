import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AccountPage from '../page';

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

describe('AccountPage', () => {
    it('renders Personal tab by default', () => {
        render(<AccountPage />);
        // Check for Verified badge
        expect(screen.getByText('Verified')).toBeDefined();
        // Check for specific labels
        expect(screen.getByText('First and last name')).toBeDefined();
        expect(screen.getByText('City, Country')).toBeDefined();
    });

    it('switches tabs to Privacy', () => {
        render(<AccountPage />);

        const privacyTab = screen.getByText('Privacy');
        fireEvent.click(privacyTab);

        expect(screen.getByText('Profile Visibility')).toBeDefined();
        expect(screen.getByText('Q&A Activity')).toBeDefined();
    });

    it('renders Privacy checkboxes correctly', () => {
        render(<AccountPage />);
        fireEvent.click(screen.getByText('Privacy'));

        // Assert checked state based on deafultChecked in code
        const privateRadio = screen.getByLabelText('Private (Default)') as HTMLInputElement;
        expect(privateRadio.checked).toBe(true);

        const qaCheckbox = screen.getByLabelText("Allow others to see the questions I've asked") as HTMLInputElement;
        expect(qaCheckbox.checked).toBe(true);
    });
});
