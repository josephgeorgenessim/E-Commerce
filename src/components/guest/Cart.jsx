import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight,
  ShoppingBasket
} from 'lucide-react';
import {
    selectCartItems,
    selectCartTotal,
    updateCartItem,
    removeFromCart
} from '../../features/cart/cartSlice';
import { Button } from '../ui/button';

const Cart = ({ open, onClose, onCheckout }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems) || [];
    const cartTotal = useSelector(selectCartTotal) || 0;

    const handleIncreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            dispatch(updateCartItem({ id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            if (item.quantity > 1) {
                dispatch(updateCartItem({ id, quantity: item.quantity - 1 }));
            } else {
                dispatch(removeFromCart(id));
            }
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    return (
        <AnimatePresence>
            {open && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-background/80 backdrop-blur-xl border-l border-white/20 z-[101] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 flex items-center justify-between border-b border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                                    <ShoppingBag className="h-6 w-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Your Bag</h2>
                                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                            </div>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={onClose}
                                className="rounded-full hover:bg-white/10"
                            >
                                <X className="h-6 w-6" />
                            </Button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-60">
                                    <div className="p-6 rounded-full bg-muted">
                                        <ShoppingBasket className="h-12 w-12" />
                                    </div>
                                    <p className="font-medium text-lg text-muted-foreground">Your bag is empty</p>
                                    <Button variant="outline" onClick={onClose} className="rounded-xl border-primary/20 hover:bg-primary/5">
                                        Start Shopping
                                    </Button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <AnimatePresence mode="popLayout">
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="group relative flex gap-4 p-4 rounded-3xl glass border border-white/10 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
                                            >
                                                <div className="relative h-24 w-24 rounded-2xl overflow-hidden flex-shrink-0 bg-muted">
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name} 
                                                        className="h-full w-full object-cover transition-transform group-hover:scale-110"
                                                    />
                                                </div>

                                                <div className="flex-1 flex flex-col justify-between py-1">
                                                    <div className="space-y-1">
                                                        <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                                                        <p className="text-primary font-bold">${item.price.toFixed(2)}</p>
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3 bg-background/50 rounded-xl p-1 border border-border">
                                                            <button 
                                                                onClick={() => handleDecreaseQuantity(item.id)}
                                                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                                                            >
                                                                <Minus className="h-3 w-3" />
                                                            </button>
                                                            <span className="text-sm font-bold w-4 text-center">{item.quantity || 1}</span>
                                                            <button 
                                                                onClick={() => handleIncreaseQuantity(item.id)}
                                                                className="h-7 w-7 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
                                                            >
                                                                <Plus className="h-3 w-3" />
                                                            </button>
                                                        </div>

                                                        <button 
                                                            onClick={() => handleRemoveItem(item.id)}
                                                            className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (
                            <div className="p-8 space-y-6 bg-background/50 backdrop-blur-xl border-t border-white/10 rounded-t-[2.5rem]">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground font-medium uppercase tracking-widest">Subtotal</span>
                                        <span className="font-bold font-mono">${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground font-medium uppercase tracking-widest">Shipping</span>
                                        <span className="text-green-500 font-bold uppercase tracking-widest">Free</span>
                                    </div>
                                    <div className="h-[1px] bg-white/10" />
                                    <div className="flex items-center justify-between text-xl font-bold">
                                        <span>Total</span>
                                        <span className="text-primary text-gradient">${cartTotal.toFixed(2)}</span>
                                    </div>
                                </div>

                                <Button 
                                    className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/9 group"
                                    onClick={onCheckout}
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                
                                <p className="text-[10px] text-center text-muted-foreground font-medium uppercase tracking-[0.2em] opacity-50">
                                    Secure checkout powered by ShopSphere
                                </p>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default Cart;
 