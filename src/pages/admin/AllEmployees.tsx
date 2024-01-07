import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { User } from "../../communication/Types";
import { GetRequests } from "../../communication/network/GetRequests";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { orderBy } from 'lodash';
import Button from "@mui/material/Button";

export default function AllEmployees() {
    const [users, setUsers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedUsers, setSortedUsers] = useState<User[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        GetRequests.getAllEmployees().then(res => {
            setUsers(res);
            setSortedUsers(orderBy(res, 'email', sortOrder));
        }).catch(error =>
            console.log(error)
        )
    }, [sortOrder])

    const handleEdit = (userId: number) => {
        console.log(`Edytuj pracownika o ID: ${userId}`);
    };

    const handleDelete = (userId: number) => {
        console.log(`Usuń pracownika o ID: ${userId}`);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterUsers(event.target.value);
    };

    const filterUsers = (term: string) => {
        const filtered = users.filter((user) =>
            user.email.toLowerCase().includes(term.toLowerCase())
        );
        setSortedUsers(orderBy(filtered, 'email', sortOrder));
    };

    const handleSortByEmail = () => {
        const sorted = orderBy(sortedUsers, 'email', sortOrder);
        setSortedUsers(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <h1 style={{ margin: '0 20px' }}>Wszyscy pracownicy</h1>
            <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Szukaj po adresie e-mail"
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
                <Button sx={{ backgroundColor: '#EFC049', marginLeft: 'auto' }}>
                    {'Dodaj pracownika'}
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Table aria-label="Tabela pracowników" sx={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Użytkownik</TableCell>
                            <TableCell>
                                Imię
                            </TableCell>
                            <TableCell>
                                Nazwisko
                            </TableCell>
                            <TableCell>
                                E-mail
                                <IconButton onClick={handleSortByEmail}>
                                    {sortOrder === 'asc' ? (
                                        <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                        <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </TableCell>
                            <TableCell>Akcje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedUsers.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.firstName}</TableCell>
                                <TableCell>{user.lastName}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(user.id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)}>
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
