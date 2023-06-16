import { format } from "date-fns";
import React, { useState } from "react";
import useAvailavleTreatment from "../../../hooks/useAvailavleTreatment";
import AppointCard from "../AppointCard/AppointCard";
import BookingModal from "../../../BookingModal/BookingModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuthentication from "../../../hooks/useAuthentication";

const AvailableAppointment = ({ selectedDate }) => {
  const [slot, setSlot] = useState("");
  const [seletedTreatment, setSeletedTreatment] = useState({});
  const { activeUser } = useAuthentication();
  const email=activeUser?.email;
  const date = format(selectedDate, "PPPP");
  const { isLoading, data: allTreatment,refetch } = useAvailavleTreatment(date);

  const onSuccess = () => {
    toast("Your Booking Is Successful");
    
  };
  const onError = () => {
    toast("Your Booking FAILED!! Please retry Again carefully");
  };

  if (isLoading) {
    return <h1>Loading....</h1>;
  }

  const getSpecificTreatment = (treatment) => {
    // console.log("FRom getSpecificTreatment, Slots are:", treatment.slots[0]);

    setSeletedTreatment(treatment);
    setSlot(treatment.slots[0]);
  };

  return (
    <div>
      <h4 className="text-center text-primary">
        Available Treatment On: {format(selectedDate, "PPPP")}
      </h4>
      <div className="container">
        <div className="row ">
          {allTreatment?.data.map((treatment) => (
            <AppointCard
              key={treatment._id}
              treatment={treatment}
              getSpecificTreatment={getSpecificTreatment}
            />
          ))}
        </div>
        <BookingModal
          seletedTreatment={seletedTreatment}
          selectedDate={selectedDate}
          date={date}
          onSuccess={onSuccess}
          onError={onError}
          slot={slot}
          setSlot={setSlot}
          email={email}
          refetch={refetch}
        />
      </div>
    </div>
  );
};

export default AvailableAppointment;
