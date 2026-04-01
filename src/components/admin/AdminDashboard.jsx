import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import AdminProductsList from './AdminProductsList';
import AdminOrdersList from './AdminOrdersList';
import AdminSettings from './AdminSettings';
import DashboardAnalysis from './DashboardAnalysis';
import LogoutButton from '../common/LogoutButton';
import { selectCurrentUser } from '../../features/users/usersSlice';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings as SettingsIcon,
    Bell,
    Search,
    ChevronRight,
    LogOut,
    AppWindow
} from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const currentUser = useSelector(selectCurrentUser);

    const getInitials = (name) => {
        if (!name) return "A";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingCart },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ];

    const sidebarVariants = {
        open: { width: 280, x: 0 },
        closed: { width: 88, x: 0 }
    };

    return (
        <div className="flex h-screen bg-[#f8fafc] dark:bg-[#0f172a] text-[#1e293b] dark:text-[#f1f5f9] overflow-hidden">
            {/* Desktop Sidebar */}
            <motion.aside
                initial={false}
                animate={isSidebarOpen ? "open" : "closed"}
                variants={sidebarVariants}
                className="hidden md:flex flex-col bg-white dark:bg-[#1e293b] border-r border-[#e2e8f0] dark:border-[#334155] relative z-20 shadow-xl shadow-black/5 transition-all duration-300"
            >
                {/* Sidebar Header */}
                <div className="h-20 flex items-center px-6 border-b border-[#e2e8f0] dark:border-[#334155] justify-between">
                    <AnimatePresence mode="wait">
                        {isSidebarOpen ? (
                            <motion.div
                                key="logo-full"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex items-center gap-3"
                            >
                                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                                    <AppWindow className="text-white h-5 w-5" />
                                </div>
                                <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">AdminPro</span>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="logo-small"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="h-10 w-10 mx-auto rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20"
                            >
                                <AppWindow className="text-white h-5 w-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Sidebar Links */}
                <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative
                                ${activeTab === item.id 
                                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                                    : 'hover:bg-[#f1f5f9] dark:hover:bg-[#334155] text-[#64748b]'}`}
                        >
                            <item.icon className={`h-5 w-5 shrink-0 ${activeTab === item.id ? 'text-white' : 'group-hover:text-primary transition-colors'}`} />
                            {isSidebarOpen && (
                                <motion.span
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="font-medium whitespace-nowrap"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                            {activeTab === item.id && isSidebarOpen && (
                                <motion.div
                                    layoutId="activeTabBadge"
                                    className="ml-auto"
                                >
                                    <ChevronRight className="h-4 w-4 opacity-50" />
                                </motion.div>
                            )}
                        </button>
                    ))}
                </nav>

                {/* Sidebar Footer */}
                <div className="p-4 border-t border-[#e2e8f0] dark:border-[#334155] bg-[#f8fafc]/50 dark:bg-[#1e293b]/50">
                    <div className={`flex items-center gap-3 p-3 rounded-2xl ${isSidebarOpen ? '' : 'justify-center'}`}>
                        <Avatar className="h-10 w-10 ring-2 ring-primary/10 shrink-0">
                            <AvatarImage src={currentUser?.avatar} />
                            <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                {getInitials(currentUser?.name)}
                            </AvatarFallback>
                        </Avatar>
                        {isSidebarOpen && (
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate leading-none mb-1">{currentUser?.name || 'Admin'}</p>
                                <p className="text-xs text-[#64748b] truncate leading-none">{currentUser?.email}</p>
                            </div>
                        )}
                    </div>
                    <div className="mt-4">
                        <LogoutButton 
                            className={`w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl py-2.5 transition-all
                                ${isSidebarOpen ? 'px-4' : 'px-0 justify-center'}`}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            {isSidebarOpen && <span className="ml-3 font-medium">Logout</span>}
                        </LogoutButton>
                    </div>
                </div>

                {/* Toggle Button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 h-8 w-8 bg-white dark:bg-[#1e293b] border border-[#e2e8f0] dark:border-[#334155] rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform z-30"
                >
                    <ChevronRight className={`h-4 w-4 text-[#64748b] transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`} />
                </button>
            </motion.aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative overflow-hidden">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-b border-[#e2e8f0] dark:border-[#334155] flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex items-center gap-4">
                        <motion.h1 
                            key={activeTab}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-2xl font-bold tracking-tight capitalize"
                        >
                            {activeTab}
                        </motion.h1>
                        <Badge variant="secondary" className="hidden sm:flex font-medium px-3 py-1 rounded-full bg-primary/5 text-primary border-primary/10">
                            v2.4.0
                        </Badge>
                    </div>

                    <div className="flex items-center gap-3 sm:gap-6">
                        <div className="relative hidden md:flex min-w-[300px] group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#64748b] group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search settings, products..."
                                className="pl-10 h-11 bg-[#f1f5f9] dark:bg-[#334155]/50 border-none rounded-xl focus-visible:ring-2 focus-visible:ring-primary/20 transition-all w-full"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="rounded-xl relative hover:bg-primary/5 hover:text-primary h-11 w-11 transition-colors">
                                <Bell className="h-5 w-5" />
                                <span className="absolute top-3 right-3 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0f172a]" />
                            </Button>
                            
                            <div className="md:hidden">
                                <Avatar className="h-9 w-9">
                                    <AvatarImage src={currentUser?.avatar} />
                                    <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Area */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-10 space-y-8 custom-scrollbar bg-[#f8fafc] dark:bg-[#0f172a]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                            className="max-w-7xl mx-auto"
                        >
                            {activeTab === "dashboard" && <DashboardAnalysis />}
                            {activeTab === "products" && <AdminProductsList />}
                            {activeTab === "orders" && <AdminOrdersList />}
                            {activeTab === "settings" && <AdminSettings />}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;