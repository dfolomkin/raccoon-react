import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import { Aside } from 'pages'

import { Header } from '../Header'

import {
  AsideWrapper,
  MainLayoutContainer,
  PageContainer,
  Section,
  VersionInfo,
} from './MainLayout.styled'

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
    <MainLayoutContainer>
      <VersionInfo data-testid="mainlayout-component-version">
        {__VERSION__}
      </VersionInfo>
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
      <PageContainer data-testid="mainlayout-component-pagecontainer">
        <Section>
          <Outlet />
        </Section>
        <AsideWrapper>
          <Aside
            isAboutOpen={isAboutOpen}
            isInfoOpen={isInfoOpen}
            isTagsOpen={isTagsOpen}
            onAboutToggle={handleAboutToggle}
            onInfoToggle={handleInfoToggle}
            onTagsToggle={handleTagsToggle}
          />
        </AsideWrapper>
      </PageContainer>
    </MainLayoutContainer>
  )
}
