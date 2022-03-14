import "./index.css"
import {
  TOKENS
} from "./lib/constants.js"

import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Board from './components/Board'
import History from './components/History'

function App() {

  const [gridSize, setGridSize] = useState(3)
  const [grid, setGrid] = useState(Array(gridSize * gridSize).fill(null));
  const [userToken, setUserToken] = useState(TOKENS.X)

  function cellClicked(cellID) {
    setGrid(prev => prev.map((value, index) => {
      return index === cellID ? userToken : value
    }))
  }

  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board grid={grid} gridSize={gridSize} cellClicked={cellClicked} />
        <History />
      </main>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)