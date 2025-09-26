/*
    Página de Estadísticas Urbanas
*/

import { Box, Typography, Card, CardContent } from "@mui/material";
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
                    Estadísticas Médicas
                </Typography>
            </Box>
            
            <Card
                sx={{
                    margin: '20px 0',
                    padding: '1em',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    border: '2px solid',
                    borderColor: '#5e9bc6ff',
                }}
            >
                <CardContent>
                </CardContent>
            </Card>
        </Box>
    );
};