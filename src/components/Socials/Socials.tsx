import React from 'react'
import styled from 'styled-components'

import { ISocial } from 'shared/types'

import { Social } from './Social'

const SocialBlock = styled.div`
  display: flex;
  list-style: none;

  @media (min-width: 480px) and (max-width: 1023px) {
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    right: calc(-4.2rem - 2rem);
    top: 0;
  }

  @media (max-width: 479px) {
    justify-content: space-between;
    position: absolute;
    left: 0;
    top: calc(100% + 2rem);
    width: 100%;
  }
`

interface SocialsProps {
  countsMap: Record<ISocial, number>
}

export const Socials: React.FC<SocialsProps> = ({ countsMap }) => {
  const socialsList = Object.entries(countsMap) as unknown as [
    ISocial,
    number,
  ][]

  return (
    <SocialBlock>
      {socialsList.map(([variant, count]) => (
        <Social key={variant} variant={variant} count={count} />
      ))}
    </SocialBlock>
  )
}
