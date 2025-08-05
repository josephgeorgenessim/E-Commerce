import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/users/usersSlice';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import {
    User,
    Package,
    Heart,
    Settings,
    CreditCard,
    MapPin,
    Edit
} from 'lucide-react';

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [activeTab, setActiveTab] = useState('profile');

    // Get user's initials for avatar fallback
    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    // Dummy order data
    const orders = [
        { id: '#ORD-001', date: '2023-10-15', status: 'Delivered', total: 125.99 },
        { id: '#ORD-002', date: '2023-11-01', status: 'Processing', total: 79.50 },
        { id: '#ORD-003', date: '2023-11-12', status: 'Shipped', total: 249.99 }
    ];

    // Dummy address data
    const addresses = [
        { id: 1, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
        { id: 2, name: 'Work', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', isDefault: false }
    ];

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Left Sidebar */}
                <div className="md:w-1/4">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex flex-col items-center text-center mb-6">
                                <Avatar className="h-24 w-24 mb-4">
                                    <AvatarImage src={currentUser.avatar} />
                                    <AvatarFallback className="text-2xl">{getInitials(currentUser.name)}</AvatarFallback>
                                </Avatar>
                                <h2 className="text-xl font-bold">{currentUser.name}</h2>
                                <p className="text-gray-500">{currentUser.email}</p>
                            </div>

                            <div className="space-y-1">
                                <Button
                                    variant={activeTab === "profile" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("profile")}
                                >
                                    <User className="mr-2 h-4 w-4" />
                                    My Profile
                                </Button>
                                <Button
                                    variant={activeTab === "orders" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("orders")}
                                >
                                    <Package className="mr-2 h-4 w-4" />
                                    My Orders
                                </Button>
                                <Button
                                    variant={activeTab === "wishlist" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("wishlist")}
                                >
                                    <Heart className="mr-2 h-4 w-4" />
                                    Wishlist
                                </Button>
                                <Button
                                    variant={activeTab === "addresses" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("addresses")}
                                >
                                    <MapPin className="mr-2 h-4 w-4" />
                                    Addresses
                                </Button>
                                <Button
                                    variant={activeTab === "payment" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("payment")}
                                >
                                    <CreditCard className="mr-2 h-4 w-4" />
                                    Payment Methods
                                </Button>
                                <Button
                                    variant={activeTab === "settings" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveTab("settings")}
                                >
                                    <Settings className="mr-2 h-4 w-4" />
                                    Account Settings
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content */}
                <div className="md:w-3/4">
                    {/* Profile Tab */}
                    {activeTab === 'profile' && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>Personal Information</CardTitle>
                                        <CardDescription>Update your personal details</CardDescription>
                                    </div>
                                    <Button variant="outline" size="sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Full Name</label>
                                        <Input value={currentUser.name} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Email Address</label>
                                        <Input value={currentUser.email} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Phone Number</label>
                                        <Input value="+1 (555) 123-4567" disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Date of Birth</label>
                                        <Input value="1990-01-01" disabled />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-sm font-medium">Bio</label>
                                        <Textarea
                                            disabled
                                            value="I'm a regular shopper who loves quality products and great deals."
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Orders Tab */}
                    {activeTab === 'orders' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>My Orders</CardTitle>
                                <CardDescription>View and track your orders</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {orders.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b">
                                                    <th className="text-left py-3 px-2">Order ID</th>
                                                    <th className="text-left py-3 px-2">Date</th>
                                                    <th className="text-left py-3 px-2">Status</th>
                                                    <th className="text-left py-3 px-2">Total</th>
                                                    <th className="text-right py-3 px-2">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {orders.map(order => (
                                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                                        <td className="py-3 px-2">{order.id}</td>
                                                        <td className="py-3 px-2">{order.date}</td>
                                                        <td className="py-3 px-2">
                                                            <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                                                                    order.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                                                                        'bg-yellow-100 text-yellow-800'}`}
                                                            >
                                                                {order.status}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-2">${order.total.toFixed(2)}</td>
                                                        <td className="py-3 px-2 text-right">
                                                            <Button variant="ghost" size="sm">View Details</Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <Package className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                                        <h3 className="text-lg font-medium">No orders yet</h3>
                                        <p className="text-gray-500 mt-1">When you place your first order, it will appear here</p>
                                        <Button className="mt-4">Start Shopping</Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Addresses Tab */}
                    {activeTab === 'addresses' && (
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <CardTitle>My Addresses</CardTitle>
                                        <CardDescription>Manage your shipping addresses</CardDescription>
                                    </div>
                                    <Button>Add New Address</Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {addresses.map(address => (
                                        <Card key={address.id} className="border">
                                            <CardContent className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex items-center">
                                                        <h3 className="font-medium">{address.name}</h3>
                                                        {address.isDefault && (
                                                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                                Default
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="sm">Edit</Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                                                            Delete
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="text-gray-600">
                                                    <p>{address.street}</p>
                                                    <p>{address.city}, {address.state} {address.zip}</p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Other tabs would be implemented similarly */}
                    {(activeTab === 'wishlist' || activeTab === 'payment' || activeTab === 'settings') && (
                        <Card>
                            <CardHeader>
                                <CardTitle>
                                    {activeTab === 'wishlist' ? 'My Wishlist' :
                                        activeTab === 'payment' ? 'Payment Methods' :
                                            'Account Settings'}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="py-12 text-center text-gray-500">
                                    <p>This feature is coming soon!</p>
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage; 