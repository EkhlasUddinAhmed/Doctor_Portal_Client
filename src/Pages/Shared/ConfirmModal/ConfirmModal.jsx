import React from "react";

const ConfirmModal = ({ title, message, deleteDoctorMethod,selectedDoctor,deleteDoctor }) => {
  return (
    <div
      className="modal fade"
      id="confirmModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-2"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-3 text-warning"
              id="staticBackdropLabel"
            >
              {title}
            </h1>
            {/* <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button> */}
          </div>
          <div className="modal-body">
            <h4 className="text-danger">{message}</h4>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              onClick={()=>deleteDoctor(selectedDoctor._id)}
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Confirm Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
