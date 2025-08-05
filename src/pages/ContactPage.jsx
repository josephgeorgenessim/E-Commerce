import React from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import {
    MapPin,
    Phone,
    Mail,
    Clock
} from 'lucide-react';

const ContactPage = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission (would connect to backend in a real app)
        alert('Message sent! We will get back to you soon.');
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div>
                    <p className="text-gray-600 mb-8">
                        Have questions, feedback, or need assistance? We're here to help!
                        Fill out the form or use the contact details below to get in touch with our team.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Our Location</h3>
                                <p className="text-gray-600">123 E-Commerce St, Digital City, 10001</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <Phone className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Phone Number</h3>
                                <p className="text-gray-600">+1 (555) 123-4567</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <Mail className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Email Address</h3>
                                <p className="text-gray-600">support@example-store.com</p>
                            </div>
                        </div>

                        <div className="flex items-start">
                            <div className="bg-primary/10 p-3 rounded-full mr-4">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-medium">Working Hours</h3>
                                <p className="text-gray-600">Monday-Friday: 9AM - 5PM</p>
                                <p className="text-gray-600">Saturday: 10AM - 2PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 border">
                    <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Full Name
                                </label>
                                <Input id="name" placeholder="John Doe" required />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </label>
                                <Input id="email" type="email" placeholder="john@example.com" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">
                                Subject
                            </label>
                            <Input id="subject" placeholder="How can we help?" required />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">
                                Message
                            </label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                rows={5}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Send Message
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage; 