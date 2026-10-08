import React from 'react';
import { Container } from 'reactstrap';
import TomatoDashboard from '../components/TomatoDashboard'
export default function Stats() {
  return (
    <Container className="py-5">
      <h1>Stats</h1>
      <p>Get week view, month and three month</p>
      <TomatoDashboard/>
    </Container>
  )
}
