import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    isOpen: false,
    couponCode: '',
    couponDiscount: 0,
    shippingMethod: null,
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.id === product.id);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                state.items.push({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity,
                    category: product.category,
                    subcategory: product.subcategory
                });
            }

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        // Alias for removeItem to maintain backward compatibility
        removeFromCart: (state, action) => {
            // Simply call the removeItem reducer
            cartSlice.caseReducers.removeItem(state, action);
        },

        updateCartItem: (state, action) => {
            const { id, quantity } = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);

            if (itemToUpdate) {
                itemToUpdate.quantity = Math.max(1, quantity);
            }

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        increaseQuantity: (state, action) => {
            const id = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);

            if (itemToUpdate) {
                itemToUpdate.quantity += 1;
            }

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const itemToUpdate = state.items.find(item => item.id === id);

            if (itemToUpdate && itemToUpdate.quantity > 1) {
                itemToUpdate.quantity -= 1;
                // Update cart totals
                cartSlice.caseReducers.updateCartTotals(state);
            } else if (itemToUpdate && itemToUpdate.quantity === 1) {
                // Remove item if quantity would be 0
                state.items = state.items.filter(item => item.id !== id);
                // Update cart totals
                cartSlice.caseReducers.updateCartTotals(state);
            }
        },

        clearCart: (state) => {
            state.items = [];
            state.couponCode = '';
            state.couponDiscount = 0;
            state.shippingMethod = null;

            // Update cart totals (will zero everything out)
            cartSlice.caseReducers.updateCartTotals(state);
        },

        toggleCart: (state) => {
            state.isOpen = !state.isOpen;
        },

        openCart: (state) => {
            state.isOpen = true;
        },

        closeCart: (state) => {
            state.isOpen = false;
        },

        applyCoupon: (state, action) => {
            const { code, discount } = action.payload;
            state.couponCode = code;
            state.couponDiscount = discount;

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        removeCoupon: (state) => {
            state.couponCode = '';
            state.couponDiscount = 0;

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        setShippingMethod: (state, action) => {
            state.shippingMethod = action.payload;
            state.shipping = action.payload.price;

            // Update cart totals
            cartSlice.caseReducers.updateCartTotals(state);
        },

        // This is a "private" reducer that updates all the cart totals
        updateCartTotals: (state) => {
            const taxRate = 0.07; // 7% tax (should come from settings in real app)

            // Calculate subtotal
            state.subtotal = state.items.reduce((sum, item) => {
                return sum + (item.price * item.quantity);
            }, 0);

            // Apply coupon discount if any
            const discountedSubtotal = state.couponDiscount > 0
                ? state.subtotal * (1 - state.couponDiscount / 100)
                : state.subtotal;

            // Calculate tax
            state.tax = discountedSubtotal * taxRate;

            // Shipping cost (from selected shipping method)
            state.shipping = state.shippingMethod ? state.shippingMethod.price : 0;

            // Calculate total
            state.total = discountedSubtotal + state.tax + state.shipping;
        }
    }
});

export const {
    addItem,
    removeItem,
    removeFromCart,
    updateCartItem,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    applyCoupon,
    removeCoupon,
    setShippingMethod,
    increaseQuantity,
    decreaseQuantity
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectCartItemCount = (state) =>
    state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartSubtotal = (state) => state.cart.subtotal;
export const selectCartTax = (state) => state.cart.tax;
export const selectCartShipping = (state) => state.cart.shipping;
export const selectCartTotal = (state) => state.cart.total;
export const selectCartCoupon = (state) => ({
    code: state.cart.couponCode,
    discount: state.cart.couponDiscount
});
export const selectShippingMethod = (state) => state.cart.shippingMethod;

// A selector to check if an item is in the cart
export const selectIsInCart = (state, productId) =>
    state.cart.items.some(item => item.id === productId);

// A selector to get a specific cart item by id
export const selectCartItemById = (state, productId) =>
    state.cart.items.find(item => item.id === productId);

export default cartSlice.reducer; 