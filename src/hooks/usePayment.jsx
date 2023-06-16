import axios from "axios";
import { useMutation } from "react-query";

const sendOrderMethod = (newOrder) => {
  return axios.post("https://doctor-portal-server-kappa.vercel.app/payment/order", newOrder);
};

export const useSendOrder = () => {
  return useMutation({
    mutationFn: sendOrderMethod,
  });
};
