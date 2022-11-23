import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider/AuthProvider';
import useAdmin from '../Hooks/useAdmin';
import Loader from '../Pages/Shared/loader/Loader';

const AdminRoute = ({ children }) => {
    const { user, loader, logOut } = useContext(AuthContext);
    const [isAdmin, adminLoading] = useAdmin(user?.email)
    const location = useLocation();

    if (loader || adminLoading) {
        return <Loader />
    }
    if (user && isAdmin) {
        return children;
    }
    else {
        return <Navigate to="/login" state={{ from: location }} replace ></Navigate >
    }
};

export default AdminRoute;