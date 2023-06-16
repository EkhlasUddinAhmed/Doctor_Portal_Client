import React from "react";
import { useGetAllUsers } from "../../../hooks/useNewUser";

const Home = () => {
  const deleteAllUserMethod = () => {
    fetch("https://doctor-portal-server-kappa.vercel.app/new/alluser", {
      method: "DELETE",
    });
  };

  return (
    <div>
      <h1>This is Home Page</h1>
      <button onClick={deleteAllUserMethod} className="btn btn-danger">
        Delete All Users
      </button>
    </div>
  );
};

export default Home;
