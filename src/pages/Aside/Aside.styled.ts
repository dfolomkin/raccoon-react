import styled from 'styled-components'

import { Icon } from 'components'

export const Note = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'isOpen'].includes(prop),
})<{
  variant: 'about' | 'info' | 'tags'
  isOpen: boolean
}>`
  @media (min-width: 1024px) {
    opacity: 1;
    display: flex;
    flex-direction: column;
    margin-bottom: 3rem;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    opacity: 1;
    ${({ variant, isOpen, theme }) => {
      if (variant === 'about' || variant === 'info') {
        return `
               display: flex;
               flex-direction: ${variant === 'about' ? 'raw' : 'row-reverse'};
               z-index: 500;
               width: 100%;
               max-height: ${isOpen ? '30rem' : 0};
               opacity: ${isOpen ? 1 : 0};
               transition: 0.3s ease-out;
               background-color: ${theme.colorGrayscale9};
               box-shadow: 0 2px 4px ${theme.colorTransparentDark2};
               `
      }
      if (variant === 'tags') {
        return 'margin: 3rem 4.2rem;'
      }
    }}
  }
  @media (max-width: 479px) {
    display: flex;
    flex-direction: column-reverse;
    position: fixed;
    z-index: 500;
    width: 100%;
    top: calc(5rem + 4.2rem);
    max-height: ${({ isOpen }) => (isOpen ? '30rem' : 0)};
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    transition: 0.3s ease-out;
    background-color: ${({ theme }) => theme.colorNavbarBorder};
    box-shadow: 0 2px 4px ${({ theme }) => theme.colorTransparentDark2};
    overflow: hidden;
  }
`

export const NoteHeader = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: 'about' | 'info' | 'tags' }>`
  font-family: 'Trend Sans One', sans-serif;
  text-transform: uppercase;

  @media (min-width: 1024px) {
    position: relative;
    height: 1.4em;
    margin-bottom: 1em;
    padding-left: 1.7em;
    border-bottom: 3px solid ${({ theme }) => theme.colorTextHeader};
    font-size: 1.2em;
    line-height: 1em;
    color: ${({ theme }) => theme.colorTextHeader};

    &::after {
      position: absolute;
      left: 0;
      top: 0;
      width: 1.44em;
      height: 1.22em;
      background-color: ${({ theme }) => theme.colorTextHeader};
      color: ${({ theme }) => theme.colorGrayscale9};
      text-align: center;
      ${({ variant }) => {
        if (variant === 'about') {
          return `content: '?';`
        }
        if (variant === 'info') {
          return `content: '!';`
        }
      }};
    }

    ${({ variant }) => (variant === 'tags' ? 'display: none;' : '')}
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 4.2rem;
    min-height: 13rem;
    background-color: ${({ theme }) => theme.colorSocialDefault};
    font-size: 2.2rem;
    color: ${({ theme }) => theme.colorTextHeader};

    ${({ variant }) => (variant === 'tags' ? 'display: none;' : '')}
  }
  @media (max-width: 479px) {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem 2rem;
    font-size: 1.9rem;
    color: ${({ theme }) => theme.colorTransparent5};
  }
`

export const NoteTitle = styled.h3.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: 'about' | 'info' | 'tags' }>`
  @media (min-width: 480px) and (max-width: 1023px) {
    ${({ variant }) => {
      if (variant === 'about') {
        return `
               position: relative;
               left: -0.4rem;
               transform: rotate(-90deg);
               `
      }
      if (variant === 'info') {
        return `
               position: relative;
               left: 0.2rem;
               font-size: 1.3rem;
               transform: rotate(90deg);
               text-align: center;
               line-height: 1.2em;
               `
      }
    }}
  }
`

export const NoteIconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colorTransparent2};
  font-family: 'Trend Sans One', sans-serif;
  text-transform: uppercase;
`

export const ArrowIcon = styled(Icon.Arrow)`
  @media (min-width: 480px) {
    display: none;
  }

  margin-left: 0.4em;
  width: 1em;
  height: 1em;
  fill: currentcolor;
  cursor: pointer;
`

export const NoteBody = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: 'about' | 'info' | 'tags' }>`
  @media (min-width: 480px) and (max-width: 1023px) {
    ${({ variant }) => {
      if (variant === 'about') {
        return 'padding: 3rem calc(4.2rem + 2rem) 1rem 2rem;'
      }
      if (variant === 'info') {
        return 'padding: 3rem 2rem 1rem calc(4.2rem + 2rem);'
      }
    }}
  }

  @media (max-width: 479px) {
    padding: 3rem 2rem 1rem;
  }

  overflow: hidden;
  text-align: justify;
  line-height: 1.2em;
`
