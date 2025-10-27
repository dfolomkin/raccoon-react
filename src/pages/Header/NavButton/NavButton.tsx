import * as React from 'react'
import clsx from 'clsx'

import styles from './NavButton.module.less'

interface NavButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isSwitchedOn: boolean
  isMenu?: boolean
}

export const NavButton: React.FC<NavButtonProps> = ({
  children,
  isSwitchedOn,
  isMenu,
  ...props
}) => (
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
