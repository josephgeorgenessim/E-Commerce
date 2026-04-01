import React from 'react';
import { motion } from 'framer-motion';
import { 
    Users, 
    Target, 
    Heart, 
    Award, 
    Globe, 
    Zap, 
    ShieldCheck, 
    ShoppingBag,
    ArrowRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Happy Customers', value: '50k+', icon: Users },
        { label: 'Products Delivered', value: '120k+', icon: ShoppingBag },
        { label: 'Global Offices', value: '12', icon: Globe },
        { label: 'Awards Won', value: '25', icon: Award },
    ];

    const values = [
        {
            title: "Customer First",
            description: "We believe that every decision should start with the customer experience in mind.",
            icon: Heart,
            color: "text-rose-500",
            bg: "bg-rose-50"
        },
        {
            title: "Quality Excellence",
            description: "We never compromise on the quality of our products, ensuring only the best reaches you.",
            icon: ShieldCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            title: "Innovation Driven",
            description: "Constantly pushing boundaries to provide a seamless and modern shopping experience.",
            icon: Zap,
            color: "text-amber-500",
            bg: "bg-amber-50"
        },
        {
            title: "Target Oriented",
            description: "Focused on delivering results and value to our community across the globe.",
            icon: Target,
            color: "text-blue-500",
            bg: "bg-blue-50"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="flex flex-col gap-24 pb-24 overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1600" 
                        alt="Our Team" 
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                </div>
                
                <div className="container mx-auto px-4 relative z-10 text-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Badge variant="outline" className="text-primary border-primary mb-4 px-4 py-1 rounded-full uppercase tracking-widest text-xs font-bold">
                            Our Journey
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
                            Redefining Modern <span className="text-gradient">E-Commerce</span>
                        </h1>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto mt-6 leading-relaxed">
                            We're on a mission to bring high-quality products and a premium shopping experience to everyone, everywhere.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="space-y-8"
                    >
                        <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Our Story</h2>
                        <div className="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            <p>
                                Founded in 2023, our e-commerce platform was created with a simple mission: to provide
                                high-quality products at affordable prices with exceptional customer service.
                            </p>
                            <p>
                                What started as a small online store has grown into a comprehensive marketplace offering
                                products across multiple categories while maintaining our commitment to quality and service.
                            </p>
                            <p>
                                We believe that shopping should be more than just a transaction—it should be an experience. 
                                That's why we've focused on creating a platform that is not only functional but also 
                                aesthetically pleasing and easy to navigate.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 pt-4">
                            {stats.map((stat, idx) => (
                                <div key={idx} className="space-y-1">
                                    <h4 className="text-3xl font-bold text-primary">{stat.value}</h4>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl skew-y-1">
                            <img 
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800" 
                                alt="Business Story" 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary rounded-full blur-3xl opacity-20 -z-10" />
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-500 rounded-full blur-3xl opacity-20 -z-10" />
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-24">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                        <h2 className="text-4xl font-bold tracking-tight">Our Core Values</h2>
                        <p className="text-slate-500 text-lg italic">
                            These principles guide every decision we make and every product we feature on our platform.
                        </p>
                    </div>
                    
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                variants={itemVariants}
                                className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 group"
                            >
                                <div className={`h-14 w-14 rounded-2xl ${value.bg} ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                                    <value.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{value.title}</h3>
                                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Team Section Placeholder / Call to Action */}
            <section className="container mx-auto px-4">
                <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center space-y-8">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Join Our Growing Community</h2>
                        <p className="text-white/80 text-xl leading-relaxed mb-10">
                            We're constantly expanding and looking for new ways to delight our customers. Be a part of the journey and experience the difference.
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Button 
                                size="lg" 
                                className="bg-white text-primary hover:bg-white/90 rounded-2xl px-10 h-14 font-bold"
                                onClick={() => navigate('/products')}
                            >
                                Start Shopping <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                            <Button 
                                size="lg" 
                                variant="outline" 
                                className="bg-transparent border-white text-white hover:bg-white/10 rounded-2xl px-10 h-14 font-bold"
                                onClick={() => navigate('/contact')}
                            >
                                Contact Support
                            </Button>
                        </div>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 p-10 opacity-10">
                        <ShoppingBag className="h-40 w-40" />
                    </div>
                    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
                </div>
            </section>
        </div>
    );
};

export default AboutPage;