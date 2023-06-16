import React, { useState } from "react";
import { useUpdateDoctor } from "../../hooks/useDoctor";

const DoctorUpdateModal = ({
  name,
  setName,
  email,
  setEmail,
  expart,
  setExpart,
  doctorId,
}) => {
  console.log("FRom Modal, email is :", email);
  console.log("FRom Modal, Id is :", doctorId);
  const { mutate } = useUpdateDoctor(doctorId);

  const modifyDoctorMethod = () => {
    const newObj = {
      doctorName: name,
      doctorEmail: email,
      doctorSpeciality: expart
    };
    mutate(newObj);
  };

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1
              className="modal-title fs-3 fw-semibold text-success"
              id="staticBackdropLabel"
            >
              Change Doctor's Information,
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Speciality" className="form-label">
                  Speciality
                </label>
                <select
                  value={expart}
                  onChange={(e) => setExpart(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Heart">Heart</option>
                  <option value="Liver">Liver</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              onClick={modifyDoctorMethod}
              type="button"
              className="btn btn-secondary w-100"
              data-bs-dismiss="modal"
            >
              Submit Modified Information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorUpdateModal;
