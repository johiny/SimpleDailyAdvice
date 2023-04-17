import styled from 'styled-components'
import { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'
const slideIn = keyframes`
0% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`
const slideOut = keyframes`
0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: translateY(1000px);
            transform: translateY(1000px);
    opacity: 0;
  }
`
const Wrapper = styled.div`
    position: absolute;
    padding: 3vh 5vw;
    bottom: 1vh;
    right: 1vw;
    box-shadow: 0px 0px 10px rgba(0,0,0,0.15);
    border-radius: 12px;
    h3{
        font-family: Arial, Helvetica, sans-serif;
        font-size: 1rem;
        color: #8D7B68;
    }
    animation: ${props => props.isOpening ? slideIn : slideOut} ${props => props.isOpening ? '0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)' : '1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both'} ;
`

const MiniPopup = ({setIsOpen, isOpen, text} : any) => {
    const [isOpening, setIsOpening] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOpening(false)
            console.log('pasoron dos segundo')
        },2000)
         return () => {
             clearTimeout(timer)
         }
    },[])
  return (
    <Wrapper isOpening={isOpening} isOpen={isOpen} onAnimationEnd={() => {
        if (isOpening === false){
            setIsOpen(false)
        }
    }}><h3>{text}</h3></Wrapper>
  )
}

export default MiniPopup