import axios from "axios";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
// Getting All Booking Starting Here....
const getAllBookingTreatmentHandler=async ({queryKey})=>{
    const email=queryKey[1];
    return await axios.get(`https://doctor-portal-server-kappa.vercel.app/booking/treatment?email=${email}`,{
        headers:{
            authorization:`bearer ${localStorage.getItem("Token")}`
        }
    })
}



export const useBookingTreatment = (email) => {
      return useQuery({
        queryKey:["All-Booking",email],
        queryFn:getAllBookingTreatmentHandler
        
        
      });
};
// Getting All Booking Ending Here....





 // Posting  A new Booking Starting Here.... 
const newBookingTreatmentHandler=async(newBookingOBJ)=>{
    return await axios.post(`https://doctor-portal-server-kappa.vercel.app/booking/treatment`,newBookingOBJ)
}
export const useNewBookingTreatment = ({onSuccess,onError}) => {
    
    return useMutation(
        {
            mutationFn:(newBookingOBJ)=>newBookingTreatmentHandler(newBookingOBJ),
            onSuccess:onSuccess,
            onError:onError
            }
    )
        
            
       
    };

// Posting  A new Booking Ending Here.... 


const deleteBookingMethod=async(bookingId)=>{
   
    return await axios.delete(`https://doctor-portal-server-kappa.vercel.app/booking/treatment/${bookingId}`)
}
export const useDeleteBooking=()=>{  
    const queryClient=useQueryClient();
    return useMutation({
        mutationFn:(bookingId)=>deleteBookingMethod(bookingId),
        onSuccess:()=>{
            queryClient.invalidateQueries("All-Booking")
        }
    })
}


