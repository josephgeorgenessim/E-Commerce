import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement, Filler } from 'chart.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { selectOrdersByAdminId } from '../../features/orders/ordersSlice';
import { getProductsByAdminId } from '../../data/productsData';
import { Badge } from '../ui/badge';
import {
    TrendingUp,
    TrendingDown,
    ShoppingBag,
    Users,
    DollarSign,
    Package,
    Activity,
    Calendar,
    ArrowUpRight,
    ArrowDownRight
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

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
    const orders = useSelector(state => selectOrdersByAdminId(state, currentUser.id));
    const [products, setProducts] = useState([]);

    // Load products for the current admin
    useEffect(() => {
        if (currentUser && currentUser.id) {
            const adminProducts = getProductsByAdminId(currentUser.id);
            setProducts(adminProducts);
        }
    }, [currentUser]);

    // Calculate metrics
    const totalRevenue = orders.reduce((sum, order) => {
        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
        return sum + adminItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
    }, 0);

    const totalItemsSold = orders.reduce((sum, order) => {
        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
        return sum + adminItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
    }, 0);

    // Group by category for product distribution
    const categoryCount = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
    }, {});

    // Group by month for revenue trend
    const monthlyRevenue = orders.reduce((acc, order) => {
        const date = new Date(order.date);
        const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;

        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
        const orderTotal = adminItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        acc[monthYear] = (acc[monthYear] || 0) + orderTotal;
        return acc;
    }, {});

    // Order status distribution
    const orderStatusCount = orders.reduce((acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1;
        return acc;
    }, {});

    // Weekly sales data (simulated)
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weeklySales = days.map(() => Math.floor(Math.random() * 5000) + 1000);

    // Recent activities (simulated)
    const recentActivities = [
        {
            type: 'order',
            message: 'New order received',
            time: '2 minutes ago',
            amount: '$125.50',
            status: 'success'
        },
        {
            type: 'product',
            message: 'Product stock low',
            time: '1 hour ago',
            product: 'Wireless Headphones',
            status: 'warning'
        },
        {
            type: 'revenue',
            message: 'Daily revenue report',
            time: '3 hours ago',
            amount: '$1,245.80',
            status: 'success'
        },
        {
            type: 'customer',
            message: 'New customer registered',
            time: '5 hours ago',
            customer: 'John Smith',
            status: 'info'
        },
        {
            type: 'order',
            message: 'Order was canceled',
            time: '6 hours ago',
            amount: '$49.99',
            status: 'error'
        }
    ];

    // Configure chart data
    const categoryChartData = {
        labels: Object.keys(categoryCount),
        datasets: [
            {
                label: 'Products by Category',
                data: Object.values(categoryCount),
                backgroundColor: [
                    'rgba(94, 53, 177, 0.6)',
                    'rgba(0, 137, 123, 0.6)',
                    'rgba(233, 30, 99, 0.6)',
                    'rgba(216, 67, 21, 0.6)',
                    'rgba(33, 150, 243, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const revenueChartData = {
        labels: Object.keys(monthlyRevenue),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: Object.values(monthlyRevenue),
                backgroundColor: 'rgba(76, 175, 80, 0.6)',
            },
        ],
    };

    const orderStatusChartData = {
        labels: Object.keys(orderStatusCount),
        datasets: [
            {
                label: 'Orders by Status',
                data: Object.values(orderStatusCount),
                backgroundColor: [
                    'rgba(76, 175, 80, 0.6)',
                    'rgba(255, 193, 7, 0.6)',
                    'rgba(244, 67, 54, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const weeklySalesData = {
        labels: days,
        datasets: [
            {
                fill: true,
                label: 'Weekly Sales',
                data: weeklySales,
                borderColor: 'rgb(94, 53, 177)',
                backgroundColor: 'rgba(94, 53, 177, 0.1)',
                tension: 0.4,
            },
        ],
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'order':
                return <ShoppingBag className="h-5 w-5" />;
            case 'product':
                return <Package className="h-5 w-5" />;
            case 'revenue':
                return <DollarSign className="h-5 w-5" />;
            case 'customer':
                return <Users className="h-5 w-5" />;
            default:
                return <Activity className="h-5 w-5" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'success':
                return 'bg-green-100 text-green-800';
            case 'warning':
                return 'bg-yellow-100 text-yellow-800';
            case 'error':
                return 'bg-red-100 text-red-800';
            case 'info':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                <p className="text-gray-500 dark:text-gray-400">Welcome back, {currentUser.name}. Here's an overview of your store.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Products</div>
                            <div className="p-2 rounded-full bg-purple-100 text-purple-600">
                                <Package className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{products.length}</div>
                        <div className="flex items-center text-sm">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <ArrowUpRight className="mr-1 h-3 w-3" /> 8% increase
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Revenue</div>
                            <div className="p-2 rounded-full bg-green-100 text-green-600">
                                <DollarSign className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">${totalRevenue.toFixed(2)}</div>
                        <div className="flex items-center text-sm">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <ArrowUpRight className="mr-1 h-3 w-3" /> 12% increase
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Orders</div>
                            <div className="p-2 rounded-full bg-blue-100 text-blue-600">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{orders.length}</div>
                        <div className="flex items-center text-sm">
                            <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
                                <ArrowDownRight className="mr-1 h-3 w-3" /> 2% decrease
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Items Sold</div>
                            <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                                <ShoppingBag className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold mb-1">{totalItemsSold}</div>
                        <div className="flex items-center text-sm">
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                <ArrowUpRight className="mr-1 h-3 w-3" /> 5% increase
                            </Badge>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Weekly Sales */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle>Weekly Sales</CardTitle>
                                <CardDescription>Your sales performance this week</CardDescription>
                            </div>
                            <Badge variant="outline" className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                This Week
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="h-[300px]">
                            <Line
                                data={weeklySalesData}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: {
                                        legend: {
                                            display: false,
                                        },
                                    },
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                callback: (value) => `$${value}`,
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest activities in your store</CardDescription>
                    </CardHeader>
                    <CardContent className="px-6">
                        <div className="space-y-5">
                            {recentActivities.map((activity, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className={`p-2 rounded-full ${getStatusColor(activity.status)}`}>
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-center">
                                            <p className="font-medium text-sm">{activity.message}</p>
                                            <span className="text-xs text-gray-500">{activity.time}</span>
                                        </div>
                                        {activity.amount && (
                                            <p className="text-sm text-gray-500">{activity.amount}</p>
                                        )}
                                        {activity.product && (
                                            <p className="text-sm text-gray-500">{activity.product}</p>
                                        )}
                                        {activity.customer && (
                                            <p className="text-sm text-gray-500">{activity.customer}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter className="px-6 py-3 border-t">
                        <a href="#" className="text-sm text-blue-600 hover:underline">View all activity</a>
                    </CardFooter>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Products by Category</CardTitle>
                        <CardDescription>
                            Distribution of your product catalog
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            {products.length > 0 ? (
                                <Doughnut
                                    data={categoryChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                                    No product data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Monthly Revenue</CardTitle>
                        <CardDescription>
                            Your revenue trend over time
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            {orders.length > 0 ? (
                                <Bar
                                    data={revenueChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                display: false
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                                    No order data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Order Status</CardTitle>
                        <CardDescription>
                            Distribution of your order statuses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[250px]">
                            {orders.length > 0 ? (
                                <Doughnut
                                    data={orderStatusChartData}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                            }
                                        }
                                    }}
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-gray-500 dark:text-gray-400">
                                    No order data available
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default DashboardAnalysis; 