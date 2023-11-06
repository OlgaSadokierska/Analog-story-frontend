import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect, useState} from "react";
import {User} from "../../communication/Types";
import {GetRequests} from "../../communication/network/GetRequests";

export default function AllUsers() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        GetRequests.getAllUsers().then(res =>{
            setUsers(res);
            console.log("1");
            console.log(GetRequests.getAllUsers())}
        ).catch(error =>{
            console.log(error);
            console.log("1");
            console.log(GetRequests.getAllUsers())}
        )
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Id użytkownika</TableCell>
                        <TableCell align="right">Imię</TableCell>
                        <TableCell align="right">Nazwisko</TableCell>
                        <TableCell align="right">Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) => (
                        <TableRow
                            key={user.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {user.firstname}
                            </TableCell>
                            <TableCell align="right">{user.lastname}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.id}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}