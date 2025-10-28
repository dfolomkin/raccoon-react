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

export const Flex = styled.div<
  SpaceProps & LayoutProps & FlexboxProps & PositionProps
>`
  display: flex;
  ${space}
  ${layout}
  ${flexbox}
  ${position}
`
