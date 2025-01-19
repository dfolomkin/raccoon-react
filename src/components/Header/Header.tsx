import React from 'react'
import { Link } from 'react-router-dom'

import { NavButton } from './components'

import styles from './Header.module.less'

import sprite from 'images/sprite.url.svg'

const menu = [
  { label: 'javascript', href: '/' },
  { label: 'css', href: '/' },
  { label: 'latest', href: '/articles-list' },
  { label: 'html', href: '/article/10' },
  { label: 'design', href: '/' },
]

export function Header() {
  return (
    <>
      <div className={styles.logo}>
        <span>racco</span>
        <svg className={styles.logoIcon}>
          <use href={`${sprite}#icon-racoon-negative`} />
        </svg>
        <span>nblog</span>
      </div>
      <nav className="navbar">
        <div className="navbar__control">
          <NavButton>?</NavButton>

          <ul className="menu">
            {menu.map((item) => (
              <li key={item.label} className="menu__item">
                <Link to={item.href} className="menu__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <NavButton>!</NavButton>

          <NavButton>
            <svg className="navbar__button-icon">
              <use xlinkHref="dist/img/sprite.svg#icon-tag" />
            </svg>
          </NavButton>
        </div>

        <NavButton isMenu>
          <svg className="navbar__button-icon">
            <use xlinkHref="dist/img/sprite.svg#icon-menu" />
          </svg>
        </NavButton>
      </nav>
    </>
  )
}
