import styled from "styled-components"
import Image from "next/image"
import instagram from "@/media/instagram.svg"
import twitter from "@/media/twitter.svg"
import facebook from "@/media/facebook.svg"
import linkedin from "@/media/linkedin.svg"
import { keyframes } from "styled-components"
import captureElement from "@/utils/captureElement"
import { RefObject, useState } from "react"
import uploadImageToImgbb from "@/utils/UploadToBB"
import Loader from "./Loader"

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


const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 2vw;
  padding: 2vh;
  animation: ${entranceAnimation} 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    img {
    filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg)
      brightness(95%) contrast(82%);
      :hover{
        filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg)
        brightness(45%) contrast(82%);
        cursor: pointer;
      }
  }
`
const handleClick = async (adviceContainer : HTMLDivElement | null, social: string, setIsLoading : Function) => {
  // switch with 3 options facebook, twitter, linkedin
  let url = ''
  switch(social){
    case "facebook":
      url = "https://www.facebook.com/sharer/sharer.php?u="
      if(adviceContainer){
        setIsLoading(true)
         const img = await captureElement(adviceContainer)
          const imageurl = await uploadImageToImgbb(img)
          setIsLoading(false)
          window.open(`${url}${imageurl}`, '_blank')
      }
      break;
    case "twitter":
      url = `https://twitter.com/intent/tweet?text="See my today's advice and yours on"&url=simple-daily-advice.vercel.app`
      window.open(`${url}`, '_blank')
      break;
    case "linkedin":
      url = "https://www.linkedin.com/sharing/share-offsite/?url="
      if(adviceContainer){
        setIsLoading(true)
        const img = await captureElement(adviceContainer)
         const imageurl = await uploadImageToImgbb(img)
         setIsLoading(false)
         window.open(`${url}${imageurl}&title=My Daily Advice`, '_blank')
     }
      break;
  }
}
const SocialNetworks = ({adviceContainer}: {adviceContainer: RefObject<HTMLDivElement>}) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Container>
      {isLoading && <Loader/> }
      <Image alt="facebook" src={facebook} width={30} height={30} onClick={()=> handleClick(adviceContainer.current, 'facebook', setIsLoading)}/>
        <Image alt="twitter" onClick={()=> handleClick(adviceContainer.current, "twitter", setIsLoading)} src={twitter} width={30} height={30} />
        <Image alt="linkedin" onClick={()=> handleClick(adviceContainer.current, "linkedin", setIsLoading)} src={linkedin} width={30} height={30} />
    </Container>
  )
}

export default SocialNetworks