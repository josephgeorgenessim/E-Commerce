import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12 text-center">
            <AlertTriangle className="w-16 h-16 text-yellow-500 mb-6" />
            <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
            <p className="text-gray-500 mb-8 max-w-md">
                The page you are looking for doesn't exist or has been moved.
            </p>

            <div className="flex gap-4">
                <Button asChild>
                    <Link to="/">Go to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link to="/products">Browse Products</Link>
                </Button>
            </div>
        </div>
    );
};

export default NotFoundPage; 