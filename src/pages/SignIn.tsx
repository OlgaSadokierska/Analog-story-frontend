import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {User} from "../communication/Types";
import {PostRequests} from "../communication/network/PostRequests";

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

export default function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        firstname: "",
        lastname: "",
        email: "",
        password:"",
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await PostRequests.registerUser(user.firstname, user.lastname, user.email, user.password).then(res => console.log(res));
        } catch (error) {
            console.error("Wystąpił błąd podczas rejestracji:", error);
        }
    };

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
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="Imię"
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                            onChange={(event) =>setUser((prevState) => ({...prevState, firstname: event.target.value}))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="lastname"
                            label="Nazwisko"
                            name="lastname"
                            autoComplete="lastname"
                            autoFocus
                            onChange={(event) =>setUser((prevState) => ({...prevState, lastname: event.target.value}))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(event) =>setUser((prevState) => ({...prevState, email: event.target.value}))}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Hasło"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event) =>setUser((prevState) => ({...prevState, password: event.target.value}))}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Zarejestruj się
                        </Button>
                        <Grid container sx={{ display: "flex", flexDirection: "column"}}>
                            <Grid item>
                                <Link onClick={() => navigate(-1)} variant="body2">
                                    {"Masz już konto? Zaloguj się!"}
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