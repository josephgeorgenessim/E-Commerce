import React, { useState } from 'react';
import { Outlet, Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Chip,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ShoppingBag as ProductsIcon,
  Receipt as OrdersIcon,
  Settings as SettingsIcon,
  People as UsersIcon,
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  ExitToApp as ExitToAppIcon,
  Person as PersonIcon,
  ChevronLeft as ChevronLeftIcon,
  BarChart as AnalyticsIcon
} from '@mui/icons-material';
import { selectCurrentUser, logout } from '../features/user/userSlice';

const drawerWidth = 240;

const SuperAdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // Close drawer on mobile by default
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/superadmin' },
    { text: 'Users', icon: <UsersIcon />, path: '/superadmin/users' },
    { text: 'Products', icon: <ProductsIcon />, path: '/superadmin/products' },
    { text: 'Orders', icon: <OrdersIcon />, path: '/superadmin/orders' },
    { text: 'Analytics', icon: <AnalyticsIcon />, path: '/superadmin/analytics' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/superadmin/settings' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: theme.palette.secondary.dark,
          color: theme.palette.secondary.contrastText,
          boxShadow: 1,
          zIndex: (theme) => theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Super Admin Panel
          </Typography>
          <Chip 
            label="Super Admin" 
            size="small" 
            color="error" 
            icon={<SecurityIcon />} 
            sx={{ ml: 2, display: { xs: 'none', sm: 'flex' } }} 
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={7} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar
                alt={currentUser?.name || 'Super Admin'}
                src={currentUser?.avatar || '/static/images/avatar/1.jpg'}
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate('/superadmin/profile'); }}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/superadmin/settings'); }}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">New admin account request</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">Security alert: unusual login</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">Server load high</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">Database backup completed</Typography>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Typography variant="body2">API rate limit exceeded</Typography>
        </MenuItem>
      </Menu>

      <Drawer
        variant={isMobile ? 'temporary' : 'persistent'}
        open={open}
        onClose={isMobile ? handleDrawerToggle : undefined}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: `1px solid ${theme.palette.divider}`,
            backgroundColor: theme.palette.grey[900],
            color: theme.palette.common.white,
          },
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: [1],
            backgroundColor: theme.palette.secondary.dark,
          }}
        >
          <Typography variant="h6" color="white" component={RouterLink} to="/superadmin" sx={{ textDecoration: 'none' }}>
            ShopSphere Control
          </Typography>
        </Toolbar>
        <Box sx={{ 
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          py: 1,
          px: 2,
          display: 'flex',
          alignItems: 'center',
        }}>
          <Avatar
            alt={currentUser?.name || 'Super Admin'}
            src={currentUser?.avatar || '/static/images/avatar/1.jpg'}
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1">{currentUser?.name || 'Super Admin'}</Typography>
            <Typography variant="caption" color="gray">
              {currentUser?.email || 'admin@example.com'}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
        <List sx={{ pt: 1 }}>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              component={RouterLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                mb: 0.5,
                borderRadius: 1,
                mx: 1,
                '&.Mui-selected': {
                  backgroundColor: 'secondary.main',
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                  '&:hover': {
                    backgroundColor: 'secondary.dark',
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'white',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="caption" color="gray">
            System Version: 2.3.5
          </Typography>
          <Typography variant="caption" color="gray" display="block">
            © {new Date().getFullYear()} ShopSphere Inc.
          </Typography>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${open ? drawerWidth : 0}px)` },
          minHeight: '100vh',
          backgroundColor: theme.palette.background.default,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          ...(open && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }),
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Outlet />
        </Container>
      </Box>
    </Box>
  );
};

export default SuperAdminLayout;