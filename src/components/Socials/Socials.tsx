import React from 'react'

import { ISocial } from 'shared/types'

import { Social } from './Social'

import styles from './Socials.module.less'

interface SocialsProps {
  countsMap: Record<ISocial, number>
}

export const Socials: React.FC<SocialsProps> = ({ countsMap }) => {
  const socialsList = Object.entries(countsMap) as unknown as [
    ISocial,
    number,
  ][]

  return (
    <div className={styles.socialsBlock}>
      {socialsList.map(([variant, count]) => (
        <Social key={variant} variant={variant} count={count} />
      ))}
    </div>
  )
}
