import { useState } from 'react'
import './App.css';
import Canvas from './canvas';

function App() {

  return (
    <div>
       <header>
        <div className='logo'>
          <img src='./images/image-editor-logo.png'/>
          <h1>Image Editor</h1>
        </div>
        <nav>
          <ul className='header-list'>
            <li>Help</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
      <Canvas/>
    </div>
  )
}

export default App
