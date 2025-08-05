import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/userSlice';
import productsReducer from '../features/products/productsSlice';
import cartReducer from '../features/cart/cartSlice';
import ordersReducer from '../features/orders/ordersSlice.jsx';
import usersReducer from '../features/users/usersSlice.jsx';
import settingsReducer from '../features/settings/settingsSlice.jsx';

// Create persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'cart'], // only persist user and cart
};

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  users: usersReducer,
  settings: settingsReducer,
});

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'], // ignore these action types
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
