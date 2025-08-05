import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    Box,
    Button,
    Grid,
    Paper,
    Stepper,
    Step,
    StepLabel,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Divider,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Alert,
    Snackbar,
    Card,
    CardContent,
    InputLabel,
    MenuItem,
    Select
} from '@mui/material';
import {
    CreditCard,
    AccountBalance,
    Payment as PaymentIcon,
    LocalShipping,
    Check
} from '@mui/icons-material';
import { selectCartItems, selectCartTotal, clearCart } from '../features/cart/cartSlice';

const CheckoutPage = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
    const [activeStep, setActiveStep] = useState(0);
    const [shippingData, setShippingData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
        email: '',
        shippingMethod: 'standard'
    });
    const [paymentData, setPaymentData] = useState({
        cardName: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        paymentMethod: 'credit'
    });
    const [errors, setErrors] = useState({});
    const [orderComplete, setOrderComplete] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

    // Calculate shipping cost based on method
    const getShippingCost = () => {
        switch (shippingData.shippingMethod) {
            case 'express':
                return 14.99;
            case 'priority':
                return 24.99;
            default: // standard
                return cartTotal > 100 ? 0 : 5.99;
        }
    };

    // Calculate tax (8.25%)
    const taxRate = 0.0825;
    const taxAmount = cartTotal * taxRate;

    // Final total
    const shippingCost = getShippingCost();
    const finalTotal = cartTotal + shippingCost + taxAmount;

    const handleShippingChange = (e) => {
        const { name, value } = e.target;
        setShippingData({
            ...shippingData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value
        });
        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: null
            });
        }
    };

    const validateShippingForm = () => {
        const newErrors = {};
        const requiredFields = [
            'firstName', 'lastName', 'address', 'city', 'state',
            'zipCode', 'country', 'phone', 'email'
        ];

        requiredFields.forEach(field => {
            if (!shippingData[field].trim()) {
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')} is required`;
            }
        });

        // Email validation
        if (shippingData.email && !/\S+@\S+\.\S+/.test(shippingData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        // Phone validation
        if (shippingData.phone && !/^\d{10}$/.test(shippingData.phone.replace(/\D/g, ''))) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validatePaymentForm = () => {
        const newErrors = {};

        if (!paymentData.cardName.trim()) {
            newErrors.cardName = 'Name on card is required';
        }

        if (!paymentData.cardNumber.trim()) {
            newErrors.cardNumber = 'Card number is required';
        } else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }

        if (!paymentData.expiryDate.trim()) {
            newErrors.expiryDate = 'Expiry date is required';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate)) {
            newErrors.expiryDate = 'Please enter a valid date in MM/YY format';
        }

        if (!paymentData.cvv.trim()) {
            newErrors.cvv = 'CVV is required';
        } else if (!/^\d{3,4}$/.test(paymentData.cvv)) {
            newErrors.cvv = 'Please enter a valid CVV';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        let isValid = false;

        switch (activeStep) {
            case 0:
                isValid = validateShippingForm();
                break;
            case 1:
                isValid = validatePaymentForm();
                break;
            default:
                isValid = true;
        }

        if (isValid) {
            setActiveStep((prevStep) => prevStep + 1);
        }
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePlaceOrder = () => {
        // Here we would normally send the order to an API
        console.log('Order placed!', {
            items: cartItems,
            shipping: shippingData,
            payment: {
                ...paymentData,
                // Remove sensitive data for logging
                cardNumber: paymentData.cardNumber.slice(-4).padStart(paymentData.cardNumber.length, '*'),
                cvv: '***'
            },
            totals: {
                subtotal: cartTotal,
                shipping: shippingCost,
                tax: taxAmount,
                total: finalTotal
            }
        });

        // Show success and reset cart
        setOrderComplete(true);
        setOpenSnackbar(true);
        dispatch(clearCart());

        // After a short delay, navigate to order confirmation
        setTimeout(() => {
            navigate('/');
        }, 3000);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const renderShippingForm = () => (
        <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
                Shipping Address
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="First Name"
                        name="firstName"
                        value={shippingData.firstName}
                        onChange={handleShippingChange}
                        error={Boolean(errors.firstName)}
                        helperText={errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Last Name"
                        name="lastName"
                        value={shippingData.lastName}
                        onChange={handleShippingChange}
                        error={Boolean(errors.lastName)}
                        helperText={errors.lastName}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        fullWidth
                        label="Address"
                        name="address"
                        value={shippingData.address}
                        onChange={handleShippingChange}
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="City"
                        name="city"
                        value={shippingData.city}
                        onChange={handleShippingChange}
                        error={Boolean(errors.city)}
                        helperText={errors.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="State/Province"
                        name="state"
                        value={shippingData.state}
                        onChange={handleShippingChange}
                        error={Boolean(errors.state)}
                        helperText={errors.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Zip / Postal Code"
                        name="zipCode"
                        value={shippingData.zipCode}
                        onChange={handleShippingChange}
                        error={Boolean(errors.zipCode)}
                        helperText={errors.zipCode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth required error={Boolean(errors.country)}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            name="country"
                            value={shippingData.country}
                            onChange={handleShippingChange}
                            label="Country"
                        >
                            <MenuItem value="US">United States</MenuItem>
                            <MenuItem value="CA">Canada</MenuItem>
                            <MenuItem value="UK">United Kingdom</MenuItem>
                            <MenuItem value="AU">Australia</MenuItem>
                        </Select>
                        {errors.country && <Typography color="error" variant="caption">{errors.country}</Typography>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        value={shippingData.phone}
                        onChange={handleShippingChange}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={shippingData.email}
                        onChange={handleShippingChange}
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Shipping Method
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            name="shippingMethod"
                            value={shippingData.shippingMethod}
                            onChange={handleShippingChange}
                        >
                            <FormControlLabel
                                value="standard"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography>Standard Shipping (3-5 business days)</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {cartTotal > 100 ? 'FREE' : '$5.99'}
                                        </Typography>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="express"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography>Express Shipping (2-3 business days)</Typography>
                                        <Typography variant="body2" color="text.secondary">$14.99</Typography>
                                    </Box>
                                }
                            />
                            <FormControlLabel
                                value="priority"
                                control={<Radio />}
                                label={
                                    <Box>
                                        <Typography>Priority Shipping (1-2 business days)</Typography>
                                        <Typography variant="body2" color="text.secondary">$24.99</Typography>
                                    </Box>
                                }
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    );

    const renderPaymentForm = () => (
        <Box component="form" noValidate>
            <Typography variant="h6" gutterBottom>
                Payment Method
            </Typography>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
                <FormLabel component="legend">Select Payment Method</FormLabel>
                <RadioGroup
                    name="paymentMethod"
                    value={paymentData.paymentMethod}
                    onChange={handlePaymentChange}
                >
                    <FormControlLabel
                        value="credit"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <CreditCard sx={{ mr: 1 }} />
                                <Typography>Credit / Debit Card</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="paypal"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <PaymentIcon sx={{ mr: 1 }} />
                                <Typography>PayPal</Typography>
                            </Box>
                        }
                    />
                    <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <AccountBalance sx={{ mr: 1 }} />
                                <Typography>Bank Transfer</Typography>
                            </Box>
                        }
                    />
                </RadioGroup>
            </FormControl>

            {paymentData.paymentMethod === 'credit' && (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Name on Card"
                            name="cardName"
                            value={paymentData.cardName}
                            onChange={handlePaymentChange}
                            error={Boolean(errors.cardName)}
                            helperText={errors.cardName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="Card Number"
                            name="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentChange}
                            error={Boolean(errors.cardNumber)}
                            helperText={errors.cardNumber}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="Expiry Date"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={paymentData.expiryDate}
                            onChange={handlePaymentChange}
                            error={Boolean(errors.expiryDate)}
                            helperText={errors.expiryDate}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            fullWidth
                            label="CVV"
                            name="cvv"
                            type="password"
                            value={paymentData.cvv}
                            onChange={handlePaymentChange}
                            error={Boolean(errors.cvv)}
                            helperText={errors.cvv}
                        />
                    </Grid>
                </Grid>
            )}

            {paymentData.paymentMethod === 'paypal' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    You will be redirected to PayPal to complete your payment after reviewing your order.
                </Alert>
            )}

            {paymentData.paymentMethod === 'bank' && (
                <Alert severity="info" sx={{ mt: 2 }}>
                    Bank transfer details will be provided after you place your order.
                </Alert>
            )}
        </Box>
    );

    const renderOrderReview = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Order Summary
            </Typography>
            <List>
                {cartItems.map((item) => (
                    <ListItem key={item.id} disablePadding sx={{ py: 1 }}>
                        <ListItemAvatar>
                            <Avatar src={item.image} variant="square" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item.name}
                            secondary={`Quantity: ${item.quantity}`}
                            primaryTypographyProps={{ fontWeight: 'medium' }}
                        />
                        <Typography variant="body1">
                            ${(item.price * item.quantity).toFixed(2)}
                        </Typography>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Shipping
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {shippingData.firstName} {shippingData.lastName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {shippingData.address}, {shippingData.city}, {shippingData.state} {shippingData.zipCode}, {shippingData.country}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                        {shippingData.phone}
                    </Typography>
                    <Typography variant="body2">
                        {shippingData.email}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        <strong>Shipping Method:</strong> {shippingData.shippingMethod.charAt(0).toUpperCase() + shippingData.shippingMethod.slice(1)} Shipping
                    </Typography>
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                        Payment Details
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {paymentData.paymentMethod === 'credit' ? 'Credit Card' :
                            paymentData.paymentMethod === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                    </Typography>
                    {paymentData.paymentMethod === 'credit' && (
                        <>
                            <Typography variant="body2" gutterBottom>
                                {paymentData.cardName}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                **** **** **** {paymentData.cardNumber.slice(-4)}
                            </Typography>
                            <Typography variant="body2">
                                Expires: {paymentData.expiryDate}
                            </Typography>
                        </>
                    )}
                </Grid>
            </Grid>

            <Card sx={{ mt: 3 }}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Order Total
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1">${cartTotal.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Shipping</Typography>
                        <Typography variant="body1">
                            ${shippingCost.toFixed(2)}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body1">Tax</Typography>
                        <Typography variant="body1">${taxAmount.toFixed(2)}</Typography>
                    </Box>
                    <Divider sx={{ my: 1 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6">Total</Typography>
                        <Typography variant="h6">${finalTotal.toFixed(2)}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );

    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return renderShippingForm();
            case 1:
                return renderPaymentForm();
            case 2:
                return renderOrderReview();
            default:
                throw new Error('Unknown step');
        }
    };

    if (orderComplete) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Paper sx={{ p: 4 }}>
                    <Check sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
                    <Typography variant="h4" gutterBottom>
                        Thank You For Your Order!
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        Your order has been placed successfully. We've sent a confirmation email to {shippingData.email}.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/')}
                    >
                        Continue Shopping
                    </Button>
                </Paper>
            </Container>
        );
    }

    if (cartItems.length === 0 && !orderComplete) {
        return (
            <Container maxWidth="md" sx={{ py: 8 }}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Your cart is empty
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 4 }}>
                        You need to add items to your cart before proceeding to checkout.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/products')}
                    >
                        Browse Products
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper sx={{ p: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Checkout
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={8}>
                        {getStepContent(activeStep)}

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                variant="outlined"
                            >
                                Back
                            </Button>
                            {activeStep === steps.length - 1 ? (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handlePlaceOrder}
                                >
                                    Place Order
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Order Summary
                                </Typography>
                                <List>
                                    {cartItems.map((item) => (
                                        <ListItem key={item.id} disablePadding sx={{ py: 1 }}>
                                            <ListItemText
                                                primary={`${item.name} (x${item.quantity})`}
                                                secondary={`$${item.price.toFixed(2)} each`}
                                            />
                                            <Typography variant="body2">
                                                ${(item.price * item.quantity).toFixed(2)}
                                            </Typography>
                                        </ListItem>
                                    ))}
                                </List>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1">Subtotal</Typography>
                                    <Typography variant="body1">${cartTotal.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1">Shipping</Typography>
                                    <Typography variant="body1">
                                        ${shippingCost.toFixed(2)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography variant="body1">Tax</Typography>
                                    <Typography variant="body1">${taxAmount.toFixed(2)}</Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="h6">Total</Typography>
                                    <Typography variant="h6">${finalTotal.toFixed(2)}</Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    Your order has been placed successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default CheckoutPage; 