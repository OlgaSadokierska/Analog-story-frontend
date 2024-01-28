import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../communication/Types';
import { GetRequests } from '../../communication/network/GetRequests';
import {PutRequests} from "../../communication/network/PutRequests";

const defaultTheme = createTheme();

export default function EditUser() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        login: '',
        password: '',
        phone: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await GetRequests.getUserById(Number(userId));
                setUser(userData);
            } catch (error) {
                console.error('Error: ', error);
            }
        };

        fetchUserData();
    }, [userId]);

    const handleChange = (field, value) => {
        setUser((prevState) => ({ ...prevState, [field]: value }));
    };

    const handleUpdate = async () => {
        try {
            await PutRequests.updateUser(
                user.id,
                user.firstName,
                user.lastName,
                user.login,
                user.email,
                user.password,
                user.phone,
                user.accountTypeId
            );
            alert('Dane użytkownika zostały zapisane');
            navigate(-1);
        } catch (error) {
            console.error('Error: ', error);
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
                        Edytuj użytkownika
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="firstname"
                            label="Imię"
                            name="firstname"
                            autoComplete="firstname"
                            autoFocus
                            value={user.firstName}
                            onChange={(event) => handleChange('firstName', event.target.value)}
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
                            value={user.lastName}
                            onChange={(event) => handleChange('lastName', event.target.value)}
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
                            value={user.email}
                            onChange={(event) => handleChange('email', event.target.value)}
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
                            value={user.login}
                            onChange={(event) => handleChange('login', event.target.value)}
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
                            value={user.password}
                            onChange={(event) => handleChange('password', event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="phone"
                            label="Phone"
                            name="phone"
                            autoComplete="phone"
                            autoFocus
                            value={user.phone}
                            onChange={(event) => handleChange('phone', event.target.value)}
                        />
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleUpdate}
                        >
                            {formSubmitted && (
                                <Typography variant="body2" color="error" align="center">
                                </Typography>
                            )}
                            Zapisz dane
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
