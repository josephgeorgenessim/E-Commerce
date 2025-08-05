import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const { id, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.id === id);

            if (existingItem) {
                // Update quantity if item already exists
                existingItem.quantity += quantity;
            } else {
                // Add new item to cart
                state.items.push({
                    ...action.payload,
                    quantity: quantity
                });
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        increaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.items.find(item => item.id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
        updateCartItem: (state, action) => {
            const { id, ...updates } = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                state.items[itemIndex] = { ...state.items[itemIndex], ...updates };
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    addItem,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    updateCartItem,
    clearCart,
} = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectCartItemCount = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

export const selectCartTotal = (state) => {
    return state.cart.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};

export const selectCartItemById = (state, itemId) => {
    return state.cart.items.find(item => item.id === itemId);
};

export default cartSlice.reducer; 