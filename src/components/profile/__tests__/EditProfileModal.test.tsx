import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditProfileModal from '../EditProfileModal';

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

describe('EditProfileModal', () => {
    it('does not render when closed', () => {
        render(<EditProfileModal isOpen={false} onClose={() => { }} onSave={() => { }} />);
        expect(screen.queryByText('Edit profile')).toBeNull();
    });

    it('renders when open with initial data', () => {
        const initialData = { jobTitle: 'QA Engineer', city: 'London' };
        render(<EditProfileModal isOpen={true} onClose={() => { }} onSave={() => { }} initialData={initialData} />);

        expect(screen.getByText('Edit profile')).toBeDefined();
        // Check form fields
        expect(screen.getByDisplayValue('QA Engineer')).toBeDefined();
    });

    it('calls onSave with form data', () => {
        const handleSave = vi.fn();
        render(<EditProfileModal isOpen={true} onClose={() => { }} onSave={handleSave} />);

        const updateBtn = screen.getByText('Update profile');
        fireEvent.click(updateBtn);

        expect(handleSave).toHaveBeenCalled();
    });
});
