import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    websiteName: 'ShopSphere',
    theme: 'light',
    language: 'en',
    notifications: true,
    currency: 'USD'
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setWebsiteName: (state, action) => {
            state.websiteName = action.payload;
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        toggleNotifications: (state) => {
            state.notifications = !state.notifications;
        },
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        resetSettings: (state) => {
            return initialState;
        }
    }
});

export const {
    setWebsiteName,
    setTheme,
    setLanguage,
    toggleNotifications,
    setCurrency,
    resetSettings
} = settingsSlice.actions;

// Selectors
export const selectWebsiteName = (state) => state.settings.websiteName;
export const selectTheme = (state) => state.settings.theme;
export const selectLanguage = (state) => state.settings.language;
export const selectNotifications = (state) => state.settings.notifications;
export const selectCurrency = (state) => state.settings.currency;
export const selectAllSettings = (state) => state.settings;

export default settingsSlice.reducer; 