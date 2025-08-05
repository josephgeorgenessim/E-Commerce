import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container sx={{ py: 8 }}>
            <Box
                sx={{
                    textAlign: 'center',
                    py: 8
                }}
            >
                <Typography variant="h1" sx={{ fontSize: '6rem', color: 'text.secondary' }}>
                    404
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Page Not Found
                </Typography>
                <Typography variant="body1" paragraph color="text.secondary">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/')}
                    size="large"
                    sx={{ mt: 2 }}
                >
                    Go to Homepage
                </Button>
            </Box>
        </Container>
    );
};

export default NotFound; 