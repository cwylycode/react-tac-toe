import React from 'react'
import ReactDOM from 'react-dom'
import Header from './components/Header'
import Board from './components/Board'
import History from './components/History'

import "./index.css"

function App() {
  return (
    <div className='container-xxl'>
      <Header />
      <main className="pt-5">
        <Board />
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