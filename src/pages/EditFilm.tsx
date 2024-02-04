import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import { GetRequests } from '../communication/network/GetRequests';
import { PutRequests } from '../communication/network/PutRequests';
import { Film } from '../communication/Types';
import { MenuItem, Select } from '@mui/material';

const EditFilm = () => {
    const { filmId } = useParams();
    const userId = localStorage.getItem('UserId');

    const [film, setFilm] = useState<Film | null>(null);
    const [editedLoadedFrames, setEditedLoadedFrames] = useState('');
    const [editedMaxLoaded, setEditedMaxLoaded] = useState('');
    const [editedIsFull, setEditedIsFull] = useState(false);
    const [editedIsForSale, setEditedIsForSale] = useState(false);
    const [editedBrand, setEditedBrand] = useState('');
    const [editedModel, setEditedModel] = useState('');
    const [idCamera, setIdCamera] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState(null);
    const [userCameras, setUserCameras] = useState([]);

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
                    const userMediaData = await GetRequests.getUserMedia(loggedInUserId);
                    setUserCameras(userMediaData.cameras);
                }
            } catch (error) {
                console.error('Error fetching user cameras:', error);
            }
        };

        fetchUserCameras();
    }, [loggedInUserId]);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                if (userId && filmId) {
                    const userMediaData = await GetRequests.getUserMedia(userId);
                    if (userMediaData && userMediaData.films) {
                        const foundFilm = userMediaData.films.find(film => film.id === parseInt(filmId, 10));
                        if (foundFilm) {
                            setFilm(foundFilm);
                            setEditedLoadedFrames(foundFilm.loadedFrames.toString());
                            setEditedMaxLoaded(foundFilm.maxLoaded.toString());
                            setEditedIsFull(foundFilm.isFull);
                            setEditedIsForSale(foundFilm.isForSale);
                            setEditedBrand(foundFilm.brand);
                            setEditedModel(foundFilm.model);
                            setIdCamera(foundFilm.idCamera);
                        } else {
                            alert('Film nie został znaleziony w danych użytkownika.');
                            console.error('Film not found in user media data.');
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        };

        fetchFilmData();
    }, [userId, filmId]);

    const handleSaveChanges = async () => {
        try {
            console.log('Film data to be sent:', {
                loadedFrames: editedLoadedFrames,
                maxLoaded: editedMaxLoaded,
                isFull: editedIsFull,
                isForSale: editedIsForSale,
                brand: editedBrand,
                model: editedModel,
                idCamera: idCamera,
            });

            const parsedLoadedFrames = editedLoadedFrames === '' ? '' : parseInt(editedLoadedFrames);
            const parsedMaxLoaded = editedMaxLoaded === '' ? '' : parseInt(editedMaxLoaded);

            await PutRequests.updateFilmDetails(filmId, {
                model: editedModel,
                brand: editedBrand,
                loadedFrames: parsedLoadedFrames,
                maxLoaded: parsedMaxLoaded,
                idCamera: idCamera,
            }, {});

            alert("Film został edytowany.");
        } catch (error) {
            console.error('Wystąpił błąd podczas edycji filmu.', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };

    const assignCamera = async () => {
        try {
            await PutRequests.assignCamera(filmId, idCamera);
            alert("Kamera została przypisana do filmu.");
        } catch (error) {
            console.error('Wystąpił błąd podczas przypisywania kamery do filmu.', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };

    const isCameraSelected = idCamera !== '';

    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '150vh', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4 }}>
                <Typography variant="h4" sx={{ mb: 4 }}>Edytuj film</Typography>
                <Box component="form" noValidate sx={{ p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%' }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="loadedFrames"
                        label="Liczba załadowanych klatek"
                        name="loadedFrames"
                        type="number"
                        value={editedLoadedFrames}
                        onChange={(e) => setEditedLoadedFrames(e.target.value)}
                        inputProps={{ min: 1, max: 100 }}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="maxLoaded"
                        label="Maksymalna liczba klatek"
                        name="maxLoaded"
                        type="number"
                        value={editedMaxLoaded}
                        onChange={(e) => setEditedMaxLoaded(e.target.value)}
                        inputProps={{ min: 1, max: 100 }}
                        sx={{ mb: 2 }}
                    />
                    <Box sx={{ mb: 2 }}>
                        <label>
                            Czy w pełni wykorzystany:
                            <input
                                type="checkbox"
                                checked={editedIsFull}
                                onChange={(e) => setEditedIsFull(e.target.checked)}
                                style={{ marginLeft: '5px' }}
                            />
                        </label>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <label>
                            Czy na sprzedaż:
                            <input
                                type="checkbox"
                                checked={editedIsForSale}
                                onChange={(e) => setEditedIsForSale(e.target.checked)}
                                style={{ marginLeft: '5px' }}
                            />
                        </label>
                    </Box>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="brand"
                        label="Marka"
                        name="brand"
                        value={editedBrand}
                        onChange={(e) => setEditedBrand(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="model"
                        label="Model"
                        name="model"
                        value={editedModel}
                        onChange={(e) => setEditedModel(e.target.value)}
                        sx={{ mb: 3 }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained" sx={{backgroundColor: '#EFC049'}}
                        color="primary"
                        onClick={handleSaveChanges}
                        disabled={!isCameraSelected}
                    >
                        Zapisz zmiany
                    </Button>
                </Box>

                <Box component="form" noValidate sx={{ p: 3, bgcolor: 'white', borderRadius: '1%', boxShadow: 1, width: '100%', mt: 3 }}>
                    <Typography component="h5" variant="h5" sx={{ mb: 2 }}>Powiązana kamera:</Typography>
                    <Select
                        value={idCamera || ''}
                        onChange={(e) => setIdCamera(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                    >
                        <MenuItem value="">Brak</MenuItem>
                        {userCameras.map(({ id, brand, model }) => (
                            <MenuItem key={id} value={id}>{`${brand} ${model}`}</MenuItem>
                        ))}
                    </Select>
                    <Button
                        fullWidth
                        variant="contained" sx={{backgroundColor: '#EFC049'}}                        color="primary"
                        onClick={assignCamera}
                        disabled={!isCameraSelected}
                    >
                        Przypisz kamerę
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default EditFilm;
