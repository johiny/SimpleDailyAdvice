import styled from "styled-components"
import leaf from "@/media/leaf.png"
import Image from 'next/image'
import { keyframes } from "styled-components"
import Head from "next/head"
const entranceAnimation = keyframes`
  0% {
    -webkit-transform: translateY(50px);
            transform: translateY(50px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
`

const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  gap: 2vh;
  h2{
    animation: ${entranceAnimation} 1s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  }
`
const StyleAdvice = styled.p`
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: x-large;
    width: 40%;
    text-align: center;
    animation: ${entranceAnimation} 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`
const Leaf = styled.div`
    position: absolute;
    img {filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg) brightness(95%) contrast(82%);}
    top: 35vh;
    transform: rotate(12deg);
    animation: ${entranceAnimation} 0.6s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
`
const DailyAdvice = (props : any) => {
  return (
    <>
        <Head>
        <title>{`${props.name}'s Daily Advice`}</title>
        <meta name="description" content="Daily Advice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <StyleContainer>
        <Leaf>
        <Image src={leaf} width={80} height={80} alt='wisdom tree image'/>
        </Leaf>
        <h2>Hi {props.name} for your today advice:</h2>
        <StyleAdvice><q>{props.advice}</q></StyleAdvice>
    </StyleContainer>
    </>
  )
}

export async function getStaticPaths(){
    return{
        paths: [],
        fallback: "blocking"
    }
}

export async function getStaticProps({params} : any){
    const res = await fetch('https://api.adviceslip.com/advice') 
    const advice= await res.json()
    return{
        props:{
            advice: advice.slip.advice.replace('"',""),
            name : params.name
        },
        revalidate: 86400,
    }
}

export default DailyAdvice