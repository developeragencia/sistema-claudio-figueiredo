import { render, screen } from '@testing-library/react'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '../ProtectedRoute'
import { vi } from 'vitest'
import { useRouter } from 'next/navigation'

vi.mock('@/hooks/useAuth')
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

describe('ProtectedRoute', () => {
  const mockPush = vi.fn()
  
  beforeEach(() => {
    vi.clearAllMocks()
    ;(useRouter as any).mockReturnValue({ push: mockPush })
  })

  it('should render children when user is authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: '1', email: 'test@example.com' },
      loading: false,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('should redirect to login when user is not authenticated', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: false,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(mockPush).toHaveBeenCalledWith('/login')
  })

  it('should show loading state while checking authentication', () => {
    vi.mocked(useAuth).mockReturnValue({
      user: null,
      loading: true,
    } as any)

    render(
      <ProtectedRoute>
        <div>Protected Content</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Carregando...')).toBeInTheDocument()
  })
}) 