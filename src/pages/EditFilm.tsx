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
    const [isDataChanged, setIsDataChanged] = useState(false);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const userMediaData = await GetRequests.getUserMedia(userId);
                if (userMediaData && userMediaData.films) {
                    const foundFilm = userMediaData.films.find(
                        (film) => film.id === parseInt(filmId, 10)
                    );

                    if (foundFilm) {
                        setFilm(foundFilm);
                        setEditedLoadedFrames(foundFilm.loadedFrames.toString());
                        setEditedMaxLoaded(foundFilm.maxLoaded.toString());
                        setEditedIsFull(foundFilm.isFull);
                        setEditedIsForSale(foundFilm.isForSale);
                        setEditedBrand(foundFilm.brand);
                        setEditedModel(foundFilm.model);
                    } else {
                        alert('Film nie został znaleziony w danych użytkownika.');
                        console.error('Film not found in user media data.');
                    }
                }
            } catch (error) {
                console.error('Error fetching film data:', error);
            }
        };

        if (filmId && userId) {
            fetchFilmData();
        }
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
            });

            const parsedLoadedFrames = editedLoadedFrames === '' ? '' : parseInt(editedLoadedFrames);
            const parsedMaxLoaded = editedMaxLoaded === '' ? '' : parseInt(editedMaxLoaded);

            await PutRequests.updateFilmDetails(filmId, {
                model: editedModel,
                brand: editedBrand,
                loadedFrames: parsedLoadedFrames,
                maxLoaded: parsedMaxLoaded,
            }, {});
    alert("Film został edytowany.")
        } catch (error) {
            console.error('Wystąpił błąd podczas edycji filmu.', error);
            if (error.response) {
                console.error('Error Response Data:', error.response.data);
            }
        }
    };


    return (
        <Container component="main" maxWidth="s" sx={{ display: 'flex', justifyContent: 'center', backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{display: 'flex', flexDirection: 'column', width: '50%', alignItems: 'center', mt: 4}}>
                <h1 style={{margin: '0 20px'}}>Edytuj film</h1>
                <Box component="form" noValidate sx={{mt: 3, p: 3, bgcolor: "white", borderRadius: "1%", boxShadow: 1}}>
                    <div style={{marginBottom: '20px'}}>
                        <TextField
                            label="Liczba załadowanych klatek"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={editedLoadedFrames}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 100)) {
                                    setEditedLoadedFrames(newValue);
                                }
                            }}
                            inputProps={{ min: "1", max: "100" }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            label="Maksymalna liczba klatek"
                            variant="outlined"
                            type="number"
                            fullWidth
                            value={editedMaxLoaded}
                            onChange={(e) => {
                                const newValue = e.target.value;
                                if (newValue === '' || (newValue >= 1 && newValue <= 100)) {
                                    setEditedMaxLoaded(newValue);
                                }
                            }}
                            inputProps={{ min: "1", max: "100" }}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{mb: 2}}>
                            <label>
                                Czy w pełni wykorzystany:
                                <input
                                    type="checkbox"
                                    checked={editedIsFull}
                                    onChange={(e) => setEditedIsFull(e.target.checked)}
                                    sx={{ml: 1}}
                                />
                            </label>
                        </Box>
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
                        <TextField
                            label="Marka"
                            variant="outlined"
                            fullWidth
                            value={editedBrand}
                            onChange={(e) => setEditedBrand(e.target.value)}
                            sx={{mb: 2}}
                        />
                        <TextField
                            label="Model"
                            variant="outlined"
                            fullWidth
                            value={editedModel}
                            onChange={(e) => setEditedModel(e.target.value)}
                            sx={{mb: 2}}
                        />
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


        </Container>
    );
};

export default EditFilm;
