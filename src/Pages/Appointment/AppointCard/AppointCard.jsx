import React from "react";

const AppointCard = ({ treatment,getSpecificTreatment }) => {
  const { treatmentName, slots, price } = treatment;
  return (
    <div className="col-md-4 my-3">
      <div className="card border border-2 border-secondary rounded shadow-lg ">
        <div className="card-body ">
          <h3 className="card-title text-center text-primary">
            {treatmentName}
          </h3>
          <h5 className="card-subtitle my-2 text-body-secondary text-center ">
            {slots.length > 0 ? slots[0] : "Try Another Day"}
          </h5>
          <h5 className="text-center">
            {slots.length}
            <span className="ms-2">
              {slots.length > 1 ? "slots are " : "slot is "} available
            </span>
          </h5>
          <p className="card-text  text-muted fw-semibold fs-3 text-center">
            Price:{price} Tk
          </p>
          <div className="text-center">
            <button 
            onClick={()=>getSpecificTreatment(treatment)}
            className="btn btn-primary w-75   fs-5"
            data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              Booking Treatment
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointCard;
