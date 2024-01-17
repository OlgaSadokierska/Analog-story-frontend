import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { User } from "../communication/Types";
import { PostRequests } from "../../communication/network/PostRequests";

const defaultTheme = createTheme();

const MIN_PASSWORD_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;
const PHONE_REGEX = /^[0-9]{9}$/;

const ERROR_MESSAGES = {
    INVALID_EMAIL: "Niepoprawny adres email.",
    INVALID_PASSWORD: "Hasło powinno mieć co najmniej 8 znaków i zawierać co najmniej jedną dużą literę, jedną małą literę, jedną cyfrę i jeden znak specjalny.",
    INVALID_PHONE: "Niepoprawny numer telefonu.",
    FIELDS_REQUIRED: "Uzupełnij wszystkie wymagane pola."
};

export default function AddEmployee() {
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
            isPasswordValid() &&
            isPhoneValid()
        );
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!isFormValid()) {
            console.error(ERROR_MESSAGES.FIELDS_REQUIRED);
            return;
        }

        try {
            await PostRequests.addEmployee(user.firstname, user.lastname, user.login, user.email, user.password, user.phone).then(res => {
                alert("Pracownik został dodany");
                console.log(res);
            });
        } catch (error) {
            console.error("Wystąpił błąd podczas dodawania:", error);
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
                    <Avatar sx={{ m: 1, bgcolor: '#EFC049' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Dodaj pracownika
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
                            onChange={(event) => setUser((prevState) => ({ ...prevState, firstname: event.target.value }))}
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
                            onChange={(event) => setUser((prevState) => ({ ...prevState, lastname: event.target.value }))}
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
                            onChange={(event) => setUser((prevState) => ({ ...prevState, login: event.target.value }))}
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
                            helperText={user.email && !isEmailValid() ? ERROR_MESSAGES.INVALID_EMAIL : null}
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
                                            {ERROR_MESSAGES.INVALID_PASSWORD}
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
                            helperText={user.phone && !isPhoneValid() ? ERROR_MESSAGES.INVALID_PHONE : null}
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
                                    {ERROR_MESSAGES.FIELDS_REQUIRED}
                                </Typography>
                            )}
                            Dodaj pracownika
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}