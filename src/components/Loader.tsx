import React from 'react'
import styled from 'styled-components'
import { keyframes } from 'styled-components'

const animloader = keyframes`
    0% {
      border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75);
}
    33% {
      border-color: rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35);
}
    66% {
      border-color: rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25);
}
    100% {
      border-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.75) rgba(255, 255, 255, 0.15);
}
`
const StyledLoader = styled.span`
    border: 10vh solid;
    border-color: rgba(255, 255, 255, 0.15) rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.35) rgba(255, 255, 255, 0.5);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: ${animloader} 1s linear infinite;
`
const StyleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    left: 0;
    min-height: 100vh;
    min-width: 100vw;
    background-color: rgba(77, 61, 22, 0.401);
`
const Loader = () => {
  return (
    <StyleContainer>
    <StyledLoader></StyledLoader>
    </StyleContainer>
  )
}

export default Loader