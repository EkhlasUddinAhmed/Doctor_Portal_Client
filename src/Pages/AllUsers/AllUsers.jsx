import React, { useState } from "react";
import { useGetAllUsers, useMakeAdmin } from "../../hooks/useNewUser";
import AllUsersCard from "./AllUsersCard";

const AllUsers = () => {
  const { isLoading, isError, error, data } = useGetAllUsers();

  return (
    <div>
      <h3>Total Users :{data?.data.length}</h3>
      <div>
        <table className="table">
          <thead>
            <tr className="fs-4">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Admin</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user, index) => (
              <AllUsersCard key={user._id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
