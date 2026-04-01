import React from 'react';
import { 
    Facebook, 
    Instagram, 
    Twitter, 
    Youtube, 
    ShoppingCart,
    ArrowRight,
    Github,
    ShieldCheck,
    Truck,
    Globe
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { selectWebsiteName } from '../../features/settings/settingsSlice';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'sonner';

const Footer = () => {
    const websiteName = useSelector(selectWebsiteName);
    const navigate = useNavigate();

    const footerSections = [
        {
            title: 'Shop Boutique',
            links: [
                { name: 'All Products', path: '/products' },
                { name: 'New Arrivals', path: '/products' },
                { name: 'Best Sellers', path: '/products' },
                { name: 'Featured Items', path: '/products' },
                { name: 'Seasonal Offers', path: '/products' }
            ]
        },
        {
            title: 'Our Company',
            links: [
                { name: 'About Our Story', path: '/about' },
                { name: 'Our Values', path: '/about' },
                { name: 'Careers', path: '/about' },
                { name: 'Sustainability', path: '/about' },
                { name: 'Press & Media', path: '/about' }
            ]
        },
        {
            title: 'Customer Care',
            links: [
                { name: 'Contact Support', path: '/contact' },
                { name: 'Shipping & Returns', path: '/contact' },
                { name: 'Privacy Policy', path: '/contact' },
                { name: 'Terms of Service', path: '/contact' },
                { name: 'FAQ Center', path: '/contact' }
            ]
        }
    ];

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Youtube, href: '#', label: 'Youtube' },
        { icon: Github, href: '#', label: 'Github' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Subscribed to the newsletter!");
    };

    return (
        <footer className="bg-slate-900 text-white pt-24 pb-12 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[150px] -z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] -z-0" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Newsletter Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 pb-20 border-b border-white/5">
                    <div className="max-w-md space-y-4 text-center lg:text-left">
                        <h2 className="text-4xl font-black italic tracking-tight">Join The Elite</h2>
                        <p className="text-slate-400 text-lg">Subscribe to get exclusive access to new drops, private sales, and boutiques insights.</p>
                    </div>
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 w-full max-w-lg">
                        <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            className="h-14 rounded-2xl bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-primary/40 focus:bg-white/10 transition-all text-lg font-medium px-8"
                            required
                        />
                        <Button 
                            className="rounded-2xl h-14 px-10 bg-primary hover:bg-primary/90 text-white font-black italic shadow-xl shadow-primary/20 flex items-center gap-2 group shrink-0"
                            size="lg"
                        >
                            Subscribe <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </form>
                </div>

                {/* Main Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 py-20">
                    <div className="col-span-2 lg:col-span-2 space-y-8">
                        <div className="flex items-center group cursor-pointer" onClick={() => navigate('/')}>
                            <div className="h-12 w-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all duration-300">
                                <ShoppingCart className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-4 text-3xl font-black italic tracking-tighter text-gradient leading-none">
                                {websiteName || 'ShopSphere'}
                            </span>
                        </div>
                        <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                            Redefining the modern shopping experience through curated collections, premium design, and a dedication to quality that knows no bounds.
                        </p>
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, idx) => (
                                <a 
                                    key={idx} 
                                    href={social.href} 
                                    aria-label={social.label}
                                    className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                                >
                                    <social.icon className="h-5 w-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {footerSections.map((section, idx) => (
                        <div key={idx} className="space-y-8">
                            <h4 className="text-sm font-black uppercase tracking-widest text-primary leading-none">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link, linkIdx) => (
                                    <li key={linkIdx}>
                                        <Link 
                                            to={link.path} 
                                            className="text-slate-400 hover:text-white hover:translate-x-1 transition-all flex items-center gap-2 group font-medium"
                                        >
                                            <div className="h-1 w-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Footer Bottom */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-wrap justify-center md:justify-start gap-8">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic group cursor-pointer hover:text-primary transition-colors">
                            <ShieldCheck className="h-4 w-4" /> Secure Payment
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic group cursor-pointer hover:text-primary transition-colors">
                            <Truck className="h-4 w-4" /> Global Delivery
                        </div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest italic group cursor-pointer hover:text-primary transition-colors">
                            <Globe className="h-4 w-4" /> Sustainable Shipping
                        </div>
                    </div>
                    
                    <p className="text-slate-500 text-sm font-medium tracking-wide">
                        © {new Date().getFullYear()} <span className="text-white font-bold">{websiteName}</span>. Crafted for the modern era.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
