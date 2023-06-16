import axios from "axios";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

const createNewUserFunction = async (newUserOBJ) => {
  return await axios.post("https://doctor-portal-server-kappa.vercel.app/new/user", newUserOBJ);
};

export const useCreateNewUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUserOBJ) => createNewUserFunction(newUserOBJ),
    onSuccess: (data) => {
      console.log("From useCreateNewUser, new user is", data);
      queryClient.invalidateQueries("All-Users");
    },
  });
};

const getAllUsersMethod = () => {
  return axios.get("https://doctor-portal-server-kappa.vercel.app/new/user", {
    headers: {
      authorization: `bearer ${localStorage.getItem("Token")}`,
    },
  });
};

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["All-Users"],
    queryFn: getAllUsersMethod,
  });
};

const makeUserAdmin = (id, adminObj) => {
  console.log("From Make User Admin Method,id is:", id);
  return axios.put(`https://doctor-portal-server-kappa.vercel.app/new/admin/${id}`, adminObj, {
    headers: {
      authorization: `bearer ${localStorage.getItem("Token")}`,
    },
  });
};
export const useMakeAdmin = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (obj) => makeUserAdmin(id, obj),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["All-Users"],
      });
    },
  });
};

const checkUserAdminHandler = ({queryKey}) => {
  const email=queryKey[1];
  console.log("From CheckUserAdminHandler, Email Sent:", email);
  return axios.get(`https://doctor-portal-server-kappa.vercel.app/new/checkAdmin?email=${email}`);
};
export const useCheckUserAdmin = (email) => {
  return useQuery({
    queryKey: ["Check-Admin",email],
    queryFn:checkUserAdminHandler,
    enabled: !!email,
  });
};

const deleteUserMethod = (id) => {
  return axios.delete(`https://doctor-portal-server-kappa.vercel.app/new/user/${id}`);
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserMethod,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["All-Users"],
      });
    },
  });
};
