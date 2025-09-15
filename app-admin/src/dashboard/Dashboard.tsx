import { useGetIdentity, usePermissions } from "react-admin";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Functions } from "./Functions";
// Librerías para menús desplegables
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography } from "@mui/material";

export const Dashboard = () => {
    // Obtener permisos e identidad de usuario
    const { isPending: isPermPending, permissions } = usePermissions();
    const { data: identityData, isPending: isIdentityPending } = useGetIdentity();

    if (isPermPending || isIdentityPending) { // Ver si los datos están cargando
        return <div>Esperando permisos...</div>;
    } else {
        return (
            <Card
                sx={{
                    minHeight: '100vh',
                    padding: '1vw',
                }}
            >
                <CardHeader title={`Bienvenido, ${identityData?.fullName ?? "Usuario"}`} />
                <Functions />
                {permissions === 'admin' && // Solo mostrar para admin
                    <CardContent>
                        {/* Sección de estadísticas médicas */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h5">
                                    Estadísticas Médicas
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>

                        {/* Sección de estadísticas urbanas */}
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h5">
                                    Estadísticas Urbanas
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            </AccordionDetails>
                        </Accordion>
                    </CardContent>
                } 
            </Card>
        )
    }
};
