import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';

import { GetRequests } from '../communication/network/GetRequests';
import {PostRequests} from "../communication/network/PostRequests";// Dodaj właściwą ścieżkę do modułów z zapytaniami
import { Camera } from '../communication/Types';

const EditCamera = () => {
    const [camera, setCamera] = useState<Camera | null>(null);
    const [editedModel, setEditedModel] = useState('');
    const [editedBrand, setEditedBrand] = useState('');
    const [editedIsForSale, setEditedIsForSale] = useState(false);
    const [relatedFilm, setRelatedFilm] = useState({
        loadedFrames: 0,
        isFull: false,
        isForSale: false,
    });

    const navigate = useNavigate();
    const { cameraId } = useParams();

    const userId = localStorage.getItem('UserId');

    useEffect(() => {
        const fetchCameraData = async () => {
            try {
                const userMediaData = await GetRequests.getUserMedia(userId);
                if (userMediaData && userMediaData.cameras) {
                    const foundCamera = userMediaData.cameras.find((camera) => camera.id === parseInt(cameraId, 10));

                    if (foundCamera) {
                        setCamera(foundCamera);
                        setEditedModel(foundCamera.model);
                        setEditedBrand(foundCamera.brand);
                        setEditedIsForSale(foundCamera.isForSale);

                        // Sprawdzamy, czy kamera ma powiązany film
                        if (foundCamera.film) {
                            setRelatedFilm({
                                loadedFrames: foundCamera.film.loadedFrames,
                                isFull: foundCamera.film.isFull,
                                isForSale: foundCamera.film.isForSale,
                            });
                        }
                    } else {
                        console.error('Camera not found in user media data.');
                    }
                }
            } catch (error) {
                console.error('Error fetching camera data:', error);
                // Obsługa błędu (np. przekierowanie do strony z błędem)
            }
        };

        if (cameraId && userId) {
            fetchCameraData();
        }
    }, [userId, cameraId]);

    const handleSaveChanges = async () => {
        try {
            await PutRequests.updateCamera(cameraId, {
                model: editedModel,
                brand: editedBrand,
                isForSale: editedIsForSale,
            });


            navigate(`/repository`); // Możesz dostosować ścieżkę, jeśli to konieczne
        } catch (error) {
            console.error('Error saving camera changes:', error);
            // Obsługa błędu (np. wyświetlenie komunikatu o błędzie)
        }
    };

    if (!camera) {
        return (
            <Container component="main" maxWidth="lg">
                <Typography variant="h5">
                    Ładowanie danych...
                </Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="lg">
            <Typography variant="h5">
                Edycja kamery: {camera.model}
            </Typography>
            <form>
                <TextField
                    label="Model"
                    variant="outlined"
                    fullWidth
                    value={editedModel}
                    onChange={(e) => setEditedModel(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Marka"
                    variant="outlined"
                    fullWidth
                    value={editedBrand}
                    onChange={(e) => setEditedBrand(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ mb: 2 }}>
                    <label>
                        Na sprzedaż:
                        <input
                            type="checkbox"
                            checked={editedIsForSale}
                            onChange={(e) => setEditedIsForSale(e.target.checked)}
                            sx={{ ml: 1 }}
                        />
                    </label>
                </Box>

                {/* Wyświetl informacje o powiązanym filmie (kliszy) */}
                {camera.film && (
                    <>
                        <Typography variant="h6">Powiązany film:</Typography>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                label="Liczba załadowanych klatek"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                fullWidth
                                value={relatedFilm.loadedFrames}
                                onChange={(e) => {
                                    const loadedFrames = Number(e.target.value);
                                    setRelatedFilm((prev) => ({ ...prev, loadedFrames }));
                                }}
                            />
                            <label>
                                Czy w pełni wykorzystany:
                                <input
                                    type="checkbox"
                                    checked={relatedFilm.isFull}
                                    onChange={(e) => setRelatedFilm((prev) => ({ ...prev, isFull: e.target.checked }))}
                                    sx={{ ml: 1 }}
                                />
                            </label>
                            <label>
                                Na sprzedaż:
                                <input
                                    type="checkbox"
                                    checked={relatedFilm.isForSale}
                                    onChange={(e) => setRelatedFilm((prev) => ({ ...prev, isForSale: e.target.checked }))}
                                    sx={{ ml: 1 }}
                                />
                            </label>
                        </Box>
                    </>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    sx={{ backgroundColor: '#EFC049', mb: 2 }}
                >
                    Zapisz zmiany
                </Button>
            </form>
        </Container>
    );
};

export default EditCamera;
