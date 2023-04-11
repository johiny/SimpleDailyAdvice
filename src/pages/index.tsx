import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import tree from '@/media/tree.svg'

const StyleTitle =  styled.h2`
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
`
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`
const StyledInput = styled.input`
  padding: 2vh 2vh;
  background-color: #A4907C;
  border: none;
  text-align: center;
  color: #F1DEC9;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  width: 24vw;
  ::placeholder{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #F1DEC9;
  }
  :focus{
    outline: none;
  }
`
const StyledImg = styled.div`
  img{
    filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg) brightness(95%) contrast(82%);
  }
`
export default function Home() {

  const navTo = (name : string) => {
    window.location.replace(`/${name}`)
  }
  return (
    <>
      <Head>
        <title>Simple Daily Advice</title>
        <meta name="description" content="Daily Advice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyleContainer>
        <StyledImg>
        <Image src={tree} width={300} height={300} alt='wisdom tree image'/>
        </StyledImg>
      <StyleTitle>Get Your Daily Advice</StyleTitle>
      <StyledInput onKeyUp={(e) => {
        if(e.key === 'Enter'){
          navTo(e.currentTarget.value)
        }
      }} placeholder='Enter your name and press
     enter'/>
      </StyleContainer>
    </>
  )
}