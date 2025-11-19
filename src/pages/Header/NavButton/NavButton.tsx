import * as React from 'react'
import styled, { css } from 'styled-components'

const styledButtonActiveMixin = css`
  position: relative;

  &::before {
    @media (max-width: 479px) {
      display: none;
    }

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

  &::after {
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
`

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isMenu'].includes(prop),
})<{ isActive: boolean; isMenu: boolean }>`
  padding: 0;
  background-color: ${({ theme }) => theme.colorNavbar};
  border: none;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }

  &:nth-of-type(n + 3) {
    @media (min-width: 480px) {
      display: none;
    }
  }

  &:not(:last-child) {
    @media (max-width: 479px) {
      margin-right: 0.2rem;
    }
  }

  ${({ isActive }) => (isActive ? styledButtonActiveMixin : '')}
  ${({ isMenu }) =>
    isMenu
      ? `
        @media (min-width: 480px) {
          display: none;
        }
        `
      : ''}
`

const styledButtonInnerActiveMixin = css`
  position: relative;

  &::after {
    position: absolute;
    z-index: 920;
    left: calc(50% - 1rem);
    top: 100%;
    border-top: 0.8rem solid ${({ theme }) => theme.colorNavbarButton};
    border-left: 1rem solid transparent;
    border-right: 1rem solid transparent;
    border-bottom: 0;
    content: '';
  }
`

const styledButtonInnerMenuMixin = css`
  background-color: transparent;
  color: ${({ theme }) => theme.colorTransparent3};
`

const StyledButtonInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['isActive', 'isMenu'].includes(prop),
})<{ isActive: boolean; isMenu: boolean }>`
  position: relative;
  width: 4.2rem;
  height: calc(100% - 0.4rem);
  background-color: ${({ theme }) => theme.colorNavbarButton};
  font-family: 'Trend Sans One', sans-serif;
  text-align: center;
  color: ${({ theme }) => theme.colorNavbar};
  cursor: pointer;

  @media (min-width: 480px) {
    font-size: 2.4rem;
    padding-top: 0.7rem;
  }
  @media (max-width: 479px) {
    font-size: 2.2rem;
    padding-top: 0.6rem;
  }

  ${({ isActive }) => (isActive ? styledButtonInnerActiveMixin : '')}
  ${({ isMenu }) => (isMenu ? styledButtonInnerMenuMixin : '')}
  ${({ isActive, isMenu }) =>
    isActive && isMenu
      ? `
        &::after {
          border-top: 0.8rem solid transparent;
        }
       `
      : ''}

  ${StyledButton}:hover > & {
    background-color: ${({ theme }) => theme.colorTransparent3};
    color: ${({ theme }) => theme.colorGrayscale9};

    &::after {
      border-top: 0.8rem solid ${({ theme }) => theme.colorTransparent3};
    }
  }
`

export interface NavButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSwitchedOn: boolean
  isMenu?: boolean
}

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  isSwitchedOn,
  isMenu,
  ...props
}) => (
  <StyledButton
    isActive={isSwitchedOn}
    isMenu={isMenu}
    {...props}
    data-testid="navbutton-button-wrapper"
  >
    <StyledButtonInner
      isActive={isSwitchedOn}
      isMenu={isMenu}
      data-testid="navbutton-block-inner"
    >
      {children}
    </StyledButtonInner>
  </StyledButton>
)
