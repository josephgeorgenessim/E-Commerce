import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store';
import { selectCurrentUser } from './features/users/usersSlice';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Cart from './components/guest/Cart';
import RoleGuard from './components/auth/RoleGuard';
import { Toaster } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';

// Direct imports - no lazy loading
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import CategoryPage from './pages/CategoryPage';
import ProductsPage from './pages/ProductsPage';
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

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const userRole = currentUser?.role || 'guest';
  const isAdmin = userRole === 'admin';
  const isSuperAdmin = userRole === 'superadmin';
  const isAdminUser = isAdmin || isSuperAdmin;

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
  };

  const showNavbarFooter = !location.pathname.startsWith('/admin');

  return (
    <PersistGate loading={null} persistor={persistor}>
      <div className="App min-h-screen bg-background text-foreground font-sans flex flex-col">
        <Toaster position="top-right" richColors closeButton />
        
        {showNavbarFooter && <Navbar onCartClick={handleCartClick} />}

        {!isAdminUser && (
          <Cart
            open={isCartOpen}
            onClose={handleCloseCart}
            onCheckout={handleCheckout}
          />
        )}

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
              <Route path="/register" element={<PageWrapper><RegisterPage /></PageWrapper>} />

              {/* Public Store Routes */}
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><ProductsPage /></PageWrapper>} />
              <Route path="/products/:id" element={<PageWrapper><ProductDetail /></PageWrapper>} />
              <Route path="/category/:category" element={<PageWrapper><CategoryPage /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><AboutPage /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><ContactPage /></PageWrapper>} />
              <Route path="/wishlist" element={<PageWrapper><WishlistPage /></PageWrapper>} />
              <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />

              {/* User-Only Routes */}
              <Route element={
                <RoleGuard
                  allowedRoles={['user']}
                  redirectPath={"/login"}
                />
              }>
                <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
                <Route path="/orders" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
              </Route>

              {/* Admin Routes */}
              <Route element={
                <RoleGuard
                  allowedRoles={['admin', 'superadmin']}
                  redirectPath="/"
                />
              }>
                <Route path="/admin/dashboard" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
                <Route path="/admin/products" element={<PageWrapper><AdminProductsList /></PageWrapper>} />
                <Route path="/admin/orders" element={<PageWrapper><AdminOrdersList /></PageWrapper>} />
                <Route path="/admin/settings" element={<PageWrapper><AdminSettings /></PageWrapper>} />
              </Route>

              {/* 404 Fallback */}
              <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>

        {showNavbarFooter && <Footer />}
      </div>
    </PersistGate>
  );
}

export default App;
