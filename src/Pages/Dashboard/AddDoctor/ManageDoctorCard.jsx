import React from "react";
import "./ManageDoctorCard.css";
const ManageDoctorCard = ({
  doctor,
  deleteDoctorMethod,
  modifyDoctorMethod,
  choosedDoctorToBeDeleted
}) => {
  const { doctorName, doctorSpeciality, doctorEmail, doctorImage } = doctor;
  return (
    <tr className="fs-4">
      <td className="shortenSize">
        <img
          src={`https://doctor-portal-server-kappa.vercel.app/image/doctor/${doctorImage}`}
          alt=""
          className="img-fluid    rounded-circle  "
        />
      </td>
      <td>{doctorName}</td>
      <td>{doctorSpeciality}</td>
      <td>{doctorEmail}</td>
      <td>
        <button
          onClick={() => modifyDoctorMethod(doctor)}
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          Modify
        </button>
      </td>
      <td>
        <button
        //  onClick={() => deleteDoctorMethod(doctor)}
          className="btn btn-danger"
          data-bs-toggle="modal" data-bs-target="#confirmModal"
          onClick={()=>choosedDoctorToBeDeleted(doctor)}
          
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ManageDoctorCard;
