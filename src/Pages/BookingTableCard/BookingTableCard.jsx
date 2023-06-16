import React from 'react';

const BookingTableCard = ({booking,index}) => {
    const {treatmentName,selectedDate,selectedSlot}=booking;
    return (
        <tr className='fs-4'>
            <th scope="row">{index+1}</th>
            <td >{treatmentName}</td>
            <td>{selectedDate}</td>
            <td>{selectedSlot}</td>
            <td><button className='btn btn-danger btn-sm'>Cancel</button></td>
          </tr>
    );
};

export default BookingTableCard;