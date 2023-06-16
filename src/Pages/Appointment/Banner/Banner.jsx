import React from "react";
import { DayPicker } from "react-day-picker";
const Banner = ({selectedDate,setSelectedDate}) => {
    
  return (
    <div>
      <div className="continer">
        <div className="row justify-content-around">
          <div className="col-md-5">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
             
            />
          </div>
          <div className="col-md-5">
            <img
              src="https://www.shutterstock.com/image-photo/modern-dental-clinic-dentist-chair-260nw-1095937229.jpg"
              alt="Chair Image"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
