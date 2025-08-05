import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addItem } from '../../features/cart/cartSlice';

// Hardcoded products for testing when dynamic data fails
const staticProducts = [
    {
        id: "static1",
        name: "Static Product 1",
        description: "This is a static product for testing purposes",
        price: 49.99,
        category: "Testing",
        image: "https://via.placeholder.com/300x300?text=Static+Product+1"
    },
    {
        id: "static2",
        name: "Static Product 2",
        description: "Another static product for testing",
        price: 29.99,
        category: "Testing",
        image: "https://via.placeholder.com/300x300?text=Static+Product+2"
    },
    {
        id: "static3",
        name: "Static Product 3",
        description: "A third static product for testing",
        price: 79.99,
        category: "Testing",
        image: "https://via.placeholder.com/300x300?text=Static+Product+3"
    }
];

const StaticProductList = () => {
    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addItem({
            id: product.id,
            price: product.price,
            name: product.name,
            image: product.image,
            quantity: 1
        }));
    };

    return (
        <div className="container mx-auto">
            <Typography variant="h4" component="h1" gutterBottom className="text-center mb-8">
                Static Products (Test Data)
            </Typography>

            <Box sx={{ bgcolor: '#ffe0e0', p: 2, mb: 4, borderRadius: 1 }}>
                <Typography variant="body1">
                    These are static test products displayed because dynamic data loading may have failed.
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {staticProducts.map((product) => (
                    <Grid item xs={12} sm={6} md={4} key={product.id}>
                        <Card className="h-full flex flex-col">
                            <CardMedia
                                component="img"
                                height="200"
                                image={product.image}
                                alt={product.name}
                            />
                            <CardContent className="flex-grow">
                                <Typography gutterBottom variant="h5" component="div">
                                    {product.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className="mb-2">
                                    {product.description}
                                </Typography>
                                <Typography variant="h6" className="text-right">
                                    ${product.price.toFixed(2)}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Category: {product.category}
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
        </div>
    );
};

export default StaticProductList; 