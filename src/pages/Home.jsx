import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  RotateCcw, 
  ShieldCheck, 
  Headset,
  Heart,
  Star
} from 'lucide-react';
import { getFeaturedProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const featured = getFeaturedProducts();
      setFeaturedProducts(featured || []);
    } catch (error) {
      console.error("Error loading featured products:", error);
      setFeaturedProducts([]);
    }
  }, []);

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
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  const features = [
    { title: 'Free Shipping', description: 'On orders over $50', icon: <Truck className="h-8 w-8 text-primary" /> },
    { title: 'Easy Returns', description: '30-day return policy', icon: <RotateCcw className="h-8 w-8 text-primary" /> },
    { title: 'Secure Payment', description: 'Safe & encrypted', icon: <ShieldCheck className="h-8 w-8 text-primary" /> },
    { title: '24/7 Support', description: 'Dedicated support', icon: <Headset className="h-8 w-8 text-primary" /> }
  ];

  const categories = [
    { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80&w=500', path: '/category/electronics' },
    { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=500', path: '/category/fashion' },
    { name: 'Home', image: 'https://images.unsplash.com/photo-1513584684374-8bdb74838a0f?auto=format&fit=crop&q=80&w=500', path: '/category/home' },
    { name: 'Lifestyle', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500', path: '/category/lifestyle' }
  ];

  return (
    <div className="flex flex-col gap-20 pb-20 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background -z-10" />
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] -z-10" />
        
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 w-fit">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">New Season Arrival</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="text-gradient">Daily Lifestyle</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
              Experience the next generation of shopping. High-quality products curated specifically for your modern lifestyle.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-14 text-lg bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20 group"
                onClick={() => navigate('/products')}
              >
                Shop Collection
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 h-14 text-lg glass"
                onClick={() => navigate('/about')}
              >
                Explore Story
              </Button>
            </div>
            
            <div className="flex items-center gap-8 pt-8">
              <div className="flex flex-col">
                <span className="text-3xl font-bold">12k+</span>
                <span className="text-sm text-muted-foreground">Products</span>
              </div>
              <div className="h-10 w-[1px] bg-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold">45k+</span>
                <span className="text-sm text-muted-foreground">Customers</span>
              </div>
              <div className="h-10 w-[1px] bg-border" />
              <div className="flex flex-col">
                <span className="text-3xl font-bold">180+</span>
                <span className="text-sm text-muted-foreground">Brands</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl premium-shadow group">
              <img 
                src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" 
                alt="Main Collection"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 md:-left-12 glass p-4 rounded-2xl shadow-xl flex items-center gap-4 z-10 border border-white/50"
            >
              <div className="h-12 w-12 rounded-xl bg-orange-500 flex items-center justify-center text-white">
                <Star className="h-6 w-6 fill-current" />
              </div>
              <div>
                <p className="font-bold text-lg">4.9 / 5.0</p>
                <p className="text-xs text-muted-foreground">Customer Satisfaction</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-[2rem] bg-muted/30 border border-border hover:border-primary/20 hover:bg-white dark:hover:bg-muted/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
            >
              <div className="mb-6 p-4 rounded-2xl bg-primary/5 w-fit group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Part */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold tracking-tight">Our Best Sellers</h2>
            <p className="text-muted-foreground max-w-lg">
              Explore our most popular pieces that customers can't get enough of. High-performance meets high-style.
            </p>
          </div>
          <Button 
            variant="ghost" 
            className="group hover:text-primary p-0 h-auto"
            onClick={() => navigate('/products')}
          >
            Explore all products <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {featuredProducts.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border text-muted-foreground">
            No products found in the collection yet.
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {featuredProducts.slice(0, 4).map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/products/${product.id}`)}
                className="group relative flex flex-col bg-card rounded-[2rem] overflow-hidden border border-border cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=500'}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <Button 
                      size="icon" 
                      variant="glass" 
                      className="rounded-full shadow-lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.info("Coming soon!");
                      }}
                    >
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-primary/95 text-white border-0 py-1 px-3">
                      Featured
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{product.category || 'Collection'}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                      <span className="text-xs font-semibold">{product.rating || '4.8'}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-4 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-xl font-bold">${product.price.toFixed(2)}</p>
                    <Button 
                      size="icon" 
                      className="rounded-xl h-10 w-10 bg-primary hover:bg-primary/90 transition-all opacity-100 lg:opacity-0 group-hover:opacity-100 lg:translate-y-2 group-hover:translate-y-0"
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
      </section>

      {/* Categories Grid */}
      <section className="bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Curated Categories</h2>
            <p className="text-muted-foreground italic lg:text-lg">
              "Style is a way to say who you are without having to speak."
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                onClick={() => navigate(cat.path)}
                className="group relative h-80 rounded-[2.5rem] overflow-hidden cursor-pointer"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:via-black/40 transition-colors" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-2">{cat.name}</h3>
                  <p className="text-white/70 text-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Discover 150+ Items
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="relative glass p-12 lg:p-20 rounded-[3rem] overflow-hidden shadow-2xl premium-shadow text-center">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <ShoppingBag className="h-40 w-40" />
          </div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold">Get 20% Off Your First Order</h2>
            <p className="text-muted-foreground text-lg">
              Join our community of 45k+ shoppers and get exclusive access to new drops and private sales.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={(e) => { e.preventDefault(); toast.success("Subscribed successfully!"); }}>
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-14 rounded-2xl glass px-6"
                required
              />
              <Button size="lg" className="h-14 rounded-2xl px-10 bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </form>
            <p className="text-xs text-muted-foreground">
              By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
 