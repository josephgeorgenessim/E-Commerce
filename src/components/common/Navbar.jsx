import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setCurrentUser, selectCurrentUser, selectIsAuthenticated } from '../../features/users/usersSlice';
import { selectCartItemCount } from '../../features/cart/cartSlice';
import { selectWebsiteName } from '../../features/settings/settingsSlice';
import LogoutButton from './LogoutButton';
import {
  ShoppingCart,
  Search,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard
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
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';

const Navbar = ({ onCartClick }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItemCount = useSelector(selectCartItemCount);
  const websiteName = useSelector(selectWebsiteName);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add null check for currentUser
  const userRole = currentUser?.role || 'guest';
  const isAdmin = userRole === 'admin' || userRole === 'superadmin';

  const handleRoleChange = (role) => {
    dispatch(setCurrentUser({ ...currentUser, role }));
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Categories for menu
  const categories = [
    { name: 'Electronics', path: '/category/electronics' },
    { name: 'Clothing', path: '/category/clothing' },
    { name: 'Home & Kitchen', path: '/category/home' },
    { name: 'Books', path: '/category/books' },
    { name: 'Sports', path: '/category/sports' }
  ];

  // Main navigation tabs
  const navigationTabs = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Direct Products', path: '/direct-products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <div className="sticky top-0 z-40 w-full">

      {/* Main Navbar */}
      <header className="bg-white  border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src="/logo192.png" alt="Logo" className="h-8 w-8 mr-2" />
                <span className="text-xl font-bold tracking-tight">{websiteName}</span>
              </Link>
            </div>

            {/* Navigation Tabs - only for guests and regular users */}
            {!isAdmin && (
              <nav className="hidden md:flex items-center ml-10">
                <div className="flex space-x-1">
                  {navigationTabs.map((tab) => (
                    <Button
                      key={tab.name}
                      variant="ghost"
                      onClick={() => navigate(tab.path)}
                      className={`px-4 transition-colors duration-200 hover:bg-gray-100 hover:text-primary ${window.location.pathname === tab.path ? 'bg-gray-100 text-primary font-medium' : ''
                        }`}
                    >
                      {tab.name}
                    </Button>
                  ))}
                  <div className="relative">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="px-4 transition-colors duration-200 hover:bg-gray-100 hover:text-primary flex items-center gap-1"
                        >
                          Categories <ChevronDown className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {categories.map((category) => (
                          <DropdownMenuItem key={category.name} onSelect={() => handleNavigate(category.path)}>
                            {category.name}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </nav>
            )}

            {/* Admin Links - only for admin users */}
            {isAdmin && (
              <div className="hidden md:flex items-center">
                <Button
                  variant="ghost"
                  className="text-sm font-medium flex items-center gap-1"
                  onClick={() => navigate('/admin/dashboard')}
                >
                  <LayoutDashboard className="h-4 w-4 mr-1" />
                  Dashboard
                </Button>
              </div>
            )}

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-sm ml-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 w-full"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Show for all non-admin users */}
              {!isAdmin && (
                <>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/wishlist">
                      <Heart className="h-5 w-5" />
                    </Link>
                  </Button>

                  <Button variant="ghost" size="icon" onClick={onCartClick}>
                    <div className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartItemCount > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                          {cartItemCount}
                        </Badge>
                      )}
                    </div>
                  </Button>
                </>
              )}

              {/* User Menu or Login/Signup Buttons */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar>
                        <AvatarImage src={currentUser?.avatar} />
                        <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    {isAdmin ? (
                      <DropdownMenuItem onSelect={() => navigate('/admin/dashboard')}>
                        Dashboard
                      </DropdownMenuItem>
                    ) : (
                      <>
                        <DropdownMenuItem onSelect={() => navigate('/profile')}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => navigate('/orders')}>
                          My Orders
                        </DropdownMenuItem>
                      </>
                    )}

                    <DropdownMenuItem onSelect={() => navigate('/settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogoutButton variant="ghost" className="p-0 h-auto font-normal" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button size="sm" className="hidden md:inline-flex" asChild>
                    <Link to="/register">Sign up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container mx-auto px-4 py-3">
              <div className="mb-4">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full"
                />
              </div>

              <nav className="space-y-1">
                {navigationTabs.map((item) => (
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleNavigate(item.path)}
                  >
                    {item.name}
                  </Button>
                ))}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start text-left">
                      <div className="flex items-center justify-between w-full">
                        <span>Categories</span>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.name}
                        onSelect={() => handleNavigate(category.path)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {isAuthenticated ? (
                  isAdmin ? (
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-left"
                      onClick={() => handleNavigate('/admin/dashboard')}
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => handleNavigate('/profile')}
                      >
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Button>
                    </>
                  )
                ) : (
                  <div className="pt-4 flex flex-col space-y-2">
                    <Button onClick={() => handleNavigate('/login')}>
                      Log in
                    </Button>
                    <Button variant="outline" onClick={() => handleNavigate('/register')}>
                      Sign up
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar; 