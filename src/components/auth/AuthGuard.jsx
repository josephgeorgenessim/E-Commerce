import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { selectCurrentUser } from '../../features/users/usersSlice';

// Routes that should only be accessible to authenticated users
const PROTECTED_ROUTES = ['/admin', '/admin/dashboard', '/admin/products', '/admin/orders', '/admin/settings'];

// Routes that should only be accessible to non-authenticated users
const AUTH_ROUTES = ['/login', '/register'];

const AuthGuard = ({ children }) => {
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    const location = useLocation();
    const isAuthenticated = currentUser && currentUser.role !== 'guest';
    const isAdmin = isAuthenticated && currentUser.role === 'admin';
    const currentPath = location.pathname;

    useEffect(() => {
        // If user is not authenticated and tries to access protected route
        if (!isAuthenticated && PROTECTED_ROUTES.some(route => currentPath.startsWith(route))) {
            navigate('/login', { state: { from: currentPath } });
        }

        // If user is authenticated and tries to access auth routes
        if (isAuthenticated && AUTH_ROUTES.includes(currentPath)) {
            // Redirect based on role
            if (isAdmin) {
                navigate('/admin/dashboard');
            } else {
                navigate('/');
            }
        }

        // If admin user is at root, redirect to admin dashboard
        if (isAdmin && currentPath === '/') {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, isAdmin, currentPath, navigate]);

    return children;
};

export default AuthGuard; 