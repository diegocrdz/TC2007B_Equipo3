/*
    Página de Estadísticas Urbanas
*/

import { Box, Typography } from "@mui/material";
import { usePermissions } from "react-admin";
import { listBoxSx } from "../componentes";
import ShowChartIcon from '@mui/icons-material/ShowChart';
// Gráficas

export const EstadisticasUrbanas = () => {
    const { isPending, permissions } = usePermissions();

    if (isPending) {
        return <div>Cargando...</div>;
    }

    // Solo administradores pueden ver estadísticas
    if (permissions !== 'admin') {
        return (
            <Box sx={listBoxSx}>
                <Typography variant="h4" color="error">
                    No tienes permisos para ver esta página
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={listBoxSx}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <ShowChartIcon />
                <Typography variant="h4">
                    Estadísticas Urbanas
                </Typography>
            </Box>
            
            <Box sx={{ marginTop: '2em'}}>
            </Box>
        </Box>
    );
};