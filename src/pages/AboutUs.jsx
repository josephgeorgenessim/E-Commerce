import React from 'react';
import { Container, Typography, Grid, Box, Card, CardContent, Avatar, Divider } from '@mui/material';
import { Store, LocalShipping, Security, Support } from '@mui/icons-material';

const AboutUs = () => {
    const teamMembers = [
        {
            name: 'John Smith',
            role: 'CEO & Founder',
            bio: 'John founded ShopSphere with a vision to create an accessible e-commerce platform for everyone.',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            name: 'Sarah Johnson',
            role: 'Chief Product Officer',
            bio: 'Sarah oversees our product strategy and ensures we deliver the best shopping experience.',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
            name: 'Michael Chen',
            role: 'CTO',
            bio: 'Michael leads our technology team and builds the infrastructure that powers ShopSphere.',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box textAlign="center" mb={6}>
                <Typography variant="h3" component="h1" gutterBottom>
                    About ShopSphere
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
                    Your one-stop destination for all your shopping needs. We bring quality products
                    from around the world right to your doorstep.
                </Typography>
            </Box>

            <Grid container spacing={4} mb={6}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" gutterBottom>Our Story</Typography>
                    <Typography paragraph>
                        Founded in 2020, ShopSphere started as a small online store with a big dream - to revolutionize
                        the way people shop online. Our journey began with just a handful of products, but our commitment
                        to quality and customer satisfaction helped us grow rapidly.
                    </Typography>
                    <Typography paragraph>
                        Today, we offer thousands of products across multiple categories, serving customers worldwide.
                        Our mission remains the same: to provide high-quality products at competitive prices with
                        exceptional customer service.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box component="img"
                        src="https://images.unsplash.com/photo-1542744173-8659b8e77b1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                        alt="Our office"
                        sx={{ width: '100%', height: 300, objectFit: 'cover', borderRadius: 2 }}
                    />
                </Grid>
            </Grid>

            <Box mb={8}>
                <Typography variant="h4" align="center" gutterBottom>
                    Our Values
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Store fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ mt: 2 }}>Quality Products</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    We carefully curate our selection to offer only the best products.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <LocalShipping fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ mt: 2 }}>Fast Delivery</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    We ensure quick and reliable shipping to your doorstep.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Security fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ mt: 2 }}>Secure Shopping</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Your data security and privacy are our top priorities.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <Support fontSize="large" color="primary" />
                                <Typography variant="h6" sx={{ mt: 2 }}>Customer Support</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Our dedicated team is ready to assist you 24/7.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>

            <Box>
                <Typography variant="h4" align="center" gutterBottom>
                    Meet Our Team
                </Typography>
                <Divider sx={{ mb: 4 }} />
                <Grid container spacing={4}>
                    {teamMembers.map((member, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ textAlign: 'center' }}>
                                    <Avatar
                                        src={member.avatar}
                                        alt={member.name}
                                        sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }}
                                    />
                                    <Typography variant="h6">{member.name}</Typography>
                                    <Typography variant="subtitle2" color="primary" gutterBottom>
                                        {member.role}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {member.bio}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default AboutUs; 