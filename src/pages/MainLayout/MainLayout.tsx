import React from 'react'
import { Outlet } from 'react-router-dom'

import { Aside } from 'pages'
import { EmptyObject } from 'shared/types'

import { Header } from '../Header'

import styles from './MainLayout.module.less'

interface MainLayoutState {
  isMenuOpen: boolean
  isInfoOpen: boolean
  isAboutOpen: boolean
  isTagsOpen: boolean
}

export class MainLayout extends React.Component<EmptyObject, MainLayoutState> {
  constructor(props: EmptyObject) {
    super(props)
    this.state = {
      isMenuOpen: false,
      isAboutOpen: false,
      isInfoOpen: false,
      isTagsOpen: false,
    }

    this.handleMenuToggle = this.handleMenuToggle.bind(this)
    this.handleAboutToggle = this.handleAboutToggle.bind(this)
    this.handleInfoToggle = this.handleInfoToggle.bind(this)
    this.handleTagsToggle = this.handleTagsToggle.bind(this)
  }

  handleMenuToggle() {
    this.setState(({ isMenuOpen }) => ({
      isMenuOpen: !isMenuOpen,
      isAboutOpen: false,
      isInfoOpen: false,
      isTagsOpen: false,
    }))
  }

  handleAboutToggle() {
    this.setState(({ isAboutOpen }) => ({
      isMenuOpen: false,
      isAboutOpen: !isAboutOpen,
      isInfoOpen: false,
      isTagsOpen: false,
    }))
  }

  handleInfoToggle() {
    this.setState(({ isInfoOpen }) => ({
      isMenuOpen: false,
      isAboutOpen: false,
      isInfoOpen: !isInfoOpen,
      isTagsOpen: false,
    }))
  }

  handleTagsToggle() {
    this.setState(({ isTagsOpen }) => ({
      isMenuOpen: false,
      isAboutOpen: false,
      isInfoOpen: false,
      isTagsOpen: !isTagsOpen,
    }))
  }

  render() {
    const { isMenuOpen, isAboutOpen, isInfoOpen, isTagsOpen } = this.state

    return (
      <div className={styles.mainLayout}>
        <div className={styles.versionInfo}>{__VERSION__}</div>
        <Header
          isMenuOpen={isMenuOpen}
          isAboutOpen={isAboutOpen}
          isInfoOpen={isInfoOpen}
          isTagsOpen={isTagsOpen}
          onMenuToggle={this.handleMenuToggle}
          onAboutToggle={this.handleAboutToggle}
          onInfoToggle={this.handleInfoToggle}
          onTagsToggle={this.handleTagsToggle}
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
              onAboutToggle={this.handleAboutToggle}
              onInfoToggle={this.handleInfoToggle}
              onTagsToggle={this.handleTagsToggle}
            />
          </section>
        </div>
      </div>
    )
  }
}
