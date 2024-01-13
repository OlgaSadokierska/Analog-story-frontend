import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PostRequests } from '../communication/network/PostRequests';
import { GetRequests } from '../communication/network/GetRequests';
import MenuItem from '@mui/material/MenuItem';
import { Select } from '@mui/material';

const AddMediaPage = () => {
    const [newCamera, setNewCamera] = useState({
        model: '',
        brand: '',
        isForSale: false,
    });

    const [newFilm, setNewFilm] = useState({
        loadedFrames: 0,
        isFull: false,
        isForSale: false,
        selectedCameraId: '', // Dodajemy nowy stan, aby przechować ID wybranego aparatu
    });

    const [userCameras, setUserCameras] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null); // Dodajemy stan do przechowywania ID zalogowanego użytkownika

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            setLoggedInUserId(parsedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchUserCameras = async () => {
            try {
                if (loggedInUserId) {
                    const userCamerasData = await GetRequests.getUserMedia(loggedInUserId);
                    setUserCameras(userCamerasData.cameras);
                }
            } catch (error) {
                console.error('Error fetching user cameras:', error);
            }
        };

        fetchUserCameras();
    }, [loggedInUserId]);

    const handleAddCamera = async () => {
        try {
            // Dodaj logikę wysyłania nowej kamery na serwer
            await PostRequests.addCamera(newCamera);
            console.log('Dodano nową kamerę:', newCamera);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania kamery:', error);
        }
    };

    const handleAddFilm = async () => {
        try {
            // Dodaj logikę wysyłania nowego filmu na serwer
            await PostRequests.addFilm({ ...newFilm, userId: loggedInUserId }); // Dodajemy userId do danych filmu
            console.log('Dodano nowy film:', newFilm);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania filmu:', error);
        }
    };

    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Dodaj nową kamerę
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="Model"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newCamera.model}
                            onChange={(event) => setNewCamera((prevState) => ({ ...prevState, model: event.target.value }))}
                        />
                        <TextField
                            label="Marka"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newCamera.brand}
                            onChange={(event) => setNewCamera((prevState) => ({ ...prevState, brand: event.target.value }))}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={newCamera.isForSale} onChange={(event) => setNewCamera((prevState) => ({ ...prevState, isForSale: event.target.checked }))} />}
                            label="Czy na sprzedaż?"
                        />

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
                            <Button onClick={handleAddCamera} variant="contained" sx={{ backgroundColor: '#EFC049' }}>
                                Dodaj kamerę
                            </Button>
                        </div>
                    </div>
                </Box>

                <Typography variant="h4" gutterBottom style={{ marginTop: '10px' }}>
                    Dodaj nowy film
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="Liczba załadowanych klatek"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={newFilm.loadedFrames}
                            onChange={(event) => {
                                // Dodajemy walidację, aby liczba załadowanych klatek nie przekraczała 32
                                const loadedFrames = Number(event.target.value);
                                if (loadedFrames >= 0 && loadedFrames <= 32) {
                                    setNewFilm((prevState) => ({ ...prevState, loadedFrames }));
                                }
                            }}
                        />
                        <FormControlLabel
                            control={<Checkbox checked={newFilm.isFull} onChange={(event) => setNewFilm((prevState) => ({ ...prevState, isFull: event.target.checked }))} />}
                            label="Czy w pełni wykorzystany?"
                        />
                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
                        <FormControlLabel
                            control={<Checkbox checked={newFilm.isForSale} onChange={(event) => setNewFilm((prevState) => ({ ...prevState, isForSale: event.target.checked }))} />}
                            label="Czy na sprzedaż?"
                        />
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
                            <span style={{ marginRight: '10px' }}>Powiązana kamera:</span>
                            <Select
                                id="related-camera"
                                label="Related Camera"
                                variant="outlined"
                                value={newCamera.selectedCameraId}
                                onChange={(e) => setNewCamera((prev) => ({ ...prev, selectedCameraId: e.target.value }))}
                            >
                                <MenuItem value="">Brak</MenuItem>
                                {userCameras.map(({ brand, id, model }) => (
                                    <MenuItem key={id} value={id} label={`${brand} ${model}`}>
                                        {`${brand} ${model}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>

                        <Button onClick={handleAddFilm} variant="contained" sx={{ backgroundColor: '#EFC049', marginTop: '10px' }}>
                            Dodaj film
                        </Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default AddMediaPage;
