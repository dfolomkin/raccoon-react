import React from 'react'

import { ROUTES } from 'shared/constants'

import {
  HeaderContainer,
  Logo,
  Menu,
  MenuIcon,
  MenuItem,
  NavBar,
  NavBarControl,
  RaccoonIcon,
  StyledNavLink,
  TagIcon,
} from './Header.styled'
import { NavButton } from './NavButton'

export const menu = [
  { caption: 'javascript', path: '/javascript' },
  { caption: 'css', path: '/css' },
  { caption: 'latest', path: ROUTES.articles },
  { caption: 'html', path: '/html' },
  { caption: 'design', path: '/design' },
]

interface HeaderProps {
  isMenuOpen: boolean
  isInfoOpen: boolean
  isAboutOpen: boolean
  isTagsOpen: boolean
  onMenuToggle: () => void
  onAboutToggle: () => void
  onInfoToggle: () => void
  onTagsToggle: () => void
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  isInfoOpen,
  isAboutOpen,
  isTagsOpen,
  onMenuToggle,
  onAboutToggle,
  onInfoToggle,
  onTagsToggle,
}) => (
  <HeaderContainer>
    <Logo data-testid="header-block-logo">
      <span>racco</span>
      <RaccoonIcon />
      <span>nblog</span>
    </Logo>

    <NavBar data-testid="header-block-navbar">
      <NavBarControl data-testid="header-block-navbarcontrol">
        <NavButton isSwitchedOn={isAboutOpen} onClick={() => onAboutToggle()}>
          ?
        </NavButton>

        <Menu isOpen={isMenuOpen} data-testid="header-block-menu">
          {menu.map((item) => (
            <MenuItem
              key={item.caption}
              isActive={item.caption === 'latest'}
              data-testid={`header-block-menuitem:${item.caption}`}
            >
              <StyledNavLink
                to={item.path}
                isActive={item.caption === 'latest'}
                data-testid={`header-block-menulink:${item.caption}`}
              >
                {item.caption}
              </StyledNavLink>
            </MenuItem>
          ))}
        </Menu>

        <NavButton isSwitchedOn={isInfoOpen} onClick={() => onInfoToggle()}>
          !
        </NavButton>

        <NavButton isSwitchedOn={isTagsOpen} onClick={() => onTagsToggle()}>
          <TagIcon />
        </NavButton>
      </NavBarControl>

      <NavButton
        isSwitchedOn={isMenuOpen}
        onClick={() => onMenuToggle()}
        isMenu
      >
        <MenuIcon />
      </NavButton>
    </NavBar>
  </HeaderContainer>
)
