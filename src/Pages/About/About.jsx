import React from "react";
import {
  useBookingTreatment,
  useDeleteBooking,
} from "../../hooks/useBookingTreatment";
import Spinner from "../Spinner/Spinner";
import { format } from "date-fns";
import useAuthentication from "../../hooks/useAuthentication";

const About = () => {
  const { activeUser } = useAuthentication();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { isLoading, isError, error, data, refetch } = useBookingTreatment(
    activeUser?.email
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <h2 className="text-center text-danger">{error.message}</h2>;
  }

  const deleteBookinghandler = (bookingId) => {
    deleteBooking(bookingId);
  };

  return (
    <div>
      <h1>No Of Bookings:{data?.data.length}</h1>
      {data?.data.map((b) => (
        <div className="grid text-center"  key={b._id}>
          <div
           
            className="border border-2 border-danger my-3 w-25 g-col-4"
          >
            <h1>{b.treatmentName}</h1>
            <h3>{b.selectedSlot}</h3>
            <h3>{b.selectedDate}</h3>
            <h3>{b.patientEmail}</h3>
            <button
              onClick={() => deleteBookinghandler(b._id)}
              className="btn btn-danger my-3 ms-2"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default About;
