import styled from 'styled-components'

export const FilterBarWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 3rem;

  @media (min-width: 1024px) {
    width: 33%;
  }
  @media (min-width: 480px) and (max-width: 1023px) {
    width: 50%;
  }
  @media (max-width: 479px) {
    width: 100%;
  }

  box-sizing: content-box;
  background-color: ${({ theme }) => theme.colorGrayscale9};
  border: 1px solid ${({ theme }) => theme.colorTextHeader};
  border-right: none;

  &::before {
    position: absolute;
    top: -1px;
    left: 100%;
    border-top: 1.6rem solid transparent;
    border-bottom: 1.6rem solid transparent;
    border-left: 1.6rem solid ${({ theme }) => theme.colorTextHeader};
    border-right: 0;
    content: '';
  }

  &::after {
    position: absolute;
    top: 0;
    left: 100%;
    border-top: 1.5rem solid transparent;
    border-bottom: 1.5rem solid transparent;
    border-left: 1.5rem solid ${({ theme }) => theme.colorGrayscale9};
    border-right: 0;
    content: '';
  }
`

export const FilterInput = styled.input`
  position: absolute;
  left: 0;
  height: 2.2rem;
  width: calc(100% - 3rem);
  padding-left: 3rem;
  border: 0;
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.6rem;

  &:focus {
    outline: none;
  }
`
