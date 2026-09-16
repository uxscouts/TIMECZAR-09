import { useState } from 'react'
import TomatoDashboard from './components/TomatoDashboard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">
        <h3>TIMECZAR</h3>
        <TomatoDashboard/>
      </section>
    </>
  )
}

export default App
