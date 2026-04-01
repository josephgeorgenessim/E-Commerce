import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    MapPin, 
    Phone, 
    Mail, 
    Clock, 
    Send, 
    CheckCircle2, 
    Headset
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { toast } from 'sonner';

const ContactPage = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
            toast.success('Message sent! Our team will get back to you soon.');
        }, 1500);
    };

    const contactMethods = [
        { 
            icon: MapPin, 
            label: 'Visit Our Office', 
            value: '123 E-Commerce St, Digital City, 10001',
            color: 'bg-blue-50 text-blue-600'
        },
        { 
            icon: Phone, 
            label: 'Call Support', 
            value: '+1 (555) 123-4567',
            color: 'bg-emerald-50 text-emerald-600'
        },
        { 
            icon: Mail, 
            label: 'Email Address', 
            value: 'support@example-store.com',
            color: 'bg-purple-50 text-purple-600'
        },
        { 
            icon: Clock, 
            label: 'Support Hours', 
            value: 'Mon - Fri: 9AM - 5PM',
            color: 'bg-amber-50 text-amber-600'
        },
    ];

    return (
        <div className="flex flex-col gap-20 pb-20 overflow-x-hidden min-h-screen">
            {/* Header Section */}
            <section className="relative pt-24 pb-16 bg-slate-900 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary/20 blur-[120px] -z-0" />
                <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-purple-500/10 blur-[100px] -z-0" />
                
                <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Get In <span className="text-gradient">Touch</span></h1>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mt-6">
                            Have questions or need assistance? We're here to help you around the clock.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Contact Section */}
            <section className="container mx-auto px-4 -mt-20 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Contact Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 p-8 rounded-[2rem]">
                            <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
                            <div className="space-y-8">
                                {contactMethods.map((method, idx) => (
                                    <div key={idx} className="flex items-start gap-4 group">
                                        <div className={`h-12 w-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 ${method.color}`}>
                                            <method.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{method.label}</p>
                                            <p className="text-slate-900 dark:text-slate-100 font-medium leading-relaxed">{method.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>
                        
                        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-primary text-white p-8 rounded-[2rem] overflow-hidden relative">
                            <div className="relative z-10">
                                <Headset className="h-10 w-10 mb-6 opacity-50" />
                                <h3 className="text-2xl font-bold mb-2">24/7 Support</h3>
                                <p className="text-white/80 leading-relaxed mb-6">Our dedicated support team is available every day to assist you with any inquiries.</p>
                                <Button className="w-full bg-white text-primary hover:bg-white/90 rounded-xl h-12 font-bold shadow-lg">
                                    Start Live Chat
                                </Button>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                        </Card>
                    </motion.div>

                    {/* Contact Form Area */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="lg:col-span-8"
                    >
                        <Card className="border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-800 p-8 md:p-12 rounded-[2rem] h-full border border-slate-100 dark:border-slate-700">
                            <AnimatePresence mode="wait">
                                {!submitted ? (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="space-y-8"
                                    >
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold tracking-tight">Send us a Message</h2>
                                            <p className="text-slate-500">Fill out the form below and we'll respond within 24 hours.</p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
                                                <Input 
                                                    placeholder="John Doe" 
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                                                <Input 
                                                    type="email" 
                                                    placeholder="john@example.com" 
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Subject</label>
                                                <Input 
                                                    placeholder="How can we help?" 
                                                    className="h-14 rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-3">
                                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Message</label>
                                                <Textarea 
                                                    placeholder="Tell us what you're thinking..." 
                                                    className="min-h-[160px] rounded-2xl bg-slate-50 dark:bg-slate-900 border-none focus-visible:ring-2 focus-visible:ring-primary/20 p-4"
                                                    required
                                                />
                                            </div>
                                            <div className="md:col-span-2 pt-4">
                                                <Button 
                                                    type="submit" 
                                                    disabled={isSubmitting}
                                                    className="w-full md:w-fit px-12 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-2 group"
                                                >
                                                    {isSubmitting ? (
                                                        <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    ) : (
                                                        <>
                                                            Send Message
                                                            <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-12 flex flex-col items-center text-center space-y-6"
                                    >
                                        <div className="h-20 w-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/10">
                                            <CheckCircle2 className="h-10 w-10" />
                                        </div>
                                        <div className="space-y-2">
                                            <h2 className="text-3xl font-bold tracking-tight">Thank You!</h2>
                                            <p className="text-slate-500 text-lg">Your message has been received. Our team will contact you shortly.</p>
                                        </div>
                                        <Button 
                                            variant="outline" 
                                            className="rounded-xl px-8 h-12 font-bold mt-4"
                                            onClick={() => setSubmitted(false)}
                                        >
                                            Send Another Message
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Card>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;