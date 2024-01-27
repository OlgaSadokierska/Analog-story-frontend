import React, { useEffect, useState } from "react";
import { Cart } from "../communication/Types";
import { GetRequests } from "../communication/network/GetRequests";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import { orderBy } from 'lodash';
import { PostRequests } from "../communication/network/PostRequests";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

export default function UnacceptedCartsEmployee() {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [sortedCarts, setSortedCarts] = useState<Cart[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function fetchCarts() {
            try {
                const cartsData = await GetRequests.getAllUnacceptedCartsEmployee();
                setCarts(cartsData);
                setSortedCarts(cartsData);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania koszyków:', error);
            }
        }

        fetchCarts();
    }, []);

    const handleAccept = async (cartId: number) => {
        try {
            await PostRequests.markAsPurchased(cartId);
            alert('Koszyk został zaakceptowany!');
            window.location.reload();
        } catch (error) {
            console.error('Wystąpił błąd podczas akceptowania koszyka: ', error);
        }
    };

    const handleSortByPrice = () => {
        const sorted = orderBy(sortedCarts, 'productDto.price', sortOrder);
        setSortedCarts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSortByEmail = () => {
        const sorted = orderBy(sortedCarts, 'userDto.email', sortOrder);
        setSortedCarts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        const filteredCarts = carts.filter(cart =>
            cart.userDto.email.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSortedCarts(filteredCarts);
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <h1 style={{ margin: '0 20px' }}>Koszyki do zaakceptowania</h1>
            <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
            <TextField
                label="Szukaj po emailu"
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
                sx={{ margin: '0 20px 20px' }}
            />
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Table aria-label="Tabela koszyków" sx={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Email użytkownika
                                <IconButton onClick={handleSortByEmail}>
                                    {sortOrder === 'asc' ? (
                                        <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                        <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </TableCell>
                            <TableCell>Opis koszyka</TableCell>
                            <TableCell>Marka</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>Cena
                                <IconButton onClick={handleSortByPrice}>
                                    {sortOrder === 'asc' ? (
                                        <ArrowUpwardIcon fontSize="small" />
                                    ) : (
                                        <ArrowDownwardIcon fontSize="small" />
                                    )}
                                </IconButton>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCarts.map((cart) => (
                            <TableRow key={cart.id}>
                                <TableCell>{cart.userDto.email}</TableCell>
                                <TableCell>{cart.productDto.description}</TableCell>
                                <TableCell>{cart.productDto.brand}</TableCell>
                                <TableCell>{cart.productDto.model}</TableCell>
                                <TableCell>{cart.productDto.price} zł</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="success" onClick={() => handleAccept(cart.id)}>
                                        {'Akceptuj'}
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
