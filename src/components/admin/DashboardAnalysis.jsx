import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut, Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { 
    Chart as ChartJS, 
    ArcElement, 
    Tooltip, 
    Legend, 
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    PointElement, 
    LineElement, 
    Filler 
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { selectOrdersByAdminId } from '../../features/orders/ordersSlice';
import { Badge } from '../ui/badge';
import {
    ShoppingBag,
    Users,
    DollarSign,
    Package,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    MousePointer2,
    Clock,
    AlertCircle,
    Info,
    Settings as SettingsIcon
} from 'lucide-react';
import { Button } from '../ui/button';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    PointElement,
    LineElement,
    Filler
);

const DashboardAnalysis = () => {
    const currentUser = useSelector(selectCurrentUser);
    const orders = useSelector(state => selectOrdersByAdminId(state, currentUser?.id));

    // Metrics Calculation
    const totalRevenue = orders.reduce((sum, order) => {
        if (!order.cartItems) return sum;
        const adminItems = order.cartItems.filter(item => 
            String(item.adminId) === String(currentUser?.id)
        );
        return sum + adminItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }, 0);

    const totalItemsSold = orders.reduce((sum, order) => {
        if (!order.cartItems) return sum;
        const adminItems = order.cartItems.filter(item => 
            String(item.adminId) === String(currentUser?.id)
        );
        return sum + adminItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);


    // Animation Config
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } }
    };

    const stats = [
        { 
            label: 'Total Revenue', 
            value: `$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 
            icon: DollarSign, 
            trend: '+12.5%', 
            trendUp: true, 
            color: 'bg-emerald-500', 
            chartColor: '#10b981' 
        },
        { 
            label: 'Total Orders', 
            value: orders.length, 
            icon: ShoppingBag, 
            trend: '+8.2%', 
            trendUp: true, 
            color: 'bg-blue-500', 
            chartColor: '#3b82f6' 
        },
        { 
            label: 'Items Sold', 
            value: totalItemsSold, 
            icon: Package, 
            trend: '-2.4%', 
            trendUp: false, 
            color: 'bg-purple-500', 
            chartColor: '#a855f7' 
        },
        { 
            label: 'Store Visitors', 
            value: '2.4k', 
            icon: MousePointer2, 
            trend: '+18%', 
            trendUp: true, 
            color: 'bg-orange-500', 
            chartColor: '#f97316' 
        },
    ];

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#1e293b',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' },
                bodyFont: { size: 13 },
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            x: { grid: { display: false }, border: { display: false } },
            y: { grid: { color: '#f1f5f9' }, border: { display: false } }
        }
    };

    const recentActivities = [
        { id: 1, type: 'order', message: 'New order #3421 received', time: '2m ago', status: 'success', icon: ShoppingBag },
        { id: 2, type: 'stock', message: 'Product stock low: Air Max 270', time: '1h ago', status: 'warning', icon: AlertCircle },
        { id: 3, type: 'user', message: 'New store member joined', time: '3h ago', status: 'info', icon: Users },
        { id: 4, type: 'revenue', message: 'Daily payout processed', time: '5h ago', status: 'success', icon: DollarSign },
    ];

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Header section with Welcome message */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight mb-1 text-slate-900 dark:text-slate-100">Analytics Overview</h2>
                    <p className="text-slate-500 dark:text-slate-400">Track your business performance and store growth.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-xl border-slate-200 dark:border-slate-700 bg-white/50 backdrop-blur-sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Last 30 Days
                    </Button>
                    <Button className="rounded-xl shadow-lg shadow-primary/20">
                        Download Report
                    </Button>
                </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div key={idx} variants={itemVariants}>
                        <Card className="border-none shadow-xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden group hover:ring-2 hover:ring-primary/10 transition-all duration-300">
                            <CardContent className="p-6 relative">
                                <div className="flex items-start justify-between">
                                    <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <div className={`flex items-center gap-1 text-sm font-bold ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {stat.trendUp ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                                        {stat.trend}
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</h3>
                                    <p className="text-3xl font-bold mt-1 text-slate-900 dark:text-slate-100">{stat.value}</p>
                                </div>
                                <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <stat.icon className="h-24 w-24" />
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Revenue Chart */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8">
                        <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold">Revenue Growth</CardTitle>
                                <CardDescription>Daily revenue stats for the current period</CardDescription>
                            </div>
                            <Badge variant="soft" className="bg-emerald-50 text-emerald-600 border-emerald-100">+12% vs last month</Badge>
                        </CardHeader>
                        <CardContent className="p-0 h-[350px]">
                            <Line 
                                data={{
                                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                                    datasets: [{
                                        fill: true,
                                        label: 'Revenue',
                                        data: [3200, 4100, 3800, 5200, 4800, 6100, 5900],
                                        borderColor: '#3b82f6',
                                        backgroundColor: 'rgba(59, 130, 246, 0.05)',
                                        tension: 0.4,
                                        pointRadius: 4,
                                        pointBackgroundColor: '#fff',
                                        pointBorderColor: '#3b82f6',
                                        pointBorderWidth: 2
                                    }]
                                }} 
                                options={chartOptions} 
                            />
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Categories Distribution */}
                <motion.div variants={itemVariants}>
                    <Card className="h-full border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8">
                        <CardHeader className="p-0 mb-8">
                            <CardTitle className="text-xl font-bold">Sales by Category</CardTitle>
                            <CardDescription>Product distribution by sales</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="h-[250px] relative">
                                <Doughnut 
                                    data={{
                                        labels: ['Electronics', 'Fashion', 'Home', 'Lifestyle'],
                                        datasets: [{
                                            data: [45, 25, 15, 15],
                                            backgroundColor: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'],
                                            borderWidth: 0,
                                            hoverOffset: 20
                                        }]
                                    }}
                                    options={{
                                        cutout: '75%',
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: { legend: { display: false } }
                                    }}
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl font-bold">1.2k</span>
                                    <span className="text-xs text-slate-500">Total Sales</span>
                                </div>
                            </div>
                            <div className="mt-8 space-y-3">
                                {[
                                    { label: 'Electronics', value: '45%', color: 'bg-blue-500' },
                                    { label: 'Fashion', value: '25%', color: 'bg-emerald-500' },
                                    { label: 'Home', value: '15%', color: 'bg-amber-500' },
                                ].map((cat, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className={`h-2.5 w-2.5 rounded-full ${cat.color}`} />
                                            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{cat.label}</span>
                                        </div>
                                        <span className="text-sm font-bold">{cat.value}</span>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Bottom Row - Recent Activity & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Activity */}
                <motion.div variants={itemVariants}>
                    <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 backdrop-blur-sm p-8">
                        <CardHeader className="p-0 mb-6 flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold">Live Feed</CardTitle>
                                <CardDescription>Real-time updates from your shop</CardDescription>
                            </div>
                            <Button variant="ghost" size="sm" className="text-primary font-medium hover:bg-primary/5">View All</Button>
                        </CardHeader>
                        <CardContent className="p-0 space-y-6">
                            {recentActivities.map((activity, idx) => (
                                <div key={idx} className="flex gap-4 group">
                                    <div className={`h-10 w-10 shrink-0 rounded-xl flex items-center justify-center
                                        ${activity.status === 'success' ? 'bg-emerald-50 text-emerald-600' : 
                                          activity.status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}
                                    >
                                        <activity.icon className="h-5 w-5" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">{activity.message}</p>
                                        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> {activity.time}
                                        </p>
                                    </div>
                                    <Badge variant="soft" className="h-fit">Live</Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Quick Shortcuts / Insights */}
                <motion.div variants={itemVariants}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
                        <Card className="border-none shadow-xl shadow-slate-200/50 bg-primary text-white p-8 relative overflow-hidden">
                            <div className="relative z-10">
                                <Info className="h-8 w-8 mb-4 opacity-50" />
                                <h3 className="text-xl font-bold">New Insights Available</h3>
                                <p className="text-white/80 mt-2 text-sm">We've identified 3 new opportunities for your store growth based on your recent traffic data.</p>
                                <Button className="mt-8 bg-white text-primary border-none hover:bg-white/90 font-bold rounded-xl w-full">Learn More</Button>
                            </div>
                            <div className="absolute -right-8 -bottom-8 h-40 w-40 bg-white/10 rounded-full blur-3xl" />
                        </Card>
                        
                        <div className="space-y-6">
                            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 p-6 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                                <div className="h-12 w-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                                    <Package className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Inventory</p>
                                    <p className="text-lg font-bold">Check Stock</p>
                                </div>
                            </Card>
                            
                            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 p-6 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                                <div className="h-12 w-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Engagement</p>
                                    <p className="text-lg font-bold">Manage Users</p>
                                </div>
                            </Card>
                            
                            <Card className="border-none shadow-xl shadow-slate-200/50 bg-white dark:bg-slate-800/50 p-6 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer">
                                <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <SettingsIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Configuration</p>
                                    <p className="text-lg font-bold">Store Settings</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default DashboardAnalysis;