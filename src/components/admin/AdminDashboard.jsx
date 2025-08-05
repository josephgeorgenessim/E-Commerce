import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import AdminProductsList from './AdminProductsList';
import AdminOrdersList from './AdminOrdersList';
import AdminSettings from './AdminSettings';
import DashboardAnalysis from './DashboardAnalysis';
import LogoutButton from '../common/LogoutButton';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { Card, CardContent } from '../ui/card';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Settings,
    Users,
    LineChart,
    Bell,
    Search
} from 'lucide-react';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState("dashboard");
    const currentUser = useSelector(selectCurrentUser);
    console.log("hi admin")
    // Get user's initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "A";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-64 bg-white dark:bg-gray-800 border-r">
                <div className="px-6 py-4 border-b">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                </div>

                <div className="flex flex-col flex-1 pt-5">
                    <div className="space-y-1 px-3">
                        <Button
                            variant={activeTab === "dashboard" ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab("dashboard")}
                        >
                            <LayoutDashboard className="mr-2 h-4 w-4" />
                            Dashboard
                        </Button>
                        <Button
                            variant={activeTab === "products" ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab("products")}
                        >
                            <Package className="mr-2 h-4 w-4" />
                            Products
                        </Button>
                        <Button
                            variant={activeTab === "orders" ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab("orders")}
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Orders
                        </Button>
                        <Button
                            variant={activeTab === "settings" ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveTab("settings")}
                        >
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </Button>
                    </div>
                </div>

                <div className="px-3 py-4 border-t mt-auto">
                    <div className="flex items-center gap-3 mb-3">
                        <Avatar>
                            <AvatarImage src={currentUser?.avatar} />
                            <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-medium">{currentUser?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                    <LogoutButton className="w-full" />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navigation */}
                <header className="bg-white dark:bg-gray-800 border-b shadow-sm">
                    <div className="flex items-center justify-between px-6 py-3">
                        <div className="flex items-center md:hidden">
                            <Button variant="ghost" size="icon">
                                <LayoutDashboard className="h-5 w-5" />
                            </Button>
                            <h2 className="ml-2 text-lg font-bold">Admin Panel</h2>
                        </div>

                        <div className="hidden md:flex items-center flex-1 px-4 md:ml-0">
                            <Search className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                            <Input
                                placeholder="Search..."
                                className="max-w-sm"
                            />
                        </div>

                        <div className="flex items-center space-x-3">
                            <Button variant="ghost" size="icon">
                                <Bell className="h-5 w-5" />
                            </Button>

                            <div className="md:hidden">
                                <Avatar>
                                    <AvatarImage src={currentUser?.avatar} />
                                    <AvatarFallback>{getInitials(currentUser?.name)}</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden px-4 py-2 border-t">
                        <TabsList className="w-full grid grid-cols-4">
                            <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
                                <LayoutDashboard className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="products" onClick={() => setActiveTab("products")}>
                                <Package className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="orders" onClick={() => setActiveTab("orders")}>
                                <ShoppingCart className="h-4 w-4" />
                            </TabsTrigger>
                            <TabsTrigger value="settings" onClick={() => setActiveTab("settings")}>
                                <Settings className="h-4 w-4" />
                            </TabsTrigger>
                        </TabsList>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto p-6">
                    {activeTab === "dashboard" && <DashboardAnalysis />}
                    {activeTab === "products" && <AdminProductsList />}
                    {activeTab === "orders" && <AdminOrdersList />}
                    {activeTab === "settings" && <AdminSettings />}
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard; 