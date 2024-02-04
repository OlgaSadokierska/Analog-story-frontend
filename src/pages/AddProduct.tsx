import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Container from "@mui/material/Container";
import { PostRequests } from '../communication/network/PostRequests';
import { GetRequests } from '../communication/network/GetRequests';
import { ProductType, Product } from '../communication/Types';

const AddProduct = () => {
    const initialProductState: Product = {
        productTypeId: 0,
        description: '',
        price: 0,
        model: '',
        brand: ''
    };

    const [newProduct, setNewProduct] = useState<Product>(initialProductState);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [error, setError] = useState<string>('');
    const isFormValid = () => {
        return newProduct.description.trim() !== '' && newProduct.price > 0;
    };
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            setLoggedInUserId(parsedUserId.toString());
            console.log("Logged In User Id:", parsedUserId.toString());
        }
    }, []);



    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const productTypesData = await GetRequests.getAllProductTypes(loggedInUserId);
                setProductTypes(productTypesData);

                if (productTypesData.length > 0) {
                    setNewProduct(prevState => ({ ...prevState, productTypeId: productTypesData[0].id }));
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania typów produktów:', error);
            }
        };

        fetchProductTypes();
    }, []);



    const handleAddProduct = async () => {
        try {
            console.log('Product data to be sent:', newProduct);
            await PostRequests.createProduct(
                loggedInUserId,
                newProduct.productTypeId,
                newProduct.description,
                newProduct.price,
                newProduct.model,
                newProduct.brand
            );
            alert("Produkt został dodany");
            console.log('Dodano nowy produkt:', newProduct);
            setNewProduct(initialProductState);
            setError('');
        } catch (error) {
            alert("Produkt nie został dodany");
            console.error('Wystąpił błąd podczas dodawania produktu:', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };

    return (
        <Container component="main" maxWidth="s" sx={{ display: "flex", justifyContent: "center", backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", alignItems: "center", mt: 4 }}>
                <h1 style={{ margin: '0 20px' }}>Dodaj nowy produkt</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1, }}>
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ marginRight: '10px' }}>Typ produktu:</span>
                        <Select
                            id="product-type"
                            label="Product Type"
                            variant="outlined"
                            value={newProduct.productTypeId}
                            onChange={(event) => setNewProduct(prevState => ({ ...prevState, productTypeId: event.target.value }))}
                        >
                            {productTypes.map(({ id, typeName }) => (
                                <MenuItem key={id} value={id}>
                                    {typeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <TextField
                        label="Marka"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={newProduct.brand}
                        onChange={(event) => setNewProduct(prevState => ({ ...prevState, brand: event.target.value }))}
                    />
                    <TextField
                        label="Model"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={newProduct.model}
                        onChange={(event) => setNewProduct(prevState => ({ ...prevState, model: event.target.value }))}
                    />

                    <TextField
                        label="Opis"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        fullWidth
                        value={newProduct.description}
                        onChange={(event) => setNewProduct(prevState => ({ ...prevState, description: event.target.value }))}
                    />
                    <TextField
                        label="Cena"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        value={newProduct.price}
                        onChange={(event) => {
                            const parsedValue = parseFloat(event.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                                setNewProduct(prevState => ({ ...prevState, price: parsedValue }));
                            }
                        }}
                        inputProps={{
                            min: 0,
                            step: 10.0,
                        }}
                    />

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    <Button
                        onClick={handleAddProduct}
                        variant="contained"
                        sx={{ backgroundColor: '#EFC049', marginTop: '20px' }}
                        disabled={!isFormValid()}
                    >
                        Dodaj Produkt
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddProduct;
