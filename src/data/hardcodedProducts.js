// Directly export hardcoded products as a fallback
const hardcodedProducts = [
    {
        id: "hardcoded1",
        name: "JavaScript Product 1",
        description: "This is a product defined directly in JavaScript",
        price: 49.99,
        category: "JS Products",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxYzQwZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMwMDAwMDAiPkpTIFByb2R1Y3QgMTwvdGV4dD48L3N2Zz4=",
        stock: 10,
        rating: 4.5,
        reviews: 10,
        featured: true,
        adminId: 1
    },
    {
        id: "hardcoded2",
        name: "JavaScript Product 2",
        description: "Another product defined directly in JavaScript",
        price: 29.99,
        category: "JS Products",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxYzQwZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMwMDAwMDAiPkpTIFByb2R1Y3QgMjwvdGV4dD48L3N2Zz4=",
        stock: 5,
        rating: 4.0,
        reviews: 5,
        featured: true,
        adminId: 1
    },
    {
        id: "hardcoded3",
        name: "JavaScript Product 3",
        description: "A third product defined directly in JavaScript",
        price: 39.99,
        category: "JS Products",
        image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2YxYzQwZiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBhbGlnbm1lbnQtYmFzZWxpbmU9Im1pZGRsZSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZpbGw9IiMwMDAwMDAiPkpTIFByb2R1Y3QgMzwvdGV4dD48L3N2Zz4=",
        stock: 15,
        rating: 3.5,
        reviews: 8,
        featured: false,
        adminId: 2
    }
];

export default hardcodedProducts; 