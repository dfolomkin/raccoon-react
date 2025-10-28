import 'styled-components'

import { THEME_SPEC } from 'src/shared/constants'

declare module 'styled-components' {
  export interface DefaultTheme
    extends Record<keyof typeof THEME_SPEC.light, string> {
    mode: string
  }
}
