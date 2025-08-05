import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { selectCurrentUser, selectIsAuthenticated } from './features/users/usersSlice';
import Navbar from './components/common/Navbar';
import Cart from './components/guest/Cart';
import RoleGuard from './components/auth/RoleGuard';
import { toggleCart, selectCartItems } from './features/cart/cartSlice';
import './App.css';

// Direct imports - no lazy loading
// Store components
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import ProductList from './components/guest/ProductList';
import DirectProducts from './components/guest/DirectProducts';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFoundPage from './pages/NotFoundPage';

// Authentication components
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Admin components
import AdminDashboard from './components/admin/AdminDashboard';
import AdminProductsList from './components/admin/AdminProductsList';
import AdminOrdersList from './components/admin/AdminOrdersList';
import AdminSettings from './components/admin/AdminSettings';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const cartItems = useSelector(selectCartItems);
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Role-based route redirections - add null checks
  const userRole = currentUser?.role || 'guest';
  const isAdmin = userRole === 'admin';
  const isSuperAdmin = userRole === 'superadmin';
  const isGuest = userRole === 'guest' || !userRole;
  const isUser = userRole === 'user';
  const isAdminUser = isAdmin || isSuperAdmin;

  // Removed automatic redirects to allow all users to access the home page

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    // navigate('/checkout');
    window.location.href = '/checkout';
  };

  // Hide Navbar on admin routes
  const showNavbar = !location.pathname.startsWith('/admin');

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="App">
        {showNavbar && <Navbar onCartClick={handleCartClick} />}

        {!isAdminUser && (
          <Cart
            open={isCartOpen}
            onClose={handleCloseCart}
            onCheckout={handleCheckout}
          />
        )}

        <Routes>
          {/* Public Routes - Accessible to all users */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Public Store Routes - Accessible to all users */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/direct-products" element={<DirectProducts />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/category/:category" element={<CategoryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />

          {/* User-Only Routes - Not accessible to guests or admins */}
          <Route element={
            <RoleGuard
              allowedRoles={['user']}
              redirectPath={"/login"}
            />
          }>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/orders" element={<NotFoundPage />} />
          </Route>

          {/* Admin Routes - Only accessible to admin and superadmin */}
          <Route element={
            <RoleGuard
              allowedRoles={['admin', 'superadmin']}
              redirectPath="/"
            />
          }>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProductsList />} />
            <Route path="/admin/orders" element={<AdminOrdersList />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>

          {/* 404 Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </PersistGate>
  );
}

export default App;
