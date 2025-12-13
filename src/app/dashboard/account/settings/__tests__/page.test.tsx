import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import AccountSettingsPage from '../page';

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

describe('AccountSettingsPage', () => {
    it('renders settings interface', () => {
        render(<AccountSettingsPage />);
        expect(screen.getByRole('heading', { name: 'Settings' })).toBeDefined(); // Header
        expect(screen.getByText('Personal')).toBeDefined(); // Tab
    });
});
