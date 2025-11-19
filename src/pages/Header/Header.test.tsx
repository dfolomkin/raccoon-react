import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import { Header, menu } from './Header'
import { NavButtonProps } from './NavButton'

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  NavLink: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}))

jest.mock('./NavButton', () => ({
  NavButton: ({ children, isSwitchedOn, isMenu, onClick }: NavButtonProps) => (
    <button
      data-is-switched-on={isSwitchedOn}
      data-is-menu={isMenu}
      onClick={onClick}
    >
      {children}
    </button>
  ),
}))

jest.mock('./Header.styled', () => ({
  ...jest.requireActual('./Header.styled'),
  TagIcon: () => <svg data-testid="tag-icon">Tag</svg>,
  MenuIcon: () => <svg data-testid="menu-icon">Menu</svg>,
}))

const mockProps = {
  isMenuOpen: false,
  isInfoOpen: false,
  isAboutOpen: false,
  isTagsOpen: false,
  onMenuToggle: jest.fn(),
  onAboutToggle: jest.fn(),
  onInfoToggle: jest.fn(),
  onTagsToggle: jest.fn(),
}

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('blocks existence and hierarchy', () => {
    it('should render all marked blocks with correct data-testid attributes', () => {
      render(<Header {...mockProps} />)

      // Check main blocks
      expect(screen.getByTestId('header-block-logo')).toBeInTheDocument()
      expect(screen.getByTestId('header-block-navbar')).toBeInTheDocument()
      expect(
        screen.getByTestId('header-block-navbarcontrol')
      ).toBeInTheDocument()
      expect(screen.getByTestId('header-block-menu')).toBeInTheDocument()

      // Check menu items and links
      menu.forEach((item) => {
        expect(
          screen.getByTestId(`header-block-menuitem:${item.caption}`)
        ).toBeInTheDocument()
        expect(
          screen.getByTestId(`header-block-menulink:${item.caption}`)
        ).toBeInTheDocument()
      })
    })

    it('should maintain correct component hierarchy', () => {
      render(<Header {...mockProps} />)

      const navbar = screen.getByTestId('header-block-navbar')
      const navbarControl = screen.getByTestId('header-block-navbarcontrol')
      const menu = screen.getByTestId('header-block-menu')

      expect(navbar).toContainElement(navbarControl)
      expect(navbarControl).toContainElement(menu)
    })
  })

  describe('callbacks firing', () => {
    it('should call onAboutToggle when about button is clicked', () => {
      render(<Header {...mockProps} />)

      // Find the about button by its content "?"
      const aboutButton = screen.getByText('?').closest('button')

      fireEvent.click(aboutButton!)

      expect(mockProps.onAboutToggle).toHaveBeenCalledTimes(1)
    })

    it('should call onInfoToggle when info button is clicked', () => {
      render(<Header {...mockProps} />)

      // Find the info button by its content "!"
      const infoButton = screen.getByText('!').closest('button')

      fireEvent.click(infoButton!)

      expect(mockProps.onInfoToggle).toHaveBeenCalledTimes(1)
    })

    it('should call onTagsToggle when tags button is clicked', () => {
      render(<Header {...mockProps} />)

      // Find the tags button by its icon
      const tagsButton = screen.getByTestId('tag-icon').closest('button')

      fireEvent.click(tagsButton!)

      expect(mockProps.onTagsToggle).toHaveBeenCalledTimes(1)
    })

    it('should call onMenuToggle when menu button is clicked', () => {
      render(<Header {...mockProps} />)

      // Find the menu button by its icon
      const menuButton = screen.getByTestId('menu-icon').closest('button')

      fireEvent.click(menuButton!)

      expect(mockProps.onMenuToggle).toHaveBeenCalledTimes(1)
    })
  })

  describe('behavior with isActive and isMenu flags', () => {
    it('should pass correct isSwitchedOn prop to about NavButton when isAboutOpen is true', () => {
      render(<Header {...mockProps} isAboutOpen={true} />)

      const aboutButton = screen.getByText('?').closest('button')

      expect(aboutButton).toHaveAttribute('data-is-switched-on', 'true')
    })

    it('should pass correct isSwitchedOn prop to info NavButton when isInfoOpen is true', () => {
      render(<Header {...mockProps} isInfoOpen={true} />)

      const infoButton = screen.getByText('!').closest('button')

      expect(infoButton).toHaveAttribute('data-is-switched-on', 'true')
    })

    it('should pass correct isSwitchedOn prop to tags NavButton when isTagsOpen is true', () => {
      render(<Header {...mockProps} isTagsOpen={true} />)

      const tagsButton = screen.getByTestId('tag-icon').closest('button')

      expect(tagsButton).toHaveAttribute('data-is-switched-on', 'true')
    })

    it('should pass correct isSwitchedOn and isMenu props to menu NavButton', () => {
      render(<Header {...mockProps} isMenuOpen={true} />)

      const menuButton = screen.getByTestId('menu-icon').closest('button')

      expect(menuButton).toHaveAttribute('data-is-switched-on', 'true')
      expect(menuButton).toHaveAttribute('data-is-menu', 'true')
    })

    it('should pass correct isMenu props to menu NavButton indendent of open state', () => {
      render(<Header {...mockProps} isMenuOpen={false} />)

      const menuButton = screen.getByTestId('menu-icon').closest('button')

      expect(menuButton).toHaveAttribute('data-is-menu', 'true')
    })

    it('should pass false isSwitchedOn props when all states are false', () => {
      render(<Header {...mockProps} />)

      const aboutButton = screen.getByText('?').closest('button')
      const infoButton = screen.getByText('!').closest('button')
      const tagsButton = screen.getByTestId('tag-icon').closest('button')
      const menuButton = screen.getByTestId('menu-icon').closest('button')

      expect(aboutButton).toHaveAttribute('data-is-switched-on', 'false')
      expect(infoButton).toHaveAttribute('data-is-switched-on', 'false')
      expect(tagsButton).toHaveAttribute('data-is-switched-on', 'false')
      expect(menuButton).toHaveAttribute('data-is-switched-on', 'false')
    })
  })
})
