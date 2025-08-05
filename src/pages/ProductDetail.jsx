import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getProductById, getRelatedProducts } from '../data/productsData';
import { addItem } from '../features/cart/cartSlice';
import {
  Container, Grid, Box, Typography, Button, Rating, Divider,
  Card, CardContent, Chip, CircularProgress, Tabs, Tab
} from '@mui/material';
import {
  AddShoppingCart as CartIcon,
  LocalShipping as ShippingIcon,
  Security as SecurityIcon,
  AssignmentReturn as ReturnIcon
} from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = React.useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      // Get product directly from data module
      const foundProduct = getProductById(id);
      setProduct(foundProduct);

      if (foundProduct) {
        // Get related products
        setRelatedProducts(getRelatedProducts(id));
      }

      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      price: product.price,
      name: product.name,
      image: product.image,
      quantity: 1
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!product) {
    return (
      <Container sx={{ py: 8 }}>
        <Typography variant="h5" align="center">
          Product not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* Product Images */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 1,
              mb: 2
            }}
          />
          <Grid container spacing={2}>
            {product.images && product.images.slice(0, 3).map((image, index) => (
              <Grid item xs={4} key={index}>
                <Box
                  component="img"
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  sx={{
                    width: '100%',
                    height: 80,
                    objectFit: 'cover',
                    borderRadius: 1,
                    cursor: 'pointer',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="overline" color="text.secondary">
              {product.category} / {product.subcategory}
            </Typography>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                {product.rating} ({product.reviews} reviews)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
              ${product.price.toFixed(2)}
              {product.discount > 0 && (
                <Typography
                  component="span"
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                    ml: 2,
                    fontSize: '1rem'
                  }}
                >
                  ${(product.price * (1 + product.discount / 100)).toFixed(2)}
                </Typography>
              )}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              {product.new && (
                <Chip label="NEW" color="primary" size="small" sx={{ mr: 1 }} />
              )}
              {product.discount > 0 && (
                <Chip label={`${product.discount}% OFF`} color="secondary" size="small" sx={{ mr: 1 }} />
              )}
              {product.stock < 10 && (
                <Chip label="Low Stock" color="error" size="small" />
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Availability: <span style={{ fontWeight: 'normal' }}>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</span>
              </Typography>
              <Typography variant="subtitle2">
                SKU: <span style={{ fontWeight: 'normal' }}>PROD-{product.id}</span>
              </Typography>
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<CartIcon />}
              size="large"
              fullWidth
              disabled={product.stock === 0}
              onClick={handleAddToCart}
              sx={{ mb: 2 }}
            >
              Add to Cart
            </Button>

            <Divider sx={{ my: 3 }} />

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <ShippingIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="body2">Free Shipping</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <SecurityIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="body2">Secure Payment</Typography>
                </Box>
              </Grid>
              <Grid item xs={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <ReturnIcon color="primary" sx={{ fontSize: 32, mb: 1 }} />
                  <Typography variant="body2">Easy Returns</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>

      {/* Product Information Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Specifications" />
          <Tab label="Description" />
          <Tab label="Shipping" />
        </Tabs>

        <Box sx={{ py: 3 }}>
          {tabValue === 0 && (
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Product Specifications</Typography>
                <Grid container spacing={2}>
                  {product.specs && Object.entries(product.specs).map(([key, value]) => (
                    <Grid item xs={12} sm={6} key={key}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 1, borderBottom: '1px dashed', borderColor: 'divider' }}>
                        <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {Array.isArray(value) ? value.join(', ') : value.toString()}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          )}

          {tabValue === 1 && (
            <Box>
              <Typography variant="h6" gutterBottom>Detailed Description</Typography>
              <Typography variant="body1" paragraph>
                {product.longDescription || product.description}
              </Typography>
            </Box>
          )}

          {tabValue === 2 && (
            <Box>
              <Typography variant="h6" gutterBottom>Shipping Information</Typography>
              <Typography variant="body1" paragraph>
                Free standard shipping on orders over $50.
              </Typography>
              <Typography variant="body1" paragraph>
                Estimated delivery time: 3-5 business days.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Please note that delivery times may vary based on your location.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" gutterBottom>
            Related Products
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid item xs={12} sm={6} md={3} key={relatedProduct.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    component="img"
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    sx={{ height: 140, objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {relatedProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {relatedProduct.description}
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                      ${relatedProduct.price.toFixed(2)}
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      fullWidth
                      onClick={() => window.location.href = `/products/${relatedProduct.id}`}
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default ProductDetail; 