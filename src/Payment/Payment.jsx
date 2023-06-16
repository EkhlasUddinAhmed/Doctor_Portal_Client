import React, { useState } from "react";
import { useSendOrder } from "../hooks/usePayment";
import { useNavigate } from "react-router-dom";

const Payment = () => {
 const[productName, setProductName] = useState("");
 const[productPrice, setProductPrice] = useState("");
 const[customerName, setCustomerName] = useState("");
 const[customerPhone, setCustomerPhone] = useState("");
 const navigate=useNavigate();
//  
 const {isLoading,isError,error,mutate,data}=useSendOrder();
//  if(isLoading){
//     return <h1>Loading....</h1>
//  }
//  if(isError){
//     return <h1>{error.message}</h1>
//  }
 if(data?.data){
    const url=data.data.url;
     console.log("Send Order is:",data.data);
  window.location.replace(url);
//    navigate(url,{replace:true});
 }
 
 const onSubmitHandling=(e)=>{
    e.preventDefault();
    const newOrder={
        productName,
        productPrice,
        customerName,
        customerPhone
    }

    console.log("New Order is:",newOrder);
    mutate(newOrder);
 }
  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <form onSubmit={onSubmitHandling}>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Product
                </label>
                <input type="text" className="form-control" 
                id="productName"
                value={productName}
                onChange={(e)=>setProductName(e.target.value)}
                
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productPrice" className="form-label">
                  Price
                </label>
                <input type="text" className="form-control" id="productPrice" 
                value={productPrice}
                onChange={(e)=>setProductPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerName" className="form-label">
                  Customer Name
                </label>
                <input type="text" className="form-control" id="customerName" 
                value={customerName}
                onChange={(e)=>setCustomerName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="customerPhone" className="form-label">
                  CustomerPhone
                </label>
                <input type="text" className="form-control" id="customerPhone"
                value={customerPhone}
                onChange={(e)=>setCustomerPhone(e.target.value)}
                
                />
              </div>
              <button type="submit" className="btn btn-primary">Pay</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
