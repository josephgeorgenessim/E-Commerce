import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Box, Button, Card,
    CardMedia, CardContent, CardActions, Rating
} from '@mui/material';
import { getFeaturedProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo192 from '../logo.svg'; // Import React logo as fallback

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log('guest')

    useEffect(() => {
        try {
            // Get featured products directly from the data module
            const featured = getFeaturedProducts();
            console.log("Featured products:", featured);
            console.log("Featured products length:", featured ? featured.length : 0);
            console.log("Featured products type:", typeof featured);
            setFeaturedProducts(featured || []);
        } catch (error) {
            console.error("Error loading featured products:", error);
            setFeaturedProducts([]);
        }
    }, []);

    const handleAddToCart = (product) => {
        dispatch(addItem({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: 1 }));
    };

    const navigateToProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    return (
        <Box>
            {/* Hero Section */}
            <Box
                sx={{
                    backgroundColor: 'primary.main',
                    color: 'white',
                    py: 8,
                    mb: 6
                }}
            >
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant="h2" component="h1" gutterBottom>
                                Welcome to ShopSphere
                            </Typography>
                            <Typography variant="h5" paragraph>
                                Discover amazing products at incredible prices
                            </Typography>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                onClick={() => navigate('/products')}
                                sx={{ mt: 2 }}
                            >
                                Shop Now
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box
                                component="img"
                                src={logo192}
                                alt="Shopping"
                                sx={{
                                    width: '100%',
                                    borderRadius: 2,
                                    boxShadow: 3
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Featured Products */}
            <Container sx={{ mb: 8 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                    Featured Products
                </Typography>
                {featuredProducts.length === 0 ? (
                    <Typography variant="h6" align="center" color="textSecondary">
                        No featured products available at the moment.
                    </Typography>
                ) : (
                    <Grid container spacing={4}>
                        {featuredProducts.slice(0, 4).map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-5px)',
                                            boxShadow: 6
                                        }
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.image || logo192}
                                        alt={product.name}
                                        sx={{ cursor: 'pointer' }}
                                        onClick={() => navigateToProduct(product.id)}
                                        onError={(e) => {
                                            console.error(`Failed to load image for ${product.name}`);
                                            e.target.onerror = null;
                                            e.target.src = logo192;
                                        }}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h3" noWrap>
                                            {product.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                            <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                ({product.reviews})
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" color="primary">
                                            ${product.price.toFixed(2)}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => navigateToProduct(product.id)}
                                        >
                                            View Details
                                        </Button>
                                        <Button
                                            size="small"
                                            color="secondary"
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
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/products')}
                    >
                        View All Products
                    </Button>
                </Box>
            </Container>

            {/* Categories Section */}
            <Box sx={{ backgroundColor: 'grey.100', py: 8, mb: 6 }}>
                <Container>
                    <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                        Shop by Category
                    </Typography>
                    <Grid container spacing={4}>
                        {['Electronics', 'Fashion', 'Home', 'Lifestyle'].map((category) => (
                            <Grid item key={category} xs={12} sm={6} md={3}>
                                <Card
                                    sx={{
                                        position: 'relative',
                                        transition: '0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: 4
                                        }
                                    }}
                                    onClick={() => navigate(`/category/${category.toLowerCase()}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={logo192}
                                        alt={category}
                                        onError={(e) => {
                                            console.error(`Failed to load image for ${category}`);
                                            e.target.onerror = null;
                                            e.target.src = logo192;
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            bgcolor: 'rgba(0, 0, 0, 0.6)',
                                            color: 'white',
                                            padding: 2
                                        }}
                                    >
                                        <Typography variant="h6">{category}</Typography>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>

            {/* Why Choose Us */}
            <Container sx={{ mb: 8 }}>
                <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ mb: 4 }}>
                    Why Choose Us
                </Typography>
                <Grid container spacing={4}>
                    {[
                        { title: 'Free Shipping', description: 'On orders over $50', icon: '🚚' },
                        { title: 'Easy Returns', description: '30-day return policy', icon: '↩️' },
                        { title: 'Secure Payment', description: 'Safe & encrypted', icon: '🔒' },
                        { title: '24/7 Support', description: 'Dedicated support', icon: '📞' }
                    ].map((feature) => (
                        <Grid item key={feature.title} xs={12} sm={6} md={3}>
                            <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                                <Typography variant="h1" component="div" sx={{ mb: 2 }}>
                                    {feature.icon}
                                </Typography>
                                <Typography variant="h6" component="h3" gutterBottom>
                                    {feature.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {feature.description}
                                </Typography>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Home; 