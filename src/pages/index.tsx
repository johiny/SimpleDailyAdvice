import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import tree from "@/media/tree.svg";
import { useRouter } from "next/router";
import { useState } from "react";
const StyleTitle = styled.h2`
  font-size: large;
  font-family: Arial, Helvetica, sans-serif;
`;
const StyleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
`;
const StyledInput = styled.input`
  padding: 2vh 2vh;
  background-color: #a4907c;
  border: none;
  text-align: center;
  color: #f1dec9;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 1rem;
  border-radius: 5px;
  width: 24vw;
  ::placeholder {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
    color: #f1dec9;
  }
  :focus {
    outline: none;
  }
`;
const StyledImg = styled.div`
  img {
    filter: invert(61%) sepia(4%) saturate(1791%) hue-rotate(349deg)
      brightness(95%) contrast(82%);
  }
`;
const StyleButton = styled.button`
  margin-top: 2vh;
  padding: 2vh;
  background-color: #a4907c;
  border: none;
  color: #f1dec9;
  cursor: pointer;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  border-radius: 5px;
  :hover {
    background-color: #7e7061;
  }
  :disabled{
    background-color: #796b5d;
    cursor: not-allowed;
  }
`;
export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const navTo = (name: string) => {
    // router.push(`/${name}`);
    window.location.href = `/${name}`
  };
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
          <Image src={tree} width={300} height={300} alt="wisdom tree image" />
        </StyledImg>
        <StyleTitle>Get Your Daily Advice</StyleTitle>
        <StyledInput
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              navTo(e.currentTarget.value);
            }
          }}
          id="input"
          required
          placeholder="Enter your name"
        />
        <StyleButton
          disabled={name.length < 3}
          onClick={() => {
            const input = document.querySelector("#input") as HTMLInputElement;
            navTo(input.value);
          }}
        >
          See your advice
        </StyleButton>
      </StyleContainer>
    </>
  );
}
