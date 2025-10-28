import styled, { css } from 'styled-components'

import { Button, Icon } from 'components'

export const ArticleImage = styled.img`
  display: block;
  width: 100%;

  @media (min-width: 480px) {
    height: 20rem;
  }
  @media (max-width: 479px) {
    height: 15rem;
  }

  object-fit: cover;
`

export const ArticleTitle = styled.h1`
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  font-size: 1.6em;

  @media (max-width: 479px) {
    background-color: ${({ theme }) => theme.colorSocialDefault};
    text-align: center;
  }
`

export const ArticleInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0.8rem 0;

  @media (min-width: 480px) {
    border-top: 1px solid ${({ theme }) => theme.colorGrayscale6};
    border-bottom: 1px solid ${({ theme }) => theme.colorGrayscale6};
  }
  @media (max-width: 479px) {
    border-bottom: 2px solid ${({ theme }) => theme.colorSocialDefault};
  }
`

export const InfoGroup = styled.div`
  display: flex;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

export const InfoElement = styled.div`
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 2rem;
  }
`

const infoIconMixin = css`
  width: 1.2em;
  height: 1.2em;
  margin-right: 0.2em;
`

export const ClockIcon = styled(Icon.Clock)`
  ${infoIconMixin}
`

export const FoostepIcon = styled(Icon.Footstep)`
  ${infoIconMixin}
`

export const ArticleContent = styled.div`
  line-height: 1.2em;
  text-align: justify;
`

export const ArticleControlPanel = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 3.6rem;
  padding: 0.4rem;
  background-color: ${({ theme }) => theme.colorTransparent75};
  border-radius: 0 0 0 0.6rem;
`

export const ControlPanelButton = styled(Button)`
  background: none;
  border: 0;
  font-size: 2rem;
  color: ${({ theme }) => theme.colorTint1};
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.2rem;
  }

  &:hover {
    color: color-mix(in srgb, ${({ theme }) => theme.colorTint1}, white 40%);
  }
`
