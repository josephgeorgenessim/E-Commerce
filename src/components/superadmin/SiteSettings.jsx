import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography, Paper, TextField, Button,
    Snackbar, Alert, Grid, Divider,
    Box, Card, CardContent
} from '@mui/material';
import { updateSettings, resetSettings, selectSettings } from '../../features/settings/settingsSlice';

const SiteSettings = () => {
    const dispatch = useDispatch();
    const currentSettings = useSelector(selectSettings);

    const [formData, setFormData] = useState({ ...currentSettings });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSaveSettings = () => {
        // Simple validation
        if (!formData.websiteName.trim()) {
            showSnackbar('Website name cannot be empty', 'error');
            return;
        }

        dispatch(updateSettings(formData));
        showSnackbar('Settings saved successfully', 'success');
    };

    const handleResetSettings = () => {
        if (window.confirm('Are you sure you want to reset all settings to default?')) {
            dispatch(resetSettings());
            setFormData({ ...currentSettings });
            showSnackbar('Settings reset to default', 'info');
        }
    };

    const showSnackbar = (message, severity = 'success') => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <div>
            <Typography variant="h5" className="mb-4">Site Settings</Typography>

            <Paper className="p-6">
                <Typography variant="subtitle1" gutterBottom>
                    General Settings
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Website Name"
                            name="websiteName"
                            value={formData.websiteName}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Logo Text"
                            name="logoText"
                            value={formData.logoText}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Primary Color"
                            name="primaryColor"
                            value={formData.primaryColor}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="color"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Secondary Color"
                            name="secondaryColor"
                            value={formData.secondaryColor}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                            type="color"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Footer Text"
                            name="footerText"
                            value={formData.footerText}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                </Grid>

                <Box className="flex justify-between mt-6">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleResetSettings}
                    >
                        Reset to Default
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveSettings}
                    >
                        Save Settings
                    </Button>
                </Box>
            </Paper>

            <Typography variant="h6" className="mt-6 mb-3">
                Preview
            </Typography>
            <Card className="mb-6" style={{ backgroundColor: formData.primaryColor }}>
                <CardContent>
                    <Typography variant="h5" style={{ color: '#fff' }}>
                        {formData.websiteName}
                    </Typography>
                    <Divider className="my-2" style={{ backgroundColor: '#ffffff50' }} />
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        Logo: {formData.logoText}
                    </Typography>
                </CardContent>
            </Card>

            <Card className="mb-6" style={{ backgroundColor: formData.secondaryColor }}>
                <CardContent className="text-center">
                    <Typography variant="body2" style={{ color: '#fff' }}>
                        {formData.footerText}
                    </Typography>
                </CardContent>
            </Card>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} variant="filled">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SiteSettings; 