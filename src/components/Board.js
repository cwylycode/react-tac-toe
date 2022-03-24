import { LINES } from "../lib/constants.js"
import Cell from "./Cell"

import { useEffect, useState } from "react"

export default function Board({ board, gridSize, onGameOver, onCellClick }) {

  const [grid, setGrid] = useState([])

  useEffect(() => {
    updateGrid()
    checkBoardStatus()
  }, [board])

  function updateGrid() {
    setGrid(() => {
      const arr = []
      let i = 0
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          let borders = ""
          if (y === gridSize - 1) {
            if (x === gridSize - 1) borders = "border-top-0 border-end-0 border-bottom-0 border-start-0"
            else borders = "border-top-0 border-bottom-0 border-start-0"
          }
          else if (x === gridSize - 1) borders = "border-top-0 border-end-0 border-start-0"
          else borders = "border-top-0 border-start-0"
          arr.push(
            <Cell
              key={i}
              cellID={i}
              cellValue={board[i]}
              borders={borders}
              onCellClick={onCellClick}
            />)
          i++
        }
      }
      return arr
    })
  }

  function checkBoardStatus() {
    const winningLines = LINES[gridSize - 3]
    for (let line of winningLines) {
      const arr = Array(gridSize)
      for (let i = 0; i < gridSize; i++) {
        arr[i] = board[line[i]]
      }
      // Winner declared, return token
      if (arr[0] && arr.every((e) => e === arr[0])) {
        gameOver(arr[0], line)
        return
      }
    }
    // All cells filled with no winner - draw
    if (board.every((e) => e !== null)) {
      gameOver(null)
    }
  }

  function gameOver(winningToken, winningLine = null) {
    if (winningLine) {
      // correct cells blinking
    }
    onGameOver(winningToken)
  }

  return (
    <div className="container board ratio ratio-1x1 g-0">
      <div className={`row row-cols-${gridSize} g-0`}>
        {grid}
      </div>
    </div>
  )
}