import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Product } from '../communication/Types';
import { GetRequests } from '../communication/network/GetRequests';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { orderBy } from 'lodash';
import Button from "@mui/material/Button";
import { PostRequests } from "../communication/network/PostRequests";

export default function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const userAccountType = localStorage.getItem('UserAccountType');
    const navigate = useNavigate();
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('UserId');
        if (storedUserId !== null) {
            const parsedUserId = parseInt(storedUserId, 10);
            setLoggedInUserId(parsedUserId.toString());
            console.log("Logged In User Id:", parsedUserId.toString());
        }
    }, []);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const productsData = await GetRequests.getAllProducts();
                setProducts(productsData);
                setSortedProducts(productsData);
            } catch (error) {
                console.error('Wystąpił błąd podczas pobierania produktów:', error);
            }
        }

        fetchProducts();
    }, []);

    const handleEdit = (productId: number) => {
        console.log(`Edytuj produkt o ID: ${productId}`);
    };

    const handleDelete = (productId: number) => {
        console.log(`Usuń produkt o ID: ${productId}`);
    };

    const handleBuy = async (productId: number) => {
        const storedUserId = localStorage.getItem('UserId');
        try {
            await PostRequests.addProductToCart(storedUserId!, productId);
            alert('Produkt został dodany do koszyka!');
            window.location.reload();
        } catch (error) {
            console.error('Wystąpił błąd podczas dodawania do koszyka: ', error);
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        filterProducts(event.target.value);
    };

    const filterProducts = (term: string) => {
        const filtered = products.filter((product) =>
            product.description.toLowerCase().includes(term.toLowerCase())
        );
        setSortedProducts(filtered);
    };

    const handleSortByPrice = () => {
        const sorted = orderBy(sortedProducts, 'price', sortOrder);
        setSortedProducts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleAddProduct = () => {
        navigate('/addproduct');
    };

    return (
        <Container maxWidth="lg" sx={{ marginTop: '20px' }}>
            <h1 style={{ margin: '0 20px' }}>Produkty</h1>
            <Box sx={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <TextField
                    label="Szukaj po opisie"
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
                <Button sx={{ backgroundColor: '#EFC049', marginLeft: 'auto' }} onClick={handleAddProduct}>
                    {'Dodaj ogłoszenie'}
                </Button>
            </Box>
            <TableContainer component={Paper} sx={{ marginTop: '20px', marginBottom: '20px' }}>
                <Table aria-label="Tabela produktów" sx={{ marginTop: '20px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Opis ogłoszenia</TableCell>
                            <TableCell>Marka</TableCell>
                            <TableCell>Model</TableCell>
                            <TableCell>
                                Cena
                                <IconButton onClick={handleSortByPrice}>
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
                        {sortedProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.description}</TableCell>
                                <TableCell>{product.brand}</TableCell>
                                <TableCell>{product.model}</TableCell>
                                <TableCell>{product.price} zł</TableCell>
                                <TableCell>
                                    {userAccountType === "1" || userAccountType === "3" ? (
                                        <>
                                            <IconButton onClick={() => handleEdit(product.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton onClick={() => handleDelete(product.id)}>
                                                <DeleteOutlineIcon />
                                            </IconButton>
                                        </>
                                    ) : null}
                                    {userAccountType === "2" && product.userId !== loggedInUserId ? (
                                        <IconButton onClick={() => handleBuy(product.id)}>
                                            <ShoppingCartIcon />
                                        </IconButton>
                                    ) : null}
                                    {userAccountType === "2" && product.userId === loggedInUserId ? (
                                        <IconButton onClick={() => handleEdit(product.id)}>
                                            <EditIcon />
                                        </IconButton>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}
