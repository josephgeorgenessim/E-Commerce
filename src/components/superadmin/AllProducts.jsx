import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, IconButton, MenuItem, Select,
    FormControl, InputLabel, TextField, TablePagination
} from '@mui/material';
import { Delete, FilterList } from '@mui/icons-material';
import { selectAllProducts, deleteProduct } from '../../features/products';
import { selectAllUsers } from '../../features/users/usersSlice';

const AllProducts = () => {
    const dispatch = useDispatch();
    const products = useSelector(selectAllProducts);
    const users = useSelector(selectAllUsers);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        category: '',
        adminId: ''
    });

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleOpenFilter = () => {
        setFilterOpen(true);
    };

    const handleCloseFilter = () => {
        setFilterOpen(false);
    };

    const handleClearFilters = () => {
        setFilters({
            category: '',
            adminId: ''
        });
        setFilterOpen(false);
    };

    const handleApplyFilters = () => {
        setPage(0);
        setFilterOpen(false);
    };

    const handleDeleteProduct = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    };

    // Apply filters
    const filteredProducts = products.filter(product => {
        let match = true;

        if (filters.category && product.category !== filters.category) {
            match = false;
        }

        if (filters.adminId && product.adminId !== parseInt(filters.adminId)) {
            match = false;
        }

        return match;
    });

    // Extract unique categories for filter dropdown
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Typography variant="h5">All Products</Typography>
                <div>
                    <Button
                        startIcon={<FilterList />}
                        variant="outlined"
                        className="mr-2"
                        onClick={handleOpenFilter}
                    >
                        Filter
                    </Button>
                </div>
            </div>

            <Paper>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Admin</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProducts
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((product) => {
                                    const admin = users.find(user => user.id === product.adminId);

                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell>{product.id}</TableCell>
                                            <TableCell>{product.name}</TableCell>
                                            <TableCell>{product.category}</TableCell>
                                            <TableCell>${product.price.toFixed(2)}</TableCell>
                                            <TableCell>{admin ? admin.name : 'Unknown Admin'}</TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                >
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            {filteredProducts.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">No products found</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={filteredProducts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Filter Dialog */}
            <Dialog open={filterOpen} onClose={handleCloseFilter}>
                <DialogTitle>Filter Products</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            name="category"
                            value={filters.category}
                            onChange={handleFilterChange}
                            label="Category"
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.map(category => (
                                <MenuItem key={category} value={category}>{category}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <InputLabel>Admin</InputLabel>
                        <Select
                            name="adminId"
                            value={filters.adminId}
                            onChange={handleFilterChange}
                            label="Admin"
                        >
                            <MenuItem value="">All Admins</MenuItem>
                            {users.filter(user => user.role === 'admin').map(admin => (
                                <MenuItem key={admin.id} value={admin.id.toString()}>{admin.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClearFilters} color="primary">
                        Clear
                    </Button>
                    <Button onClick={handleApplyFilters} color="primary" variant="contained">
                        Apply
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AllProducts; 