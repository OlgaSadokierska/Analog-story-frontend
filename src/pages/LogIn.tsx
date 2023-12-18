import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { PostRequests } from '../communication/network/PostRequests';
import { User } from '../communication/Types';
import {jwtDecode} from "jwt-decode";
import {GetRequests} from "../communication/network/GetRequests";

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="">
                Analog Story
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function LogIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        email: '',
        password: '',
    });
    const [isFormFilled, setIsFormFilled] = useState<boolean>(false);

    const checkFormCompletion = () => {
        setIsFormFilled(user.email !== '' && user.password !== '');
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const res = await PostRequests.logInUser(user.email, user.password);
            localStorage.setItem('Token', res.token);

            // Dekoduj JWT token, aby uzyskać informacje o użytkowniku
            const decodedToken = jwtDecode(res.token);

            // Pobierz dane użytkownika z zdekodowanego tokenu
            const userEmail = decodedToken?.sub?.toString();

            // Zapisz dane użytkownika do localStorage
            if (userEmail) {
                localStorage.setItem('User', userEmail);

                // Pobierz dodatkowe informacje o użytkowniku i zapisz do localStorage
                const userDetails = await GetRequests.getUserIDByEmail();
                if (userDetails) {
                    localStorage.setItem('UserId', userDetails.toString());
                }
            } else {
                console.error('User ID is undefined or null');
            }

            navigate('/');
        } catch (error) {
            console.error('Wystąpił błąd podczas logowania:', error);
        }
    };

    useEffect(() => {
        checkFormCompletion();
    }, [user.email, user.password]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Logowanie
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            onChange={(event) =>
                                setUser((prevState) => ({ ...prevState, email: event.target.value }))
                            }
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(event) =>
                                setUser((prevState) => ({ ...prevState, password: event.target.value }))
                            }
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isFormFilled}
                        >
                            Zaloguj się
                        </Button>
                        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Grid item>
                                <Link onClick={() => navigate('../signin')} variant="body2" textAlign="center">
                                    {'Nie masz konta? Zarejestruj się!'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}