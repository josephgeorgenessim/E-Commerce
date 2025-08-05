import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Navigate } from 'react-router-dom';
import { selectCurrentUser } from '../../features/users/usersSlice';

// RoleGuard component that controls access to routes based on user role
const RoleGuard = ({
    children,
    allowedRoles = [],
    redirectPath = '/'
}) => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();

    // Add null check for currentUser and get the role
    const userRole = currentUser?.role || 'guest';

    // Check if the current user's role is in the allowed roles
    const isAuthorized = allowedRoles.includes(userRole);


    useEffect(() => {
        // Redirect based on roles
        if (!isAuthorized) {
            console.log('Redirecting to:', redirectPath);
            navigate(redirectPath, { replace: true });
        }
    }, [userRole, isAuthorized, navigate, redirectPath]);

    // If not authorized, redirect to the specified path
    if (!isAuthorized) {
        return <Navigate to={redirectPath} replace />;
    }

    // If authorized, render the children
    return children;
};

export default RoleGuard;