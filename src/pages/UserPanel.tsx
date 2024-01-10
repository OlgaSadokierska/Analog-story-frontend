import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GetRequests } from "../communication/network/GetRequests";
import { PutRequests } from "../communication/network/PutRequests";
import { User } from '../communication/Types';
import Box from "@mui/material/Box";

const UserProfile = () => {
    const PHONE_REGEX = /^[0-9]{9}$/;
    const MIN_PASSWORD_LENGTH = 8;
    const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])(?=.*[a-zA-Z]).{8,}$/;

    const [actualUser, setUser] = useState<User>({
        id: localStorage.getItem('UserId'),
        firstName: "",
        lastName: "",
        email: "",
        login: "",
        password: "",
        phone: "",
        accountTypeId: localStorage.getItem('UserAccountType')
    });

    const [isEditing, setEditing] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    const [formSubmitted] = useState(false);

    const isEmailValid = () => {
        return validateEmail(actualUser.email);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const isPasswordValid = () => {
        return actualUser.password.length >= MIN_PASSWORD_LENGTH && PASSWORD_REGEX.test(actualUser.password);
    };

    const isFormValid = () => {
        return (
            actualUser.firstName &&
            actualUser.lastName &&
            actualUser.email &&
            actualUser.password &&
            isEmailValid() &&
            isPasswordValid()&&
            isPhoneValid()
        );
    };

    const isPhoneValid = () => {
        return PHONE_REGEX.test(actualUser.phone);
    };

    useEffect(() => {
        const token = localStorage.getItem('Token');
        const userId = localStorage.getItem('UserId');

        if (token && userId) {
            GetRequests.getUserById(Number(userId)).then(res => {
                setUser(res);
                    console.log(res)
                }
            ).catch(error =>
                console.log(error)
            );
        }
    }, []);

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleSaveProfile = () => {
        PutRequests.updateUser(actualUser.id, actualUser.firstName, actualUser.lastName, actualUser.email, actualUser.login, actualUser.password, actualUser.phone, actualUser.accountTypeId).then(() => {
            setEditing(false);
        }).catch(error => {
            console.error("Error updating user profile:", error);
        });
    };

    return (
        <Container component="main" maxWidth="s" sx={{ display: "flex", justifyContent: "center", backgroundImage: 'url(/img015.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', overflow: 'hidden' }}>
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center" }}>
                <Typography component="h1" variant="h5" sx={{ color: "black", mt: 3 }}>
                    Dane użytkownika
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3, pl: 2, pr: 2, width: "50%", height: "60%", pLeft: 2, bgcolor: "white", borderRadius: "1%", justifyContent: "center", }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="firstName"
                        label="Imię"
                        name="firstName"
                        autoFocus
                        value={actualUser.firstName}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, firstName: event.target.value }))}
                        readOnly={!isEditing}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lastName"
                        label="Nazwisko"
                        name="lastName"
                        autoFocus
                        value={actualUser.lastName}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, lastName: event.target.value }))}
                        readOnly={!isEditing}
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
                        value={actualUser.login}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, login: event.target.value }))}
                        readOnly={!isEditing}
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
                        error={actualUser.email && !isEmailValid()}
                        helperText={actualUser.email && !isEmailValid() ? "Niepoprawny adres email." : null}
                        value={actualUser.email}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, email: event.target.value }))}
                        readOnly={!isEditing}
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
                        error={actualUser.password && !isPasswordValid()}
                        helperText={
                            actualUser.password &&
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
                        value={actualUser.password}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, password: event.target.value }))}
                        readOnly={!isEditing}
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
                        error={actualUser.phone && !isPhoneValid()}
                        helperText={actualUser.phone && !isPhoneValid() ? "Niepoprawny numer telefonu." : null}
                        value={actualUser.phone}
                        onChange={(event) => setUser((prevState) => ({ ...prevState, phone: event.target.value }))}
                        readOnly={!isEditing}
                    />

                    {isEditing ? (
                        <Button onClick={handleSaveProfile} fullWidth variant="contained">
                            Zapisz
                        </Button>
                    ) : (
                        <Button onClick={handleEditProfile} fullWidth variant="contained">
                            Edytuj
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default UserProfile;
