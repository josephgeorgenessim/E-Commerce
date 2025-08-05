import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Paper,
    Divider,
    IconButton,
    TextField,
    Card,
    CardMedia,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Alert
} from '@mui/material';
import {
    Add,
    Remove,
    Delete,
    ShoppingCart,
    ArrowForward
} from '@mui/icons-material';
import {
    selectCartItems,
    selectCartTotal,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart
} from '../features/cart/cartSlice';

const CartPage = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const dispatch = useDispatch();

    const handleIncreaseQuantity = (productId) => {
        dispatch(increaseQuantity(productId));
    };

    const handleDecreaseQuantity = (productId) => {
        dispatch(decreaseQuantity(productId));
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    // Calculate shipping cost (free over $100)
    const shippingCost = cartTotal > 100 ? 0 : 10;

    // Calculate tax (8.25%)
    const taxRate = 0.0825;
    const taxAmount = cartTotal * taxRate;

    // Final total
    const finalTotal = cartTotal + shippingCost + taxAmount;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Your Shopping Cart
            </Typography>

            {cartItems.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <ShoppingCart sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h5" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                        Looks like you haven't added any products to your cart yet.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        component={RouterLink}
                        to="/products"
                        startIcon={<ArrowForward />}
                    >
                        Continue Shopping
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        <TableContainer component={Paper} sx={{ mb: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Product</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Subtotal</TableCell>
                                        <TableCell align="right">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ width: 80, height: 80, objectFit: 'contain', mr: 2 }}
                                                        image={item.image}
                                                        alt={item.name}
                                                    />
                                                    <Box>
                                                        <Link
                                                            component={RouterLink}
                                                            to={`/product/${item.id}`}
                                                            underline="hover"
                                                            color="inherit"
                                                            sx={{ fontWeight: 'medium' }}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        {item.color && (
                                                            <Typography variant="body2" color="text.secondary">
                                                                Color: {item.color}
                                                            </Typography>
                                                        )}
                                                        {item.size && (
                                                            <Typography variant="body2" color="text.secondary">
                                                                Size: {item.size}
                                                            </Typography>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Typography variant="body1">
                                                    ${item.price.toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="center">
                                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleDecreaseQuantity(item.id)}
                                                        disabled={item.quantity <= 1}
                                                    >
                                                        <Remove fontSize="small" />
                                                    </IconButton>
                                                    <TextField
                                                        size="small"
                                                        value={item.quantity}
                                                        inputProps={{
                                                            readOnly: true,
                                                            style: { textAlign: 'center', width: '30px' }
                                                        }}
                                                        variant="outlined"
                                                        sx={{ mx: 1 }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        onClick={() => handleIncreaseQuantity(item.id)}
                                                    >
                                                        <Add fontSize="small" />
                                                    </IconButton>
                                                </Box>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Typography variant="body1" fontWeight="medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    color="error"
                                                    size="small"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                            <Button
                                variant="outlined"
                                component={RouterLink}
                                to="/products"
                            >
                                Continue Shopping
                            </Button>
                            <Button
                                variant="outlined"
                                color="error"
                                startIcon={<Delete />}
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </Button>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Order Summary
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="body1">Subtotal ({cartItems.reduce((acc, item) => acc + item.quantity, 0)} items)</Typography>
                                <Typography variant="body1">${cartTotal.toFixed(2)}</Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="body1">Shipping</Typography>
                                <Typography variant="body1">
                                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography variant="body1">Tax (8.25%)</Typography>
                                <Typography variant="body1">${taxAmount.toFixed(2)}</Typography>
                            </Box>

                            {shippingCost === 0 && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    You've qualified for free shipping!
                                </Alert>
                            )}

                            {shippingCost > 0 && (
                                <Alert severity="info" sx={{ mb: 2 }}>
                                    Add ${(100 - cartTotal).toFixed(2)} more to qualify for FREE shipping
                                </Alert>
                            )}

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography variant="h6">Total</Typography>
                                <Typography variant="h6">${finalTotal.toFixed(2)}</Typography>
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                component={RouterLink}
                                to="/checkout"
                            >
                                Proceed to Checkout
                            </Button>
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default CartPage; 