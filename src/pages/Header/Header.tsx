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

const menu = [
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
    <Logo>
      <span>racco</span>
      <RaccoonIcon />
      <span>nblog</span>
    </Logo>

    <NavBar>
      <NavBarControl>
        <NavButton isSwitchedOn={isAboutOpen} onClick={() => onAboutToggle()}>
          ?
        </NavButton>

        <Menu isOpen={isMenuOpen}>
          {menu.map((item) => (
            <MenuItem key={item.caption} isActive={item.caption === 'latest'}>
              <StyledNavLink
                to={item.path}
                isActive={item.caption === 'latest'}
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
