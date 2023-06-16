import React, { useState } from "react";
import Banner from "./Banner/Banner";
import AvailableAppointment from "./AvailableAppointment/AvailableAppointment";
import { format } from "date-fns";
import BookingModal from "../../BookingModal/BookingModal";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Appointment = () => {
  let [selectedDate, setSelectedDate] = useState(new Date());

  
  return (
    <div>
      <Banner
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      ></Banner>
      <AvailableAppointment selectedDate={selectedDate}
        
       />
    </div>
  );
};

export default Appointment;
