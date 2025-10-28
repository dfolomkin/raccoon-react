import styled from 'styled-components'
import {
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
} from 'styled-system'

export const Box = styled.div<
  SpaceProps & LayoutProps & FlexboxProps & PositionProps
>`
  ${space}
  ${layout}
  ${flexbox}
  ${position}
`
