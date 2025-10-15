import * as React from 'react'
import clsx from 'clsx'

import styles from './NavButton.module.less'

interface NavButtonProps {
  isSwitchedOn: boolean
  isMenu?: boolean
}

export function NavButton({
  children,
  isSwitchedOn,
  isMenu,
  ...props
}: React.PropsWithChildren<NavButtonProps> &
  React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        styles.navButton,
        isSwitchedOn && styles.navButton__active,
        isMenu && styles.navButtonMenu
      )}
      {...props}
    >
      <div className={styles.navButtonInner}>{children}</div>
    </button>
  )
}
