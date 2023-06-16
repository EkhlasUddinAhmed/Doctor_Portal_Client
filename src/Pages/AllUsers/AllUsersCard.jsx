import React from "react";
import { useDeleteUser, useMakeAdmin } from "../../hooks/useNewUser";

const AllUsersCard = ({ user, index }) => {
  const { newUserName, newUserEmail, newUserAdmin, _id } = user;
  const { mutate } = useMakeAdmin(_id);

  const makeUserAdminHandler = () => {
    // console.log("Info is:",info);
    console.log(
      `User :${newUserName} and Email:${newUserEmail} and Id is:${_id}`
    );
    const adminObj = { newUserAdmin: true };
    mutate(adminObj);
  };

  const { mutate: deleteUser } = useDeleteUser();
  const deleteUserMethod = () => {
    deleteUser(_id);
  };
  return (
    <tr className="fs-3">
      <th scope="row">{index + 1}</th>
      <td className="text-info">{newUserName}</td>
      <td className="text-info">{newUserEmail}</td>
      <td className="text-info">
        {newUserAdmin ? (
          <button className="btn btn-primary btn-sm">isAdmin</button>
        ) : (
          <button
            onClick={makeUserAdminHandler}
            className="btn btn-secondary btn-sm"
          >
            MakeAdmin
          </button>
        )}
      </td>
      <td className="text-info">
        <button onClick={deleteUserMethod} className="btn btn-danger btn-sm">
          Delete
        </button>
      </td>
    </tr>
  );
};

export default AllUsersCard;
