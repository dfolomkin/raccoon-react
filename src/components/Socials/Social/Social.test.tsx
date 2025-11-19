import React from 'react'
import { render, screen } from '@testing-library/react'

import { Social } from './Social'

describe('Social', () => {
  it('should render the correct icon based on variant', () => {
    render(<Social variant="facebook" count={150} />)

    expect(screen.getByTestId('icon-svg-facebook')).toBeInTheDocument()
  })

  it('should render the count number', () => {
    render(<Social variant="twitter" count={89} />)

    expect(screen.getByText('89')).toBeInTheDocument()
  })

  it('should render all social variants correctly', () => {
    const { rerender } = render(<Social variant="facebook" count={100} />)

    expect(screen.getByTestId('icon-svg-facebook')).toBeInTheDocument()

    rerender(<Social variant="gplus" count={200} />)
    expect(screen.getByTestId('icon-svg-gplus')).toBeInTheDocument()

    rerender(<Social variant="twitter" count={300} />)
    expect(screen.getByTestId('icon-svg-twitter')).toBeInTheDocument()

    rerender(<Social variant="vk" count={400} />)
    expect(screen.getByTestId('icon-svg-vk')).toBeInTheDocument()

    rerender(<Social variant="yaru" count={500} />)
    expect(screen.getByTestId('icon-svg-yaru')).toBeInTheDocument()
  })

  it('should handle count value of zero', () => {
    render(<Social variant="gplus" count={0} />)

    expect(screen.getByText('0')).toBeInTheDocument()
    expect(screen.getByTestId('icon-svg-gplus')).toBeInTheDocument()
  })

  it('should handle large count numbers', () => {
    render(<Social variant="yaru" count={1000000} />)

    expect(screen.getByText('1000000')).toBeInTheDocument()
  })

  it('should render both icon and count together', () => {
    render(<Social variant="vk" count={42} />)

    const socialLink = screen.getByTestId('social-block-link:vk')

    expect(socialLink).toHaveTextContent('42')
    expect(screen.getByTestId('icon-svg-vk')).toBeInTheDocument()
  })

  it('should maintain the component structure with correct nesting', () => {
    render(<Social variant="twitter" count={75} />)

    const socialBadge = screen.getByTestId('social-block-badge:twitter')
    const socialLink = screen.getByTestId('social-block-link:twitter')
    const icon = screen.getByTestId('icon-svg-twitter')

    expect(socialBadge).toContainElement(socialLink)
    expect(socialLink).toContainElement(icon)
    expect(socialLink).toHaveTextContent('75')
  })
})
