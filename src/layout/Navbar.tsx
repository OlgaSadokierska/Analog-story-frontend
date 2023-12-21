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

const pages = [
    { label: 'Repozytorium', link: '/repozytorium' },
    { label: 'Sklep', link: '/products' },
];
const settings = ['Profile'];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('Token');

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLoginButtonClick = () => {
        if (isLoggedIn) {
            localStorage.clear();
            navigate('/');
        } else {
            navigate('/login');
        }
    };

    const handlePageButtonClick = (link: string) => {
        navigate(link);
    };

    const handleUserProfileClick = () => {
        navigate('/userpanel');
        handleCloseNavMenu(); // Zamknij menu nawigacyjne po przejściu do panelu użytkownika
    };

    return (
        <AppBar position="static">
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
                    {pages.map((page) => (
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
                                <Tooltip title="Open user profile">
                                    <IconButton onClick={handleUserProfileClick} sx={{ p: 0, margin: 1 }}>
                                        <Avatar src="../../../public/profile-user.png" />
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
                                    <MenuItem onClick={() => navigate('/userpanel')}>
                                        <Typography textAlign="center">Profil</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/user_products')}>
                                        <Typography textAlign="center">Moje produkty</Typography>
                                    </MenuItem>

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
