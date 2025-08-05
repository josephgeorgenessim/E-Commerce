import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, updateUser, deleteUser, setCurrentUser } from '../../features/users/usersSlice';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

const AdminSettings = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);

    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email || '',
    });
    const [errors, setErrors] = useState({});
    const [confirmOpen, setConfirmOpen] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when field is edited
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateAccount = () => {
        if (validateForm()) {
            dispatch(updateUser({
                id: currentUser.id,
                name: formData.name,
                email: formData.email
            }));
            alert('Account updated successfully');
        }
    };

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const handleDeleteAccount = () => {
        dispatch(deleteUser(currentUser.id));
        dispatch(setCurrentUser({ role: 'guest' }));
        setConfirmOpen(false);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Account Settings</h2>

            <Card className="mb-6">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">
                                Full Name
                            </label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? "border-destructive" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-destructive">{errors.name}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? "border-destructive" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        onClick={handleUpdateAccount}
                    >
                        Update Account
                    </Button>

                    <div className="border-t my-6 pt-6">
                        <h3 className="text-lg font-semibold text-destructive mb-2">Danger Zone</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button
                            variant="destructive"
                            onClick={handleOpenConfirm}
                        >
                            Delete Account
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Confirmation Dialog */}
            <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Account?</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your account? This action cannot be undone
                            and you will lose access to all your products and data.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-6">
                        <Button variant="outline" onClick={handleCloseConfirm}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminSettings; 