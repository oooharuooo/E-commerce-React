import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
const CheckoutPage = () => {
  return <main>
    <PageHero title="checkout" />
    <Wrapper className="page">
      <h1>Checkout Page</h1>
      <p>For privacy and security purposes, this page will be empty</p>
    </Wrapper>
  </main>
}
const Wrapper = styled.div``
export default CheckoutPage
