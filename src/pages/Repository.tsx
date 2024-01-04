import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { GetRequests } from "../communication/network/GetRequests";
import { UserMediaDTO, Camera, Film } from '../communication/Types';

const Repository = () => {
    const [userId, setUserId] = useState<number | null>(null);
    const [cameras, setCameras] = useState<Camera[]>([]);
    const [films, setFilms] = useState<Film[]>([]);

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
                const mediaData: UserMediaDTO = await GetRequests.getUserMedia(userId);
                setCameras(mediaData.kamery || []);
                setFilms(mediaData.filmy || []);
            } catch (error) {
                console.error("Error fetching user media:", error);
            }
        };

        if (userId !== null) {
            fetchUserMedia(userId);
        }
    }, [userId]);

    return (
        <Container component="main" maxWidth="lg">
            {userId !== null && (
                <div>
                    <p></p>
                    <Typography component="h1" variant="h5">
                        <h2>Repozytorium</h2>
                    </Typography>
                    <p></p>
                    <TableContainer component={Paper}>
                        <Typography component="h2" variant="h6">
                            Kamery
                        </Typography>
                        <Table aria-label="Kamery">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Model</TableCell>
                                    <TableCell>Brand</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cameras.map(camera => (
                                    <TableRow key={camera.id}>
                                        <TableCell>{camera.id}</TableCell>
                                        <TableCell>{camera.model}</TableCell>
                                        <TableCell>{camera.brand}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TableContainer component={Paper}>
                        <Typography component="h2" variant="h6">
                            Filmy
                        </Typography>
                        <Table aria-label="Filmy">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Loaded Frames</TableCell>
                                    <TableCell>Is Full</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {films.map(film => (
                                    <TableRow key={film.id}>
                                        <TableCell>{film.id}</TableCell>
                                        <TableCell>{film.loaded_frames}</TableCell>
                                        <TableCell>{film.is_full ? 'Full' : 'Not Full'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

            </div>
)}
</Container>
);
};

export default Repository;