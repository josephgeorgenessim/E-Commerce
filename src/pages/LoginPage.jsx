import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { selectCurrentUser, login } from '../features/users/usersSlice';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const currentUser = useSelector(selectCurrentUser);
    const from = location.state?.from || '/';
    
    // If user is already logged in, redirect to appropriate page
    useEffect(() => {
        if (currentUser && currentUser.role !== 'guest') {
            if (currentUser.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (currentUser.role === 'superadmin') {
                navigate('/superadmin');
            } else {
                navigate('/');
            }
        }
    }, [currentUser, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Hardcoded credentials for demo purposes
            if (
                (formData.email === 'admin@example.com' && formData.password === 'admin123') ||
                (formData.email === 'superadmin@example.com' && formData.password === 'super123')
            ) {
                const role = formData.email === 'superadmin@example.com' ? 'superadmin' : 'admin';
                const userData = {
                    id: role === 'superadmin' ? '2' : '1',
                    email: formData.email,
                    name: role === 'superadmin' ? 'Super Admin' : 'Admin User',
                    role: role,
                    avatar: `https://randomuser.me/api/portraits/${role === 'superadmin' ? 'women' : 'men'}/1.jpg`
                };

                dispatch(login(userData));

                // Redirect to the appropriate dashboard based on role
                if (role === 'superadmin') {
                    navigate('/superadmin');
                } else if (role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate(from);
                }
            } else {
                // Mock API error
                setErrorMessage('Invalid email or password');
                setShowError(true);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to continue to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {showError && (
                        <div className="bg-destructive/15 text-destructive px-4 py-3 rounded-md flex items-center mb-4">
                            <AlertCircle className="h-4 w-4 mr-2" />
                            {errorMessage}
                        </div>
                    )}
                
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                                    placeholder="Email Address"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <Input
                                    className={`pl-10 ${errors.password ? 'border-destructive' : ''}`}
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <div 
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-muted-foreground" />
                                    )}
                                </div>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-destructive">{errors.password}</p>
                            )}
                        </div>
                        
                        <div className="text-right">
                            <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                    </form>
                    
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-muted"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">Or</span>
                        </div>
                    </div>
                    
                    
                </CardContent>
                <CardFooter className="flex justify-center">
                    <p className="text-sm text-center text-muted-foreground">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-primary hover:underline">
                            Sign up
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
};

export default LoginPage; 