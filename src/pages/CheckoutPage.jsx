import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Truck, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  MapPin,
  Clock,
  ShieldCheck,
  Package,
  ShoppingBag,
  ArrowRight
} from 'lucide-react';
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { toast } from 'sonner';

const CheckoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'US',
        phone: '',
        email: '',
        shippingMethod: 'standard'
    });
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'credit'
    });
    const [errors, setErrors] = useState({});
    const [orderComplete, setOrderComplete] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const steps = [
      { id: 'shipping', title: 'Shipping', icon: Truck },
      { id: 'payment', title: 'Payment', icon: CreditCard },
      { id: 'review', title: 'Review', icon: CheckCircle2 }
    ];

    const getShippingCost = () => {
        switch (shippingData.shippingMethod) {
            case 'express': return 14.99;
            case 'priority': return 24.99;
            default: return cartTotal > 100 ? 0 : 5.99;
        }
    };

    const taxRate = 0.0825;
    const taxAmount = cartTotal * taxRate;
    const shippingCost = getShippingCost();
    const finalTotal = cartTotal + shippingCost + taxAmount;

    const handleInputChange = (setter) => (e) => {
        const { name, value } = e.target;
        setter(prev => ({ ...prev, [name]: value }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
    };

    const validateShipping = () => {
        const newErrors = {};
        const required = ['firstName', 'lastName', 'address', 'city', 'zipCode', 'phone', 'email'];
        required.forEach(f => { if (!shippingData[f]) newErrors[f] = 'Required'; });
        if (shippingData.email && !/\S+@\S+\.\S+/.test(shippingData.email)) newErrors.email = 'Invalid email';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePayment = () => {
        const newErrors = {};
        if (paymentData.paymentMethod === 'credit') {
            const required = ['cardName', 'cardNumber', 'expiryDate', 'cvv'];
            required.forEach(f => { if (!paymentData[f]) newErrors[f] = 'Required'; });
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (activeStep === 0 && !validateShipping()) return;
        if (activeStep === 1 && !validatePayment()) return;
        setActiveStep(prev => prev + 1);
        window.scrollTo(0, 0);
    };

    const handlePlaceOrder = async () => {
        // Simulate API call
        toast.promise(new Promise(res => setTimeout(res, 2000)), {
            loading: 'Processing your order...',
            success: () => {
                setOrderComplete(true);
                dispatch(clearCart());
                return 'Order placed successfully!';
            },
            error: 'Something went wrong.'
        });
    };

    if (orderComplete) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-xl w-full glass p-12 rounded-[3.5rem] border border-white/20 shadow-2xl text-center space-y-8"
                >
                    <div className="relative mx-auto w-24 h-24">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 12, delay: 0.2 }}
                            className="absolute inset-0 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-500/20"
                        >
                            <CheckCircle2 className="h-12 w-12 text-white" />
                        </motion.div>
                        <motion.div 
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 bg-green-500/30 rounded-full"
                        />
                    </div>
                    
                    <div className="space-y-4">
                        <h1 className="text-4xl font-bold tracking-tight text-gradient">Order Confirmed!</h1>
                        <p className="text-muted-foreground text-lg italic">
                            Thank you for choosing ShopSphere. Your journey to premium style has begun.
                        </p>
                        <p className="text-sm border py-2 px-4 rounded-full border-primary/20 w-fit mx-auto font-mono">
                            Order ID: #SHP-{Math.floor(100000 + Math.random() * 900000)}
                        </p>
                    </div>

                    <div className="pt-8 space-y-4">
                        <Button className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20" onClick={() => navigate('/')}>
                            Back to Store
                        </Button>
                        <p className="text-xs text-muted-foreground">A confirmation email has been sent to {shippingData.email}</p>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center space-y-8">
                <div className="p-10 rounded-full bg-muted/50 border border-dashed border-border">
                    <ShoppingBag className="h-20 w-20 text-muted-foreground/30" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Your bag is currently empty</h2>
                  <p className="text-muted-foreground max-w-sm mx-auto">Explore our premium collections and find something extraordinary today.</p>
                </div>
                <Button size="lg" className="rounded-2xl h-14 px-10 group" onClick={() => navigate('/products')}>
                    Browse Collections <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12 lg:py-20 min-h-screen">
            <div className="max-w-6xl mx-auto space-y-12">
                {/* Header & Stepper */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                  <div className="space-y-2">
                      <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">Checkout</h1>
                      <p className="text-muted-foreground font-medium uppercase tracking-widest text-xs">
                        Complete your purchase in 3 simple steps
                      </p>
                  </div>

                  <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-3xl border border-border/50">
                      {steps.map((step, idx) => (
                        <div key={step.id} className="flex items-center gap-2">
                            <div className={`
                                h-10 w-10 rounded-2xl flex items-center justify-center transition-all duration-500
                                ${activeStep >= idx ? 'bg-primary text-white shadow-lg shadow-primary/25' : 'bg-background text-muted-foreground'}
                            `}>
                                <step.icon className="h-5 w-5" />
                            </div>
                            <span className={`text-xs font-bold uppercase tracking-widest hidden sm:block ${activeStep >= idx ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {step.title}
                            </span>
                            {idx < steps.length - 1 && <div className="w-4 h-[1px] bg-border mx-2" />}
                        </div>
                      ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    {/* Main Flow */}
                    <div className="lg:col-span-8 space-y-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass p-8 md:p-10 rounded-[3rem] border border-white/20 shadow-xl"
                            >
                                {activeStep === 0 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold">Shipping Information</h2>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">First Name</label>
                                                <Input name="firstName" value={shippingData.firstName} onChange={handleInputChange(setShippingData)} placeholder="John" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.firstName && <span className="text-[10px] text-destructive font-bold ml-1">{errors.firstName}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Last Name</label>
                                                <Input name="lastName" value={shippingData.lastName} onChange={handleInputChange(setShippingData)} placeholder="Doe" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.lastName && <span className="text-[10px] text-destructive font-bold ml-1">{errors.lastName}</span>}
                                            </div>
                                            <div className="md:col-span-2 space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Street Address</label>
                                                <Input name="address" value={shippingData.address} onChange={handleInputChange(setShippingData)} placeholder="123 Luxury Ave" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.address && <span className="text-[10px] text-destructive font-bold ml-1">{errors.address}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">City</label>
                                                <Input name="city" value={shippingData.city} onChange={handleInputChange(setShippingData)} placeholder="Metropolis" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.city && <span className="text-[10px] text-destructive font-bold ml-1">{errors.city}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Zip Code</label>
                                                <Input name="zipCode" value={shippingData.zipCode} onChange={handleInputChange(setShippingData)} placeholder="10001" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.zipCode && <span className="text-[10px] text-destructive font-bold ml-1">{errors.zipCode}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Email</label>
                                                <Input name="email" type="email" value={shippingData.email} onChange={handleInputChange(setShippingData)} placeholder="john@example.com" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.email && <span className="text-[10px] text-destructive font-bold ml-1">{errors.email}</span>}
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Phone</label>
                                                <Input name="phone" value={shippingData.phone} onChange={handleInputChange(setShippingData)} placeholder="+1 (555) 000-0000" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                                {errors.phone && <span className="text-[10px] text-destructive font-bold ml-1">{errors.phone}</span>}
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-6">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Select delivery method</label>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {[
                                                    { id: 'standard', name: 'Standard', time: '3-5 Days', price: cartTotal > 100 ? 'Free' : '$5.99' },
                                                    { id: 'express', name: 'Express', time: '2-3 Days', price: '$14.99' },
                                                    { id: 'priority', name: 'Priority', time: 'Overnight', price: '$24.99' }
                                                ].map(m => (
                                                    <button
                                                        key={m.id}
                                                        onClick={() => setShippingData(p => ({ ...p, shippingMethod: m.id }))}
                                                        className={`p-6 rounded-[2rem] border transition-all text-left space-y-4 ${
                                                            shippingData.shippingMethod === m.id 
                                                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10 ring-1 ring-primary' 
                                                            : 'border-white/10 hover:border-white/20'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                          <span className="font-bold">{m.name}</span>
                                                          <div className={`h-4 w-4 rounded-full border-2 p-1 ${shippingData.shippingMethod === m.id ? 'border-primary' : 'border-white/20'}`}>
                                                            {shippingData.shippingMethod === m.id && <div className="w-full h-full bg-primary rounded-full" />}
                                                          </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                          <p className="text-xs text-muted-foreground font-medium">{m.time}</p>
                                                          <p className="font-bold text-primary">{m.price}</p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 1 && (
                                    <div className="space-y-8">
                                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                            <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                                <CreditCard className="h-6 w-6" />
                                            </div>
                                            <h2 className="text-2xl font-bold">Payment Method</h2>
                                        </div>

                                        <div className="flex gap-4 p-1 glass rounded-2xl border border-white/10 w-fit">
                                            {['credit', 'paypal', 'apple'].map(m => (
                                              <button
                                                  key={m}
                                                  onClick={() => setPaymentData(p => ({ ...p, paymentMethod: m }))}
                                                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                                                      paymentData.paymentMethod === m ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-muted-foreground hover:text-foreground'
                                                  }`}
                                              >
                                                  {m}
                                              </button>
                                            ))}
                                        </div>

                                        {paymentData.paymentMethod === 'credit' ? (
                                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                              <div className="md:col-span-2 space-y-2">
                                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Cardholder Name</label>
                                                  <Input name="cardName" value={paymentData.cardName} onChange={handleInputChange(setPaymentData)} placeholder="JOHN DOE" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20 uppercase" />
                                              </div>
                                              <div className="md:col-span-2 space-y-2">
                                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Card Number</label>
                                                  <Input name="cardNumber" value={paymentData.cardNumber} onChange={handleInputChange(setPaymentData)} placeholder="•••• •••• •••• ••••" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                              </div>
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">Expiry Date</label>
                                                  <Input name="expiryDate" value={paymentData.expiryDate} onChange={handleInputChange(setPaymentData)} placeholder="MM/YY" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                              </div>
                                              <div className="space-y-2">
                                                  <label className="text-[10px] font-black uppercase tracking-[0.2em] ml-1 text-muted-foreground">CVV</label>
                                                  <Input name="cvv" value={paymentData.cvv} onChange={handleInputChange(setPaymentData)} placeholder="•••" type="password" className="h-14 glass rounded-2xl border-none focus-visible:ring-primary/20" />
                                              </div>
                                          </div>
                                        ) : (
                                          <div className="py-20 flex flex-col items-center justify-center text-center space-y-6 bg-muted/20 rounded-[2.5rem] border border-dashed border-border">
                                              <Clock className="h-12 w-12 text-muted-foreground opacity-30" />
                                              <h3 className="text-xl font-bold">Redirect to complete</h3>
                                              <p className="text-muted-foreground max-w-xs">You'll be redirected to complete your {paymentData.paymentMethod} payment after order review.</p>
                                          </div>
                                        )}
                                        
                                        <div className="flex items-center gap-3 p-6 rounded-3xl bg-primary/5 border border-primary/10">
                                            <ShieldCheck className="h-6 w-6 text-primary" />
                                            <p className="text-xs font-medium text-muted-foreground">
                                              Your transaction is secure and encrypted. We do not store full credit card information.
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {activeStep === 2 && (
                                  <div className="space-y-10">
                                      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                                          <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                                              <CheckCircle2 className="h-6 w-6" />
                                          </div>
                                          <h2 className="text-2xl font-bold">Order Review</h2>
                                      </div>

                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                          <div className="space-y-6">
                                              <div className="space-y-4">
                                                  <div className="flex items-center gap-2 text-primary">
                                                      <MapPin className="h-4 w-4" />
                                                      <span className="text-[10px] font-bold uppercase tracking-widest">Shipping To</span>
                                                  </div>
                                                  <div className="glass p-6 rounded-3xl border border-white/10 text-sm space-y-1">
                                                      <p className="font-bold">{shippingData.firstName} {shippingData.lastName}</p>
                                                      <p className="text-muted-foreground">{shippingData.address}</p>
                                                      <p className="text-muted-foreground">{shippingData.city}, {shippingData.state} {shippingData.zipCode}</p>
                                                      <p className="text-muted-foreground">{shippingData.phone}</p>
                                                  </div>
                                              </div>

                                              <div className="space-y-4">
                                                  <div className="flex items-center gap-2 text-primary">
                                                      <CreditCard className="h-4 w-4" />
                                                      <span className="text-[10px] font-bold uppercase tracking-widest">Payment Method</span>
                                                  </div>
                                                  <div className="glass p-6 rounded-3xl border border-white/10 flex items-center justify-between">
                                                      <div className="flex items-center gap-4">
                                                          <div className="h-10 w-14 bg-muted rounded-lg flex items-center justify-center font-bold text-[10px] italic">CARD</div>
                                                          <div>
                                                            <p className="text-sm font-bold uppercase tracking-widest">{paymentData.paymentMethod}</p>
                                                            <p className="text-xs text-muted-foreground">Ending in {paymentData.cardNumber.slice(-4) || '••••'}</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="space-y-6">
                                              <div className="flex items-center gap-2 text-primary">
                                                  <Package className="h-4 w-4" />
                                                  <span className="text-[10px] font-bold uppercase tracking-widest">Items in order</span>
                                              </div>
                                              <div className="glass p-6 rounded-3xl border border-white/10 space-y-6 max-h-[300px] overflow-y-auto">
                                                  {cartItems.map(item => (
                                                      <div key={item.id} className="flex gap-4">
                                                          <div className="h-16 w-16 rounded-xl overflow-hidden bg-muted flex-shrink-0">
                                                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                          </div>
                                                          <div className="flex-1 space-y-1">
                                                              <h4 className="text-xs font-bold line-clamp-1">{item.name}</h4>
                                                              <p className="text-xs text-muted-foreground font-mono italic">Qty: {item.quantity}</p>
                                                              <p className="text-xs font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                                                          </div>
                                                      </div>
                                                  ))}
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-12 border-t border-white/10">
                                    <Button
                                        variant="ghost"
                                        onClick={activeStep === 0 ? () => navigate('/products') : () => setActiveStep(p => p - 1)}
                                        className="rounded-2xl h-14 px-8 text-muted-foreground hover:text-foreground"
                                    >
                                        <ChevronLeft className="mr-2 h-4 w-4" />
                                        {activeStep === 0 ? 'Back to Store' : 'Previous Step'}
                                    </Button>

                                    {activeStep < 2 ? (
                                      <Button 
                                          className="rounded-2xl h-14 px-10 font-bold group"
                                          onClick={handleNext}
                                      >
                                          Continue <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                      </Button>
                                    ) : (
                                      <Button 
                                          className="rounded-2xl h-14 px-10 font-bold bg-primary hover:bg-primary/9 shadow-xl shadow-primary/20 group"
                                          onClick={handlePlaceOrder}
                                      >
                                          Complete Order <CheckCircle2 className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                                      </Button>
                                    )}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Summary Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <motion.div 
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass p-8 rounded-[3rem] border border-white/20 shadow-xl space-y-8 sticky top-24"
                        >
                            <h3 className="text-xl font-bold tracking-tight border-b border-white/10 pb-4">Order Summary</h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground opacity-60 uppercase tracking-widest font-bold text-[10px]">Subtotal</span>
                                    <span className="font-bold">${cartTotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground opacity-60 uppercase tracking-widest font-bold text-[10px]">Shipping</span>
                                    <span className={`font-bold ${shippingCost === 0 ? 'text-green-500' : ''}`}>
                                      {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground opacity-60 uppercase tracking-widest font-bold text-[10px]">Estimated Tax</span>
                                    <span className="font-bold">${taxAmount.toFixed(2)}</span>
                                </div>
                                <div className="h-[1px] bg-white/10" />
                                <div className="flex justify-between items-baseline pt-2">
                                    <span className="text-lg font-bold">Total</span>
                                    <div className="text-right">
                                      <span className="text-3xl font-black text-gradient block">${finalTotal.toFixed(2)}</span>
                                      <p className="text-[10px] text-muted-foreground opacity-60 uppercase tracking-widest font-bold mt-1">Or 4 payments of ${(finalTotal / 4).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4 space-y-4">
                                <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-border/50">
                                    <div className="h-8 w-8 bg-background rounded-lg flex items-center justify-center">
                                      <Package className="h-4 w-4 text-primary" />
                                    </div>
                                    <div>
                                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Items in bag</p>
                                      <p className="text-sm font-bold">{cartItems.reduce((acc, curr) => acc + curr.quantity, 0)} Units</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-4 pt-4 text-center">
                                <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-medium leading-relaxed">
                                  Hassle-free 30 day returns <br/>
                                  on all premium selections
                                </p>
                            </div>
                        </motion.div>
                        
                        <div className="flex items-center justify-center gap-6 opacity-30 px-4">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
 