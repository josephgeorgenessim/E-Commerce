import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Button, CardActions, Box } from '@mui/material';

// Products defined directly in the component
const directProducts = [
    {
        id: "direct1",
        name: "Direct Product 1",
        description: "This product is defined directly in the component",
        price: 49.99,
        category: "Direct",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2E1ZDZhNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMyMjIyMjIiPkRpcmVjdCAxPC90ZXh0Pjwvc3ZnPg=="
    },
    {
        id: "direct2",
        name: "Direct Product 2",
        description: "Another product defined directly in the component",
        price: 29.99,
        category: "Direct",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2E1ZDZhNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMyMjIyMjIiPkRpcmVjdCAyPC90ZXh0Pjwvc3ZnPg=="
    },
    {
        id: "direct3",
        name: "Direct Product 3",
        description: "A third product defined directly in the component",
        price: 39.99,
        category: "Direct",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2E1ZDZhNyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMyMjIyMjIiPkRpcmVjdCAzPC90ZXh0Pjwvc3ZnPg=="
    }
];

const DirectProducts = () => {
    return (
        <div className="container mx-auto">
            <Typography variant="h4" component="h1" gutterBottom className="text-center mb-8">
                Direct Products
            </Typography>


            <Grid container spacing={4}>
                {directProducts.map((product) => (
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

export default DirectProducts; 