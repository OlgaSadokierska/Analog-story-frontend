import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { GetRequests } from "../../communication/network/GetRequests";
import { UserMedia, Film, Camera, Product, ProductType } from '../../communication/Types';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Row = ({
                 camera,
                 films,
                 products,
                 types,
                 handleEditCamera,
                 handleDeleteCamera,
                 handleAddMedia,
             }: {
    camera: Camera;
    films: Film[];
    products: Product[];
    types: ProductType[];
    handleEditCamera: (cameraId: number) => void;
    handleDeleteCamera: (cameraId: number) => void;
    handleDeleteFilm: (filmId: number) => void;
    handleAddMedia: () => void;
}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const findProductById = (productId: number): Product | undefined => {
        const foundProduct = products ? products.find((product) => product.id === productId) : undefined;
        console.log("Found product:", foundProduct);
        return foundProduct;
    };

    const cameraProduct = findProductById(camera.product_id);

    return (
        <React.Fragment>
            <TableRow key={camera.id}>
                <TableCell>
                    <IconButton size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell>{camera.model}</TableCell>
                <TableCell>{camera.brand}</TableCell>
                <TableCell>{camera.isForSale ? 'Tak' : 'Nie'}</TableCell>
                <TableCell>{camera.product.description}</TableCell>
                <TableCell>{camera.product.price}</TableCell>
                <TableCell>
                    <IconButton aria-label="edit-camera" onClick={() => handleEditCamera(camera.id)}>
                        <EditIcon/>
                    </IconButton>
                    <IconButton aria-label="delete-camera" onClick={() => handleDeleteCamera(camera.id)}>
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Table aria-label="Szczegóły filmów">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Liczba załadowanych klatek</TableCell>
                                    <TableCell>Maksymalna liczba klatek</TableCell>
                                    <TableCell>Czy w pełni wykorzystany?</TableCell>
                                    <TableCell>Czy na sprzedaż?</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {films.map((film) => (
                                    <TableRow key={film.id}>
                                        <TableCell>{film.loadedFrames}</TableCell>
                                        <TableCell>{film.maxLoaded}</TableCell>
                                        <TableCell>{film.isFull ? 'Tak' : 'Nie'}</TableCell>
                                        <TableCell>{film.isForSale ? 'Tak' : 'Nie'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

    const tableContainerStyle = {
    marginTop: '20px',
    marginBottom: '20px',
};


const Repository = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [media, setMedia] = useState<UserMedia | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            setUserId(parsedUserId);
        }
    }, []);

    useEffect(() => {
        const fetchUserMedia = async (userId: number) => {
            try {
                const mediaData: UserMedia = await GetRequests.getUserMedia(userId);
                if (mediaData) {
                    setMedia(mediaData);
                }
                console.log(mediaData);
            } catch (error) {
                console.error("Error fetching user media:", error);
            }
        };

        if (userId !== null) {
            fetchUserMedia(userId);
        }
    }, [userId]);

    const handleAddMedia = () => {
        navigate('/addmedia');
    };
    const handleEditCamera = (cameraId: number) => {
        console.log(`Edytuj aparat o ID: ${cameraId}`);
        navigate(`/editcamera/${cameraId}`);
    };

    const handleDeleteCamera = (cameraId: number) => {
        // Obsługa usunięcia aparatu
        console.log(`Usuń apart o ID: ${cameraId}`);
    };

    const handleEditFilm = (filmId: number) => {
        console.log(`Edytuj film o ID: ${filmId}`);
        navigate(`/editfilm/${filmId}`);
    };

    const handleDeleteFilm = (filmId: number) => {
        console.log(`Usuń film o ID: ${filmId}`);
    };


    if (userId === null || !media) {
        return (
            <Container component="main" maxWidth="lg">
                <Typography component="h1" variant="h5">
                    Brak danych
                </Typography>
            </Container>
        );
    }

    const camerasWithFilms = media.cameras.filter(
        (camera) => media.films.some((film) => film.idCamera === camera.id)
    );

    const camerasWithoutFilms = media.cameras.filter(
        (camera) => !media.films.some((film) => film.idCamera === camera.id)
    );

    const filmsWithoutCameras = media.films.filter(
        (film) => !media.cameras.some((camera) => camera.id === film.idCamera)
    );

    return (
        <Container component="main" maxWidth="lg">
            <Grid container alignItems="center" justifyContent="space-between" style={{ marginTop: '20px', marginBottom: '20px' }}>
                <Grid item>
                    <Typography variant="h5">
                        Repozytorium klisz i aparatów
                    </Typography>
                </Grid>
                <Grid item>
                    <Button sx={{ backgroundColor: '#EFC049' }} onClick={handleAddMedia}>
                        {'Dodaj media'}
                    </Button>
                </Grid>
            </Grid>

            {camerasWithFilms.length > 0 && (
                <TableContainer component={Paper} style={tableContainerStyle}>
                    <Typography variant="h6">Aparaty z kliszami</Typography>
                    <Table aria-label="Kamery z filmami">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Model</TableCell>
                                <TableCell>Marka</TableCell>
                                <TableCell>Czy na sprzedaż?</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell>Cena</TableCell>
                                <TableCell>Akcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {camerasWithFilms.map((camera) => (
                                <Row
                                    key={camera.id}
                                    camera={camera}
                                    films={media.films.filter((film) => film.idCamera === camera.id)}
                                    handleEditCamera={handleEditCamera}
                                    handleDeleteCamera={handleDeleteCamera}
                                    handleDeleteFilm={handleDeleteFilm}
                                    handleAddMedia={handleAddMedia}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {camerasWithoutFilms.length > 0 && (
                <TableContainer component={Paper} style={tableContainerStyle}>
                    <Typography variant="h6">Aparaty</Typography>
                    <Table aria-label="Kamery bez filmów">
                        <TableHead>
                            <TableRow>
                                <TableCell>Model</TableCell>
                                <TableCell>Marka</TableCell>
                                <TableCell>Czy na sprzedaż?</TableCell>
                                <TableCell>Opis</TableCell>
                                <TableCell>Cena</TableCell>
                                <TableCell>Akcje</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {camerasWithoutFilms.map((camera) => (
                                <TableRow key={camera.id}>
                                    <TableCell>{camera.model}</TableCell>
                                    <TableCell>{camera.brand}</TableCell>
                                    <TableCell>{camera.isForSale ? 'Tak' : 'Nie'}</TableCell>
                                    <TableCell>{camera.product.description}</TableCell>
                                    <TableCell>{camera.product.price}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit-camera" onClick={() => handleEditCamera(camera.id)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton aria-label="delete-camera" onClick={() => handleDeleteCamera(camera.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {filmsWithoutCameras.length > 0 && (
                <TableContainer component={Paper} style={tableContainerStyle}>
                    <Typography variant="h6">Filmy bez powiązanych kamer</Typography>
                    <Table aria-label="Filmy bez kamer">
                        <TableHead>
                            <TableRow>
                                <TableCell>Liczba załadowanych klatek</TableCell>
                                <TableCell>Maksymalna liczba klatek</TableCell>
                                <TableCell>Czy w pełni wykorzystany?</TableCell>
                                <TableCell>Czy na sprzedaż?</TableCell>
                                <TableCell>Edytuj</TableCell>
                                <TableCell>Usuń</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filmsWithoutCameras.map((film) => (
                                <TableRow key={film.id}>
                                    <TableCell>{film.loadedFrames}</TableCell>
                                    <TableCell>{film.maxLoaded}</TableCell>
                                    <TableCell>{film.isFull ? 'Tak' : 'Nie'}</TableCell>
                                    <TableCell>{film.isForSale ? 'Tak' : 'Nie'}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="edit-film" onClick={() => handleEditFilm(film.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete-film" onClick={() => handleDeleteFilm(film.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default Repository;
