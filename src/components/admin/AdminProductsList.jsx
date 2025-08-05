import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Pencil, Trash2 } from 'lucide-react';
import { selectCurrentUser } from '../../features/users/usersSlice';
import { getAllProducts, getProductsByAdminId } from '../../data/productsData';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow
} from '../ui/table';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";

const AdminProductsList = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [products, setProducts] = useState([]);

    // Load products on component mount
    useEffect(() => {
        if (currentUser && currentUser.id) {
            const adminProducts = getProductsByAdminId(currentUser.id);
            setProducts(adminProducts);
        }
    }, [currentUser]);

    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        description: '',
        image: 'https://via.placeholder.com/300',
    });

    const handleClickOpen = () => {
        setOpen(true);
        setIsEditing(false);
        setFormData({
            id: '',
            name: '',
            price: '',
            category: '',
            description: '',
            image: 'https://via.placeholder.com/300',
        });
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = (product) => {
        setOpen(true);
        setIsEditing(true);
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price,
            category: product.category,
            description: product.description || '',
            image: product.image || 'https://via.placeholder.com/300',
        });
    };

    const handleDeleteClick = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            // Since we're not using Redux for products anymore,
            // we'll just update the local state
            setProducts(products.filter(product => product.id !== id));

            // In a real app, you would make an API call to delete the product
            alert('Product deleted from the local view (would be deleted from database in production)');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'price' ? parseFloat(value) || '' : value
        }));
    };

    const handleSelectChange = (value) => {
        setFormData(prev => ({
            ...prev,
            category: value
        }));
    };

    const handleSubmit = () => {
        // Basic validation
        if (!formData.name || !formData.price || !formData.category) {
            alert('Please fill in all required fields');
            return;
        }

        const productData = {
            ...formData,
            adminId: currentUser.id,
        };

        if (isEditing) {
            // Update local state
            setProducts(products.map(product =>
                product.id === productData.id ? { ...product, ...productData } : product
            ));

            // In a real app, you would make an API call to update the product
            alert('Product updated in the local view (would be updated in database in production)');
        } else {
            // Generate new ID
            const newId = Math.max(...products.map(p => parseInt(p.id))) + 1;
            const newProduct = {
                ...productData,
                id: newId.toString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                stock: 10,
                rating: 0,
                reviews: 0
            };

            // Update local state
            setProducts([...products, newProduct]);

            // In a real app, you would make an API call to create the product
            alert('Product added to the local view (would be saved to database in production)');
        }

        handleClose();
    };

    const categories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Accessories'];

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold tracking-tight">My Products</h2>
                <Button onClick={handleClickOpen}>
                    Add New Product
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center">No products found</TableCell>
                            </TableRow>
                        ) : (
                            products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.description?.substring(0, 50)}...</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleEditClick(product)}
                                            className="mr-1"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-destructive"
                                            onClick={() => handleDeleteClick(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[525px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to {isEditing ? 'update your' : 'add a new'} product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Product Name
                                </label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="price" className="text-sm font-medium">
                                    Price
                                </label>
                                <Input
                                    id="price"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    min={0}
                                    step={0.01}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="category" className="text-sm font-medium">
                                Category
                            </label>
                            <Select
                                value={formData.category}
                                onValueChange={handleSelectChange}
                            >
                                <SelectTrigger id="category">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>
                                            {category}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="description" className="text-sm font-medium">
                                Description
                            </label>
                            <Input
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="image" className="text-sm font-medium">
                                Image URL
                            </label>
                            <Input
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit}>
                            {isEditing ? 'Update' : 'Add'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default AdminProductsList; 