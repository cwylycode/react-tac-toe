import iconX from "../img/iconX.png"
import iconO from "../img/iconO.png"
import { TOKENS } from "../lib/constants.js"

import { useEffect, useState } from "react"

export default function Cell({ cellID, cellValue, borders, handleClick }) {

  const [icon, setIcon] = useState("")
  const [animation, setAnimation] = useState("")

  useEffect(() => {
    if (cellValue) {
      setAnimation("zoom-in")
      if (cellValue === TOKENS.X) setIcon(iconX)
      else if (cellValue === TOKENS.O) setIcon(iconO)
    }
    else {
      setAnimation("zoom-out")
      const iconDelay = setTimeout(() => { setIcon("") }, 250);
      return () => { clearTimeout(iconDelay) }
    }
  }, [cellValue])

  return (
    <button id={cellID} type="button" onClick={() => (handleClick(cellID))} className={`cell col btn position-relative rounded-0 border-dark border-5 ${borders}`}>
      <img className={`cell-icon position-absolute translate-middle ${animation}`} src={icon}></img>
    </button>
  )
}