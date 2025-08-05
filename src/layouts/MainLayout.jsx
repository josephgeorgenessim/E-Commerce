import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    AppBar, Toolbar, Typography, Button, Badge, IconButton,
    Container, Box, Drawer, List, ListItem, ListItemIcon,
    ListItemText, Divider, Menu, MenuItem, Avatar, useMediaQuery,
    useTheme
} from '@mui/material';
import {
    Menu as MenuIcon,
    ShoppingCart as ShoppingCartIcon,
    Person as PersonIcon,
    Search as SearchIcon,
    Home as HomeIcon,
    Category as CategoryIcon,
    Info as InfoIcon,
    Phone as PhoneIcon,
    Logout as LogoutIcon,
    Login as LoginIcon,
    Dashboard as DashboardIcon
} from '@mui/icons-material';
import { selectCartItemCount } from '../features/cart/cartSlice.jsx';
import { selectCurrentUser } from '../features/users/usersSlice.jsx';
import { selectWebsiteName } from '../features/settings/settingsSlice.jsx';

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const currentUser = useSelector(selectCurrentUser);
    const cartItemCount = useSelector(selectCartItemCount);
    const websiteName = useSelector(selectWebsiteName);

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuAnchor, setUserMenuAnchor] = useState(null);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleUserMenuClick = (event) => {
        setUserMenuAnchor(event.currentTarget);
    };

    const handleUserMenuClose = () => {
        setUserMenuAnchor(null);
    };

    const navigateTo = (path) => {
        navigate(path);
        setMobileMenuOpen(false);
        handleUserMenuClose();
    };

    // Determine if user should see admin dashboard link
    const showAdminLink = currentUser && currentUser.role !== 'guest';
    const adminPath = currentUser && currentUser.role === 'superadmin' ? '/superadmin' : '/admin';

    const mainMenuItems = [
        { text: 'Home', icon: <HomeIcon />, path: '/' },
        { text: 'Products', icon: <CategoryIcon />, path: '/products' },
        { text: 'About Us', icon: <InfoIcon />, path: '/about' },
        { text: 'Contact', icon: <PhoneIcon />, path: '/contact' },
    ];

    const userMenuItems = currentUser && currentUser.role !== 'guest' ? [
        { text: 'Dashboard', icon: <DashboardIcon />, path: adminPath },
        { text: 'Logout', icon: <LogoutIcon />, path: '/logout' }
    ] : [
        { text: 'Login', icon: <LoginIcon />, path: '/login' },
        { text: 'Register', icon: <PersonIcon />, path: '/register' }
    ];

    return (
        <>
            <AppBar position="sticky" elevation={0} className="border-b bg-white text-black">
                <Toolbar>
                    {isMobile && (
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={toggleMobileMenu}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography
                        variant="h6"
                        component="div"
                        className="font-bold cursor-pointer"
                        onClick={() => navigateTo('/')}
                        sx={{ flexGrow: isMobile ? 0 : 1 }}
                    >
                        {websiteName}
                    </Typography>

                    {!isMobile && (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                            {mainMenuItems.map((item) => (
                                <Button
                                    key={item.text}
                                    onClick={() => navigateTo(item.path)}
                                    sx={{ mx: 1 }}
                                    color="inherit"
                                >
                                    {item.text}
                                </Button>
                            ))}
                        </Box>
                    )}

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            color="inherit"
                            aria-label="search"
                            onClick={() => navigateTo('/products')}
                        >
                            <SearchIcon />
                        </IconButton>

                        <IconButton
                            color="inherit"
                            aria-label="cart"
                            onClick={() => navigateTo('/cart')}
                        >
                            <Badge badgeContent={cartItemCount} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        <IconButton
                            color="inherit"
                            aria-label="account"
                            onClick={handleUserMenuClick}
                        >
                            {currentUser && currentUser.role !== 'guest' ? (
                                <Avatar
                                    alt={currentUser.name}
                                    src={currentUser.avatar || ''}
                                    sx={{ width: 32, height: 32 }}
                                />
                            ) : (
                                <PersonIcon />
                            )}
                        </IconButton>

                        <Menu
                            anchorEl={userMenuAnchor}
                            open={Boolean(userMenuAnchor)}
                            onClose={handleUserMenuClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                        >
                            {currentUser && currentUser.role !== 'guest' && (
                                <Box sx={{ px: 2, py: 1 }}>
                                    <Typography variant="subtitle1">{currentUser.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {currentUser.email}
                                    </Typography>
                                    <Divider sx={{ my: 1 }} />
                                </Box>
                            )}

                            {userMenuItems.map((item) => (
                                <MenuItem
                                    key={item.text}
                                    onClick={() => navigateTo(item.path)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Mobile drawer menu */}
            <Drawer
                anchor="left"
                open={mobileMenuOpen}
                onClose={toggleMobileMenu}
            >
                <Box sx={{ width: 250 }} role="presentation">
                    <List>
                        <ListItem>
                            <Typography variant="h6" className="font-bold">
                                {websiteName}
                            </Typography>
                        </ListItem>
                        <Divider />

                        {mainMenuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigateTo(item.path)}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}

                        <Divider />

                        {showAdminLink && (
                            <ListItem
                                button
                                onClick={() => navigateTo(adminPath)}
                            >
                                <ListItemIcon><DashboardIcon /></ListItemIcon>
                                <ListItemText primary="Dashboard" />
                            </ListItem>
                        )}

                        {currentUser && currentUser.role !== 'guest' ? (
                            <ListItem
                                button
                                onClick={() => navigateTo('/logout')}
                            >
                                <ListItemIcon><LogoutIcon /></ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItem>
                        ) : (
                            <>
                                <ListItem
                                    button
                                    onClick={() => navigateTo('/login')}
                                >
                                    <ListItemIcon><LoginIcon /></ListItemIcon>
                                    <ListItemText primary="Login" />
                                </ListItem>
                                <ListItem
                                    button
                                    onClick={() => navigateTo('/register')}
                                >
                                    <ListItemIcon><PersonIcon /></ListItemIcon>
                                    <ListItemText primary="Register" />
                                </ListItem>
                            </>
                        )}
                    </List>
                </Box>
            </Drawer>

            {/* Main content */}
            <main>
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-100 py-8 mt-12">
                <Container>
                    <Box className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <Box>
                            <Typography variant="h6" className="font-bold mb-4">
                                {websiteName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Your one-stop shop for all your needs. Quality products, fast shipping, excellent service.
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" className="font-bold mb-4">
                                Shop
                            </Typography>
                            <List disablePadding>
                                {['All Products', 'Featured', 'New Arrivals', 'Best Sellers'].map((item) => (
                                    <ListItem key={item} disablePadding>
                                        <Button
                                            color="inherit"
                                            onClick={() => navigateTo('/products')}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {item}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" className="font-bold mb-4">
                                Customer Service
                            </Typography>
                            <List disablePadding>
                                {['Contact Us', 'FAQ', 'Shipping & Returns', 'Privacy Policy'].map((item) => (
                                    <ListItem key={item} disablePadding>
                                        <Button
                                            color="inherit"
                                            onClick={() => navigateTo('/contact')}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {item}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="subtitle1" className="font-bold mb-4">
                                About Us
                            </Typography>
                            <List disablePadding>
                                {['Our Story', 'Blog', 'Careers', 'Terms of Service'].map((item) => (
                                    <ListItem key={item} disablePadding>
                                        <Button
                                            color="inherit"
                                            onClick={() => navigateTo('/about')}
                                            sx={{ textTransform: 'none' }}
                                        >
                                            {item}
                                        </Button>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 4 }} />

                    <Typography variant="body2" color="text.secondary" align="center">
                        © {new Date().getFullYear()} {websiteName}. All rights reserved.
                    </Typography>
                </Container>
            </footer>
        </>
    );
};

export default MainLayout; 