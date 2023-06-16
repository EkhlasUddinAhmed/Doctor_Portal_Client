import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackToHomeButton = () => {
 const navigate=useNavigate();
   const backToHomeMethod=()=>{
       navigate('/',{replace:true});
   }

    return (
        <button 
         onClick={backToHomeMethod}
        className='btn btn-primary'>Back To Home page</button>
    );
};

export default BackToHomeButton;