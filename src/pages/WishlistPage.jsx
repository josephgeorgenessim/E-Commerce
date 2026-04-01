import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { 
    Heart, 
    ChevronRight,
    ArrowRight,
    Star,
    Plus,
    X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock wishlist data - in a real app, this would come from Redux state
const mockWishlistItems = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=500',
        category: 'Electronics',
        description: 'Experience pure sound with our flagship noise-cancelling headphones.'
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500',
        category: 'Electronics',
        description: 'Total control on your wrist with our feature-rich smartwatch.'
    },
    {
        id: '3',
        name: 'Laptop Backpack',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500',
        category: 'Accessories',
        description: 'Durable, stylish, and perfect for your daily commute.'
    }
];

const WishlistPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        dispatch(addItem({ 
            id: product.id, 
            price: product.price, 
            name: product.name, 
            image: product.image, 
            quantity: 1 
        }));
        toast.success(`${product.name} added to cart!`);
    };

    const handleRemove = (productId, e) => {
        e.stopPropagation();
        toast.info(`Item removed from wishlist.`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.9 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } 
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-500 uppercase tracking-widest leading-none">
                        <span>My Account</span>
                        <ChevronRight className="h-4 w-4" />
                        <span className="text-primary">Wishlist</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 italic">Saved Treasures</h1>
                    <p className="text-slate-500 text-lg max-w-xl">
                        Keep track of the items you love and grab them before they're gone. 
                        You have <span className="font-bold text-primary underline underline-offset-4">{mockWishlistItems.length} items</span> in your boutique.
                    </p>
                </div>
                
                <Button 
                    className="rounded-2xl h-14 px-8 font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 flex items-center gap-2 group"
                    onClick={() => navigate('/products')}
                >
                    Keep Exploring <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>

            {/* Wishlist Content */}
            <AnimatePresence mode="wait">
                {mockWishlistItems.length === 0 ? (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800"
                    >
                        <div className="h-24 w-24 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                            <Heart className="h-10 w-10 text-slate-300" />
                        </div>
                        <h2 className="text-3xl font-black mb-4 italic">Empty Boutiue</h2>
                        <p className="text-slate-500 max-w-sm mx-auto mb-8 text-lg">Your heart hasn't claimed any styles yet. Let's find something spectacular.</p>
                        <Button 
                            className="rounded-xl h-14 px-12 font-bold bg-primary"
                            onClick={() => navigate('/products')}
                        >
                            Start Shopping
                        </Button>
                    </motion.div>
                ) : (
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                    >
                        {mockWishlistItems.map((item) => (
                            <motion.div
                                key={item.id}
                                variants={itemVariants}
                                whileHover={{ y: -10 }}
                                onClick={() => navigate(`/products/${item.id}`)}
                                className="group relative bg-card rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
                            >
                                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                    />
                                    
                                    {/* Quick Actions */}
                                    <div className="absolute top-6 right-6 flex flex-col gap-3">
                                        <Button 
                                            size="icon" 
                                            variant="secondary" 
                                            className="rounded-full h-11 w-11 shadow-xl bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all transform translate-x-16 group-hover:translate-x-0 group-hover:opacity-100 opacity-0 duration-300"
                                            onClick={(e) => handleRemove(item.id, e)}
                                        >
                                            <X className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    
                                    <div className="absolute bottom-6 left-6">
                                        <Badge className="bg-primary text-white border-none px-4 py-1.5 font-bold rounded-xl shadow-lg">
                                            {item.category}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <div className="p-10 flex flex-col h-full bg-white dark:bg-slate-800">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                                            ))}
                                        </div>
                                        <span className="text-xl font-black text-slate-900 dark:text-slate-100 tracking-tight">${item.price.toFixed(2)}</span>
                                    </div>
                                    
                                    <h3 className="text-2xl font-black mb-3 italic group-hover:text-primary transition-colors">{item.name}</h3>
                                    <p className="text-slate-500 text-sm line-clamp-2 mb-8 font-medium italic">{item.description}</p>
                                    
                                    <div className="mt-auto pt-6 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
                                        <Button 
                                            variant="ghost" 
                                            className="p-0 font-black italic hover:bg-transparent hover:text-primary flex items-center gap-2 group/btn"
                                        >
                                            View Details <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                        <Button 
                                            className="rounded-2xl h-14 w-14 bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 shrink-0 transform group-hover:scale-110 active:scale-95 transition-all"
                                            onClick={(e) => handleAddToCart(item, e)}
                                        >
                                            <Plus className="h-6 w-6" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WishlistPage;