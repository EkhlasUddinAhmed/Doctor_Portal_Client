import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";

const getAllTreatmentNameHandler = () => {
  return axios.get("https://doctor-portal-server-kappa.vercel.app/doctor/all");
};
export const useGetAllTreatmentName = () => {
  return useQuery({
    queryKey: ["Treatment-Name"],
    queryFn: getAllTreatmentNameHandler,
  });
};

const GetAllDoctorsMethod = () => {
  return axios.get("https://doctor-portal-server-kappa.vercel.app/doctor/all/doctors");
};
export const useGetAllDoctors = () => {
  return useQuery({
    queryKey: ["All-Doctors"],
    queryFn: GetAllDoctorsMethod,
  });
};

const getOneDoctorMethod = (doctorId) => {
  return axios.get(`https://doctor-portal-server-kappa.vercel.app/doctor/${doctorId}`);
};
export const useGetOneDoctor = (id) => {
  return useQuery({
    queryKey: ["Get-One-Doctor"],
    queryFn: (id) => getOneDoctorMethod(id),
    enabled: !!id,
  });
};

const formDataSendHandller = async (newUser) => {
  return await axios.post("https://doctor-portal-server-kappa.vercel.app/doctor/img", newUser, {
    headers: {
      authorization: `bearer ${localStorage.getItem("Token")}`,
    },
  });
};
export const useFormDataSend = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newUser) => formDataSendHandller(newUser),
    onSuccess: (data) => {
      console.log("From Success:", data);
      queryClient.invalidateQueries("All-Doctors");
    },
    onError: (error) => {
      alert(error.message);
    },
  });
};

const deleteDoctorMethod = (doctorID) => {
  return axios.delete(`https://doctor-portal-server-kappa.vercel.app/doctor/delete/${doctorID}`,{
    headers:{
      authorization:`bearer ${localStorage.getItem("Token")}`
  }
  });
};
export const useDeleteDoctor = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteDoctorMethod(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["All-Doctors"],
      });
    },
  });
};

const UpdateDoctorMethod = (obj, id) => {
  console.log("From UpdateDoctorMethod: id is:", id);
  console.log("From UpdateDoctorMethod: OBJ is:", obj);
  return axios.put(`https://doctor-portal-server-kappa.vercel.app/doctor/modify/${id}`, obj,{
    headers:{
      authorization:`bearer ${localStorage.getItem("Token")}`
  }
  });
};
export const useUpdateDoctor = (id) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (modifiedOBJ) => UpdateDoctorMethod(modifiedOBJ, id),
    enabled: !!id, // This enabled: !!id may not be given
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["All-Doctors"],
      });
    },
  });
};
