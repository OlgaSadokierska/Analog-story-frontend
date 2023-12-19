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

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
const PHONE_REGEX = /^[0-9]{9}$/;


export default function SignIn() {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        firstname: '',
        lastname: '',
        email: '',
        login: '',
        password: '',
        phone: ''
    });

    const [formSubmitted] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = () => {
        return user.password.length >= MIN_PASSWORD_LENGTH && PASSWORD_REGEX.test(user.password);
    };
    const isPhoneValid = () => {
        return PHONE_REGEX.test(user.phone);
    };

    const isEmailValid = () => {
        return validateEmail(user.email);
    };

    const isFormValid = () => {
        return (
            user.firstname &&
            user.lastname &&
            user.email &&
            user.password &&
            isEmailValid() &&
            isPasswordValid()&&
                isPhoneValid()
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormValid()) {
            console.error("Uzupełnij wszystkie wymagane pola poprawnie.");
            return;
        }

        if (!user.firstname || !user.lastname || !user.email || !user.password) {
            console.error("Uzupełnij wszystkie wymagane pola.");
            return;
        }

        if (user.password.length < MIN_PASSWORD_LENGTH || !PASSWORD_REGEX.test(user.password)) {
            console.error("Hasło nie spełnia wymagań.");
            return;
        }

        if (!validateEmail(user.email)) {
            console.error("Niepoprawny adres email.");
            return;
        }


        try {
            await PostRequests.registerUser(user.firstname, user.lastname, user.login, user.email, user.password, user.phone).then(res => {
                alert("Użytkownik został utworzony");
                console.log(res)
            });
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
                        Rejestracja
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
                            id="login"
                            label="Login"
                            name="login"
                            autoComplete="login"
                            autoFocus
                            onChange={(event) =>setUser((prevState) => ({...prevState, login: event.target.value}))}
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
                            error={user.email && !isEmailValid()}
                            helperText={user.email && !isEmailValid() ? "Niepoprawny adres email." : null}
                            onChange={(event) => setUser((prevState) => ({ ...prevState, email: event.target.value }))}
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
                            error={user.password && !isPasswordValid()}
                            helperText={
                                user.password &&
                                (!isPasswordValid()
                                    ? (
                                        <div>
                                            Hasło powinno mieć co najmniej 8 znaków i zawierać co najmniej:
                                            <ul>
                                                <li>jedną dużą literę</li>
                                                <li>jedną małą literę</li>
                                                <li>jedną cyfrę</li>
                                                <li>jeden znak specjalny</li>
                                            </ul>
                                        </div>
                                    ) : (
                                        "Hasło spełnia wymagania."
                                    ))
                            }
                            onChange={(event) => setUser((prevState) => ({ ...prevState, password: event.target.value }))}>
                        </TextField>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            error={user.phone && !isPhoneValid()}
                            helperText={user.phone && !isPhoneValid() ? "Niepoprawny numer telefonu." : null}
                            onChange={(event) => setUser((prevState) => ({ ...prevState, phone: event.target.value }))}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={!isFormValid()}
                        >
                            {formSubmitted && !isFormValid() && (
                                <Typography variant="body2" color="error" align="center">
                                    Uzupełnij wszystkie wymagane pola poprawnie.
                                </Typography>
                            )}
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