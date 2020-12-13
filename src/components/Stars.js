import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({ stars, reviews }) => {
  
  // Create an array with the length of 5 (max Stars)
  const tempStars = Array.from({ length: 5 }, (_, index) => {
    const halfStars = index + 0.5;
    return (
      <span key={index}>
        {/* Iterate index and compare with stars then display it base on conditional*/}
        {stars >= index + 1 ? 
          <BsStarFill /> :
          stars >= halfStars ?
          <BsStarHalf /> :
          <BsStar />} 
      </span>
    )
  })

  return (
    <Wrapper>
      <div className="stars">
        {tempStars}
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
    )
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
