import productsData from './inline-products.json';
import hardcodedProducts from './hardcodedProducts';

// Define fallback data in case the import fails
const fallbackProducts = [
    {
        id: "fallback1",
        name: "Fallback Product 1",
        description: "This is a fallback product that shows when the JSON import fails",
        price: 99.99,
        category: "Fallback",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM0NDQ0NDQiPkZhbGxiYWNrPC90ZXh0Pjwvc3ZnPg==",
        stock: 10,
        rating: 4.5,
        reviews: 10,
        featured: true,
        adminId: 1
    },
    {
        id: "fallback2",
        name: "Fallback Product 2",
        description: "This is another fallback product that shows when the JSON import fails",
        price: 59.99,
        category: "Fallback",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxZjFmMSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiM0NDQ0NDQiPkZhbGxiYWNrIDI8L3RleHQ+PC9zdmc+",
        stock: 5,
        rating: 4.0,
        reviews: 5,
        featured: true,
        adminId: 2
    }
];

// Try different approaches to ensure we have products
// 1. Use the JSON imported products if available
// 2. Use the JS hardcoded products if JSON import failed
// 3. Use the fallback products as a last resort
const products = Array.isArray(productsData) && productsData.length > 0
    ? productsData
    : Array.isArray(hardcodedProducts) && hardcodedProducts.length > 0
        ? hardcodedProducts
        : fallbackProducts;

console.log("Final products count:", products.length);
console.log("Final product source:",
    products === productsData ? "JSON" :
        products === hardcodedProducts ? "JS Hardcoded" : "Fallback");

// Basic product data access
export const getAllProducts = () => products;

export const getProductById = (productId) => {
    return products.find(product => product.id === productId);
};

// Filter functions
export const getFilteredProducts = (filters = {}) => {
    const { category, subcategory, search } = filters;

    return products.filter(product => {
        // Filter by category
        if (category && product.category !== category) {
            return false;
        }

        // Filter by subcategory
        if (subcategory && product.subcategory !== subcategory) {
            return false;
        }

        // Filter by search term
        if (search) {
            const searchLower = search.toLowerCase();
            const inName = product.name.toLowerCase().includes(searchLower);
            const inDescription = product.description.toLowerCase().includes(searchLower);
            const inLongDesc = product.longDescription ?
                product.longDescription.toLowerCase().includes(searchLower) : false;

            if (!(inName || inDescription || inLongDesc)) {
                return false;
            }
        }

        return true;
    });
};

// Special collections
export const getFeaturedProducts = () => {
    console.log("getFeaturedProducts called");
    console.log("All products:", products);
    console.log("Products with featured=true:", products.filter(product => product.featured));
    return products.filter(product => product.featured);
};

export const getNewProducts = () => {
    return products.filter(product => product.new);
};

export const getDiscountedProducts = () => {
    return products.filter(product => product.discount > 0);
};

export const getRelatedProducts = (productId, limit = 4) => {
    const product = getProductById(productId);
    if (!product) return [];

    return products
        .filter(p => p.id !== productId && p.category === product.category)
        .slice(0, limit);
};

// Admin functions
export const getProductsByAdminId = (adminId) => {
    return products.filter(product =>
        product.adminId === parseInt(adminId) || product.adminId === adminId
    );
};

export default products; 