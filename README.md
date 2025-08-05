# 🛍️ E-Commerce Platform

A modern, full-featured e-commerce platform built with React, Redux, and Tailwind CSS. This platform supports multiple user roles including guests, customers, admins, and super admins.

## 🚀 Features

### 🏠 Public Features (All Users)
- **Home Page**: Featured products, categories, and promotional content
- **Product Catalog**: Browse all products with filtering and search
- **Product Details**: Detailed product information with images and reviews
- **Category Pages**: Browse products by category
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save products for later
- **User Registration & Login**: Secure authentication system
- **Responsive Design**: Works on desktop, tablet, and mobile

### 👤 Customer Features (Registered Users)
- **User Profile**: Manage personal information
- **Order History**: View past orders and track current ones
- **Checkout Process**: Secure payment and shipping information
- **Account Settings**: Update profile and preferences

### 🔧 Admin Features (Store Managers)
- **Admin Dashboard**: Analytics and overview of store performance
- **Product Management**: Add, edit, delete, and manage inventory
- **Order Management**: Process orders, update status, track shipments
- **Customer Management**: View customer information and order history
- **Sales Analytics**: Revenue tracking, product performance, order statistics
- **Store Settings**: Configure store policies and preferences

### 👑 Super Admin Features (Platform Owners)
- **All Admin Features**: Access to all admin functionality
- **User Management**: Manage all users across the platform
- **Global Analytics**: Platform-wide statistics and insights
- **Site Settings**: Global platform configuration
- **Multi-Store Management**: Oversee multiple admin stores

## 👥 User Roles & Permissions

### 🚶 Guest Users
- **Access**: Public pages only
- **Features**: Browse products, add to cart, view product details
- **Restrictions**: Cannot checkout, access user-only features

### 👤 Regular Customers
- **Access**: All public features + user-specific features
- **Features**: Complete shopping experience, profile management
- **Permissions**: Manage own account and orders

### 🔧 Store Admins
- **Access**: Own store management + customer features
- **Features**: Manage products, process orders, view analytics
- **Permissions**: Full control over their assigned store

### 👑 Super Admins
- **Access**: Platform-wide management + all other roles
- **Features**: User management, global analytics, platform settings
- **Permissions**: Complete platform control

## 🛠️ Technology Stack

### Frontend
- **React 19**: Modern UI library
- **Redux Toolkit**: State management
- **Redux Persist**: Data persistence
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/ui**: Modern component library
- **Lucide React**: Icon library

### Charts & Analytics
- **Chart.js**: Data visualization
- **React-Chartjs-2**: React wrapper for Chart.js

### Development Tools
- **Create React App**: Development environment
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

## 📁 Project Structure

```
E-Commerce/
├── public/                 # Static assets
├── src/
│   ├── app/               # Redux store configuration
│   ├── components/        # Reusable UI components
│   │   ├── admin/         # Admin-specific components
│   │   ├── auth/          # Authentication components
│   │   ├── common/        # Shared components
│   │   ├── guest/         # Public components
│   │   ├── superadmin/    # Super admin components
│   │   └── ui/            # Base UI components
│   ├── data/              # Mock data and data utilities
│   ├── features/          # Redux slices and features
│   │   ├── cart/          # Shopping cart functionality
│   │   ├── orders/        # Order management
│   │   ├── settings/      # Application settings
│   │   └── users/         # User management
│   ├── layouts/           # Page layout components
│   ├── pages/             # Main page components
│   └── routes/            # Routing configuration
├── package.json           # Dependencies and scripts
└── tailwind.config.js     # Tailwind CSS configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd E-Commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Authentication & Testing

### Demo Accounts

#### Admin User
- **Email**: `admin@example.com`
- **Password**: `admin123`
- **Access**: `/admin/dashboard`

#### Super Admin User
- **Email**: `superadmin@example.com`
- **Password**: `super123`
- **Access**: `/superadmin`

#### Regular Customer
- **Email**: `john@example.com`
- **Password**: `password123`
- **Access**: All customer features

### Login Process
1. Navigate to `/login`
2. Use any of the demo credentials above
3. You'll be automatically redirected based on your role

## 📊 Key Features Explained

### 🛒 Shopping Cart System
- Persistent cart data (survives page refresh)
- Real-time price calculations
- Quantity management
- Coupon code support
- Multiple shipping options

### 📈 Analytics Dashboard
- **Revenue Tracking**: Total sales, monthly trends
- **Product Analytics**: Best sellers, inventory levels
- **Order Management**: Status tracking, processing
- **Customer Insights**: Purchase patterns, demographics

### 🔐 Role-Based Access Control
- **Route Protection**: Automatic redirects based on user role
- **Component-Level Security**: UI elements hidden based on permissions
- **Data Filtering**: Users only see relevant data

### 📱 Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Touch-Friendly**: Gesture support for mobile devices
- **Progressive Enhancement**: Works on all browsers

## 🎨 UI/UX Features

### Design System
- **Consistent Theming**: Unified color palette and typography
- **Component Library**: Reusable, accessible components
- **Dark Mode Support**: Toggle between light and dark themes
- **Loading States**: Smooth transitions and feedback

### User Experience
- **Intuitive Navigation**: Clear information architecture
- **Search & Filtering**: Advanced product discovery
- **Wishlist Management**: Save items for later
- **Order Tracking**: Real-time status updates

## 🔧 Development

### Available Scripts
- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run test suite
- `npm eject`: Eject from Create React App

### Code Structure
- **Component-Based**: Modular, reusable components
- **Feature-Based**: Organized by business features
- **Type Safety**: PropTypes for component validation
- **Performance**: Optimized rendering and state management

## 📝 Data Management

### Mock Data
The application uses mock data stored in JSON files:
- `users.json`: User accounts and roles
- `products.json`: Product catalog
- `orders.json`: Order history
- `categories.json`: Product categories

### State Management
- **Redux Toolkit**: Centralized state management
- **Redux Persist**: Persistent user sessions and cart
- **Selectors**: Efficient data access patterns
- **Actions**: Predictable state updates

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Environment Variables
Create a `.env` file for environment-specific configuration:
```
REACT_APP_API_URL=your_api_url
REACT_APP_ENVIRONMENT=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information

## 🔮 Future Enhancements

- **Payment Integration**: Stripe, PayPal support
- **Real-time Chat**: Customer support system
- **Advanced Analytics**: Machine learning insights
- **Multi-language Support**: Internationalization
- **PWA Features**: Offline support, push notifications
- **API Integration**: Backend service connection

---

**Built with ❤️ using React, Redux, and Tailwind CSS**
