// Third Party Imports
import { Link, useLocation } from "react-router-dom";

// MUI Impors
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const routes = [
    { path: "/", label: "Search" },
    { path: "/favorites", label: "Favorites" },
];

const Navbar = () => {
    const location = useLocation();

    const getButtonStyle = (path: string) => ({
        textTransform: 'capitalize',
        color: '#fff',
        bgcolor: location.pathname === path ? 'rgba(255,255,255,0.2)' : 'transparent',
        '&:hover': {
            bgcolor: location.pathname === path ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
        },
        size: 'small',
    });

    return (
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Typography variant="h6">Book Explorer</Typography>
                <div style={{ display: 'flex', gap: '16px' }}>
                    {routes.map(route => (
                        <Button
                            key={route?.path}
                            component={Link}
                            to={route?.path}
                            sx={getButtonStyle(route?.path)}
                        >
                            {route?.label}
                        </Button>
                    ))}
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;