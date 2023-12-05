import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { Get } from '../communication/Endpoints'; // Załóżmy, że masz funkcję Get
import { User } from '../communication/Types';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const defaultTheme = createTheme();

export default function UserProfile() {
    const [user, setUser] = useState<User>({
        id: 0,
        firstname: '',
        lastname: '',
        email: '',
        login: '',
        password: '',
        isAdmin: false,
    });

    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const [userDetails] = Get();
                setUser(userDetails);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        }

        fetchUserDetails();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <div>
                    <p></p>
                    <Typography component="h1" variant="h5">
                        User Profile
                    </Typography>
                    <p>Imię: {user.firstname}</p>
                    <p>Nazwisko: {user.lastname}</p>
                    <p>Adres e-mail: {user.email}</p>
                    <p> Zmiana hasła </p>
                    <TextField
                        value={user.password}
                        onChange={(e) => handleChange('password', e.target.value)}
                        margin="normal"
                        fullWidth
                        label="Hasło"
                        name="password"
                        type="password"
                    />
                    <form>
                    <TextField
                        value={user.password}
                        onChange={(e) => handleChange('confirmPassword', e.target.value)}
                        margin="normal"
                        fullWidth
                        label="Potwierdź hasło"
                        name="confirmPassword"
                        type="password"
                    />
                    <p> </p>
                    <Button type="submit" fullWidth variant="contained">
                        Zaktualizuj
                    </Button>
                    <p> </p>
                    <Button type="button" fullWidth variant="contained">
                        Dodaj ogłoszenie
                    </Button>
                </form>
            </div>
        </Container>
        </ThemeProvider>
    );
}
