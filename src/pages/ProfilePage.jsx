import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCurrentUser } from '../features/users/usersSlice';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import {
    User,
    Package,
    Heart,
    Settings,
    CreditCard,
    MapPin,
    Edit,
    CheckCircle2,
    Clock,
    Truck,
    ChevronRight,
    Camera,
    Shield
} from 'lucide-react';
import { toast } from 'sonner';

const ProfilePage = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [activeTab, setActiveTab] = useState('profile');
    const [isEditing, setIsEditing] = useState(false);

    const getInitials = (name) => {
        if (!name) return "U";
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    const orders = [
        { id: '#ORD-9821', date: '2023-10-15', status: 'Delivered', total: 125.99, items: 3 },
        { id: '#ORD-9845', date: '2023-11-01', status: 'Processing', total: 79.50, items: 1 },
        { id: '#ORD-9877', date: '2023-11-12', status: 'Shipped', total: 249.99, items: 2 }
    ];

    const addresses = [
        { id: 1, name: 'Home', street: '123 Main St', city: 'New York', state: 'NY', zip: '10001', isDefault: true },
        { id: 2, name: 'Work', street: '456 Business Ave', city: 'New York', state: 'NY', zip: '10002', isDefault: false }
    ];

    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } }
    };

    const tabVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
    };

    return (
        <div className="container mx-auto px-4 py-16 min-h-screen">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col lg:flex-row gap-10"
            >
                {/* Sidebar Navigation */}
                <div className="lg:w-1/3">
                    <Card className="border-none shadow-2xl shadow-slate-200/60 dark:shadow-none bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden sticky top-24">
                        <div className="relative h-32 bg-primary">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/80 to-purple-600" />
                        </div>
                        <CardContent className="p-8 pt-0 -mt-16 flex flex-col items-center">
                            <div className="relative group mb-4">
                                <Avatar className="h-32 w-32 ring-8 ring-white dark:ring-slate-800 shadow-xl">
                                    <AvatarImage src={currentUser?.avatar} />
                                    <AvatarFallback className="text-3xl bg-primary/10 text-primary font-black">
                                        {getInitials(currentUser?.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <button className="absolute bottom-1 right-1 h-10 w-10 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center border border-slate-100 dark:border-slate-600 hover:scale-110 active:scale-95 transition-all text-slate-600 dark:text-slate-300">
                                    <Camera className="h-5 w-5" />
                                </button>
                            </div>
                            
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{currentUser?.name}</h2>
                            <p className="text-slate-500 font-medium">{currentUser?.email}</p>
                            <Badge variant="soft" className="mt-4 px-4 py-1.5 rounded-full capitalize">
                                {currentUser?.role || 'Member'}
                            </Badge>

                            <div className="w-full mt-10 space-y-2">
                                {[
                                    { id: 'profile', label: 'Personal Details', icon: User },
                                    { id: 'orders', label: 'My Orders', icon: Package },
                                    { id: 'wishlist', label: 'Wishlist', icon: Heart },
                                    { id: 'addresses', label: 'Shipping Addresses', icon: MapPin },
                                    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                                    { id: 'settings', label: 'Account Security', icon: Shield },
                                ].map((item) => (
                                    <Button
                                        key={item.id}
                                        variant={activeTab === item.id ? "soft" : "ghost"}
                                        className={`w-full justify-start h-12 rounded-2xl px-4 transition-all duration-300
                                            ${activeTab === item.id ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'text-slate-500 hover:text-primary hover:bg-primary/5'}`}
                                        onClick={() => setActiveTab(item.id)}
                                    >
                                        <item.icon className={`mr-3 h-5 w-5 ${activeTab === item.id ? 'text-primary animate-pulse' : 'text-slate-400'}`} />
                                        <span className="font-semibold">{item.label}</span>
                                        {activeTab === item.id && <ChevronRight className="ml-auto h-4 w-4 opacity-50" />}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Area */}
                <div className="lg:w-2/3">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            variants={tabVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className="h-full"
                        >
                            {/* Profile Details Tab */}
                            {activeTab === 'profile' && (
                                <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 rounded-[2.5rem] h-full">
                                    <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-700">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <CardTitle className="text-2xl font-bold tracking-tight">Personal Information</CardTitle>
                                                <CardDescription className="text-base">Manage your basic account details and identity.</CardDescription>
                                            </div>
                                            <Button 
                                                variant="outline" 
                                                className="rounded-xl border-slate-200 dark:border-slate-700 hover:bg-primary/5 hover:text-primary hover:border-primary/20 transition-all font-bold px-6"
                                                onClick={() => setIsEditing(!isEditing)}
                                            >
                                                <Edit className="h-4 w-4 mr-2" />
                                                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <form className="grid grid-cols-1 md:grid-cols-2 gap-8" onSubmit={(e) => { e.preventDefault(); toast.success("Profile updated!"); setIsEditing(false); }}>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Full Name</label>
                                                <Input 
                                                    defaultValue={currentUser?.name} 
                                                    disabled={!isEditing} 
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Email Address</label>
                                                <Input 
                                                    defaultValue={currentUser?.email} 
                                                    disabled={!isEditing}
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Phone Number</label>
                                                <Input 
                                                    defaultValue="+1 (555) 123-4567" 
                                                    disabled={!isEditing}
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Date of Birth</label>
                                                <Input 
                                                    type="date" 
                                                    defaultValue="1990-01-01" 
                                                    disabled={!isEditing}
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all text-slate-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 uppercase tracking-wider">Short Bio</label>
                                                <Textarea
                                                    disabled={!isEditing}
                                                    defaultValue="Passionate shopper with a taste for premium design and quality essentials. Always on the lookout for the next great find!"
                                                    rows={4}
                                                    className="rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 transition-all p-4 resize-none"
                                                />
                                            </div>
                                            {isEditing && (
                                                <div className="md:col-span-2 pt-4">
                                                    <Button type="submit" className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20">
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            )}
                                        </form>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Orders Tab */}
                            {activeTab === 'orders' && (
                                <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 rounded-[2.5rem] h-full overflow-hidden">
                                    <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-700 overflow-hidden">
                                        <CardTitle className="text-2xl font-bold tracking-tight">Order History</CardTitle>
                                        <CardDescription className="text-base">Review your past purchases and current shipments.</CardDescription>
                                    </CardHeader>
                                    <CardContent className="p-6 md:p-10">
                                        <div className="space-y-6">
                                            {orders.map((order, idx) => (
                                                <motion.div 
                                                    key={order.id} 
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className="p-6 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:ring-2 hover:ring-primary/20 transition-all group cursor-pointer"
                                                >
                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`h-14 w-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg
                                                                ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                                                                  order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'}`}
                                                            >
                                                                {order.status === 'Delivered' ? <CheckCircle2 className="h-7 w-7" /> : 
                                                                 order.status === 'Processing' ? <Clock className="h-7 w-7" /> : <Truck className="h-7 w-7" />}
                                                            </div>
                                                            <div>
                                                                <h4 className="text-lg font-bold text-slate-900 dark:text-slate-100">{order.id}</h4>
                                                                <p className="text-sm text-slate-500 font-medium">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center justify-between sm:text-right gap-8">
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">Status</p>
                                                                <p className={`font-bold ${order.status === 'Delivered' ? 'text-emerald-500' : 'text-slate-700 dark:text-slate-300'}`}>{order.status}</p>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">Total</p>
                                                                <p className="text-xl font-black text-slate-900 dark:text-slate-100">${order.total.toFixed(2)}</p>
                                                            </div>
                                                            <Button variant="ghost" size="icon" className="h-12 w-12 rounded-2xl bg-white dark:bg-slate-800 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                                                                <ChevronRight className="h-6 w-6" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Addresses Tab */}
                            {activeTab === 'addresses' && (
                                <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 rounded-[2.5rem] h-full overflow-hidden">
                                    <CardHeader className="p-10 border-b border-slate-50 dark:border-slate-700">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                            <div className="space-y-1">
                                                <CardTitle className="text-2xl font-bold tracking-tight">Shipping Addresses</CardTitle>
                                                <CardDescription className="text-base">Where should we deliver your favorite goods?</CardDescription>
                                            </div>
                                            <Button className="rounded-xl font-bold px-6 shadow-lg shadow-primary/20 h-11 flex items-center gap-2">
                                                <MapPin className="h-4 w-4" /> Add Address
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {addresses.map(address => (
                                                <motion.div 
                                                    key={address.id}
                                                    layoutId={`address-${address.id}`}
                                                    className={`p-8 rounded-[2.5rem] border-2 transition-all relative group
                                                        ${address.isDefault ? 'border-primary ring-4 ring-primary/5 bg-slate-50 dark:bg-slate-900' : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'}`}
                                                >
                                                    {address.isDefault && (
                                                        <Badge className="absolute top-6 right-6 bg-primary text-white border-none px-3 py-1 font-bold rounded-full text-[10px] uppercase">
                                                            Default
                                                        </Badge>
                                                    )}
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shadow-md ${address.isDefault ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                                                            <MapPin className="h-6 w-6" />
                                                        </div>
                                                        <h4 className="text-xl font-bold">{address.name}</h4>
                                                    </div>
                                                    <div className="space-y-1 text-slate-600 dark:text-slate-400 font-medium">
                                                        <p className="text-slate-900 dark:text-slate-100 font-bold">{currentUser?.name}</p>
                                                        <p>{address.street}</p>
                                                        <p>{address.city}, {address.state} {address.zip}</p>
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-2 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Button variant="ghost" size="sm" className="rounded-xl px-4 py-2 h-10 hover:bg-primary/10 text-primary font-bold">Edit</Button>
                                                        {!address.isDefault && (
                                                            <Button variant="ghost" size="sm" className="rounded-xl px-4 py-2 h-10 hover:bg-slate-100 font-bold">Make Default</Button>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}

                            {/* Coming Soon Tabs */}
                            {(activeTab === 'wishlist' || activeTab === 'payment' || activeTab === 'settings') && (
                                <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 rounded-[2.5rem] h-full overflow-hidden">
                                     <CardContent className="p-20 flex flex-col items-center justify-center text-center space-y-8">
                                        <div className="h-32 w-32 bg-primary/5 rounded-[2.5rem] flex items-center justify-center text-primary group animate-bounce-slow">
                                            {activeTab === 'wishlist' ? <Heart className="h-16 w-16" /> :
                                             activeTab === 'payment' ? <CreditCard className="h-16 w-16" /> : <Settings className="h-16 w-16" />}
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-4xl font-black tracking-tight">Feature Coming Soon</h3>
                                            <p className="text-slate-500 text-xl max-w-md">Our engineers are working hard to bring this experience to life. Stay tuned!</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Button size="lg" className="rounded-2xl px-10 h-14 font-bold shadow-xl shadow-primary/20">Notify Me</Button>
                                            <Button size="lg" variant="ghost" className="rounded-2xl px-10 h-14 font-bold" onClick={() => setActiveTab('profile')}>Go Back</Button>
                                        </div>
                                     </CardContent>
                                </Card>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfilePage;