import React from 'react';

const AboutPage = () => {
    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8">About Us</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                    <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                    <p className="text-gray-600 mb-4">
                        Founded in 2023, our e-commerce platform was created with a simple mission: to provide
                        high-quality products at affordable prices with exceptional customer service.
                    </p>
                    <p className="text-gray-600">
                        What started as a small online store has grown into a comprehensive marketplace offering
                        products across multiple categories while maintaining our commitment to quality and service.
                    </p>
                </div>
                <div className="bg-gray-100 rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
                    <ul className="space-y-2">
                        <li className="flex items-start">
                            <span className="font-medium mr-2">Quality:</span>
                            <span className="text-gray-600">We ensure all products meet our high standards</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-medium mr-2">Affordability:</span>
                            <span className="text-gray-600">Fair prices without compromising quality</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-medium mr-2">Service:</span>
                            <span className="text-gray-600">Customer satisfaction is our top priority</span>
                        </li>
                        <li className="flex items-start">
                            <span className="font-medium mr-2">Innovation:</span>
                            <span className="text-gray-600">Constantly improving our platform and offerings</span>
                        </li>
                    </ul>
                </div>
            </div>

            <h2 className="text-2xl font-semibold mb-6">Meet Our Team</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">Team Member {i}</h3>
                            <p className="text-sm text-gray-500">Position</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AboutPage; 