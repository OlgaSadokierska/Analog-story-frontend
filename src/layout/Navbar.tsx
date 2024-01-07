import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import CameraRollOutlinedIcon from '@mui/icons-material/CameraRollOutlined';
import { useNavigate } from 'react-router-dom';
import {PostRequests} from "../communication/network/PostRequests";

const pagesUser = [
    { label: 'Repozytorium', link: '/repozytorium' },
    { label: 'Sklep', link: '/products' },
];

const pagesAdmin = [
    { label: 'Użytkownicy', link: '/users' },
    { label: 'Pracownicy', link: '/employees' },
    { label: 'Produkty ', link: '/products' },
];

const pagesEmplyee = [
    { label: 'Użytkownicy', link: '/users' },
    { label: 'Produkty ', link: '/products' },
];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('Token');
    const userAccountType = localStorage.getItem('UserAccountType');

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginButtonClick = async () => {
        if (isLoggedIn) {
            localStorage.clear();
            try {
                await PostRequests.logout();

            } catch (error) {
                console.error("Wystąpił błąd", error);
            }
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const handlePageButtonClick = (link: string) => {
        navigate(link);
    };

    const handleUserProfileClick = (event: React.MouseEvent<HTMLElement>) => {
        if (isLoggedIn) {
            setAnchorElUser(event.currentTarget);
        }
    };

    const handleUserMenuItemClick = (action: string) => {
        handleCloseUserMenu();

        switch (action) {
            case 'profile':
                navigate('/userpanel');
                break;
            case 'products':
                navigate('/user_products');
                break;
            default:
                break;
        }
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#EFC049"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CameraRollOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 600,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                        onClick={() => navigate('/')}
                    >
                        ANALOG STORY
                    </Typography>
                    {isLoggedIn && userAccountType == "2" &&
                        pagesUser.map((page) => (
                            <Button
                                key={page.label}
                                variant="text"
                                onClick={() => handlePageButtonClick(page.link)}
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 50,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    {isLoggedIn && userAccountType == "1" &&
                        pagesAdmin.map((page) => (
                            <Button
                                key={page.label}
                                variant="text"
                                onClick={() => handlePageButtonClick(page.link)}
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 50,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}

                    {isLoggedIn && userAccountType == "3" &&
                        pagesEmplyee.map((page) => (
                            <Button
                                key={page.label}
                                variant="text"
                                onClick={() => handlePageButtonClick(page.link)}
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 50,
                                    letterSpacing: '.1rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                {page.label}
                            </Button>
                        ))}
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn && (
                            <>
                                <Tooltip title="Open user profile" arrow>
                                    <IconButton onClick={handleUserProfileClick} sx={{ p: 0, margin: 1 }} aria-label="Open user profile">
                                        <Avatar src="/profile-user.png" />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem onClick={() => handleUserMenuItemClick('profile')}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>

                                    {(userAccountType === "1" || userAccountType === "3") && (
                                        <MenuItem onClick={() => handleUserMenuItemClick('products')}>
                                            <Typography textAlign="center">
                                                {userAccountType === "3" ? 'Zamówienia do zaakceptowania' : 'Aukcje'}
                                            </Typography>
                                        </MenuItem>
                                    )}

                                    {userAccountType === "2" && (
                                        <MenuItem onClick={() => handleUserMenuItemClick('products')}>
                                            <Typography textAlign="center">Moje aukcje</Typography>
                                        </MenuItem>
                                    )}
                                </Menu>
                            </>
                        )}
                        <Button onClick={handleLoginButtonClick} sx={{ backgroundColor: 'white' }}>
                            {isLoggedIn ? 'Wyloguj' : 'Zaloguj'}
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
