import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/users/usersSlice';
import { Button } from '../ui/button';
import { LogOut } from 'lucide-react';

const LogoutButton = ({ variant = "default", size = "default", className = "" }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Button
            variant={variant}
            size={size}
            onClick={handleLogout}
            className={className}
        >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
        </Button>
    );
};

export default LogoutButton; 