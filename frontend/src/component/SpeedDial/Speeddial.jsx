import React from 'react'
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import ProfileIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import { useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';

const Speeddial = () => {
    const Navigate = useNavigate();
    const user = useSelector(state => state.user);
    const { isAuthenticated } = user;
    const move = (action) => {
        if (action !== "Home") {
            Navigate(action)
        } else {
            Navigate("/")

        }
    }
    const actions = [
        { icon: <ShoppingCartIcon />, name: 'Cart' },
        { icon: <HomeIcon />, name: 'Home' },
        isAuthenticated ? { icon: <ProfileIcon />, name: 'Profile' } : { icon: <LoginIcon />, name: 'Login' },
    ];

    return (
        <div>
            <Box sx={{ height: 20, position: 'fixed', transform: 'translateZ(0px)', zIndex: 10, flexGrow: 1 }}>

                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', top: 40, left: 16 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction key={action.name} onClick={() => move(action.name)} value={action.name} icon={action.icon} tooltipTitle={action.name} />
                    ))}
                </SpeedDial>
            </Box>

        </div>
    )
}

export default Speeddial