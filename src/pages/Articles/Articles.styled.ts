import styled from 'styled-components'

import { FormButton } from 'components'

export const ControlPanel = styled.div`
  display: flex;

  @media (min-width: 480px) {
    justify-content: space-between;
    margin-bottom: 2.5rem;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 3rem;
  }
`

export const ArticleWrapper = styled.div`
  @media (min-width: 480px) {
    margin-bottom: 2.5rem;
  }
  @media (max-width: 479px) {
    margin-bottom: 7rem;
  }
`

export const AddButton = styled(FormButton)`
  @media (max-width: 479px) {
    margin-top: 2rem;
  }
`
