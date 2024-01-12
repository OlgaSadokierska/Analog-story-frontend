import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { PostRequests } from '../communication/network/PostRequests';

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
    });

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
            await PostRequests.addFilm(newFilm);
            console.log('Dodano nowy film:', newFilm);
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania filmu:', error);
        }
    };

    return (
        <Container component="main" maxWidth="md">
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                <Typography variant="h5" gutterBottom>
                    Dodaj nową kamerę
                </Typography>
                <TextField
                    label="Model"
                    variant="outlined"
                    margin="normal"
                    value={newCamera.model}
                    onChange={(event) => setNewCamera((prevState) => ({ ...prevState, model: event.target.value }))}
                />
                <TextField
                    label="Marka"
                    variant="outlined"
                    margin="normal"
                    value={newCamera.brand}
                    onChange={(event) => setNewCamera((prevState) => ({ ...prevState, brand: event.target.value }))}
                />
                <FormControlLabel
                    control={<Checkbox checked={newCamera.isForSale} onChange={(event) => setNewCamera((prevState) => ({ ...prevState, isForSale: event.target.checked }))} />}
                    label="Czy na sprzedaż?"
                />
                <Button onClick={handleAddCamera} variant="contained" sx={{ backgroundColor: '#EFC049', marginTop: '20px' }}>
                    Dodaj kamerę
                </Button>

                <Typography variant="h5" gutterBottom style={{ marginTop: '40px' }}>
                    Dodaj nowy film
                </Typography>
                <TextField
                    label="Liczba załadowanych klatek"
                    variant="outlined"
                    margin="normal"
                    type="number"
                    value={newFilm.loadedFrames}
                    onChange={(event) => setNewFilm((prevState) => ({ ...prevState, loadedFrames: Number(event.target.value) }))}
                />
                <FormControlLabel
                    control={<Checkbox checked={newFilm.isFull} onChange={(event) => setNewFilm((prevState) => ({ ...prevState, isFull: event.target.checked }))} />}
                    label="Czy w pełni wykorzystany?"
                />
                <FormControlLabel
                    control={<Checkbox checked={newFilm.isForSale} onChange={(event) => setNewFilm((prevState) => ({ ...prevState, isForSale: event.target.checked }))} />}
                    label="Czy na sprzedaż?"
                />
                <Button onClick={handleAddFilm} variant="contained" sx={{ backgroundColor: '#EFC049', marginTop: '20px' }}>
                    Dodaj film
                </Button>
            </Box>
        </Container>
    );
};

export default AddMediaPage;
