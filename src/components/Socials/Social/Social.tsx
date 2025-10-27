import React from 'react'
import clsx from 'clsx'

import { getIconComponent } from 'components/Icon/Icon'
import { ISocial } from 'shared/types'

import styles from './Social.module.less'

interface SocialProps {
  variant: ISocial
  count: number
}

export const Social: React.FC<SocialProps> = ({ variant, count }) => {
  const IconComponent = getIconComponent(variant)

  return (
    <div
      className={clsx(styles.socialBadge, styles[`socialBadge--${variant}`])}
    >
      <a href="" className={styles.socialLink}>
        <IconComponent className={styles.socialIcon} />
        {count}
      </a>
    </div>
  )
}
