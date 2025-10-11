/*
Página de Estadísticas Médicas
Fecha: 11/08/2025
*/

import { Box, Typography } from "@mui/material";
import { usePermissions } from "react-admin";
// Componentes
import { listBoxSx } from "../utils/componentes";
// Iconos
import ShowChartIcon from '@mui/icons-material/ShowChart';
// Gráficas
import { GraficasMedicas } from "./GraficasMedicas";

export const EstadisticasMedicas = () => {
    const { isPending, permissions } = usePermissions();

    if (isPending) {
        return <div>Cargando...</div>;
    }

    // Solo administradores pueden ver estadísticas
    if (permissions.role !== 'admin' ) {
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
            
            <Box sx={{ marginTop: '2em'}}>
                <GraficasMedicas />
            </Box>
        </Box>
    );
};