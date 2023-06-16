import React, { useState } from "react";
import {
  useDeleteDoctor,
  useFormDataSend,
  useGetAllDoctors,
  useUpdateDoctor,
} from "../../hooks/useDoctor";
import DoctorCard from "./DoctorCard";
import DoctorUpdateModal from "./DoctorUpdateModal";

const Reviews = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState({});
  const { isLoading: isUpdateLoading, data: updateDoctor } = useUpdateDoctor();
  const { mutate } = useFormDataSend();
  const { isLoading, isError, error, data } = useGetAllDoctors();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [expart,setExpart]=useState("");
  const [doctorId,setDoctorId]=useState("");
  const { mutate: deleteDoctor } = useDeleteDoctor();

  if (isLoading || isUpdateLoading) {
    return <h1>Loading....</h1>;
  }
  if (isError) {
    return <h1>{error}</h1>;
  }

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("doctorName", userName);
    formData.append("doctorEmail", userEmail);
    formData.append("doctorSpeciality", speciality);
    formData.append("doctorImage", userImage);

    mutate(formData);
  };

  const deleteDoctorMethod = (doctor) => {
    console.log(doctor);
    deleteDoctor(doctor._id);
  };
  const modifyDoctorMethod = (doctor) => {
    console.log("FRom Review, id is ",doctor._id);
    // setSelectedDoctor(doctor);
    setName(doctor.doctorName);
    setEmail(doctor.doctorEmail);
    setExpart(doctor.doctorSpeciality);
    setDoctorId(doctor._id)
  };

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                  }}
                  type="text"
                  className="form-control"
                  id="name"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                  Email
                </label>
                <input
                  value={userEmail}
                  onChange={(e) => {
                    setUserEmail(e.target.value);
                  }}
                  type="email"
                  className="form-control"
                  id="Email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="Speciality" className="form-label">
                  Speciality
                </label>
                <select
                  value={speciality}
                  onChange={(e) => setSpeciality(e.target.value)}
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="Heart">Heart</option>
                  <option value="Liver">Liver</option>
                  <option value="Kidney">Kidney</option>
                  <option value="Neurology">Neurology</option>
                </select>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  name="doctorImage"
                  // value={userImage}
                  onChange={(e) => setUserImage(e.target.files[0])}
                />
              </div>

              <button onClick={formSubmitHandler} className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row justify-content-center">
          {data?.data.map((doctor) => (
            <DoctorCard
              key={doctor._id}
              doctor={doctor}
              deleteDoctorMethod={deleteDoctorMethod}
              modifyDoctorMethod={modifyDoctorMethod}
              doctorId={doctorId}
            />
          ))}
        </div>
      </div>
      <DoctorUpdateModal selectedDoctor={selectedDoctor}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      expart={expart}
      setExpart={setExpart}
      doctorId={doctorId}
      />
      
    </div>
  );
};

export default Reviews;
