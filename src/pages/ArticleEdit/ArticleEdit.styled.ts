import styled from 'styled-components'

export const Form = styled.form`
  @media (min-width: 480px) {
    margin-bottom: 2.5rem;
  }
  @media (max-width: 479px) {
    margin-bottom: 7rem;
  }
`

export const FormGroup = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`

export const PreviewImg = styled.img`
  display: block;
  width: 100%;

  @media (min-width: 480px) {
    height: 20rem;
  }
  @media (max-width: 479px) {
    height: 15rem;
  }

  object-fit: cover;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 0.2rem;
`

export const FormInput = styled.input`
  height: 3rem;
  width: calc(100% - 4px);
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.8rem;
`

export const FormTextarea = styled.textarea`
  height: 10rem;
  width: calc(100% - 6px);
  font-family: 'PT Sans Narrow', sans-serif;
  font-size: 1.8rem;
`

export const FormTextareaCounter = styled.div`
  float: right;
`

export const FormControl = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
  width: 100%;
`
