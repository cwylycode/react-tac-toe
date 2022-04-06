import ModalBase from "./ModalBase";
import { BsGithub } from "react-icons/bs"

export default function ModalInfo() {
  const contextButtons = <>
    <a href="https://github.com/cwylycode/react-tac-toe" target={"_blank"} referrerPolicy={"noreferrer"} className="btn btn-bs btn-success">
      <div className="d-flex justify-content-center align-items-center">
        <BsGithub />
        <p className="m-0 ms-2">See on GitHub</p>
      </div>
    </a>
  </>
  return (
    <ModalBase id={"info-modal"} title={"Info"} contextButtons={contextButtons}>
      <div className="text-center">
        <h5>React-Tac-Toe</h5>
        <p>A Tic-Tac-Toe game made with React</p>
        <p>Pick your token and play against the computer and win (or lose...or draw). But most of all, have fun!</p>
        <br />
        <p>Made by <a href="https://cwylycode.github.io" target={"_blank"} referrerPolicy={"noreferrer"}>Colin Wyly</a></p>
        <p>This web app is free and open source. For more information about the app and project, vist the GitHub link below.</p>
        <p>Feel free to check out my other projects, too!</p>
      </div>
    </ModalBase>
  )
}