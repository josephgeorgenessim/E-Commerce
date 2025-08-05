import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, CircularProgress, Grid, Card, CardMedia, CardContent, CardActions, Button, Rating } from '@mui/material';
import { getFilteredProducts } from '../data/productsData';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const CategoryPage = () => {
    const { category } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Apply category filter when component mounts
        if (category) {
            setLoading(true);
            const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);
            const categoryProducts = getFilteredProducts({ category: formattedCategory });
            setProducts(categoryProducts);
            setLoading(false);
        }
    }, [category]);

    const handleAddToCart = (product) => {
        dispatch(addItem({ id: product.id, price: product.price, name: product.name, image: product.image, quantity: 1 }));
    };

    const navigateToProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container>
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3, pt: 2 }}>
                {category.charAt(0).toUpperCase() + category.slice(1)} Products
            </Typography>

            {products.length > 0 ? (
                <Grid container spacing={4}>
                    {products.map((product) => (
                        <Grid item key={product.id} xs={12} sm={6} md={4}>
                            <Card sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: '0.3s',
                                '&:hover': {
                                    transform: 'translateY(-5px)',
                                    boxShadow: 6
                                }
                            }}>
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.name}
                                    sx={{ cursor: 'pointer' }}
                                    onClick={() => navigateToProduct(product.id)}
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
            ) : (
                <Typography>No products found in this category.</Typography>
            )}
        </Container>
    );
};

export default CategoryPage; 