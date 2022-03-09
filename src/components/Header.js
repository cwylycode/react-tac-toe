import rl from "../img/logo-react.png"
import tl from "../img/logo-ttt.png"

import { BsGear, BsBarChart, BsInfoCircle } from "react-icons/bs"

export default function Header() {
  return (
    <header className="pt-3 d-flex justify-content-sm-center">
      <div className="d-flex justify-content-sm-center align-items-center">
        <img id='react-logo' className='logo-size d-none d-sm-block' src={rl} alt='Spinny react logo thingy'></img>
        <h1 className='color-react'>React</h1>
        <h1>-Tac-Toe</h1>
        <img id='ttt-logo' className='logo-size d-none d-sm-block' src={tl} alt='tic tac toe logo thingy'></img>
      </div>
      <div className="position-absolute top-0 end-0 pe-3 pt-2">
        <button title="Info" type="button" className="btn p-1 fs-2"><BsInfoCircle /></button>
        <button title="Stats" type="button" className="btn p-1 fs-2"><BsBarChart /></button>
        <button title="Settings" type="button" className="btn p-1 fs-2"><BsGear /></button>
      </div>
    </header>
  )
}