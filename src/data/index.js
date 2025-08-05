import users from './users.json';
import orders from './orders.json';

// Export the data so it can be imported elsewhere
export {
    users,
    orders
};

// Helper functions for data manipulation
export const findUserById = (id) => users.find(user => user.id === id.toString());

export const findUserByEmail = (email) => users.find(user => user.email.toLowerCase() === email.toLowerCase());

export const findOrderById = (id) => orders.find(order => order.id === id);

export const findOrdersByUserId = (userId) => orders.filter(order => order.customerId === userId);

export const findOrdersByAdminId = (adminId) => {
    return orders.filter(order =>
        order.cartItems.some(item => item.adminId === adminId)
    );
}; 