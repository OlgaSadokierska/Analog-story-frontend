import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GetRequests } from "../communication/network/GetRequests";
import { User } from '../communication/Types';

const defaultTheme = createTheme();

type UserKey = Exclude<keyof User, "id" | "accountTypeId">;

export default function UserProfile() {
    const [user, setUser] = useState<User>({
        id: 0,
        firstname: "",
        lastname: "",
        email: "",
        login: "",
        password: "",
        phone: "",
        accountTypeId: 0
    });

    const [isEditing, setEditing] = useState(false);
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        GetRequests.getUserById(Number(24)).then(res =>
            setUser(res)
        ).catch(error =>
            console.log(error)
        );
    }, [24]);

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleSaveProfile = () => {
        console.log("Saving user profile...", { ...user, password: newPassword });
        setEditing(false);
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <div>
                    <p></p>
                    <Typography component="h1" variant="h5">
                        User Profile
                    </Typography>
                    {Object.keys(user).map((key) => {
                        if (key !== "id" && key !== "accountTypeId") {
                            return (
                                <p key={key}>
                                    {isEditing ? (
                                        <TextField
                                            value={key === "password" ? newPassword : user[key as UserKey]}
                                            onChange={(e) => key === "password" ? setNewPassword(e.target.value) : setUser({ ...user, [key as UserKey]: e.target.value })}
                                            label={key.charAt(0).toUpperCase() + key.slice(1)}
                                            type={key === "password" ? "password" : "text"}
                                        />
                                    ) : (
                                        <>
                                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === "password" ? "********" : user[key as UserKey]}
                                        </>
                                    )}
                                </p>
                            );
                        }
                        return null;
                    })}
                    {isEditing && (
                        <Button onClick={handleSaveProfile} fullWidth variant="contained">
                            Zapisz
                        </Button>
                    )}
                    {!isEditing && (
                        <Button onClick={handleEditProfile} fullWidth variant="contained">
                            Edytuj
                        </Button>
                    )}
                </div>
            </Container>
        </ThemeProvider>
    );
}
