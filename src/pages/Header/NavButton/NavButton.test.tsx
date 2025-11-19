import React from 'react'
import { render, screen } from '@testing-library/react'

import { NavButton } from './NavButton'

describe('NavButton', () => {
  it('should render both blocks', () => {
    render(
      <NavButton isSwitchedOn={false} isMenu={false}>
        Button Text
      </NavButton>
    )

    // Check wrapper button
    expect(screen.getByTestId('navbutton-button-wrapper')).toBeInTheDocument()

    // Check inner span
    expect(screen.getByTestId('navbutton-block-inner')).toBeInTheDocument()
  })

  it('should render children content inside the inner block', () => {
    render(
      <NavButton isSwitchedOn={true} isMenu={false}>
        <span>Custom Content</span>
      </NavButton>
    )

    const innerBlock = screen.getByTestId('navbutton-block-inner')

    expect(innerBlock).toContainHTML('<span>Custom Content</span>')
  })

  it('should maintain correct hierarchy between wrapper and inner blocks', () => {
    render(
      <NavButton isSwitchedOn={false} isMenu={true}>
        Menu Button
      </NavButton>
    )

    const wrapper = screen.getByTestId('navbutton-button-wrapper')
    const inner = screen.getByTestId('navbutton-block-inner')

    expect(wrapper).toContainElement(inner)
  })
})
