import ModalBase from "./ModalBase";

export default function ModalInfo() {
  const contextButtons = <><a href="https://github.com/cwylycode/react-tac-toe" target={"_blank"} className="btn btn-bs btn-success">See on GitHub</a></>
  return (
    <ModalBase id={"info-modal"} title={"Info"} contextButtons={contextButtons}>
      <div className="text-center">
        <h5>React-Tac-Toe</h5>
        <p>A Tic-Tac-Toe game made with React</p>
        <p>Pick your token and play against the computer and win (or lose...or draw). But most of all, have fun!</p>
        <br />
        <p>Made by <a href="https://cwylycode.github.io" target={"_blank"}>cwylycode</a></p>
        <p>This web app is free and open source. For more information about the app and project, vist the GitHub link below.</p>
        <p>Feel free to check out my other projects, too!</p>
      </div>
    </ModalBase>
  )
}