import { format } from "date-fns";
import React, { useState } from "react";
import useAuthentication from "../hooks/useAuthentication";
import { useNewBookingTreatment } from "../hooks/useBookingTreatment";

const BookingModal = ({ seletedTreatment,date,onSuccess,onError,slot,setSlot,email,refetch }) => {
  const { treatmentName, slots } = seletedTreatment;
  
 
  const { mutate: newBookingTreatment } = useNewBookingTreatment({onSuccess,onError});

  const [name, setName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  
  const saveBookingHandler = (e) => {
    e.preventDefault();
    const newBooking = {
      treatmentName,
      selectedSlot: slot,
      selectedDate: date,
      patientName: name,
      patientEmail: email,
      patientPhone: phoneNo
    };

    newBookingTreatment(newBooking);
    setName(""), setPhoneNo("");
    setSlot("");
     refetch();
   
  };

  return (
    <>
      <div
        className="modal fade"
        id="bookingModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog fs-5">
          <div className="modal-content">
            <div className="modal-header">
              <h1
                className="modal-title fs-2 text-primary "
                id="staticBackdropLabel"
              >
                {treatmentName}
              </h1>
              <button
                type="button"
                className="btn-close shadow"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date Selected
                  </label>
                  <input
                    value={date}
                    // onChange={(e)=>setFormatedDate(e.target.value)}
                   
                    type="text"
                    className="form-control fs-3"
                    disabled
                    id="date"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="slot" className="form-label">
                    Select Slot
                  </label>
                  <select
                    value={slot}
                    onChange={(e) => setSlot(e.target.value)}
                    name="slot"
                    className="form-select fs-4"
                  >
                    {/* <option >{slots && slots[0]}</option> */}
                    {slots?.map((slot) => {
                      return (
                        <option 
                        key={Math.random()}
                        className="fs-3 text-muted" 
                        value={slot}>
                          {slot}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control fs-4"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control fs-4"
                    id="phone"
                    name="phoneNo"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control fs-4"
                    id="email"
                    value={email}
                    disabled
                  />
                </div>
                <button
                  onClick={saveBookingHandler}
                  type="button"
                  className="btn btn-secondary btn-lg w-100"
                  data-bs-dismiss="modal"
                >
                  Save Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingModal;
