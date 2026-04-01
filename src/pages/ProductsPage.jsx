import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  ShoppingBag,
  SlidersHorizontal,
  LayoutGrid,
  List as ListIcon,
  RotateCcw,
  Search,
  X
} from 'lucide-react';
import { getAllProducts, getFilteredProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState('grid');
    
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 2000,
        rating: 0,
        sortBy: 'popular',
        searchTerm: ''
    });

    useEffect(() => {
        const products = getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);

        const max = Math.max(...products.map(p => p.price), 0);
        setFilters(prev => ({ ...prev, maxPrice: max || 2000 }));
    }, []);

    const categories = [...new Set(allProducts.map(p => p.category))];

    useEffect(() => {
        const filterCriteria = {
            category: filters.category,
            rating: filters.rating,
            search: filters.searchTerm
        };

        let results = getFilteredProducts(filterCriteria);

        results = results.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);

        results.sort((a, b) => {
            switch (filters.sortBy) {
                case 'priceAsc': return a.price - b.price;
                case 'priceDesc': return b.price - a.price;
                case 'newest': return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
                default: return b.rating - a.rating;
            }
        });

        setFilteredProducts(results);
    }, [filters, allProducts]);

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        dispatch(addItem({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: 1 }));
        toast.success(`${product.name} added to cart!`);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1 }
    };

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
                <div className="space-y-4">
                    <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary bg-primary/5 uppercase tracking-widest text-[10px]">
                        Discovery
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Collection</h1>
                    <p className="text-muted-foreground max-w-md">
                        Browse through our meticulously curated list of high-end products.
                    </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                            placeholder="Search anything..." 
                            className="pl-10 h-11 glass rounded-xl border-none focus-visible:ring-primary/20"
                            value={filters.searchTerm}
                            onChange={(e) => setFilters(prev => ({...prev, searchTerm: e.target.value}))}
                        />
                    </div>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className={`rounded-xl h-11 w-11 ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        <LayoutGrid className="h-5 w-5" />
                    </Button>
                    <Button 
                        variant="outline" 
                        size="icon" 
                        className={`rounded-xl h-11 w-11 ${viewMode === 'list' ? 'bg-primary/10 text-primary' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        <ListIcon className="h-5 w-5" />
                    </Button>
                    <Button 
                        className="rounded-xl h-11 px-5 flex items-center gap-2 lg:hidden"
                        onClick={() => setIsFilterOpen(true)}
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Desktop Filters */}
                <aside className="hidden lg:flex flex-col gap-10">
                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50">Categories</h3>
                        <div className="flex flex-col gap-2">
                            <button 
                                onClick={() => setFilters(prev => ({...prev, category: ''}))}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                    filters.category === '' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted'
                                }`}
                            >
                                <span className="font-medium">All Products</span>
                                <span className="opacity-60 text-xs">{allProducts.length}</span>
                            </button>
                            {categories.map(cat => (
                                <button 
                                    key={cat}
                                    onClick={() => setFilters(prev => ({...prev, category: cat}))}
                                    className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                                        filters.category === cat ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'hover:bg-muted'
                                    }`}
                                >
                                    <span className="font-medium capitalize">{cat}</span>
                                    <span className="opacity-60 text-xs">
                                        {allProducts.filter(p => p.category === cat).length}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50">Sort By</h3>
                        <select 
                            className="w-full h-12 rounded-xl border-none glass px-4 focus:ring-primary/20"
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({...prev, sortBy: e.target.value}))}
                        >
                            <option value="popular">Popularity</option>
                            <option value="priceAsc">Price: Low to High</option>
                            <option value="priceDesc">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/50">Min Rating</h3>
                        <div className="flex gap-2">
                            {[4, 3, 2, 1].map(r => (
                                <button
                                    key={r}
                                    onClick={() => setFilters(prev => ({...prev, rating: r}))}
                                    className={`flex-1 h-10 rounded-lg flex items-center justify-center gap-1 transition-all ${
                                        filters.rating === r ? 'bg-orange-400 text-white' : 'bg-muted hover:bg-muted/80'
                                    }`}
                                >
                                    {r}+ <Star className="h-3 w-3 fill-current" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <Button 
                        variant="ghost" 
                        className="text-destructive hover:bg-destructive/10 w-fit gap-2"
                        onClick={() => setFilters({
                            category: '',
                            minPrice: 0,
                            maxPrice: 2000,
                            rating: 0,
                            sortBy: 'popular',
                            searchTerm: ''
                        })}
                    >
                        <RotateCcw className="h-4 w-4" />
                        Reset All
                    </Button>
                </aside>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    {filteredProducts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-32 text-center space-y-6 glass rounded-[3rem]">
                            <div className="p-6 rounded-full bg-muted/50">
                                <Search className="h-12 w-12 text-muted-foreground" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-2xl font-bold">No results found</h3>
                                <p className="text-muted-foreground">Try adjusting your filters or search keywords.</p>
                            </div>
                            <Button variant="outline" className="rounded-xl" onClick={() => setFilters({category: '', minPrice: 0, maxPrice: 2000, rating: 0, sortBy: 'popular', searchTerm: ''})}>
                                Clear Search
                            </Button>
                        </div>
                    ) : (
                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            key={filters.category + filters.sortBy + filters.searchTerm}
                            className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'}`}
                        >
                            {filteredProducts.map(product => (
                                <motion.div
                                    key={product.id}
                                    variants={itemVariants}
                                    whileHover={{ y: -10 }}
                                    onClick={() => navigate(`/products/${product.id}`)}
                                    className={`group relative bg-card rounded-[2.5rem] border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden cursor-pointer flex ${
                                        viewMode === 'grid' ? 'flex-col' : 'flex-row items-center gap-8 p-4'
                                    }`}
                                >
                                    <div className={`${viewMode === 'grid' ? 'relative aspect-[4/5]' : 'h-48 w-48 shrink-0 rounded-2xl'} overflow-hidden`}>
                                        <img 
                                            src={product.image} 
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute top-4 right-4 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                                            <Button 
                                                size="icon" 
                                                variant="glass" 
                                                className="rounded-full shadow-lg h-10 w-10"
                                                onClick={(e) => { e.stopPropagation(); toast.info("Added to Wishlist!"); }}
                                            >
                                                <Star className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    <div className={`p-8 flex flex-col justify-between ${viewMode === 'grid' ? 'h-full' : 'flex-1 py-4 pr-12'}`}>
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{product.category}</span>
                                                <div className="flex items-center gap-1">
                                                    <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                                                    <span className="text-xs font-bold">{product.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                {product.name}
                                            </h3>
                                            {viewMode === 'list' && (
                                                <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center justify-between mt-8">
                                            <div className="flex flex-col">
                                                <span className="text-xs text-muted-foreground/60 font-medium">Price</span>
                                                <span className="text-2xl font-bold text-gradient">${product.price.toFixed(2)}</span>
                                            </div>
                                            <Button 
                                                size="icon" 
                                                className="rounded-2xl h-12 w-12 bg-primary hover:bg-primary/9 group-hover:rotate-6 transition-all"
                                                onClick={(e) => handleAddToCart(product, e)}
                                            >
                                                <ShoppingBag className="h-5 w-5 text-white" />
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Sheet (Modal-like) */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsFilterOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            className="fixed right-0 top-0 bottom-0 w-[320px] bg-background z-[70] p-8 space-y-12 shadow-2xl"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold">Filters</h2>
                                <Button variant="ghost" size="icon" onClick={() => setIsFilterOpen(false)} className="rounded-full h-10 w-10 bg-muted">
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>
                            
                            <div className="space-y-8 overflow-y-auto pb-20 h-full scrollbar-hide">
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Categories</h3>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        <button 
                                            onClick={() => setFilters(prev => ({...prev, category: ''}))}
                                            className={`px-4 py-2 rounded-xl transition-all ${
                                                filters.category === '' ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-foreground'
                                            }`}
                                        >
                                            All
                                        </button>
                                        {categories.map(cat => (
                                            <button 
                                                key={cat}
                                                onClick={() => setFilters(prev => ({...prev, category: cat}))}
                                                className={`px-4 py-2 rounded-xl transition-all ${
                                                    filters.category === cat ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80 text-foreground'
                                                }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                
                                <div className="space-y-4">
                                    <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Sort By</h3>
                                    <div className="flex flex-col gap-2">
                                        {[
                                            {label: 'Popularity', value: 'popular'},
                                            {label: 'Price: Low to High', value: 'priceAsc'},
                                            {label: 'Price: High to Low', value: 'priceDesc'},
                                            {label: 'Newest', value: 'newest'}
                                        ].map(item => (
                                            <button
                                                key={item.value}
                                                onClick={() => setFilters(prev => ({...prev, sortBy: item.value}))}
                                                className={`text-left px-4 py-3 rounded-xl transition-all font-medium ${
                                                    filters.sortBy === item.value ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                                                }`}
                                            >
                                                {item.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <Button className="w-full h-14 rounded-2xl bg-primary text-lg font-bold shadow-xl shadow-primary/20" onClick={() => setIsFilterOpen(false)}>
                                    Apply Filters
                                </Button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductsPage;
 