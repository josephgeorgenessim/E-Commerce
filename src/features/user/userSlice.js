import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isAuthenticated: false,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.currentUser = null;
            state.status = 'idle';
            state.error = null;
        },
        register: (state, action) => {
            state.isAuthenticated = true;
            state.currentUser = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },
        updateProfile: (state, action) => {
            state.currentUser = { ...state.currentUser, ...action.payload };
        },
        setLoading: (state) => {
            state.status = 'loading';
        },
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, register, updateProfile, setLoading, setError } = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer; 