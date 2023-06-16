import axios from "axios";
import { useQuery } from "react-query";

const getAllTreatment=async ({queryKey})=>{
   const date=queryKey[1];
  // console.log("FRom getTreatmentMethods: date is:",date);
    return await axios.get(`https://doctor-portal-server-kappa.vercel.app/teeth/availabletreatment?date=${date}`);
}
const useAvailavleTreatment = (date) => {
    return useQuery({
        queryKey:["All-Available-Treatment",date],
        queryFn:getAllTreatment,
        onSuccess:()=>{
          // console.log("All Availavle Treatment Got Successfully");
        },
        onError:(error)=>{
            console.log("Error inGetting All Available Treatment:",error.message);
          }
    })
};

export default useAvailavleTreatment;