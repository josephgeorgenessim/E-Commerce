import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Typography, Paper, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow,
    Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, MenuItem, Select,
    FormControl, InputLabel, IconButton, Chip, Grid
} from '@mui/material';
import { Delete, Edit, Add } from '@mui/icons-material';
import { selectAllUsers, selectGuestCount, addUser, updateUser, deleteUser } from '../../features/users/usersSlice';

const UserManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectAllUsers);
    const guestCount = useSelector(selectGuestCount);

    const [dialogOpen, setDialogOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'admin'
    });

    const handleOpenDialog = (user = null) => {
        if (user) {
            setIsEditing(true);
            setSelectedUser(user);
            setFormData({
                name: user.name,
                email: user.email || '',
                role: user.role
            });
        } else {
            setIsEditing(false);
            setSelectedUser(null);
            setFormData({
                name: '',
                email: '',
                role: 'admin'
            });
        }
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name.trim() || !formData.email.trim()) {
            alert('Please fill all required fields');
            return;
        }

        if (isEditing && selectedUser) {
            dispatch(updateUser({
                id: selectedUser.id,
                ...formData
            }));
        } else {
            dispatch(addUser(formData));
        }

        handleCloseDialog();
    };

    const handleDeleteUser = (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            dispatch(deleteUser(userId));
        }
    };

    const adminCount = users.filter(user => user.role === 'admin').length;
    const superAdminCount = users.filter(user => user.role === 'superadmin').length;

    return (
        <div>
            <Typography variant="h5" className="mb-4">User Management</Typography>

            <Grid container spacing={3} className="mb-6">
                <Grid item xs={12} sm={4}>
                    <Paper className="p-4">
                        <Typography variant="body2" color="textSecondary">Admin Users</Typography>
                        <Typography variant="h4">{adminCount}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className="p-4">
                        <Typography variant="body2" color="textSecondary">Super Admin Users</Typography>
                        <Typography variant="h4">{superAdminCount}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Paper className="p-4">
                        <Typography variant="body2" color="textSecondary">Guest Count</Typography>
                        <Typography variant="h4">{guestCount}</Typography>
                    </Paper>
                </Grid>
            </Grid>

            <div className="flex justify-between items-center mb-4">
                <Typography variant="h6">All Users</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add />}
                    onClick={() => handleOpenDialog()}
                >
                    Add User
                </Button>
            </div>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={user.role}
                                        color={user.role === 'superadmin' ? 'secondary' : 'primary'}
                                        size="small"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => handleOpenDialog(user)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() => handleDeleteUser(user.id)}
                                        disabled={user.role === 'superadmin'} // Protect super admin
                                    >
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} className="mt-2">
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Role</InputLabel>
                                <Select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    label="Role"
                                >
                                    <MenuItem value="admin">Admin</MenuItem>
                                    <MenuItem value="superadmin">Super Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">
                        {isEditing ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserManagement; 