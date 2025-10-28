import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'

import { Icon } from 'components'

export const HeaderContainer = styled.div`
  position: relative;
  z-index: 600;
  width: 100%;
  margin-bottom: 3rem;
  background-color: ${({ theme }) => theme.colorGrayscale9};

  @media (max-width: 479px) {
    position: fixed;
    margin-bottom: 0;
  }
`

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -0.5rem;
  font-family: 'Trend Sans One', sans-serif;
  font-weight: 400;
  font-size: 3.7rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorTextHeader};

  @media (min-width: 1024px) {
    height: 9rem;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    height: 7rem;
    transform: scale(0.8, 0.8);
  }
  @media (max-width: 479px) {
    height: 5rem;
    transform: scale(0.6, 0.6);
  }

  transition: top 0.3s ease-out;
`

export const RaccoonIcon = styled(Icon.RaccoonNegative)`
  width: 1.2em;
  height: 1.2em;
  fill: currentcolor;
  position: relative;
  top: 0.7rem;
  margin: 0 0.2em;

  @media (max-width: 479px) {
    min-width: 1.8em;
    min-height: 1.8em;
  }
`

export const navBarIconMixin = css`
  width: 2rem;
  height: 2rem;
  fill: currentcolor;
`

export const TagIcon = styled(Icon.Tag)`
  ${navBarIconMixin}
`

export const MenuIcon = styled(Icon.Menu)`
  ${navBarIconMixin}
`

export const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 750;
  width: 100%;
  background-color: ${({ theme }) => theme.colorNavbar};

  @media (min-width: 1024px) {
    height: 5rem;
    border-bottom: 4px solid ${({ theme }) => theme.colorNavbarBorder};
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    height: 5rem;
    border-bottom: 4px solid ${({ theme }) => theme.colorNavbarBorder};
  }
  @media (max-width: 479px) {
    height: 4.2rem;
  }
`

export const NavBarControl = styled.div`
  @media (min-width: 1024px) {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  @media (max-width: 479px) {
    display: flex;
  }

  position: relative;
  height: 100%;
`

export const Menu = styled.ul.withConfig({
  shouldForwardProp: (prop) => !['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  list-style: none;
  display: flex;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.9rem;
  color: ${({ theme }) => theme.colorGrayscale9};

  @media (max-width: 479px) {
    order: 10;
    flex-basis: 100%;
    flex-direction: column;
    align-items: center;
    position: absolute;
    z-index: 800;
    left: 0;
    top: 100%;
    width: 100vw;
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: 0.3s ease-out;
    padding: 0 2rem; //for centring items
    background-color: ${({ theme }) => theme.colorNavbarBorder};

    ${({ isOpen }) =>
      isOpen
        ? `
          opacity: 1;
          max-height: 30rem;
          `
        : ''}
  }
`

export const menuItemActiveMixin = css`
  position: relative;

  &::before {
    @media (min-width: 480px) {
      position: absolute;
      z-index: 900;
      top: 100%;
      left: calc(50% - 1.6rem);
      border-top: 1.2rem solid ${({ theme }) => theme.colorNavbarBorder};
      border-left: 1.6rem solid transparent;
      border-right: 1.6rem solid transparent;
      border-bottom: 0;
      content: '';
    }
  }

  &::after {
    @media (min-width: 480px) {
      position: absolute;
      z-index: 910;
      top: 100%;
      left: calc(50% - 1rem);
      border-top: 0.8rem solid ${({ theme }) => theme.colorNavbar};
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 0;
      content: '';
    }
  }
`

export const MenuItem = styled.li.withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  @media (min-width: 480px) {
    height: 100%;
  }
  @media (max-width: 479px) {
    width: 100%;
    height: 4.2rem;
  }

  text-align: center;

  &:not(:last-child) {
    @media (max-width: 479px) {
      border-bottom: 1px solid ${({ theme }) => theme.colorTransparent5};
    }
  }

  ${({ isActive }) => (isActive ? menuItemActiveMixin : '')}
`

export const navLinkActiveMixin = css`
  @media (min-width: 480px) {
    &::after {
      position: absolute;
      z-index: 920;
      top: 100%;
      left: calc(50% - 1rem);
      border-top: 0.8rem solid ${({ theme }) => theme.colorNavbar};
      border-left: 1rem solid transparent;
      border-right: 1rem solid transparent;
      border-bottom: 0;
      content: '';
    }

    &:hover {
      &::after {
        border-top: 0.8rem solid ${({ theme }) => theme.colorTransparent3};
      }
    }
  }
`

export const StyledNavLink = styled(NavLink).withConfig({
  shouldForwardProp: (prop) => !['isActive'].includes(prop),
})<{ isActive: boolean }>`
  display: block;
  position: relative;
  height: 100%;

  @media (min-width: 640px) {
    padding: 1.6rem 2.5rem;
  }
  @media (min-width: 480px) and (max-width: 639px) {
    padding: 1.6rem 1.5rem;
  }
  @media (max-width: 479px) {
    padding: 1.2rem 2rem;
    margin-left: -2rem;
    margin-right: -2rem;
  }

  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colorGrayscale9};

  &:hover {
    position: relative;
    background-color: ${({ theme }) => theme.colorTransparent3};
  }

  ${({ isActive }) => (isActive ? navLinkActiveMixin : '')}
`
