import styled from "styled-components"
import { keyframes } from "styled-components";
import Image from "next/image";
import leaf from "@/media/leaf.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 10vh;
  gap: 10vw;
  flex-wrap: wrap;
`
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
const AdviceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2vh;
  h2 {
    animation: ${entranceAnimation} 1s cubic-bezier(0.39, 0.575, 0.565, 1) both;
  }
`;
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
const Comments = ({data} : any) => {
  return (
    <Wrapper>
        {data.map((comment : any) => {
          return(
            <AdviceContainer key={comment._id}>
              <Leaf>
                <Image src={leaf} width={80} height={80} alt="wisdom tree image" />
              </Leaf>
              <StyleAdvice><q>{comment.advice}</q></StyleAdvice>
            </AdviceContainer>
          )
        })}
    </Wrapper>
  )
}

export const getServerSideProps = async ({query} : any) => {
  const endpoint = `${process.env.DOMAIN}/api/user_advices?name=${query.name}`
  const res = await fetch(endpoint, {method: "GET"})
  const data = await res.json()
  return {
    props: {
      data
    },
  }
}

export default Comments