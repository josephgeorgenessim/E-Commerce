import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Trash2, Heart, ShoppingCart } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';

// Mock wishlist data - in a real app, this would come from Redux state
const mockWishlistItems = [
    {
        id: '1',
        name: 'Wireless Headphones',
        price: 99.99,
        image: 'https://via.placeholder.com/150',
        category: 'Electronics',
        description: 'High-quality wireless headphones with noise cancellation'
    },
    {
        id: '2',
        name: 'Smart Watch',
        price: 249.99,
        image: 'https://via.placeholder.com/150',
        category: 'Electronics',
        description: 'Feature-rich smartwatch with health tracking'
    },
    {
        id: '3',
        name: 'Laptop Backpack',
        price: 59.99,
        image: 'https://via.placeholder.com/150',
        category: 'Accessories',
        description: 'Durable and water-resistant laptop backpack'
    }
];

const WishlistPage = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addItem({ product, quantity: 1 }));
    };

    const handleRemoveFromWishlist = (productId) => {
        // In a real app, this would dispatch an action to remove from wishlist
        alert(`Removed product ${productId} from wishlist`);
    };

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Wishlist</h1>
                <div className="flex items-center gap-2">
                    <Heart className="text-red-500" />
                    <span className="text-xl font-medium">{mockWishlistItems.length} items</span>
                </div>
            </div>

            {mockWishlistItems.length === 0 ? (
                <div className="text-center py-12">
                    <Heart className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
                    <p className="text-gray-500 mb-6">Add items to your wishlist to save them for later.</p>
                    <Button asChild>
                        <a href="/products">Browse Products</a>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockWishlistItems.map(item => (
                        <Card key={item.id} className="overflow-hidden">
                            <div className="relative h-48 bg-gray-100">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <Button
                                    variant="destructive"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={() => handleRemoveFromWishlist(item.id)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                            <CardContent className="p-4">
                                <div className="space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-lg">{item.name}</h3>
                                        <p className="text-sm text-gray-500">{item.category}</p>
                                    </div>
                                    <p className="text-gray-700">{item.description}</p>
                                    <div className="flex justify-between items-center pt-3">
                                        <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                                        <Button onClick={() => handleAddToCart(item)}>
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WishlistPage; 