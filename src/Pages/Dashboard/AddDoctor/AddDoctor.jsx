import React, { useRef, useState } from "react";
import "./AddDoctor.css";
import { useGetAllTreatmentName } from "../../../hooks/useDoctor";
const AddDoctor = () => {
  const { isLoading, data } = useGetAllTreatmentName();

  //  const [doctorName,setDoctorName]=useState("");
  //  const [doctorEmail,setDoctorEmail]=useState("");
  //  const [doctorSpeciality,setDoctorSpeciality]=useState("");

  const formOnsubmitHandler = (e) => {
    e.preventDefault();

    
  };

  const formOnClickHandler = () => {
    console.log("formOnClickHandler is Ok");
  };

  return (
    <div className="Doctor-div-parent  position-relative">
      <div className="Doctor-div-child   px-5 position-absolute shadow-lg">
        <div className="row justify-content-center">
          <h3 className="mt-4 text-center text-white ">Add A New Doctor</h3>
          <div className="col-md-12 ">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <span className="fs-5">Doctor Name</span>
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg fs-3"
                  id="name"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <span className="fs-5">Doctor Email </span>
                </label>
                <input
                  type="email"
                  className="form-control form-control-lg fs-3"
                  id="email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="speciality" className="form-label">
                  <span className="fs-5">Speciality</span>
                </label>

                <select className="form-select form-select-lg fs-3">
                  {data?.data.map((tName) => (
                    <option key={tName._id} value={tName.treatmentName}>
                      {tName.treatmentName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  <span className="fs-5">Doctor Photo </span>
                </label>
                <input
                  type="file"
                  className="form-control form-control-lg fs-3"
                  id="photo"
                  name="doctorImage"
                  required
                />
              </div>

              <button
                onClick={formOnClickHandler}
                type="submit"
                className="btn btn-secondary btn-lg w-100 mt-3 mb-3"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDoctor;
