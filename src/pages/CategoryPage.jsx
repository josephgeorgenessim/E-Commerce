import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { getFilteredProducts } from '../data/productsData';
import { 
    ShoppingBag, 
    Star, 
    ChevronRight, 
    SlidersHorizontal, 
    LayoutGrid, 
    List,
    ArrowLeft,
    Heart
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid');

    useEffect(() => {
        if (category) {
            setLoading(true);
            // Simulate a slight delay for smooth loading entrance
            setTimeout(() => {
                const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
                const categoryProducts = getFilteredProducts({ category: formattedCategory });
                setProducts(categoryProducts || []);
                setLoading(false);
            }, 600);
        }
    }, [category]);

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

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] } 
        }
    };

    if (loading) {
        return (
            <div className="min-h-[80vh] flex flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Filtering premium {category}...</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            {/* Breadcrumbs & Header */}
            <div className="flex flex-col gap-8 mb-12">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">Home</button>
                    <ChevronRight className="h-4 w-4" />
                    <button onClick={() => navigate('/products')} className="hover:text-primary transition-colors">Products</button>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-slate-900 dark:text-slate-100 capitalize">{category}</span>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-2">
                        <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-slate-100 capitalize">
                            {category}
                        </h1>
                        <p className="text-slate-500 text-lg">
                            Discover our curated collection of <span className="font-bold text-primary">{products.length}</span> premium {category} items.
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                        <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center">
                            <Button 
                                variant={viewMode === 'grid' ? "white" : "ghost"} 
                                size="icon" 
                                className={`h-10 w-10 rounded-lg ${viewMode === 'grid' ? 'shadow-sm bg-white dark:bg-slate-700' : ''}`}
                                onClick={() => setViewMode('grid')}
                            >
                                <LayoutGrid className="h-5 w-5" />
                            </Button>
                            <Button 
                                variant={viewMode === 'list' ? "white" : "ghost"} 
                                size="icon" 
                                className={`h-10 w-10 rounded-lg ${viewMode === 'list' ? 'shadow-sm bg-white dark:bg-slate-700' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <List className="h-5 w-5" />
                            </Button>
                        </div>
                        <Button variant="outline" className="rounded-xl h-12 px-6 flex items-center gap-2 border-slate-200 dark:border-slate-700">
                            <SlidersHorizontal className="h-4 w-4" />
                            Sort & Filter
                        </Button>
                    </div>
                </div>
            </div>

            {/* Products Grid */}
            <AnimatePresence mode="wait">
                {products.length > 0 ? (
                    <motion.div
                        key="products-grid"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className={viewMode === 'grid' 
                            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                            : "flex flex-col gap-6"}
                    >
                        {products.map((product) => (
                            <motion.div
                                key={product.id}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                onClick={() => navigate(`/products/${product.id}`)}
                                className={`group relative flex bg-card rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500
                                    ${viewMode === 'list' ? 'flex-row h-64' : 'flex-col'}`}
                            >
                                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-1/3 h-full' : 'aspect-[4/5] w-full'}`}>
                                    <img
                                        src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500'}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                        <Button size="icon" variant="glass" className="rounded-full shadow-lg">
                                            <Heart className="h-5 w-5" />
                                        </Button>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 border-none px-3 py-1 font-bold">
                                            {product.id % 2 === 0 ? 'Best Seller' : 'New Arrival'}
                                        </Badge>
                                    </div>
                                </div>
                                
                                <div className={`p-8 flex flex-col justify-center ${viewMode === 'list' ? 'w-2/3' : 'flex-1'}`}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-widest leading-none bg-primary/5 px-2 py-1 rounded">
                                            {category}
                                        </span>
                                        <div className="flex items-center gap-1">
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                            <span className="text-xs font-bold">{product.rating || '4.8'}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                                    
                                    {viewMode === 'list' && (
                                        <p className="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                                            Experience the pinnacle of quality and design with our {product.name}. 
                                            Perfectly engineered for your modern lifestyle.
                                        </p>
                                    )}

                                    <div className="flex items-center justify-between mt-auto">
                                        <p className="text-2xl font-black text-slate-900 dark:text-slate-100">${product.price.toFixed(2)}</p>
                                        <Button 
                                            size="icon" 
                                            className="rounded-2xl h-12 w-12 bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                                            onClick={(e) => handleAddToCart(product, e)}
                                        >
                                            <ShoppingBag className="h-6 w-6 text-white" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800 space-y-6"
                    >
                        <div className="h-20 w-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                            <ShoppingBag className="h-10 w-10 text-slate-400" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold tracking-tight">No products found</h2>
                            <p className="text-slate-500 max-w-sm mx-auto">We couldn't find any items in the "{category}" category at the moment. Please try another category or check back later.</p>
                        </div>
                        <Button 
                            variant="primary" 
                            className="rounded-xl h-14 px-10 font-bold shadow-xl shadow-primary/20"
                            onClick={() => navigate('/products')}
                        >
                            <ArrowLeft className="mr-2 h-5 w-5" /> Explore All Products
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CategoryPage;