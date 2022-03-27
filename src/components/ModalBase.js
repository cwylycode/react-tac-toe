export default function ModalBase({ children, id, title, contextButtons }) {
  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby={title} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          <div className="modal-footer justify-content-center">
            {contextButtons}
          </div>
        </div>
      </div>
    </div>
  )
}