import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

// const useCreateToken = (email) => {
//   const [token,setToken]=useState("");

//   useEffect(() => {
//     if(email){
//       fetch(`https://doctor-portal-server-kappa.vercel.app/new/jwt?email=${email}`)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("FRom UseEffect, Token is:",data);
//         localStorage.setItem("Token",data?.token)
//         setToken(data?.token);
//       });
//     }
//   }, [email]);

//   return {
//     token
//   }
// };

const createToken=async({queryKey})=>{
  const email=queryKey[1];
  if(email){
    console.log("From Create Token: Email is",email);
  return await axios.get(`https://doctor-portal-server-kappa.vercel.app/new/jwt?email=${email}`)
  }
}
const useCreateToken=(email)=>{
  
  return useQuery({
    queryKey:["Token",email],
    queryFn:createToken,
    onSuccess:(data)=>{
       console.log("from On Success, token is:",data);
    },
    refetchOnMount:true,
    refetchOnWindowFocus:true,
    enabled:!!email
    
  })


}
export default useCreateToken;
