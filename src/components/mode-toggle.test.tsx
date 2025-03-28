import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '../test/utils'
import { ModeToggle } from './mode-toggle'

describe('ModeToggle', () => {
  it('should render the toggle button', () => {
    render(<ModeToggle />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should show theme options when clicked', async () => {
    render(<ModeToggle />)
    const button = screen.getByRole('button')
    fireEvent.click(button)

    expect(screen.getByText('Light')).toBeInTheDocument()
    expect(screen.getByText('Dark')).toBeInTheDocument()
    expect(screen.getByText('System')).toBeInTheDocument()
  })
}) 