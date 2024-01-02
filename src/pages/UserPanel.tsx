import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { GetRequests } from "../communication/network/GetRequests";
import { PutRequests } from "../communication/network/PutRequests";
import { User } from '../communication/Types';
const UserProfile = () => {
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
        const token = localStorage.getItem('Token');
        const userId = localStorage.getItem('UserId');

        if (token && userId) {
            GetRequests.getUserById(Number(userId)).then(res =>
                setUser(res)
            ).catch(error =>
                console.log(error)
            );
        }
    }, []);

    const handleEditProfile = () => {
        setEditing(true);
    };

    const handleSaveProfile = () => {
        console.log("Saving user profile...", { ...user, password: newPassword });

        PutRequests.updateUser({ ...user, password: newPassword }).then(() => {
            setEditing(false);
        }).catch(error => {
            console.error("Error updating user profile:", error);
        });
    };

    return (
        <Container component="main" maxWidth="xs">
            <div>
                <Typography component="h1" variant="h5">
                    User Profile
                </Typography>
                {Object.keys(user).map((key) => {
                    if (key !== "id" && key !== "accountTypeId") {
                        return (
                            <p key={key}>
                                {isEditing ? (
                                    <TextField
                                        value={key === "password" ? newPassword : user[key]}
                                        onChange={(e) => key === "password" ? setNewPassword(e.target.value) : setUser({ ...user, [key]: e.target.value })}
                                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                                        type={key === "password" ? "password" : "text"}
                                    />
                                ) : (
                                    <>
                                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {key === "password" ? "********" : user[key]}
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
    );
};

export default UserProfile;
