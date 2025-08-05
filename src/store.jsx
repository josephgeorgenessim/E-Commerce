import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import cartReducer from './features/cart/cartSlice';
import settingsReducer from './features/settings/settingsSlice';
import ordersReducer from './features/orders/ordersSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

// Configure persistence for cart and user state
const cartPersistConfig = {
    key: 'cart',
    storage,
    whitelist: ['items', 'couponCode', 'couponDiscount', 'shippingMethod']
};

const usersPersistConfig = {
    key: 'users',
    storage,
    whitelist: ['currentUser', 'isAuthenticated']
};

// Create a root reducer with combined reducers
const rootReducer = combineReducers({
    users: persistReducer(usersPersistConfig, usersReducer),
    cart: persistReducer(cartPersistConfig, cartReducer),
    settings: settingsReducer,
    orders: ordersReducer
});

// Create the store with the persisted reducer
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore non-serializable values in persisted state
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
                ignoredPaths: ['register']
            }
        })
});

// Create persistor
export const persistor = persistStore(store);

export default store; 