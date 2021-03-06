import styled from 'styled-components'
import Button from '../../blocks/button'
import media from '../../style/media'
import { secondaryColor } from '../../style/colors'

export const CreateEventLayout = styled.div`
  display: flex;
  flex-direction: column;
`

export const Title = styled.h1`
  position: absolute;
  top: 0;
  width: 100vw;
  background-color: ${secondaryColor};
  color: white;
  font-size: 1.5rem;
  left: -50vw;
  margin-left: 50%;
  padding: 1.5rem;
  text-align: center;

  ${media.fromTablet`
    font-size: 2rem;
  `}
`

export const TitleContainer = styled.div`
  position: relative;
  height: 3rem;
`

export const SubmitButton = styled(Button)`
  margin: 2rem auto;
  width: 13rem;
`
