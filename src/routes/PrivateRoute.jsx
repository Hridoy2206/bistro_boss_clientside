import React, { useContext } from 'react';
import { AuthContaxt } from '../provider/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContaxt);
    const location = useLocation();

    if (user) {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace />

};

export default PrivateRoute;