import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from "@mui/material/Container";
import { GetRequests } from "../communication/network/GetRequests";
import { PutRequests } from "../communication/network/PutRequests";
import { Product } from '../communication/Types';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
    const initialProductState = {
        id: 0,
        productTypeId: 0,
        description: '',
        price: 0,
        model: '',
        brand: ''
    };


    const [editedProduct, setEditedProduct] = useState<Product>(initialProductState);
    const [error, setError] = useState<string>('');
    const { productId } = useParams();

    useEffect(() => {
        async function fetchProduct() {
            try {
                const allProducts = await GetRequests.getAllProducts();
                const foundProduct = allProducts.find(product => product.id === parseInt(productId, 10));
                if (foundProduct) {
                    setEditedProduct(foundProduct);
                } else {
                    setError('Product not found');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Error fetching product');
            }
        }

        fetchProduct();
    }, [productId]);

    const handleEditProduct = async () => {
        try {
            console.log('Edited product data to be sent:', editedProduct);
            await PutRequests.updateProduct(
                editedProduct.id,
                editedProduct.productTypeId,
                editedProduct.description,
                editedProduct.price,
                editedProduct.model,
                editedProduct.brand
            );
            alert("Produkt został zaktualizowany");
            console.log('Zaktualizowano produkt:', editedProduct);
        } catch (error) {
            alert("Produkt nie został zaktualizowany");
            console.error('Wystąpił błąd podczas aktualizacji produktu:', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };

    return (
        <Container component="main" maxWidth="s" sx={{ display: "flex", justifyContent: "center", backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "50%", alignItems: "center", mt: 4 }}>
                <h1 style={{ margin: '0 20px' }}>Edytuj produkt</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1, }}>
                    <TextField
                        label="Marka"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={editedProduct.brand}
                        onChange={(event) => setEditedProduct(prevState => ({ ...prevState, brand: event.target.value }))}
                    />
                    <TextField
                        label="Model"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        value={editedProduct.model}
                        onChange={(event) => setEditedProduct(prevState => ({ ...prevState, model: event.target.value }))}
                    />

                    <TextField
                        label="Opis"
                        variant="outlined"
                        margin="normal"
                        multiline
                        rows={4}
                        fullWidth
                        value={editedProduct.description}
                        onChange={(event) => setEditedProduct(prevState => ({ ...prevState, description: event.target.value }))}
                    />
                    <TextField
                        label="Cena"
                        variant="outlined"
                        margin="normal"
                        type="number"
                        fullWidth
                        value={editedProduct.price}
                        onChange={(event) => {
                            const parsedValue = parseFloat(event.target.value);
                            if (!isNaN(parsedValue) && parsedValue >= 0) {
                                setEditedProduct(prevState => ({ ...prevState, price: parsedValue }));
                            }
                        }}
                        inputProps={{
                            min: 0,
                            step: 10.0,
                        }}
                    />

                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                    <Button
                        onClick={handleEditProduct}
                        variant="contained"
                        sx={{ backgroundColor: '#EFC049', marginTop: '20px' }}
                    >
                        Zaktualizuj Produkt
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditProduct;
