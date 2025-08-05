import React from 'react';
import { useSelector } from 'react-redux';
import { ChevronDown } from 'lucide-react';
import { selectOrdersByAdminId } from '../../features/orders/ordersSlice';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from '../ui/table';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

const AdminOrdersList = () => {
    const currentUser = useSelector(selectCurrentUser);
    const orders = useSelector(state => selectOrdersByAdminId(state, currentUser.id));

    // Calculate total sales for this admin
    const totalSales = orders.reduce((sum, order) => {
        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
        const orderTotal = adminItems.reduce((itemSum, item) => itemSum + (item.price * item.quantity), 0);
        return sum + orderTotal;
    }, 0);

    // Get total number of items sold by this admin
    const totalItemsSold = orders.reduce((sum, order) => {
        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
        const orderItemCount = adminItems.reduce((itemSum, item) => itemSum + item.quantity, 0);
        return sum + orderItemCount;
    }, 0);

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Orders</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">Total Sales</div>
                        <div className="text-2xl font-bold">${totalSales.toFixed(2)}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">Total Orders</div>
                        <div className="text-2xl font-bold">{orders.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="pt-6">
                        <div className="text-sm text-muted-foreground">Items Sold</div>
                        <div className="text-2xl font-bold">{totalItemsSold}</div>
                    </CardContent>
                </Card>
            </div>

            {orders.length === 0 ? (
                <p className="text-center py-4">
                    No orders found
                </p>
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => {
                        // Filter to only show items that belong to this admin
                        const adminItems = order.cartItems.filter(item => item.adminId === currentUser.id);
                        const orderTotal = adminItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                        return (
                            <Accordion key={order.id} type="single" collapsible className="border rounded-lg">
                                <AccordionItem value={`item-${order.id}`} className="border-0">
                                    <AccordionTrigger className="px-4 hover:no-underline">
                                        <div className="flex justify-between items-center w-full">
                                            <div>
                                                <div className="text-base font-medium">
                                                    Order #{order.id} - {order.date}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {order.customerInfo.name}
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="ml-2">
                                                ${orderTotal.toFixed(2)}
                                            </Badge>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4">
                                        <div>
                                            <h4 className="text-sm font-semibold mb-2">
                                                Customer Information
                                            </h4>
                                            <p className="text-sm">
                                                Name: {order.customerInfo.name}
                                            </p>
                                            <p className="text-sm">
                                                Address: {order.customerInfo.address}
                                            </p>
                                            <p className="text-sm mb-4">
                                                Payment: {order.customerInfo.cardNumber}
                                            </p>

                                            <h4 className="text-sm font-semibold mt-4 mb-2">
                                                Order Items (Your Products Only)
                                            </h4>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Product</TableHead>
                                                        <TableHead>Price</TableHead>
                                                        <TableHead>Quantity</TableHead>
                                                        <TableHead className="text-right">Total</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {adminItems.map((item) => (
                                                        <TableRow key={item.id}>
                                                            <TableCell>{item.name}</TableCell>
                                                            <TableCell>${item.price.toFixed(2)}</TableCell>
                                                            <TableCell>{item.quantity}</TableCell>
                                                            <TableCell className="text-right">
                                                                ${(item.price * item.quantity).toFixed(2)}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                    <TableRow>
                                                        <TableCell colSpan={3} className="text-right font-medium">
                                                            Subtotal:
                                                        </TableCell>
                                                        <TableCell className="text-right font-medium">
                                                            ${orderTotal.toFixed(2)}
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminOrdersList; 