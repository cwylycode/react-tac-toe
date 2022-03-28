import Cell from "./Cell"

import { useEffect, useState } from "react"

export default function Board({ board, gridSize, gameOverStatus, onCellClick }) {

  const [grid, setGrid] = useState([])

  useEffect(() => {
    updateGrid()
  }, [board, gameOverStatus])

  function updateGrid() {
    setGrid(() => {
      const arr = []
      let i = 0
      for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
          let borders = ""
          if (y === gridSize - 1) {
            if (x === gridSize - 1) borders = "border-0"
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
              gameStatus={gameOverStatus}
              onCellClick={onCellClick}
            />)
          i++
        }
      }
      return arr
    })
  }

  return (
    <div className="container board ratio ratio-1x1 g-0">
      <div className={`row row-cols-${gridSize} g-0`}>
        {grid}
      </div>
    </div>
  )
}