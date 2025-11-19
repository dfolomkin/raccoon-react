import React from 'react'
import styled, { css } from 'styled-components'

import { Icon } from 'components/Icon'
import { SOCIALS_COLOR_MAP } from 'shared/constants'
import { ISocial } from 'shared/types'

const SocialBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: ISocial }>`
  @media (min-width: 1024px) {
    border-radius: 3px;
    background-color: ${({ theme }) => theme.colorSocialDefault};

    &:hover {
      background-color: ${({ variant }) => SOCIALS_COLOR_MAP[variant]};
    }

    &:not(:last-child) {
      margin-right: 0.33em;
    }
  }

  @media (max-width: 1023px) {
    background-color: ${({ variant }) => SOCIALS_COLOR_MAP[variant]};

    &:hover {
      background-color: color-mix(
        in srgb,
        ${({ variant }) => SOCIALS_COLOR_MAP[variant]},
        white 20%
      );
    }
  }

  @media (min-width: 480px) and (max-width: 1023px) {
    margin-bottom: 0.4em;
    border-radius: 3px 0 0 3px;
  }

  @media (max-width: 479px) {
    border-radius: 3px;

    &:not(:last-child) {
      margin-right: 0.33em;
    }
  }
`

const SocialLink = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<{ variant: ISocial }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.6em;
  padding: 0.13em 0.39em 0.13em 0.26em;
  color: ${({ theme }) => theme.colorGrayscale9};
  font-weight: 600;
  text-decoration: none;

  ${({ variant }) => (variant === 'gplus' ? 'padding: 0.13em 0.39em 0 0;' : '')}
`

const socialIconMixin = css`
  width: 1.4em;
  height: 1.4em;
  margin-right: 0.4em;
  fill: currentcolor;
`

const socialIconGplusMixin = css`
  position: relative;
  top: 0.13em;
  width: 1.6em;
  height: 1.6em;
  margin-right: 0.4em;
  fill: currentcolor;
`

const SocialIcons = {
  facebook: styled(Icon.Facebook)`
    ${socialIconMixin}
  `,
  gplus: styled(Icon.Gplus)`
    ${socialIconGplusMixin}
  `,
  twitter: styled(Icon.Twitter)`
    ${socialIconMixin}
  `,
  vk: styled(Icon.Vk)`
    ${socialIconMixin}
  `,
  yaru: styled(Icon.Yandex)`
    ${socialIconMixin}
  `,
}

interface SocialProps {
  variant: ISocial
  count: number
}

export const Social: React.FC<SocialProps> = ({ variant, count }) => {
  const Icon = SocialIcons[variant]

  return (
    <SocialBadge
      variant={variant}
      data-testid={`social-block-badge:${variant}`}
    >
      <SocialLink
        variant={variant}
        data-testid={`social-block-link:${variant}`}
      >
        <Icon />
        {count}
      </SocialLink>
    </SocialBadge>
  )
}
