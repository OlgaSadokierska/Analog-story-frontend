import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useParams } from 'react-router-dom';
import { GetRequests } from '../communication/network/GetRequests';
import { PutRequests } from '../communication/network/PutRequests';
import { Camera } from '../communication/Types';

const EditCamera = () => {
    const { cameraId } = useParams();
    const userId = localStorage.getItem('UserId');

    const [camera, setCamera] = useState<Camera | null>(null);
    const [editedModel, setEditedModel] = useState('');
    const [editedBrand, setEditedBrand] = useState('');
    const [editedIsForSale, setEditedIsForSale] = useState(false);
    const [editedDescription, setEditedDescription] = useState('');
    const [editedPrice, setEditedPrice] = useState('');
    const [product, setProduct] = useState<Product | null>(null);
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchCameraData = async () => {
            try {
                const userMediaData = await GetRequests.getUserMedia(userId);
                if (userMediaData && userMediaData.cameras) {
                    const foundCamera = userMediaData.cameras.find(
                        (camera) => camera.id === parseInt(cameraId, 10)
                    );

                    if (foundCamera) {
                        setCamera(foundCamera);
                        setEditedModel(foundCamera.model);
                        setEditedBrand(foundCamera.brand);
                        setEditedIsForSale(foundCamera.isForSale);
                        setEditedDescription(foundCamera.product.description);
                        setEditedPrice(foundCamera.product.price);

                    } else {
                        alert('Aparat nie został znaleziony w danych użytkownika.');
                        console.error('Camera not found in user media data.');
                    }

                    // Fetch product data for the camera
                    const productData = await GetRequests.getAllProducts(foundCamera.product_id);
                    if (productData) {
                        setProduct(productData);
                    }
                }
            } catch (error) {
                console.error('Error fetching camera data:', error);
            }
        };

        if (cameraId && userId) {
            fetchCameraData();
        }
    }, [userId, cameraId]);

    const handleSaveChanges = async () => {
        try {
            console.log('Camera data to be sent:', {
                model: editedModel,
                brand: editedBrand,
                isForSale: editedIsForSale,
                description: editedDescription,
                price: editedPrice,
            });

            const priceAsFloat = parseFloat(editedPrice);

            await PutRequests.updateCameraDetails(cameraId, {
                model: editedModel,
                brand: editedBrand
            }, {
                description: editedDescription,
                price: priceAsFloat
            });
            alert("Aparat został edytowany");

        } catch (error) {
            console.error('Wystąpił błąd podczas edycji aparatu.', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };

    const handleSnackbarClose = () => {
        setIsSnackbarOpen(false);
    };

    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4}}>
                <h1 style={{margin: '0 20px'}}>Edytuj aparat</h1>
                <Box component="form" noValidate sx={{mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1}}>
                    <div style={{marginBottom: '20px'}}>
                        <TextField
                            label="Model"
                            variant="outlined"
                            fullWidth
                            value={editedModel}
                            onChange={(e) => setEditedModel(e.target.value)}
                            sx={{mb: 2}}
                        />
                        <TextField
                            label="Brand"
                            variant="outlined"
                            fullWidth
                            value={editedBrand}
                            onChange={(e) => setEditedBrand(e.target.value)}
                            sx={{mb: 2}}
                        />
                        <Box sx={{mb: 2}}>
                            <label>
                                Czy na sprzedaż:
                                <input
                                    type="checkbox"
                                    checked={editedIsForSale}
                                    onChange={(e) => setEditedIsForSale(e.target.checked)}
                                    sx={{ml: 1}}
                                />
                            </label>
                        </Box>
                        {editedIsForSale && (
                            <div>
                                <TextField
                                    label="Opis"
                                    variant="outlined"
                                    fullWidth
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                    sx={{mb: 2}}
                                />
                                <TextField
                                    label="Cena"
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    value={editedPrice}
                                    onChange={(e) => {
                                        const inputPrice = e.target.value;
                                        if (!isNaN(inputPrice) && parseFloat(inputPrice) >= 0) {
                                            setEditedPrice(inputPrice);
                                        }
                                    }}
                                    sx={{mb: 2}}
                                />
                            </div>
                        )}
                    </div>
                </Box>

                <div style={{margin: '20px'}}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}
                        sx={{backgroundColor: '#EFC049', mb: 5}}
                    >
                        Zapisz zmiany
                    </Button>
                </div>
            </Box>

            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    onClose={handleSnackbarClose}
                    severity={isDataChanged ? 'success' : 'info'}
                >
                    {isDataChanged ? 'Dane zostały zmienione!' : 'Brak zmian w danych.'}
                </MuiAlert>
            </Snackbar>
        </Container>
    );
};

export default EditCamera;
