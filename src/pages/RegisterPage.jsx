import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    TextField,
    Button,
    Link,
    Paper,
    InputAdornment,
    IconButton,
} from '@mui/material';
import {
    Email,
    Lock,
    Visibility,
    VisibilityOff,
} from '@mui/icons-material';
import { register } from '../features/user/userSlice';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

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

    const validate = () => {
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

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // Create a user object to dispatch
            const userData = {
                id: Math.floor(Math.random() * 1000).toString(),
                email: formData.email,
                password: formData.password, // In a real app, never send plain text password
                role: 'user',
                joinDate: new Date().toISOString()
            };

            dispatch(register(userData));
            navigate('/');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={3} sx={{ p: 4 }}>
                <Box textAlign="center" mb={4}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Create an Account
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Join ShopSphere with just your email
                    </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        variant="outlined"
                        margin="normal"
                        value={formData.email}
                        onChange={handleChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={formData.password}
                        onChange={handleChange}
                        error={Boolean(errors.password)}
                        helperText={errors.password}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="action" />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        margin="normal"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={Boolean(errors.confirmPassword)}
                        helperText={errors.confirmPassword}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock color="action" />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                        >
                            Register
                        </Button>
                    </Box>
                </form>

                <Box textAlign="center" mt={3}>
                    <Typography variant="body2">
                        Already have an account?{' '}
                        <Link component={RouterLink} to="/login" variant="body2">
                            Sign in
                        </Link>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default RegisterPage; 