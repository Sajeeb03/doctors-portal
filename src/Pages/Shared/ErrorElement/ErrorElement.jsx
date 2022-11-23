import React, { useContext } from 'react';
import { Link, useRouteError } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';

const ErrorElement = () => {
    const error = useRouteError();
    const { logOut } = useContext(AuthContext);
    const handleLogOut = async () => {
        try {
            const res = await logOut();
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold text-red-500">Something went wrong!</h2>
            <p>{error.statusText || error.message}</p>
            <h2 className="text-2xl">Please <Link to="/login" onClick={handleLogOut}>Sign Out</Link> and log back in!</h2>
        </div>
    );
};

export default ErrorElement;