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
    const [newProduct, setNewProduct] = useState<Product>({
        brand: "",
        description: "",
        id: 0,
        model: "",
        price: 0,
        productTypeId: 0,
        userId: 0
    });
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [error, setError] = useState<string>('');

    const isFormValid = () => newProduct.description.trim() !== '' && newProduct.price > 0;

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const productTypesData = await GetRequests.getAllProductTypes();
                setProductTypes(productTypesData);

                if (productTypesData.length > 0) {
                    setNewProduct((prevState) => ({ ...prevState, productTypeId: productTypesData[0].id }));
                }
            } catch (error) {
                console.error('Error fetching product types:', error);
            }
        };
        fetchProductTypes();
    }, []);

    const handleInputChange = (field: string, value: any) => {
        setNewProduct((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleAddProduct = async () => {
        try {
            await PostRequests.createProduct(
                newProduct.productTypeId,
                newProduct.brand,
                newProduct.model,
                newProduct.description,
                newProduct.price
            );
            alert('Produkt dodany do sklepu');
        } catch (error) {
                console.error('Error Response Data:', error.response.data);
        }
    };

    const containerStyles = {
        display: "flex",
        justifyContent: "center",
        backgroundImage: 'url(/img015.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        overflow: 'hidden'
    };

    const boxStyles = {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        alignItems: "center",
        mt: 4
    };

    const formStyles = {
        mt: 3,
        p: 3,
        bgcolor: "white",
        borderRadius: "1%",
        boxShadow: 1
    };

    return (
        <Container component="main" maxWidth="s" sx={containerStyles}>
            <Box sx={boxStyles}>
                <h1 style={{ margin: '0 20px' }}>Dodaj nowy produkt</h1>
                <Box component="form" noValidate sx={formStyles}>
                    <div style={{ marginBottom: '20px' }}>
                        <span style={{ marginRight: '10px' }}>Typ produktu:</span>
                        <Select
                            id="product-type"
                            label="Product Type"
                            variant="outlined"
                            value={newProduct.productTypeId}
                            onChange={(event) => handleInputChange('productTypeId', event.target.value)}
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
                        onChange={(event) => handleInputChange('brand', event.target.value)}
                    />
                    <TextField
                        label="Model"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={newProduct.model}
                        onChange={(event) => handleInputChange('model', event.target.value)}
                    />
                    <TextField
                        label="Opis"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        fullWidth
                        value={newProduct.description}
                        onChange={(event) => handleInputChange('description', event.target.value)}
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
                                handleInputChange('price', parsedValue);
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