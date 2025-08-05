import { createSlice } from '@reduxjs/toolkit';
import usersData from '../../data/users.json';

// Initial state with a guest user to handle non-authenticated state
const initialState = {
    users: usersData,
    currentUser: { role: 'guest' }, // Default to guest role
    isAuthenticated: false,
    loading: false,
    error: null
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        loginFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            state.currentUser = { role: 'guest' };
            state.isAuthenticated = false;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuthenticated = action.payload.role !== 'guest';
        },
        registerUser: (state, action) => {
            const newUser = {
                ...action.payload,
                id: (Math.max(...state.users.map(u => u.id)) + 1).toString(),
                role: 'user',
                joinDate: new Date().toISOString(),
                lastActive: new Date().toISOString()
            };
            state.users.push(newUser);
        },
        updateUser: (state, action) => {
            const { id, ...updates } = action.payload;
            const userIndex = state.users.findIndex(user => user.id === id);

            if (userIndex !== -1) {
                state.users[userIndex] = {
                    ...state.users[userIndex],
                    ...updates,
                    lastActive: new Date().toISOString()
                };

                // If updating the current user, also update currentUser
                if (state.currentUser && state.currentUser.id === id) {
                    state.currentUser = {
                        ...state.currentUser,
                        ...updates
                    };
                }
            }
        },
        deleteUser: (state, action) => {
            const userId = action.payload;
            state.users = state.users.filter(user => user.id !== userId);
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    registerUser,
    updateUser,
    deleteUser,
    setCurrentUser
} = usersSlice.actions;

// Thunks
export const login = (userData) => async (dispatch) => {
    try {
        dispatch(loginStart());

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // For the mock login, we'll just use the userData directly
        // In a real app, this would be the response from your authentication API
        dispatch(loginSuccess(userData));
        return userData;
    } catch (error) {
        dispatch(loginFailed(error.message));
        throw error;
    }
};

export const register = (userData) => async (dispatch) => {
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));

        dispatch(registerUser(userData));
        return userData;
    } catch (error) {
        throw error;
    }
};

// Selectors
export const selectUsers = (state) => state.users.users;
export const selectCurrentUser = (state) => state.users.currentUser;
export const selectIsAuthenticated = (state) => state.users.isAuthenticated;
export const selectIsAdmin = (state) =>
    state.users.isAuthenticated &&
    state.users.currentUser?.role === 'admin';
export const selectIsSuperAdmin = (state) =>
    state.users.isAuthenticated &&
    state.users.currentUser?.role === 'superadmin';
export const selectUserLoading = (state) => state.users.loading;
export const selectUserError = (state) => state.users.error;

export default usersSlice.reducer; 