import React from 'react'
import clsx from 'clsx'
import { NavLink } from 'react-router-dom'

import { Icon } from 'components'
import { ROUTES } from 'shared/constants'

import { NavButton } from './NavButton'

import styles from './Header.module.less'

const menu = [
  { caption: 'javascript', path: '/javascript' },
  { caption: 'css', path: '/css' },
  { caption: 'latest', path: ROUTES.articles },
  { caption: 'html', path: '/html' },
  { caption: 'design', path: '/design' },
]

interface HeaderProps {
  isMenuOpen: boolean
  isInfoOpen: boolean
  isAboutOpen: boolean
  isTagsOpen: boolean
  onMenuToggle: () => void
  onAboutToggle: () => void
  onInfoToggle: () => void
  onTagsToggle: () => void
}

export const Header: React.FC<HeaderProps> = ({
  isMenuOpen,
  isInfoOpen,
  isAboutOpen,
  isTagsOpen,
  onMenuToggle,
  onAboutToggle,
  onInfoToggle,
  onTagsToggle,
}) => (
  <div className={styles.header}>
    <div className={styles.logo}>
      <span>racco</span>
      <Icon.RaccoonNegative className={styles.logo__icon} />
      <span>nblog</span>
    </div>

    <nav className={styles.navbar}>
      <div className={styles.navbar__control}>
        <NavButton isSwitchedOn={isAboutOpen} onClick={() => onAboutToggle()}>
          ?
        </NavButton>

        <ul className={clsx(styles.menu, isMenuOpen && styles.note__down)}>
          {menu.map((item) => {
            const isActive = item.caption === 'latest'

            return (
              <li
                key={item.caption}
                className={clsx(
                  styles.menu__item,
                  isActive && styles.menu__item__active
                )}
              >
                <NavLink to={item.path} className={styles.menu__link}>
                  {item.caption}
                </NavLink>
              </li>
            )
          })}
        </ul>

        <NavButton isSwitchedOn={isInfoOpen} onClick={() => onInfoToggle()}>
          !
        </NavButton>

        <NavButton isSwitchedOn={isTagsOpen} onClick={() => onTagsToggle()}>
          <Icon.Tag className={styles.navbar__icon} />
        </NavButton>
      </div>

      <NavButton
        isSwitchedOn={isMenuOpen}
        onClick={() => onMenuToggle()}
        isMenu
      >
        <Icon.Menu className={styles.navbar__icon} />
      </NavButton>
    </nav>
  </div>
)
