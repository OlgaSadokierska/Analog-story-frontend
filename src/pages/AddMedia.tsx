import React, { useEffect, useState } from 'react';
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
import { PutRequests } from '../communication/network/PutRequests';

const AddMediaPage = () => {
    const [newCamera, setNewCamera] = useState({
        idCamera: null,
        model: '',
        brand: '',
        isForSale: false,
        description: '',
        price: 0
    });

    const [newFilm, setNewFilm] = useState({
        loadedFrames: 1,
        isFull: false,
        isForSale: false,
        idCamera: null,
        maxLoaded: 50,
        model: '',
        brand: '',

    });

    const [userCameras, setUserCameras] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const [newSaleCameraDescription, setNewSaleCameraDescription] = useState('');
    const [newSaleCameraPrice, setNewSaleCameraPrice] = useState(0);

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            setLoggedInUserId(parsedUserId.toString());
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

    const validateCameraFields = () => {
        if (newCamera.isForSale && (!newCamera.description || newCamera.price <= 0)) {
            throw new Error('Opis i cena są wymagane.');
        }
    };
    const validatenewCameraFields = () => {
        if (!newCamera.brand || !newCamera.model) {
            throw new Error('Marka i model są wymagane.');
        }
    };


    const handleAddCamera = async () => {
        try {
            validatenewCameraFields();
            if (newCamera.isForSale) {
                validateCameraFields();
                await PostRequests.addCamera(loggedInUserId, newCamera.model, newCamera.brand);
            } else {
                await PostRequests.addCamera(loggedInUserId, newCamera.model, newCamera.brand);
            }
            console.log('Dodano nową kamerę:', newCamera);
            alert("Aparat został dodany");
            window.location.reload(true);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania kamery:', error);
            alert(error.message);
        }
    };
    const handleAddFilm = async () => {
        try {
            console.log('Dane do wysłania:', newFilm);
            if (typeof loggedInUserId === "string") {
                await PostRequests.addFilm(
                    loggedInUserId,
                    newFilm.loadedFrames,
                    newFilm.isFull,
                    newFilm.idCamera,
                    newFilm.maxLoaded,
                    newFilm.isForSale,
                    newFilm.model,
                    newFilm.brand
                );

            }

            console.log('Dodano nowy film:', newFilm);
            alert("Film został dodany");
            window.location.reload(true);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania filmu:', error);
            alert("Film nie został dodany");
        }
    };


    const handleSetCameraForSale = async () => {
        try {
            if (!newCamera.idCamera) {
                throw new Error('Nie wybrano kamery.');
            }

            if (!newSaleCameraDescription) {
                throw new Error('Opis jest wymagany.');
            }

            if (newSaleCameraPrice <= 0) {
                throw new Error('Cena musi być większa od zera.');
            }

            await PutRequests.setCameraForSale(
                newCamera.idCamera,
                newSaleCameraDescription,
                newSaleCameraPrice
            );

            console.log('Kamera została ustawiona na sprzedaż:', newSaleCameraDescription);
            alert('Kamera została ustawiona na sprzedaż');
        } catch (error) {
            console.error('Wystąpił błąd podczas ustawiania kamery na sprzedaż:', error);

            if (error.message === 'Nie wybrano kamery.' || error.message === 'Opis jest wymagany.') {
                alert(error.message);
            } else {
                alert('Załadowany film. Usuń go przed ustawieniem kamery na sprzedaż.');
            }
        }
    };



    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '150vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                <h1 style={{ margin: '0 20px' }}>Dodaj nowy aparat</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <div style={{ marginBottom: '10px' }}>
                        <TextField
                            label="Model"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newCamera.model}
                            required
                            onChange={(event) => setNewCamera((prevState) => ({ ...prevState, model: event.target.value }))}
                        />
                        <TextField
                            label="Marka"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newCamera.brand}
                            required
                            onChange={(event) => setNewCamera((prevState) => ({ ...prevState, brand: event.target.value }))}
                        />

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
                            <Button onClick={handleAddCamera} variant="contained" sx={{ backgroundColor: '#EFC049' }}>
                                Dodaj kamerę
                            </Button>
                        </div>
                    </div>
                </Box>
                <h1 style={{ margin: '0 20px' }}>Dodaj aparat na sprzedaż</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <div style={{marginBottom: '10px'}}>
                        <span style={{marginRight: '10px'}}>Aparat:</span>
                        <Select
                            id="camera"
                            label="Camera"
                            variant="outlined"
                            value={newCamera.idCamera}
                            required
                            onChange={(e) => setNewCamera((prev) => {
                                const value = e.target.value === "" ? null : Number(e.target.value);
                                return ({ ...prev, idCamera: value });
                            })}
                        >
                            {userCameras
                                .filter(camera => camera.isForSale === false)                                 .map(({ brand, id, model }) => (
                                    <MenuItem key={id} value={id}>
                                        {`${brand} ${model}`}
                                    </MenuItem>
                                ))}
                        </Select>

                        <TextField
                            label="Opis"
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            value={newSaleCameraDescription}
                            required
                            onChange={(event) => setNewSaleCameraDescription(event.target.value)}
                        />
                        <TextField
                            label="Cena"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={newSaleCameraPrice}
                            required
                            onChange={(event) => {
                                const inputValue = Number(event.target.value);
                                if (inputValue >= 0) {
                                    setNewSaleCameraPrice(inputValue);
                                }
                            }}
                        />

                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px',
                            justifyContent: 'center'
                        }}>

                            <Button
                                onClick={handleSetCameraForSale}
                                variant="contained" sx={{backgroundColor: '#EFC049'}}>
                                Dodaj kamerę na sprzedaż
                            </Button>
                        </div>
                    </div>
                </Box>


                <h1 style={{margin: '0 20px'}}>Dodaj nowy film</h1>
                <Box component="form" noValidate
                     sx={{mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%'}}>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            label="Liczba załadowanych klatek"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={newFilm.loadedFrames}
                            required
                            onChange={(event) => {
                                const loadedFrames = Number(event.target.value);
                                if (loadedFrames >= 0 && loadedFrames <= 32) {
                                    setNewFilm((prevState) => ({...prevState, loadedFrames}));
                                }

                            }}
                        />
                        <div style={{marginBottom: '10px'}}>
                            <TextField
                                label="Maksymalna liczba klatek"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                fullWidth
                                value={newFilm.maxLoaded}
                                required
                                onChange={(event) => {
                                    const maxLoaded = Number(event.target.value);
                                    if (maxLoaded >= 0 && maxLoaded <= 50) {
                                        setNewFilm((prevState) => ({...prevState, maxLoaded}));
                                    }
                                }}
                            />
                        </div>
                        <FormControlLabel
                            control={<Checkbox checked={newFilm.isFull}
                                               onChange={(event) => setNewFilm((prevState) => ({
                                                   ...prevState,
                                                   isFull: event.target.checked
                                               }))}/>}
                            label="Czy w pełni wykorzystany?"
                        />
                        <FormControlLabel
                            control={<Checkbox checked={newFilm.isForSale}
                                               onChange={(event) => setNewFilm((prevState) => ({
                                                   ...prevState,
                                                   isForSale: event.target.checked
                                               }))}/>}
                            label="Czy na sprzedaż?"
                        />
                        <div style={{marginBottom: '10px'}}>
                            <TextField
                                label="Model"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={newFilm.model}
                                required
                                onChange={(event) => setNewFilm((prevState) => ({ ...prevState, model: event.target.value }))}
                            />
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <TextField
                                label="Marka"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                value={newFilm.brand}
                                required
                                onChange={(event) => setNewFilm((prevState) => ({ ...prevState, brand: event.target.value }))}
                            />
                        </div>
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '10px',
                            justifyContent: 'center'
                        }}>


                        </div>
                        <Button onClick={handleAddFilm} variant="contained"
                                sx={{backgroundColor: '#EFC049', marginTop: '10px'}}>
                            Dodaj film
                        </Button>
                    </div>
                </Box>
            </Box>
        </Container>
    );
};

export default AddMediaPage;
