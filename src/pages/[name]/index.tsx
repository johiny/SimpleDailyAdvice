import styled from "styled-components";
import leaf from "@/media/leaf.svg";
import Image from "next/image";
import { keyframes } from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { BubbleLoader } from "@/components/BubbleLoader";
import { useRef, useState } from "react";
import MiniPopup from "@/components/MiniPopup";
import SocialNetworks from "@/components/SocialNetworks";

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
`;
const PageContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  overflow-y: hidden;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  min-height: 100vh;
`;
const AdviceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  padding: 5vh;
  h2 {
    animation: ${entranceAnimation} 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
`;
const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const StyleAdvice = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  font-size: x-large;
  text-align: center;
  animation: ${entranceAnimation} 1.2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;
const Leaf = styled.div`
  position: relative;
  img {
    filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg)
      brightness(95%) contrast(82%);
  }
  
  transform: rotate(12deg);
  animation: ${entranceAnimation} 0.6s cubic-bezier(0.39, 0.575, 0.565, 1) both;
`;

const Bubble = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 30vh;
  height: 30vh;
  border-radius: 10%;
  box-shadow: 0px 0px 18px -12px #a4907c;
  align-items: center;
  justify-content: center;
  text-align: center;
  h2{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: large;
  }
  gap: 0.5vh;
`;

const StyleTextArea = styled.textarea`
margin-top: 2vh;
margin-bottom: 2vh;
background-color: #A4907C;
  border: none;
  text-align: center;
  color: #F1DEC9;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  overflow-y: hidden;
  text-align-last: center;
  resize: none;
  padding: 1vh;
  ::placeholder{
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    color: #F1DEC9;
  }
  :focus{
    outline: none;
  }
`
const StyleButton = styled.button`
  padding: 1vh;
  background-color:#A4907C;
  border: none;
  color: #F1DEC9;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
  border-radius: 5px;
  :hover{
    background-color: #7e7061;
  }
`
const sentNewPost = async (name : string, newAdviceInput : HTMLInputElement, setLoading : Function, setIsOpen : Function, setMessage: Function) => {
  if(newAdviceInput.value.length < 8) {
    setMessage("Your advice is too short!")
    setIsOpen(true)
    return
  }
  setLoading(true)
  try{
    let res = await fetch("/api/user_advices",{ method: "POST", body: JSON.stringify({name, advice: newAdviceInput.value})});
    if(res.status === 500){
      setMessage(`Your advice was not sent!, looks like there was an error on the DB`)
      setIsOpen(true)
      setLoading(false)
      return
    } 
    setMessage(`Your advice was sent!`)
    setIsOpen(true)
    newAdviceInput.value = "";
    setLoading(false)
  }
  catch(e){
    console.log(e)
  }
}
const DailyAdvice = (props: any) => {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const adviceContainer = useRef<HTMLDivElement>(null)
  return (
    <>
      <Head>
        <title>{`${props.name}'s Daily Advice`}</title>
        <meta name="description" content="Daily Advice" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageContainer>
        <Bubble>
          {loading && <BubbleLoader/>}
          <br/>
          <h2>Want to share a tip with your namesakes?</h2>
          <StyleTextArea id="newAdviceInput" placeholder="Write your advice here..." maxLength={100} required/>
          <StyleButton onClick={() => {
            const newAdviceInput = document.querySelector("#newAdviceInput") as HTMLInputElement;
            sentNewPost(props.name,newAdviceInput, setLoading, setIsOpen, setMessage)
            }}>Share it!</StyleButton>
          </Bubble>
        <CenterContainer>
        <AdviceContainer ref={adviceContainer}>
          <Leaf>
            <Image src={leaf} width={100} height={100} alt="wisdom tree image" />
          </Leaf>
          <h2>Hi {props.name} for your today advice:</h2>
          <StyleAdvice>
            <q>{props.advice}</q>
          </StyleAdvice>
          </AdviceContainer>
          <br/>
          <SocialNetworks adviceContainer={adviceContainer}/>
        </CenterContainer>
        <Bubble>
        <h2>Wanna see others advices shared by your namesakes?</h2>
        <br/>
        <Link href={`${props.name}/comments`}><StyleButton>See Them!</StyleButton></Link>
        </Bubble>
     {isOpen &&<MiniPopup isOpen={isOpen} setIsOpen={setIsOpen} text={message}/>}
      </PageContainer>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: any) {
  const res = await fetch("https://api.adviceslip.com/advice");
  const advice = await res.json();
  return {
    props: {
      advice: advice.slip.advice.replace('"', ""),
      name: params.name,
    },
    revalidate: 86400,
  };
}

export default DailyAdvice;
