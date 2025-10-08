import { AppBar, TitlePortal, useSidebarState } from 'react-admin';
import { SwipeableTemporaryDrawer } from '../ui/accMenu';
import { Box, useMediaQuery } from '@mui/material';

const Logo = () => {
    // Revisa si la barra lateral está abierta
    const [open] = useSidebarState();
    // Revisa si la pantalla es pequeña
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    if (open || isSmall) return null;
    return (
    	<Box
            component="img"
            src="/logo_blanco_ac.png"
            alt="Logo Alcaldía Cuajimalpa"
            aria-label="Logo Alcaldía Cuajimalpa"
            sx={{ height: '30px', margin: '0 20px' }}
        />
    );
};

export const MyAppBar = () => (
    <AppBar>
        <Logo/>
        <TitlePortal/>
        <SwipeableTemporaryDrawer/>
    </AppBar>
);