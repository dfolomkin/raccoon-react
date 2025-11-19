import React from 'react'
import { render, screen } from '@testing-library/react'

import { MainLayout } from './MainLayout'

jest.mock('react-router-dom', () => ({
  Outlet: () => (
    <div data-testid="mainlayout-block-routeroutlet">Outlet Content</div>
  ),
}))

jest.mock('../Header', () => ({
  Header: () => (
    <header data-testid="mainlayout-component-header">Header Component</header>
  ),
}))

jest.mock('../Aside', () => ({
  Aside: () => (
    <aside data-testid="mainlayout-component-aside">Aside Component</aside>
  ),
}))

const mockVersion = '1.0.0'
const mockGlobal = global as unknown as { __VERSION__: string }

mockGlobal.__VERSION__ = mockVersion

describe('MainLayout', () => {
  it('should render all main layout blocks with correct data-testid attributes', () => {
    render(<MainLayout />)

    // Check version info block
    expect(
      screen.getByTestId('mainlayout-component-version')
    ).toBeInTheDocument()

    // Check header component
    expect(
      screen.getByTestId('mainlayout-component-header')
    ).toBeInTheDocument()

    // Check page container
    expect(
      screen.getByTestId('mainlayout-component-pagecontainer')
    ).toBeInTheDocument()

    // Check router outlet
    expect(
      screen.getByTestId('mainlayout-block-routeroutlet')
    ).toBeInTheDocument()

    // Check aside component
    expect(screen.getByTestId('mainlayout-component-aside')).toBeInTheDocument()
  })

  it('should maintain the correct component hierarchy', () => {
    render(<MainLayout />)

    const pageContainer = screen.getByTestId(
      'mainlayout-component-pagecontainer'
    )
    const routerOutlet = screen.getByTestId('mainlayout-block-routeroutlet')
    const aside = screen.getByTestId('mainlayout-component-aside')

    expect(pageContainer).toContainElement(routerOutlet)
    expect(pageContainer).toContainElement(aside)
  })

  it('should render version info with correct content', () => {
    render(<MainLayout />)

    const versionInfo = screen.getByTestId('mainlayout-component-version')

    expect(versionInfo).toHaveTextContent(mockVersion)
  })
})
