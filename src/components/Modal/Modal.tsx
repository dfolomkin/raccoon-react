import React from 'react'
import styled from 'styled-components'

import { Box, Flex } from 'components/flexbox'

import { FormButton } from '../buttons/FormButton'

const BackgroundFade = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: ${({ theme }) => theme.colorTransparentDark75};
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15rem;
  width: 40rem;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.colorGrayscale9};
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.6rem;

  @media (max-width: 479px) {
    width: calc(100% - 2 * 2rem);
  }
`

interface ModalProps extends React.PropsWithChildren {
  onCancel: () => void
  onAccept?: () => void
}

export const Modal: React.FC<ModalProps> = ({
  children,
  onCancel,
  onAccept,
}) => (
  <BackgroundFade>
    <Container>
      <Box mb="1rem" width="100%">
        {children}
      </Box>
      <Flex justifyContent="flex-end">
        <FormButton
          onClick={() => {
            if (onAccept) {
              onAccept()
            }
          }}
        >
          <i className="fa-solid fa-check"></i>&ensp;Accept
        </FormButton>
        <FormButton onClick={() => onCancel()}>
          <i className="fa-solid fa-times"></i>&ensp;Cancel
        </FormButton>
      </Flex>
    </Container>
  </BackgroundFade>
)
