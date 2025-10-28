import styled, { css } from 'styled-components'

import { Button } from './Button'

const formButtonDisabledMixin = css`
  background-color: ${({ theme }) => theme.colorGrayscale5};
  cursor: not-allowed;

  &:hover {
    background-color: ${({ theme }) => theme.colorGrayscale5};
  }

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    height: 0.3rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colorGrayscale7};
    content: '';
  }
`

export const FormButton = styled(Button)<{ disabled?: boolean }>`
  position: relative;
  height: 3rem;
  padding: 0 1.6rem;
  background-color: ${({ theme }) => theme.colorTextHeader};
  border: 0;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.colorGrayscale9};
  cursor: pointer;

  &::after {
    position: absolute;
    top: 100%;
    left: 0;
    height: 0.3rem;
    width: 100%;
    background-color: ${({ theme }) => theme.colorNavbarBorder};
    content: '';
  }

  &:not(:last-child) {
    margin-right: 0.8rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colorNavbar};
  }

  ${({ disabled }) => (disabled ? formButtonDisabledMixin : '')}
`
