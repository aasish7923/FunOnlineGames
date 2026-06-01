import { useState } from 'react'
import Home from './Home'
import NumberGame from './NumberGame'
import {Route, Routes} from 'react-router-dom'
import SimonSays from './SimonSays'

function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/" element={<h1 className="text-3xl font-bold mb-5">Online Games</h1>} />
      <Route path="/number-game" element={<NumberGame />} />
      <Route path="/simon-says" element={<SimonSays/>}/>
    </Routes>
    </>
  )
}

export default App
