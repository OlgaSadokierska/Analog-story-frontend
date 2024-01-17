import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams, useNavigate } from 'react-router-dom';
import { GetRequests } from '../communication/network/GetRequests';
import { PutRequests } from '../communication/network/PutRequests';
import { Camera, Film } from '../communication/Types';
import { Input } from '@mui/material';

const EditCamera = () => {
    const [camera, setCamera] = useState<Camera | null>(null);
    const [editedModel, setEditedModel] = useState('');
    const [editedBrand, setEditedBrand] = useState('');
    const [editedIsForSale, setEditedIsForSale] = useState(false);
    const [editedFilm, setEditedFilm] = useState<Film | null>(null);
    const [editedLoadedFrames, setEditedLoadedFrames] = useState<number>(0);
    const [editedFilmIsForSale, setEditedFilmIsForSale] = useState<boolean>(false);

    const navigate = useNavigate();
    const { cameraId } = useParams();

    const userId = localStorage.getItem('UserId');

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

                        const associatedFilm = userMediaData.films.find(
                            (film) => film.idCamera === foundCamera.id
                        );

                        if (associatedFilm) {
                            setEditedFilm(associatedFilm);
                            setEditedLoadedFrames(associatedFilm.loadedFrames);
                            setEditedFilmIsForSale(associatedFilm.isForSale);
                        }
                    } else {
                        console.error('Camera not found in user media data.');
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
            await PutRequests.updateCamera(cameraId, {
                model: editedModel,
                brand: editedBrand,
                isForSale: editedIsForSale,
            });

            if (editedFilm) {
                await PutRequests.updateFilm(editedFilm.id, {
                    loadedFrames: editedLoadedFrames,
                    isForSale: editedFilmIsForSale,
                });
            }

            navigate(`/repository`);
        } catch (error) {
            console.error('Error saving camera changes:', error);
        }
    };

    if (!camera) {
        return (
            <Container component="main" maxWidth="lg">
                <Typography variant="h5">
                    Loading data...
                </Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                <h1 style={{ margin: '0 20px' }}>Edytuj aparat</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1 }}>
                    <div style={{ marginBottom: '20px' }}>
                        <TextField
                            label="Model"
                            variant="outlined"
                            fullWidth
                            value={editedModel}
                            onChange={(e) => setEditedModel(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Brand"
                            variant="outlined"
                            fullWidth
                            value={editedBrand}
                            onChange={(e) => setEditedBrand(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ mb: 2 }}>
                            <label>
                                Czy na sprzedaż:
                                <input
                                    type="checkbox"
                                    checked={editedIsForSale}
                                    onChange={(e) => setEditedIsForSale(e.target.checked)}
                                    sx={{ ml: 1 }}
                                />
                            </label>
                        </Box>
                    </div>
                </Box>

                {editedFilm && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                        <h1 style={{ margin: '0 20px' }}>Edytuj powiązaną kliszę</h1>
                        <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1 }}>
                            <div style={{ marginBottom: '20px' }}>
                                <TextField
                                    label="Liczba załadowanych klatek"
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    value={editedLoadedFrames}
                                    onChange={(e) => setEditedLoadedFrames(Math.min(Math.max(parseInt(e.target.value, 10), 0), 32))}
                                    inputProps={{ min: 0, max: 32 }}
                                    sx={{ width: '250px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label>
                                    Czy na sprzedaż:
                                    <input
                                        type="checkbox"
                                        checked={editedFilmIsForSale}
                                        onChange={(e) => setEditedFilmIsForSale(e.target.checked)}
                                        sx={{ ml: 1 }}
                                    />
                                </label>
                            </div>
                        </Box>
                    </Box>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveChanges}
                    sx={{ backgroundColor: '#EFC049', mb: 5 }}
                >
                    Zapisz zmiany
                </Button>
            </Box>
        </Container>
    );
};

export default EditCamera;
