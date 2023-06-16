import React from "react";
import {
  useBookingTreatment,
  useDeleteBooking,
} from "../../hooks/useBookingTreatment";
import Spinner from "../Spinner/Spinner";
import { format } from "date-fns";
import BookingTableCard from "../BookingTableCard/BookingTableCard";
import useAuthentication from "../../hooks/useAuthentication";

const Dashboard = () => {
    const {activeUser}=useAuthentication();
  const { mutate: deleteBooking } = useDeleteBooking();
  const { isLoading, isError, error, data, refetch } = useBookingTreatment(activeUser?.email);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (isError) {
    return <>
          <h2 className="text-center text-danger">Something Wrong...</h2>
          <h3 className="text-danger text-center">Please Logout and Singin Again</h3>
    </>
  }

  const deleteBookinghandler = (bookingId) => {
    deleteBooking(bookingId);
  };

  return (
    <div className="p-3">
      <h3 className="text-success my-3">My Appointment:{data?.data.length}</h3>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th scope="col">SN</th>
            <th scope="col">Treatment</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            
            <th scope="col">Cancel</th>
          </tr>
        </thead>
        <tbody>
          {
            data?.data?.map((booking,index)=><BookingTableCard
              key={index}
              booking={booking}
              index={index}
            
            />)
          }
          
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
