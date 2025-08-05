import React from 'react';
import { useSelector } from 'react-redux';
import {
    Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead,
    TableRow, TablePagination, Chip
} from '@mui/material';
import { selectAllOrders } from '../../features/orders/ordersSlice';

const AllOrders = () => {
    const orders = useSelector(selectAllOrders);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Calculate total sales across all orders
    const totalSales = orders.reduce((sum, order) => sum + order.total, 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5">All Orders</Typography>
                <Paper className="p-3">
                    <Typography variant="body2" color="textSecondary">Total Sales</Typography>
                    <Typography variant="h6">${totalSales.toFixed(2)}</Typography>
                </Paper>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Customer</TableCell>
                            <TableCell>Shipping Address</TableCell>
                            <TableCell>Number of Items</TableCell>
                            <TableCell align="right">Total</TableCell>
                            <TableCell>Payment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>#{order.id}</TableCell>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.customerInfo.name}</TableCell>
                                    <TableCell>
                                        {order.customerInfo.address.substring(0, 30)}
                                        {order.customerInfo.address.length > 30 ? '...' : ''}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={order.cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                                            size="small"
                                        />
                                    </TableCell>
                                    <TableCell align="right">${order.total.toFixed(2)}</TableCell>
                                    <TableCell>{order.customerInfo.cardNumber}</TableCell>
                                </TableRow>
                            ))}
                        {orders.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No orders found</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={orders.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
        </div>
    );
};

export default AllOrders; 