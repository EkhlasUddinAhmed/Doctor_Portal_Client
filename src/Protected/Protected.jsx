import React from 'react';
import useAuthentication from '../hooks/useAuthentication';
import Spinner from '../Pages/Spinner/Spinner';
import { Navigate, useLocation } from 'react-router-dom';

const Protected = ({children}) => {
    const {activeUser,isLoading}=useAuthentication();
    const location=useLocation();

    if(isLoading){
        return <Spinner/> 
    }

    if(activeUser?.email){
        return children
    }
    return <Navigate to="/login" replace state={{from:location}}></Navigate>
    
};

export default Protected;