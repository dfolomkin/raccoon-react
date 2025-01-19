import * as React from 'react'
import clsx from 'clsx'

import { PropsWithChildren } from 'common/types'

import styles from './navButton.module.less'

interface NavButtonProps {
  isMenu?: boolean
}

export function NavButton({
  children,
  isMenu,
}: PropsWithChildren<NavButtonProps>) {
  return (
    <div className={clsx(styles.navButton, isMenu && styles.navButtonMenu)}>
      <div className={styles.navButtonInner}>{children}</div>
    </div>
  )
}
