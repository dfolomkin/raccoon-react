import { useEffect, useState } from 'react'

import { THEME } from 'shared/constants'
import { Theme } from 'shared/types'

export const useColorScheme = () => {
  const dark = window.matchMedia('(prefers-color-scheme: dark)')

  const [scheme, setScheme] = useState<Theme>(
    dark.matches ? THEME.dark : THEME.light
  )

  useEffect(() => {
    const handleDarkChange = (e: { matches: boolean }) => {
      setScheme(e.matches ? THEME.dark : THEME.light)
    }

    dark.addEventListener('change', handleDarkChange)

    return () => {
      dark.removeEventListener('change', handleDarkChange)
    }
  }, [dark])

  return scheme
}
