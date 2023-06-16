import React from "react";

const DoctorCard = ({ doctor,deleteDoctorMethod,modifyDoctorMethod }) => {
  const { doctorName, doctorEmail, doctorSpeciality, doctorImage,_id } = doctor;
  return (
    <div className="col-12">
      <div className="card mb-3 w-50">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://doctor-portal-server-kappa.vercel.app/image/doctor/${doctorImage}`}
              className="img-fluid rounded-start"
              alt="..."
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{doctorName}</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-body-secondary">{doctorEmail}</small>
              </p>
              <p className="card-text">
                <small className="text-body-secondary">
                  {doctorSpeciality}
                </small>
              </p>
              <button  
              onClick={()=>modifyDoctorMethod(doctor)}
              className="btn btn-primary me-4"
              data-bs-toggle="modal" data-bs-target="#staticBackdrop"
              >Modify</button>
              
              <button  
               onClick={()=>deleteDoctorMethod(doctor)}
              className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
