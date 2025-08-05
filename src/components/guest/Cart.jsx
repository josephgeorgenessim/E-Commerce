import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography, Button, IconButton,
    List, ListItem, ListItemText,
    ListItemSecondaryAction, Dialog,
    DialogTitle, DialogContent, DialogActions,
    TextField, Divider, Card, CardContent
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import {
    selectCartItems,
    selectCartTotal,
    updateCartItem,
    removeFromCart
} from '../../features/cart/cartSlice';

const Cart = ({ open, onClose, onCheckout }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems) || [];
    const cartTotal = useSelector(selectCartTotal) || 0;

    const handleIncreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            dispatch(updateCartItem({ id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (id) => {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            if (item.quantity > 1) {
                dispatch(updateCartItem({ id, quantity: item.quantity - 1 }));
            } else {
                dispatch(removeFromCart(id));
            }
        }
    };

    const handleRemoveItem = (id) => {
        dispatch(removeFromCart(id));
    };

    // Helper function to safely format price
    const formatPrice = (price) => {
        return typeof price === 'number' ? price.toFixed(2) : '0.00';
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Your Shopping Cart
            </DialogTitle>
            <DialogContent>
                {cartItems.length === 0 ? (
                    <Typography variant="body1" className="py-4 text-center">
                        Your cart is empty
                    </Typography>
                ) : (
                    <>
                        <List>
                            {cartItems.map((item) => (
                                <React.Fragment key={item.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={item.name}
                                            secondary={`$${formatPrice(item.price)} x ${item.quantity || 1}`}
                                        />
                                        <div className="flex items-center">
                                            <IconButton size="small" onClick={() => handleDecreaseQuantity(item.id)}>
                                                <Remove fontSize="small" />
                                            </IconButton>
                                            <TextField
                                                size="small"
                                                value={item.quantity || 1}
                                                InputProps={{ readOnly: true }}
                                                sx={{ width: '50px', mx: 1 }}
                                            />
                                            <IconButton size="small" onClick={() => handleIncreaseQuantity(item.id)}>
                                                <Add fontSize="small" />
                                            </IconButton>
                                            <IconButton edge="end" onClick={() => handleRemoveItem(item.id)}>
                                                <Delete />
                                            </IconButton>
                                        </div>
                                    </ListItem>
                                    <Divider />
                                </React.Fragment>
                            ))}
                        </List>

                        <Card className="mt-4">
                            <CardContent>
                                <Typography variant="h6" className="text-right">
                                    Total: ${formatPrice(cartTotal)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Continue Shopping
                </Button>
                <Button
                    onClick={onCheckout}
                    color="primary"
                    variant="contained"
                    disabled={cartItems.length === 0}
                >
                    Checkout
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Cart; 