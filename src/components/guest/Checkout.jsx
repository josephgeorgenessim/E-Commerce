import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Stepper, Step, StepLabel, Typography,
    TextField, Button, Paper, Grid, Dialog,
    DialogActions, DialogContent, DialogTitle,
    DialogContentText, Card, CardContent
} from '@mui/material';
import { selectCartItems, selectCartTotal, clearCart } from '../../features/cart/cartSlice';
import { placeOrder } from '../../features/orders/ordersSlice';

const steps = ['Personal Information', 'Card Details', 'Order Confirmation'];

const Checkout = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);

    const [activeStep, setActiveStep] = useState(0);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });
    const [errors, setErrors] = useState({});

    const validateStep = () => {
        let isValid = true;
        const newErrors = {};

        if (activeStep === 0) {
            if (!formData.name.trim()) {
                newErrors.name = 'Name is required';
                isValid = false;
            }
            if (!formData.address.trim()) {
                newErrors.address = 'Address is required';
                isValid = false;
            }
        } else if (activeStep === 1) {
            if (!formData.cardNumber.trim()) {
                newErrors.cardNumber = 'Card number is required';
                isValid = false;
            } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
                newErrors.cardNumber = 'Card number must be 16 digits';
                isValid = false;
            }

            if (!formData.expiryDate.trim()) {
                newErrors.expiryDate = 'Expiry date is required';
                isValid = false;
            }

            if (!formData.cvv.trim()) {
                newErrors.cvv = 'CVV is required';
                isValid = false;
            } else if (!/^\d{3,4}$/.test(formData.cvv)) {
                newErrors.cvv = 'CVV must be 3 or 4 digits';
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep()) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePlaceOrder = () => {
        const order = {
            customerInfo: {
                name: formData.name,
                address: formData.address,
                cardNumber: `**** **** **** ${formData.cardNumber.slice(-4)}`
            },
            cartItems,
            total: cartTotal
        };

        dispatch(placeOrder(order));
        dispatch(clearCart());
        setOrderConfirmed(true);
    };

    const handleCloseOrderConfirmation = () => {
        setOrderConfirmed(false);
        setActiveStep(0);
        setFormData({
            name: '',
            address: '',
            cardNumber: '',
            expiryDate: '',
            cvv: '',
        });
        onClose();
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleFieldChange}
                                fullWidth
                                required
                                error={!!errors.name}
                                helperText={errors.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Shipping Address"
                                name="address"
                                value={formData.address}
                                onChange={handleFieldChange}
                                fullWidth
                                multiline
                                rows={3}
                                required
                                error={!!errors.address}
                                helperText={errors.address}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Card Number"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleFieldChange}
                                fullWidth
                                required
                                placeholder="**** **** **** ****"
                                error={!!errors.cardNumber}
                                helperText={errors.cardNumber}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Expiry Date"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleFieldChange}
                                placeholder="MM/YY"
                                fullWidth
                                required
                                error={!!errors.expiryDate}
                                helperText={errors.expiryDate}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="CVV"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleFieldChange}
                                type="password"
                                fullWidth
                                required
                                error={!!errors.cvv}
                                helperText={errors.cvv}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <div>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Card>
                            <CardContent>
                                <Typography variant="subtitle1">Customer Information</Typography>
                                <Typography variant="body2">Name: {formData.name}</Typography>
                                <Typography variant="body2">Address: {formData.address}</Typography>
                                <Typography variant="body2">
                                    Card: **** **** **** {formData.cardNumber.slice(-4)}
                                </Typography>

                                <Typography variant="subtitle1" className="mt-4">Order Items</Typography>
                                {cartItems.map((item) => (
                                    <Typography key={item.id} variant="body2">
                                        {item.name} x {item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                ))}

                                <Typography variant="h6" className="mt-4 text-right">
                                    Total: ${cartTotal.toFixed(2)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
                <DialogTitle>Checkout</DialogTitle>
                <DialogContent>
                    <Stepper activeStep={activeStep} className="mb-8 mt-4">
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Paper className="p-4">
                        {renderStepContent(activeStep)}
                    </Paper>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="primary">
                        Cancel
                    </Button>
                    {activeStep > 0 && (
                        <Button onClick={handleBack} color="primary">
                            Back
                        </Button>
                    )}
                    {activeStep < steps.length - 1 ? (
                        <Button onClick={handleNext} color="primary" variant="contained">
                            Next
                        </Button>
                    ) : (
                        <Button onClick={handlePlaceOrder} color="primary" variant="contained">
                            Place Order
                        </Button>
                    )}
                </DialogActions>
            </Dialog>

            {/* Order confirmation dialog */}
            <Dialog open={orderConfirmed} onClose={handleCloseOrderConfirmation}>
                <DialogTitle>Order Confirmed!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Your order has been successfully placed. Thank you for shopping with us!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrderConfirmation} color="primary" autoFocus>
                        Continue Shopping
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Checkout; 