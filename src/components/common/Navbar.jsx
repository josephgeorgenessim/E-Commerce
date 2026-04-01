import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { setCurrentUser, selectCurrentUser, selectIsAuthenticated } from '../../features/users/usersSlice';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import { selectWebsiteName } from '../../features/settings/settingsSlice';
import LogoutButton from './LogoutButton';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings
} from 'lucide-react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';

const Navbar = ({ onCartClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = useSelector(selectCartItemCount);
  const websiteName = useSelector(selectWebsiteName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const userRole = currentUser?.role || 'guest';
  const isAdmin = userRole === 'admin' || userRole === 'superadmin';

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navigationTabs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const categories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Fashion', path: '/category/fashion' },
    { name: 'Home', path: '/category/home' },
    { name: 'Lifestyle', path: '/category/lifestyle' }
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'h-16 glass premium-shadow' : 'h-20 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 h-full">
        <div className="flex h-full items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative h-10 w-10 mr-3 overflow-hidden rounded-xl bg-primary flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-primary/20">
              <ShoppingCart className="text-white h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-gradient hidden sm:block">
              {websiteName || 'ShopSphere'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isAdmin && (
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg hover:bg-primary/10 hover:text-primary ${
                    location.pathname === tab.path ? 'bg-primary/10 text-primary' : 'text-foreground/70'
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-4 py-2 text-sm font-medium text-foreground/70 transition-all duration-200 rounded-lg hover:bg-primary/10 hover:text-primary flex items-center gap-1 group">
                    Categories 
                    <ChevronDown className="h-4 w-4 transform group-data-[state=open]:rotate-180 transition-transform duration-200" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 glass">
                  {categories.map((category) => (
                    <DropdownMenuItem 
                      key={category.name} 
                      onSelect={() => handleNavigate(category.path)}
                      className="cursor-pointer"
                    >
                      {category.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          )}

          {/* Search Box */}
          <div className="hidden md:flex flex-1 max-w-md relative">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-4 h-10 w-full bg-muted/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all rounded-xl"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {!isAdmin && (
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10 hover:text-primary relative hidden sm:flex" asChild>
                  <Link to="/wishlist">
                    <Heart className="h-5 w-5" />
                  </Link>
                </Button>

                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={onCartClick}
                  className="rounded-full hover:bg-primary/10 hover:text-primary relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1"
                    >
                      <Badge className="h-5 min-w-[20px] px-1 flex items-center justify-center bg-primary text-primary-foreground border-2 border-background">
                        {cartItemCount}
                      </Badge>
                    </motion.div>
                  )}
                </Button>
              </div>
            )}

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="pl-1 pr-2 gap-2 h-10 rounded-full hover:bg-muted transition-colors">
                    <Avatar className="h-8 w-8 border border-border">
                      <AvatarImage src={currentUser?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                        {getInitials(currentUser?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium hidden sm:inline-block max-w-[100px] truncate">
                      {currentUser?.name}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 glass mt-2">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  
                  {isAdmin ? (
                    <DropdownMenuItem onSelect={() => navigate('/admin/dashboard')}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  ) : (
                    <>
                      <DropdownMenuItem onSelect={() => navigate('/profile')}>
                        <User className="mr-2 h-4 w-4" />
                        Profile Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => navigate('/orders')}>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        My Orders
                      </DropdownMenuItem>
                    </>
                  )}
                  
                  <DropdownMenuItem onSelect={() => navigate('/settings')}>
                    <Settings className="mr-2 h-4 w-4" />
                    General Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive focus:text-destructive p-0">
                    <LogoutButton variant="ghost" className="w-full justify-start px-2 py-1.5 h-auto font-normal hover:bg-destructive/10">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </LogoutButton>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl hidden sm:flex" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
                <Button size="sm" className="rounded-xl px-5 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </div>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 h-12 bg-muted/50 border-none rounded-xl"
                />
              </div>

              <nav className="flex flex-col space-y-2">
                {navigationTabs.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className={`w-full justify-start h-12 rounded-xl text-lg ${
                      location.pathname === item.path ? 'bg-primary/10 text-primary' : ''
                    }`}
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.name}
                  </Button>
                ))}

                <div className="pt-4 pb-2">
                  <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant="soft"
                        className="justify-start bg-muted/30 hover:bg-muted"
                        onClick={() => handleNavigate(category.path)}
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {!isAuthenticated && (
                  <div className="pt-4 flex flex-col gap-3">
                    <Button variant="outline" className="w-full h-12 rounded-xl" onClick={() => handleNavigate('/login')}>
                      Log In
                    </Button>
                    <Button className="w-full h-12 rounded-xl bg-primary" onClick={() => handleNavigate('/register')}>
                      Create Account
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;