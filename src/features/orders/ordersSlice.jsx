import { createSlice } from '@reduxjs/toolkit';
import ordersData from '../../data/orders.json';

const initialState = {
    orders: ordersData || [],
    currentOrder: null,
    status: 'idle',
    error: null
};

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrder: (state, action) => {
            state.orders.push(action.payload);
        },
        setCurrentOrder: (state, action) => {
            state.currentOrder = action.payload;
        },
        updateOrderStatus: (state, action) => {
            const { orderId, status } = action.payload;
            const order = state.orders.find(order => order.id === orderId);
            if (order) {
                order.status = status;
            }
        }
    }
});

export const { addOrder, setCurrentOrder, updateOrderStatus } = ordersSlice.actions;

// Selectors
export const selectAllOrders = (state) => state.orders.orders;
export const selectCurrentOrder = (state) => state.orders.currentOrder;
export const selectOrderById = (state, orderId) =>
    state.orders.orders.find(order => order.id === orderId);
export const selectOrdersByUser = (state, userId) =>
    state.orders.orders.filter(order => order.userId === userId);
export const selectOrdersByAdminId = (state, adminId) =>
    state.orders.orders.filter(order =>
        order.cartItems && order.cartItems.some(item =>
            item.adminId === parseInt(adminId) || item.adminId === adminId
        )
    );

export default ordersSlice.reducer; 