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

const AddMediaPage = () => {
    const [newCamera, setNewCamera] = useState({
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
    });

    const [userCameras, setUserCameras] = useState([]);
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            // @ts-ignore
            setLoggedInUserId(parsedUserId.toString());
        }
    }, []);

    useEffect(() => {
        const fetchUserCameras = async () => {
            try {
                if (loggedInUserId) {
                    const userCamerasData = await GetRequests.getUserMedia(loggedInUserId);
                    // @ts-ignore
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
            if (newCamera.isForSale) {
                if (!newCamera.description || newCamera.price <= 0) {
                    throw new Error('Opis i cena są wymagane, gdy kamera jest ustawiona na sprzedaż.');
                }
            }
            if (typeof loggedInUserId === "string") {
                await PostRequests.addCamera(loggedInUserId, newCamera.model, newCamera.brand);
            }
            console.log('Dodano nową kamerę:', newCamera);
            alert("Aparat został dodany");
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania kamery:', error);
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
                    newFilm.isForSale
                );
            }
            console.log('Dodano nowy film:', newFilm);
            alert("Film został dodany");
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania filmu:', error);
            alert("Film nie został dodany");
        }
    };






    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                <h1 style={{ margin: '0 20px' }}>Dodaj nową kamerę</h1>
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
                        {newCamera.isForSale && (
                            <>
                                <TextField
                                    label="Opis"
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    value={newCamera.description}
                                    onChange={(event) => setNewCamera((prevState) => ({ ...prevState, description: event.target.value }))}
                                />
                                <TextField
                                    label="Cena"
                                    variant="outlined"
                                    margin="normal"
                                    type="number"
                                    fullWidth
                                    value={newCamera.price}
                                    onChange={(event) => setNewCamera((prevState) => ({ ...prevState, price: Number(event.target.value) }))}
                                />
                            </>
                        )}

                        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px', justifyContent: 'center' }}>
                            <Button onClick={handleAddCamera} variant="contained" sx={{ backgroundColor: '#EFC049' }}>
                                Dodaj kamerę
                            </Button>
                        </div>
                    </div>
                </Box>

                <h1 style={{ margin: '0 20px' }}>Dodaj nowy film</h1>
                <Box component="form" noValidate sx={{ mt: 3, p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <div style={{marginBottom: '10px'}}>
                        <TextField
                            label="Liczba załadowanych klatek"
                            variant="outlined"
                            margin="normal"
                            type="number"
                            fullWidth
                            value={newFilm.loadedFrames}
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
                            {/*{newFilm.isForSale && (*/}
                            {/*    <>*/}
                            {/*        <TextField*/}
                            {/*            label="Opis"*/}
                            {/*            variant="outlined"*/}
                            {/*            margin="normal"*/}
                            {/*            fullWidth*/}
                            {/*            value={newFilm.description}*/}
                            {/*            onChange={(event) => setNewFilm((prevState) => ({*/}
                            {/*                ...prevState,*/}
                            {/*                description: event.target.value*/}
                            {/*            }))}*/}
                            {/*        />*/}
                            {/*        <TextField*/}
                            {/*            label="Cena"*/}
                            {/*            variant="outlined"*/}
                            {/*            margin="normal"*/}
                            {/*            type="number"*/}
                            {/*            fullWidth*/}
                            {/*            value={newFilm.price}*/}
                            {/*            onChange={(event) => setNewFilm((prevState) => ({*/}
                            {/*                ...prevState,*/}
                            {/*                price: Number(event.target.value)*/}
                            {/*            }))}*/}
                            {/*        />*/}
                            {/*    </>*/}
                            {/*)}*/}

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginTop: '10px',
                                justifyContent: 'center'
                            }}>
                                <span style={{marginRight: '10px'}}>Powiązana kamera:</span>
                                <Select
                                    id="related-camera"
                                    label="Related Camera"
                                    variant="outlined"
                                    value={newFilm.idCamera}
                                    onChange={(e) => setNewFilm((prev) => {
                                        const value = e.target.value === "" ? null : Number(e.target.value);
                                        return ({...prev, idCamera: value});
                                    })}
                                >
                                    <MenuItem value="">Brak</MenuItem>
                                    {userCameras.map(({brand, id, model}) => (
                                        <MenuItem key={id} value={id}>
                                            {`${brand} ${model}`}
                                        </MenuItem>
                                    ))}
                                </Select>

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
