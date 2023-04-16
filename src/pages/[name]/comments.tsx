import styled from "styled-components"

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
const Comment = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vh;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    font-size: medium;
    color: #8D7B68;
    width: 15vw;
    border-radius: 55px;
    opacity: 0.9;
    margin-top: 5vh;
    // beatiful minimalist box shadow
    box-shadow: 0px 0px 20px -10px #A4907C;
    `
const Comments = ({data} : any) => {
  return (
    <Wrapper>
        {data.map((comment : any) => {
          return(
            <Comment key={comment.id}>
              <p>{comment.body}</p>
            </Comment>
          )
        })}
    </Wrapper>
  )
}

// funtion to get a random number between a range

const randomNumber = (min : number, max : number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const getServerSideProps = async () => {
  const res =  await fetch(`https://dummyjson.com/comments?limit=9&select=body,postId&skip=${randomNumber(0,311)}`)
  const data = await res.json()
  return {
    props: {
      data: data.comments,
    },
  }
}

export default Comments