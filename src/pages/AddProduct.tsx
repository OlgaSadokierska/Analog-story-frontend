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
        id: 0,
        product_type_id: 0,
        description: '',
        price: 0
    };

    const [newProduct, setNewProduct] = useState<Product>(initialProductState);
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchProductTypes = async () => {
            try {
                const productTypesData = await GetRequests.getAllProductTypes();
                setProductTypes(productTypesData);

                if (productTypesData.length > 0) {
                    setNewProduct((prevState) => ({ ...prevState, product_type_id: productTypesData[0].id }));
                }
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania typów produktów:', error);
            }
        };

        fetchProductTypes();
    }, []);

    const handleAddProduct = async () => {
        try {
            await PostRequests.addProduct(newProduct);
            console.log('Dodano nowy produkt:', newProduct);

            setNewProduct(initialProductState);
            setError('');
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania produktu:', error);

            setError('Wystąpił błąd podczas dodawania produktu');
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
                            margin="normal"
                            value={newProduct.product_type_id}
                            onChange={(event) => setNewProduct((prevState) => ({ ...prevState, product_type_id: event.target.value }))}
                        >
                            {productTypes.map((productType) => (
                                <MenuItem key={productType.id} value={productType.id} label={productType.typeName}>
                                    {productType.typeName}
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <TextField
                        label="Opis"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        fullWidth
                        value={newProduct.description}
                        onChange={(event) => setNewProduct((prevState) => ({ ...prevState, description: event.target.value }))}
                    />
                    <TextField
                        label="Cena"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        value={newProduct.price}
                        onChange={(event) => setNewProduct((prevState) => ({ ...prevState, price: event.target.value }))}
                        inputProps={{
                            min: 0,
                            step: 10.00,
                        }}
                    />
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    <Button
                        onClick={handleAddProduct}
                        variant="contained"
                        sx={{ backgroundColor: '#EFC049', marginTop: '20px' }}
                    >
                        Dodaj Produkt
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default AddProduct;
