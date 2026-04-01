import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  LogIn, 
  AlertCircle,
  KeyRound
} from 'lucide-react';
import { selectCurrentUser, login, selectUserLoading, selectUserError } from '../features/users/usersSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [localError, setLocalError] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const currentUser = useSelector(selectCurrentUser);
    const isLoading = useSelector(selectUserLoading);
    const apiError = useSelector(selectUserError);
    
    const from = location.state?.from || '/';
    
    useEffect(() => {
        if (currentUser && currentUser.role !== 'guest') {
            const redirectPath = currentUser.role.includes('admin') ? '/admin/dashboard' : from;
            navigate(redirectPath, { replace: true });
        }
    }, [currentUser, navigate, from]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (localError) setLocalError(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setLocalError('Please fill in all fields');
            return;
        }

        try {
            // Hardcoded credentials for demo purposes based on previous implementation
            let userData = null;
            if (formData.email === 'admin@example.com' && formData.password === 'admin123') {
                userData = {
                    id: '1',
                    email: formData.email,
                    name: 'Admin User',
                    role: 'admin',
                    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
                };
            } else if (formData.email === 'superadmin@example.com' && formData.password === 'super123') {
                userData = {
                    id: '2',
                    email: formData.email,
                    name: 'Super Admin',
                    role: 'superadmin',
                    avatar: 'https://randomuser.me/api/portraits/women/1.jpg'
                };
            } else {
                // Regular user simulation
                userData = {
                    id: '100',
                    email: formData.email,
                    name: formData.email.split('@')[0],
                    role: 'user',
                    avatar: `https://ui-avatars.com/api/?name=${formData.email}`
                };
            }

            await dispatch(login(userData));
            toast.success(`Welcome back, ${userData.name}!`);
        } catch (err) {
            toast.error('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full -z-10 bg-gradient-to-br from-secondary/5 via-background to-primary/5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="glass p-8 md:p-12 rounded-[3.5rem] border border-white/20 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 p-8 opacity-5">
                      <LogIn className="h-40 w-40" />
                    </div>

                    <div className="space-y-8 relative z-10">
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, delay: 0.2 }}
                                className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-6"
                            >
                                <Lock className="h-8 w-8 text-white" />
                            </motion.div>
                            <h1 className="text-4xl font-bold tracking-tight">Login</h1>
                            <p className="text-muted-foreground">Access your premium account</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {(localError || apiError) && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="bg-destructive/10 text-destructive text-sm font-bold p-4 rounded-xl flex items-center gap-3 border border-destructive/20"
                                >
                                    <AlertCircle className="h-4 w-4" />
                                    {localError || apiError}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest ml-1 text-muted-foreground">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input 
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="h-14 pl-12 glass rounded-2xl border-none focus-visible:ring-primary/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between ml-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Password</label>
                                    <Link to="/forgot-password" size="sm" className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline">
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative group">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                    <Input 
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="h-14 pl-12 glass rounded-2xl border-none focus-visible:ring-primary/20"
                                    />
                                    <button 
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                disabled={isLoading}
                                className="w-full h-16 rounded-2xl bg-primary hover:bg-primary/9 shadow-xl shadow-primary/20 text-lg font-bold group"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="pt-8 text-center border-t border-white/10 space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Don't have an account yet?
                            </p>
                            <Button 
                                variant="outline" 
                                className="w-full h-14 rounded-2xl border-primary/20 hover:bg-primary/5 hover:text-primary glass font-bold"
                                onClick={() => navigate('/register')}
                            >
                                Create Premium Account
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
 