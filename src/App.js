import {useState} from 'react'

import backgroundImage from './assets/backgroundImage.jpg'
import './App.css'
import NavBar from './components/Navbar.component'
import TypingSection from './components/TypingSection.component'

function App() {
  return (
    <>
      <NavBar/>
      <TypingSection/>
      {/* <img src={backgroundImage} id="logo" alt=""/> */}
    </>
  )
}

export default App
