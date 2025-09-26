/*
    Página de Estadísticas Médicas
*/

import { Box, Typography, Card, CardContent } from "@mui/material";
import { usePermissions } from "react-admin";
import { listBoxSx } from "../componentes";
import ShowChartIcon from '@mui/icons-material/ShowChart';
// Gráficas
import { DatosIniciales } from "./GraficasMedicas";

export const EstadisticasMedicas = () => {
    const { isPending, permissions } = usePermissions();

    if (isPending) {
        return <div>Cargando...</div>;
    }

    // Solo administradores pueden ver estadísticas
    if (permissions !== 'admin' ) {
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
                    borderColor: '#ab8dd0ff',
                }}
            >
                <CardContent>
                    <DatosIniciales />
                </CardContent>
            </Card>
        </Box>
    );
};