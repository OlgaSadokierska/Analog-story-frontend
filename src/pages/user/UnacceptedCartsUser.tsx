import React, { useEffect, useState } from "react";
import { Cart } from "../../communication/Types";
import { GetRequests } from "../../communication/network/GetRequests";
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
import { orderBy } from 'lodash';

export default function UnacceptedCartsUser() {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [sortedCarts, setSortedCarts] = useState<Cart[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const userId = localStorage.getItem('UserId');

    useEffect(() => {
        async function fetchCarts() {
            try {
                const cartsData = await GetRequests.getAllUnacceptedCartsUser(userId);
                setCarts(cartsData);
                setSortedCarts(cartsData);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania koszyków:', error);
            }
        }

        fetchCarts();
    }, []);

    const handleSortByPrice = () => {
        const sorted = orderBy(sortedCarts, 'price', sortOrder);
        setSortedCarts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <h1 style={{ margin: '0 20px' }}>Niezaakceptowane przedmioty</h1>
            <TableContainer component={Paper} sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Table aria-label="Tabela koszyków" sx={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCarts.map((cart) => (
                            <TableRow key={cart.id}>
                                <TableCell>{cart.productDto.description}</TableCell>
                                <TableCell>{cart.productDto.brand}</TableCell>
                                <TableCell>{cart.productDto.model}</TableCell>
                                <TableCell>{cart.productDto.price} zł</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
