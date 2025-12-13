import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ChatPage from '../page';

// Mock params
vi.mock('next/navigation', () => ({
    useParams: () => ({ id: '1' }),
    useRouter: () => ({ back: vi.fn(), push: vi.fn() })
}));

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

// Mock Link
vi.mock('next/link', () => ({
    default: ({ children, href }: any) => <a href={href}>{children}</a>
}));

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = vi.fn();

describe('ChatPage', () => {
    it('renders chat interface', () => {
        render(<ChatPage />);
        // Should find input
        expect(screen.getByPlaceholderText('Type a message...')).toBeDefined();
        // Should find send button
        expect(screen.getByRole('button', { name: 'Send message' })).toBeDefined();
    });

    it('allows typing a message', () => {
        render(<ChatPage />);
        const input = screen.getByPlaceholderText('Type a message...');
        fireEvent.change(input, { target: { value: 'Hello World' } });
        expect((input as HTMLInputElement).value).toBe('Hello World');
    });

    // Note: Full integration test with state updates might be complex in jsdom without proper context, 
    // but we verify the component renders and is interactive.
});
