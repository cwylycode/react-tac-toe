import ModalBase from "./ModalBase";

export default function ModalStats(onResetClick) {
  const contextButtons = <>
    <button
      onClick={() => onResetClick()}
      type="button"
      className="btn btn-danger">
      Reset
    </button></>
  return (
    <ModalBase id={"stats-modal"} title={"Statistics"} contextButtons={contextButtons}>
      <p>Hello stats</p>
    </ModalBase>
  )
}