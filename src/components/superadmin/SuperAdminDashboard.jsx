import React, { useState } from 'react';
import { Tabs, Tab, Box, Container, Paper } from '@mui/material';
import AllOrders from './AllOrders';
import UserManagement from './UserManagement';
import AllProducts from './AllProducts';
import SiteSettings from './SiteSettings';

const SuperAdminDashboard = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Container maxWidth="lg">
            <Paper className="mb-4">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                    indicatorColor="secondary"
                    textColor="secondary"
                >
                    <Tab label="Orders" />
                    <Tab label="Users" />
                    <Tab label="Products" />
                    <Tab label="Site Settings" />
                </Tabs>
            </Paper>

            <Box className="py-4">
                {activeTab === 0 && <AllOrders />}
                {activeTab === 1 && <UserManagement />}
                {activeTab === 2 && <AllProducts />}
                {activeTab === 3 && <SiteSettings />}
            </Box>
        </Container>
    );
};

export default SuperAdminDashboard; 