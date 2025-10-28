import React from 'react'
import styled from 'styled-components'

import { LoaderBase } from './Loader'

const PageLoaderWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PageLoader: React.FC = () => (
  <PageLoaderWrapper>
    <LoaderBase size="medium" />
  </PageLoaderWrapper>
)
