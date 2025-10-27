import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Aside } from 'pages'

import { Header } from '../Header'

import styles from './MainLayout.module.less'

export const MainLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isInfoOpen, setIsInfoOpen] = useState(false)
  const [isTagsOpen, setIsTagsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMenuOpen((prevState) => !prevState)
    setIsAboutOpen(false)
    setIsInfoOpen(false)
    setIsTagsOpen(false)
  }

  const handleAboutToggle = () => {
    setIsMenuOpen(false)
    setIsAboutOpen((prevState) => !prevState)
    setIsInfoOpen(false)
    setIsTagsOpen(false)
  }

  const handleInfoToggle = () => {
    setIsMenuOpen(false)
    setIsAboutOpen(false)
    setIsInfoOpen((prevState) => !prevState)
    setIsTagsOpen(false)
  }

  const handleTagsToggle = () => {
    setIsMenuOpen(false)
    setIsAboutOpen(false)
    setIsInfoOpen(false)
    setIsTagsOpen((prevState) => !prevState)
  }

  return (
    <div className={styles.mainLayout}>
      <div className={styles.versionInfo}>{__VERSION__}</div>
      <Header
        isMenuOpen={isMenuOpen}
        isAboutOpen={isAboutOpen}
        isInfoOpen={isInfoOpen}
        isTagsOpen={isTagsOpen}
        onMenuToggle={handleMenuToggle}
        onAboutToggle={handleAboutToggle}
        onInfoToggle={handleInfoToggle}
        onTagsToggle={handleTagsToggle}
      />
      <div className={styles.container}>
        <section className={styles.section}>
          <Outlet />
        </section>
        <section className={styles.aside}>
          <Aside
            isAboutOpen={isAboutOpen}
            isInfoOpen={isInfoOpen}
            isTagsOpen={isTagsOpen}
            onAboutToggle={handleAboutToggle}
            onInfoToggle={handleInfoToggle}
            onTagsToggle={handleTagsToggle}
          />
        </section>
      </div>
    </div>
  )
}
