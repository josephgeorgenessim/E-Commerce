import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Box, Paper } from '@mui/material';
import { getAllProducts } from '../../data/productsData';
import { addItem } from '../../features/cart/cartSlice';
import logo192 from '../../logo.svg'; // Import React logo as fallback

const ProductList = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);
    const [debug, setDebug] = useState({
        productsLoaded: false,
        productsCount: 0,
        productsData: null
    });

    useEffect(() => {
        try {
            // Get all products directly from the data module
            const allProducts = getAllProducts();
            console.log("Raw products data:", allProducts);

            setDebug({
                productsLoaded: true,
                productsCount: allProducts ? allProducts.length : 0,
                productsData: allProducts ? JSON.stringify(allProducts).substring(0, 100) + "..." : "null"
            });

            if (allProducts && Array.isArray(allProducts)) {
                setProducts(allProducts);
            } else {
                setError("Products data is not an array or is undefined");
                console.error("Products data is not an array:", allProducts);
            }
        } catch (err) {
            setError("Error loading products: " + err.message);
            console.error("Error loading products:", err);
        }
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addItem({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: 1 }));
    };

    // Hard-coded product as a last resort
    const hardcodedProducts = [
        {
            id: "hardcoded1",
            name: "Hardcoded Product",
            description: "This is a hardcoded product as a last resort",
            price: 99.99,
            category: "Default",
            image: logo192
        }
    ];



    // Use hardcoded products if no products are available
    const displayProducts = products.length > 0 ? products : hardcodedProducts;

    return (
        <div className="container mx-auto">
            <Typography variant="h4" component="h1" gutterBottom className="text-center mb-8">
                All Products
            </Typography>



            {error ? (
                <Box>
                    <Typography variant="h6" color="error" className="text-center">{error}</Typography>
                    <Typography variant="body1" className="text-center mt-2">
                        Showing fallback products instead
                    </Typography>
                </Box>
            ) : displayProducts.length === 0 ? (
                <Typography variant="h6" className="text-center">No products found.</Typography>
            ) : (
                <Grid container spacing={4}>
                    {displayProducts.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id || Math.random()}>
                            <Card className="h-full flex flex-col" sx={{ minHeight: '400px' }}>
                                <Box sx={{ position: 'relative', height: 200, bgcolor: '#f0f0f0' }}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image || logo192}
                                        alt={product.name}
                                        sx={{ height: '100%', objectFit: 'contain' }}
                                        onError={(e) => {
                                            console.error(`Failed to load image for ${product.name}`);
                                            e.target.onerror = null;
                                            e.target.src = logo192;
                                        }}
                                    />
                                </Box>
                                <CardContent className="flex-grow">
                                    <Typography gutterBottom variant="h5" component="div">
                                        {product.name || "Unnamed Product"}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" className="mb-2">
                                        {product.description || "No description available"}
                                    </Typography>
                                    <Typography variant="h6" className="text-right">
                                        ${(product.price || 0).toFixed(2)}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Category: {product.category || "Uncategorized"}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </div>
    );
};

export default ProductList; 