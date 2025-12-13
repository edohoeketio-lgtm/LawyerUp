import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopBar from '../TopBar'

// Mock Hooks
const pushMock = vi.fn();
const usePathnameMock = vi.fn();

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushMock }),
    useSearchParams: () => ({ get: vi.fn() }),
    usePathname: () => usePathnameMock(),
}))

// Mock Image
vi.mock('next/image', () => ({
    default: (props: any) => <img {...props} />
}));

// Mock Link
vi.mock('next/link', () => ({
    default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a>
}));

describe('TopBar', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        usePathnameMock.mockReturnValue('/dashboard');
    });

    it('renders the Home title on dashboard', () => {
        render(<TopBar />)
        expect(screen.getByText('Home')).toBeDefined()
    });

    it('renders "Book a session" link pointing to discover page', () => {
        render(<TopBar />)
        const link = screen.getByText('Book a session').closest('a');
        expect(link).toBeDefined();
        expect(link?.getAttribute('href')).toBe('/dashboard/discover');
    });

    it('hides "Book a session" button on lawyer detail pages and discover page', () => {
        // Lawyer Detail Page
        usePathnameMock.mockReturnValue('/dashboard/lawyer/123');
        const { unmount } = render(<TopBar />);
        expect(screen.queryByText('Book a session')).toBeNull();
        unmount();

        // Discover Page
        usePathnameMock.mockReturnValue('/dashboard/discover');
        render(<TopBar />);
        expect(screen.queryByText('Book a session')).toBeNull();
    });

    it('renders Discover title on discover page', () => {
        usePathnameMock.mockReturnValue('/dashboard/discover');
        render(<TopBar />);
        expect(screen.getByText('Discover')).toBeDefined();
    });
})
