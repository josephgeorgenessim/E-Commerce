import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/usersSlice';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import SuperAdminLayout from '../layouts/SuperAdminLayout';

// Public Pages
import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ProductDetail from '../pages/ProductDetail';
import CategoryPage from '../pages/CategoryPage';
import AboutUs from '../pages/AboutUs';
import ContactPage from '../pages/ContactPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import NotFound from '../pages/NotFound';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

// Admin Pages
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminProductsList from '../components/admin/AdminProductsList';
import AdminOrdersList from '../components/admin/AdminOrdersList';
import AdminSettings from '../components/admin/AdminSettings';
import DashboardAnalysis from '../components/admin/DashboardAnalysis';

// Super Admin Pages - Placeholder components until proper implementation
const SuperAdminDashboard = () => <div>Super Admin Dashboard</div>;
const SuperAdminUsers = () => <div>Super Admin Users</div>;
const SuperAdminProducts = () => <div>Super Admin Products</div>;
const SuperAdminOrders = () => <div>Super Admin Orders</div>;
const SuperAdminSettings = () => <div>Super Admin Settings</div>;

// Protected Route Component
const PrivateRoute = ({ allowedRoles = [] }) => {
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = currentUser && currentUser.role !== 'guest';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const Router = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="category/:category" element={<CategoryPage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={['admin', 'superadmin']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsList />} />
          <Route path="orders" element={<AdminOrdersList />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="analysis" element={<DashboardAnalysis />} />
        </Route>
      </Route>

      {/* Super Admin Routes */}
      <Route element={<PrivateRoute allowedRoles={['superadmin']} />}>
        <Route path="/superadmin" element={<SuperAdminLayout />}>
          <Route index element={<SuperAdminDashboard />} />
          <Route path="users" element={<SuperAdminUsers />} />
          <Route path="products" element={<SuperAdminProducts />} />
          <Route path="orders" element={<SuperAdminOrders />} />
          <Route path="settings" element={<SuperAdminSettings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router; 