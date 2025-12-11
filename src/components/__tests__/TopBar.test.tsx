import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import TopBar from '../TopBar'

// Mock useSearchParams and useRouter
import { vi } from 'vitest'
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    useSearchParams: () => ({
        get: vi.fn(),
    }),
    usePathname: () => "/dashboard", // Added mock
}))

describe('TopBar', () => {
    it('renders the Home title', () => {
        render(<TopBar />)
        const homeHeading = screen.getByText('Home')
        expect(homeHeading).toBeDefined()
    })

    it('renders the Legal advice button', () => {
        render(<TopBar />)
        const button = screen.getByText('Legal advice')
        expect(button).toBeDefined()
    })
})
