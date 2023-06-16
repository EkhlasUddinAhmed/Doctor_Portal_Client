import React, { useState } from "react";
import { useDeleteDoctor, useGetAllDoctors } from "../../../hooks/useDoctor";
import Spinner from "../../Spinner/Spinner";
import ManageDoctorCard from "./ManageDoctorCard";
import DoctorUpdateModal from "../../Reviews/DoctorUpdateModal";
import ConfirmModal from "../../Shared/ConfirmModal/ConfirmModal";

const ManageDoctor = () => {
  const { isLoading, isError, error, data } = useGetAllDoctors();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [expart,setExpart]=useState("");
  const [doctorId,setDoctorId]=useState("");
  const [selectedDoctor,setSelectedDoctor]=useState({})

  const { mutate: deleteDoctor } = useDeleteDoctor();

  const modifyDoctorMethod = (doctor) => {
    console.log("FRom  Manage Doctor", doctor._id);
    // setSelectedDoctor(doctor);
    setName(doctor.doctorName);
    setEmail(doctor.doctorEmail);
    setExpart(doctor.doctorSpeciality);
    setDoctorId(doctor._id);
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const deleteDoctorMethod = (doctor) => {
    console.log(doctor);
    setSelectedDoctor(doctor);
    deleteDoctor(doctor._id);
  };
const choosedDoctorToBeDeleted=(doctor)=>{
    console.log("fixedDoctorToBeDeleted:",doctor);
    setSelectedDoctor(doctor);
}


  return (
    <div>
      <h1>Total Doctor :{data?.data.length}</h1>
      <hr />
      <table className="table">
        <thead>
          <tr className="fs-4 text-muted">
            <th scope="col">Photo</th>
            <th scope="col">Name</th>
            <th scope="col">Speciality</th>
            <th scope="col">Email</th>
            <th scope="col">Modify</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {data?.data.map((doctor) => (
            <ManageDoctorCard
              key={doctor._id}
              doctor={doctor}
              deleteDoctorMethod={deleteDoctorMethod}
              modifyDoctorMethod={modifyDoctorMethod}
              choosedDoctorToBeDeleted={choosedDoctorToBeDeleted}
            />
          ))}
        </tbody>
      </table>
      <DoctorUpdateModal 
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      expart={expart}
      setExpart={setExpart}
      doctorId={doctorId}
      />

      <ConfirmModal 
        title={`WARNING MESSAGE !!!`}
        message={`If Confirm Delete !!! It can't be undone`}
        deleteDoctorMethod={deleteDoctorMethod}
        selectedDoctor={selectedDoctor}
        deleteDoctor={deleteDoctor}
      />
    </div>
  );
};

export default ManageDoctor;
