import { useState } from 'react'
import Home from './Home'
import NumberGame from './NumberGame'
import {Route, Routes} from 'react-router-dom'
import SimonSays from './SimonSays'
import Navbar from './Navbar'

function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/number-game" element={<NumberGame />} />
      <Route path="/simon-says" element={<SimonSays/>}/>
    </Routes>
    </>
  )
}

export default App
