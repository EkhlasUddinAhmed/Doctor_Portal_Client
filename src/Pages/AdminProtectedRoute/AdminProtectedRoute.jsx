import React from 'react';
import useAuthentication from '../../hooks/useAuthentication';
import Spinner from '../Spinner/Spinner';
import { useCheckUserAdmin } from '../../hooks/useNewUser';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({children}) => {
    
    const {isLoading,activeUser,}=useAuthentication();
     const {isLoading:adminIsLoading,data}=useCheckUserAdmin(activeUser?.email);

    if(isLoading || adminIsLoading){
        return <Spinner></Spinner>
    }

    if(activeUser.email && data?.data.isAdmin){
        return children;
    }
    return <Navigate to="/" replace></Navigate>
};

export default AdminProtectedRoute;