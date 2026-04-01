import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Star, 
  Heart,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  Share2
} from 'lucide-react';
import { getProductById, getRelatedProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('specs');
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      setLoading(true);
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      if (foundProduct) {
        setRelatedProducts(getRelatedProducts(id));
      }
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addItem({
      id: product.id,
      price: product.price,
      name: product.name,
      image: product.image,
      quantity: quantity
    }));
    toast.success(`${product.name} added to cart!`, {
      description: `${quantity} unit${quantity > 1 ? 's' : ''} added successfully.`
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <div className="p-6 rounded-full bg-muted">
          <ShoppingBag className="h-12 w-12 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold">Product not found</h2>
        <Button onClick={() => navigate('/products')} className="rounded-xl">
          Back to Catalog
        </Button>
      </div>
    );
  }

  const allImages = [product.image, ...(product.images || [])];

  return (
    <div className="container mx-auto px-4 py-12 lg:py-20 overflow-x-hidden">
      {/* Breadcrumbs / Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 group"
      >
        <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-medium">Back to collection</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Product Images Gallery */}
        <div className="space-y-6">
          <motion.div 
            layoutId={`product-image-${product.id}`}
            className="relative aspect-square rounded-[3rem] overflow-hidden bg-muted glass border border-white/20 shadow-2xl"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
                src={allImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 px-4 py-2 glass rounded-full border border-white/30">
              {allImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`h-2 transition-all rounded-full ${
                    selectedImage === idx ? 'w-8 bg-primary' : 'w-2 bg-primary/20 hover:bg-primary/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {allImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === idx ? 'border-primary ring-4 ring-primary/10' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Sidebar */}
        <div className="flex flex-col space-y-10">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="px-3 py-1 border-primary/20 text-primary bg-primary/5 uppercase tracking-widest text-[10px]">
                {product.category}
              </Badge>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 glass">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 glass">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
              {product.name}
            </h1>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-orange-400 text-orange-400' : 'text-muted'}`} 
                  />
                ))}
                <span className="ml-2 text-sm font-bold">{product.rating}</span>
                <span className="text-sm text-muted-foreground ml-1">({product.reviews} reviews)</span>
              </div>
              <div className="h-4 w-[1px] bg-border" />
              <div className="flex items-center gap-2 text-sm font-medium text-green-500">
                <Check className="h-4 w-4" />
                In Stock
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-bold text-gradient">${product.price.toFixed(2)}</span>
              {product.discount > 0 && (
                <span className="text-xl text-muted-foreground line-through opacity-50">
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="p-8 rounded-[2.5rem] glass border border-white/20 shadow-xl space-y-8">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Quantity</p>
                <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-1 w-fit border border-border">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-xl h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Subtotal</p>
                <p className="text-3xl font-bold">${(product.price * quantity).toFixed(2)}</p>
              </div>
            </div>

            <Button 
              size="lg" 
              className="w-full h-16 rounded-[1.25rem] text-lg font-bold bg-primary hover:bg-primary/9 shadow-xl shadow-primary/20 group"
              onClick={handleAddToCart}
            >
              <ShoppingBag className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
              Add to Bag
            </Button>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center">
              <div className="space-y-2">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-[10px] uppercase font-bold tracking-widest">Free Delivery</p>
              </div>
              <div className="space-y-2">
                <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                <p className="text-[10px] uppercase font-bold tracking-widest">30 Days Return</p>
              </div>
              <div className="space-y-2">
                <ShieldCheck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-[10px] uppercase font-bold tracking-widest">2 Year Warranty</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Extended Info Tabs */}
      <div className="mt-24 lg:mt-32">
        <div className="flex gap-12 border-b border-border mb-12">
          {['specs', 'description', 'reviews'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-sm font-bold uppercase tracking-[0.2em] transition-all relative ${
                activeTab === tab ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab" 
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full shadow-lg shadow-primary/30" 
                />
              )}
            </button>
          ))}
        </div>

        <div className="min-h-[300px]">
          <AnimatePresence mode="wait">
            {activeTab === 'specs' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-6"
              >
                {product.specs && Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-4 border-b border-border/50 group">
                    <span className="text-muted-foreground capitalize group-hover:text-foreground transition-colors">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="font-bold text-right">
                      {Array.isArray(value) ? value.join(', ') : value.toString()}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'description' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-3xl prose prose-slate dark:prose-invert"
              >
                <h3 className="text-2xl font-bold mb-6">Designed for Perfection</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.longDescription || product.description}
                </p>
                <p className="text-lg text-muted-foreground mt-6 italic">
                  Crafted with premium materials and engineered for durability. Every detail is meticulously thought out to provide you with the best experience possible.
                </p>
              </motion.div>
            )}

            {activeTab === 'reviews' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-[3rem] border border-dashed border-border"
              >
                <Star className="h-10 w-10 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold">Review System Coming Soon</h3>
                <p className="text-muted-foreground">We're currently refactoring our community feedback section.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold tracking-tight">You might also like</h2>
            <Button variant="ghost" className="rounded-xl group" onClick={() => navigate('/products')}>
              View All <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((p, idx) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => navigate(`/products/${p.id}`)}
                className="group p-4 bg-card rounded-[2rem] border border-border hover:shadow-2xl hover:shadow-primary/10 transition-all cursor-pointer"
              >
                <div className="aspect-square rounded-2xl overflow-hidden mb-6">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                </div>
                <div className="px-2 space-y-2">
                  <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-1">{p.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">${p.price.toFixed(2)}</span>
                    <div className="flex items-center gap-1 scale-75 origin-right">
                      <Star className="h-3 w-3 fill-orange-400 text-orange-400" />
                      <span className="text-xs font-bold">{p.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
 