import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../data/productsData';

const SimpleProductList = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const allProducts = getAllProducts();
            console.log("Simple component products:", allProducts);
            if (allProducts && Array.isArray(allProducts)) {
                setProducts(allProducts);
            } else {
                setError("Products data is not an array");
            }
        } catch (err) {
            setError("Error loading products: " + err.message);
        }
    }, []);

    // Simple hardcoded products as fallback
    const hardcodedProducts = [
        { id: 1, name: "Basic Product 1", price: 19.99 },
        { id: 2, name: "Basic Product 2", price: 29.99 },
        { id: 3, name: "Basic Product 3", price: 39.99 },
    ];

    // Use hardcoded products if dynamic ones aren't available
    const displayProducts = products.length > 0 ? products : hardcodedProducts;

    return (
        <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Simple Product List</h1>

            {error && (
                <div style={{
                    backgroundColor: '#ffebee',
                    padding: '10px',
                    marginBottom: '20px',
                    borderRadius: '4px'
                }}>
                    <p style={{ color: '#c62828' }}>{error}</p>
                </div>
            )}

            <div>
                <p>Debug Info:</p>
                <ul>
                    <li>Products found: {products.length}</li>
                    <li>Using: {products.length > 0 ? 'Dynamic products' : 'Hardcoded fallback'}</li>
                </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {displayProducts.map(product => (
                    <div key={product.id} style={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '15px',
                        backgroundColor: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}>
                        <h2 style={{ fontSize: '18px', marginBottom: '10px' }}>{product.name}</h2>
                        {product.image && (
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{
                                    width: '100%',
                                    height: '200px',
                                    objectFit: 'cover',
                                    marginBottom: '10px',
                                    borderRadius: '4px'
                                }}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                                }}
                            />
                        )}
                        <p style={{ color: '#666', marginBottom: '10px' }}>
                            {product.description || 'No description available'}
                        </p>
                        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                            ${product.price?.toFixed(2) || '0.00'}
                        </p>
                        <button style={{
                            backgroundColor: '#1976d2',
                            color: 'white',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            width: '100%',
                            marginTop: '10px'
                        }}>
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimpleProductList; 