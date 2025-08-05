import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    Container, Grid, Box, Typography, Card, CardMedia,
    CardContent, CardActions, Button, Rating, TextField,
    Drawer, Divider, Slider, FormControl, InputLabel,
    Select, MenuItem, Chip, IconButton, InputAdornment
} from '@mui/material';
import {
    Search as SearchIcon,
    FilterList as FilterListIcon,
    Close as CloseIcon
} from '@mui/icons-material';
import { getAllProducts, getFilteredProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import { useNavigate } from 'react-router-dom';

const ProductsPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: 0,
        maxPrice: 1000,
        rating: 0,
        sortBy: 'popular',
        searchTerm: ''
    });
    const [searchQuery, setSearchQuery] = useState('');

    // For mobile filter drawer
    const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

    // Load products on component mount
    useEffect(() => {
        const products = getAllProducts();
        setAllProducts(products);
        setFilteredProducts(products);

        // Set max price based on products
        const maxPrice = Math.max(...products.map(product => product.price));
        setFilters(prev => ({ ...prev, maxPrice }));
    }, []);

    // Extract unique categories and subcategories from products
    const categories = [...new Set(allProducts.map(product => product.category))];

    // Apply filters when they change
    useEffect(() => {
        // Create filter object for API
        const filterCriteria = {};

        if (filters.category) filterCriteria.category = filters.category;
        if (filters.rating > 0) filterCriteria.rating = filters.rating;
        if (searchQuery) filterCriteria.search = searchQuery;

        // Apply filters directly
        let results = getFilteredProducts(filterCriteria);

        // Apply price filter (not part of our filter API)
        results = results.filter(product =>
            product.price >= filters.minPrice && product.price <= filters.maxPrice
        );

        // Apply sorting
        results.sort((a, b) => {
            switch (filters.sortBy) {
                case 'priceAsc':
                    return a.price - b.price;
                case 'priceDesc':
                    return b.price - a.price;
                case 'newest':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'popular':
                default:
                    return b.rating - a.rating;
            }
        });

        setFilteredProducts(results);
    }, [filters, searchQuery]);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
    };

    const handlePriceRangeChange = (event, newValue) => {
        setFilters(prev => ({
            ...prev,
            minPrice: newValue[0],
            maxPrice: newValue[1]
        }));
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleResetFilters = () => {
        const maxPrice = Math.max(...allProducts.map(product => product.price));
        setFilters({
            category: '',
            minPrice: 0,
            maxPrice,
            rating: 0,
            sortBy: 'popular',
            searchTerm: ''
        });
        setSearchQuery('');
    };

    const handleAddToCart = (product) => {
        dispatch(addItem({ product, quantity: 1 }));
    };

    const navigateToProduct = (productId) => {
        navigate(`/products/${productId}`);
    };

    // Filter component that will be used in both main view and drawer
    const FilterPanel = () => (
        <Box sx={{ p: { xs: 2, md: 0 } }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Categories</Typography>
                <FormControl fullWidth size="small">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={filters.category}
                        label="Category"
                        onChange={(e) => handleFilterChange('category', e.target.value)}
                    >
                        <MenuItem value="">All Categories</MenuItem>
                        {categories.map((category) => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Price Range</Typography>
                <Box sx={{ px: 1 }}>
                    <Slider
                        value={[filters.minPrice, filters.maxPrice]}
                        onChange={handlePriceRangeChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={Math.ceil(filters.maxPrice)}
                        valueLabelFormat={(value) => `$${value}`}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Typography variant="body2">${filters.minPrice}</Typography>
                        <Typography variant="body2">${filters.maxPrice}</Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Rating</Typography>
                <FormControl fullWidth size="small">
                    <InputLabel>Minimum Rating</InputLabel>
                    <Select
                        value={filters.rating}
                        label="Minimum Rating"
                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                    >
                        <MenuItem value={0}>All Ratings</MenuItem>
                        <MenuItem value={4.5}>4.5 & Above</MenuItem>
                        <MenuItem value={4}>4.0 & Above</MenuItem>
                        <MenuItem value={3.5}>3.5 & Above</MenuItem>
                        <MenuItem value={3}>3.0 & Above</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>Sort By</Typography>
                <FormControl fullWidth size="small">
                    <InputLabel>Sort Products</InputLabel>
                    <Select
                        value={filters.sortBy}
                        label="Sort Products"
                        onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                    >
                        <MenuItem value="popular">Popularity</MenuItem>
                        <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                        <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                        <MenuItem value="newest">Newest First</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={handleResetFilters}
                sx={{ mt: 2 }}
            >
                Clear All Filters
            </Button>
        </Box>
    );

    return (
        <Container sx={{ py: 4 }}>
            {/* Page Title */}
            <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
                All Products
            </Typography>

            {/* Search and Filter Bar */}
            <Box sx={{ mb: 4 }}>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            placeholder="Search products..."
                            variant="outlined"
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                                endAdornment: searchQuery && (
                                    <InputAdornment position="end">
                                        <IconButton
                                            size="small"
                                            onClick={() => {
                                                setSearchQuery('');
                                                handleResetFilters();
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <FormControl fullWidth size="small">
                            <InputLabel>Sort By</InputLabel>
                            <Select
                                value={filters.sortBy}
                                label="Sort By"
                                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                            >
                                <MenuItem value="popular">Most Popular</MenuItem>
                                <MenuItem value="priceAsc">Price: Low to High</MenuItem>
                                <MenuItem value="priceDesc">Price: High to Low</MenuItem>
                                <MenuItem value="newest">Newest First</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            startIcon={<FilterListIcon />}
                            onClick={() => setFilterDrawerOpen(true)}
                            sx={{ display: { md: 'none' } }}
                        >
                            Filters
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            {/* Active Filters */}
            {(filters.category || filters.rating > 0 || filters.minPrice > 0 || filters.maxPrice < filters.maxPrice) && (
                <Box sx={{ mb: 3, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Typography variant="body2" sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                        Active Filters:
                    </Typography>

                    {filters.category && (
                        <Chip
                            label={`Category: ${filters.category}`}
                            onDelete={() => handleFilterChange('category', '')}
                            size="small"
                        />
                    )}

                    {filters.rating > 0 && (
                        <Chip
                            label={`Rating: ${filters.rating}+ ★`}
                            onDelete={() => handleFilterChange('rating', 0)}
                            size="small"
                        />
                    )}

                    {(filters.minPrice > 0 || filters.maxPrice < filters.maxPrice) && (
                        <Chip
                            label={`Price: $${filters.minPrice} - $${filters.maxPrice}`}
                            onDelete={() => {
                                handleFilterChange('minPrice', 0);
                                handleFilterChange('maxPrice', Math.max(...allProducts.map(p => p.price)));
                            }}
                            size="small"
                        />
                    )}

                    <Chip
                        label="Clear All"
                        onDelete={handleResetFilters}
                        size="small"
                        color="secondary"
                    />
                </Box>
            )}

            <Grid container spacing={3}>
                {/* Filters Sidebar - Desktop */}
                <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <FilterPanel />
                </Grid>

                {/* Products Grid */}
                <Grid item xs={12} md={9}>
                    {filteredProducts.length === 0 ? (
                        <Box sx={{ py: 4, textAlign: 'center' }}>
                            <Typography variant="h6" color="text.secondary">
                                No products match your filters.
                            </Typography>
                            <Button
                                variant="text"
                                color="primary"
                                onClick={handleResetFilters}
                                sx={{ mt: 2 }}
                            >
                                Clear All Filters
                            </Button>
                        </Box>
                    ) : (
                        <Grid container spacing={3}>
                            {filteredProducts.map((product) => (
                                <Grid item key={product.id} xs={12} sm={6} lg={4}>
                                    <Card
                                        sx={{
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            transition: '0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-5px)',
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={product.image}
                                            alt={product.name}
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => navigateToProduct(product.id)}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography gutterBottom variant="h6" component="div" noWrap>
                                                {product.name}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                                <Rating value={product.rating} precision={0.5} readOnly size="small" />
                                                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                    ({product.reviews})
                                                </Typography>
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: 40, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                {product.description}
                                            </Typography>
                                            <Typography variant="h6" color="primary">
                                                ${product.price.toFixed(2)}
                                                {product.discount > 0 && (
                                                    <Typography
                                                        component="span"
                                                        sx={{
                                                            textDecoration: 'line-through',
                                                            color: 'text.secondary',
                                                            ml: 1,
                                                            fontSize: '0.8rem',
                                                        }}
                                                    >
                                                        ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                                                    </Typography>
                                                )}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button
                                                size="small"
                                                onClick={() => navigateToProduct(product.id)}
                                            >
                                                View Details
                                            </Button>
                                            <Button
                                                size="small"
                                                color="primary"
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                Add to Cart
                                            </Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Grid>

            {/* Mobile Filter Drawer */}
            <Drawer
                anchor="right"
                open={filterDrawerOpen}
                onClose={() => setFilterDrawerOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: '80%',
                        maxWidth: '300px',
                        p: 2,
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">Filters</Typography>
                    <IconButton onClick={() => setFilterDrawerOpen(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <FilterPanel />
            </Drawer>
        </Container>
    );
};

export default ProductsPage;
export default ProductsPage; 