export default function ModalBase({ children, id, title, contextButtons }) {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={title} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <div style={{ width: "32px" }}></div>
            <h3 className="modal-title">{title}</h3>
            <button type="button" className="btn-close m-0" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body pt-0 pb-0">
            {children}
          </div>
          <div className="modal-footer border-0 justify-content-center">
            {contextButtons}
          </div>
        </div>
      </div>
    </div>
  )
}