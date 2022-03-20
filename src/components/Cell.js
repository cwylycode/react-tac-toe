import iconX from "../img/iconX.png"
import iconO from "../img/iconO.png"
import { TOKENS } from "../lib/constants.js"

import { useEffect, useState } from "react"

export default function Cell({ cellID, cellValue, borders, handleClick }) {
  const [icon, setIcon] = useState(null)
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    setAnimation(cellValue ? "zoomIn" : "zoomOut")
    if (cellValue === TOKENS.X) setIcon(iconX)
    else if (cellValue === TOKENS.O) setIcon(iconO)
    else setIcon("")
  }, [cellValue])

  return (
    <button id={cellID} type="button" onClick={() => (handleClick(cellID))} className={`cell col btn position-relative rounded-0 border-dark border-5 ${borders}`}>
      <img className={`cell-icon position-absolute translate-middle ${animation}`} src={icon}></img>
    </button>
  )
}