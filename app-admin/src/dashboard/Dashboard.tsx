import { useGetIdentity, usePermissions } from "react-admin";
import { Box, Card, CardHeader } from "@mui/material";
import { Functions, AdminFunctions } from "./Functions";
import { Typography } from "@mui/material";

export const Dashboard = () => {
    // Obtener permisos e identidad de usuario
    const { isPending: isPermPending } = usePermissions();
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
                <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        backgroundColor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '8px',
                        margin: '18px 18px 0 18px',
                        gap: 2,
                        padding: 2,
                        minHeight: '80px',
                        maxHeight: '100px',
                    }}
                >
                    <CardHeader
                        title={`Bienvenido, ${identityData?.fullName ?? "Usuario"}`}
                        sx={{ color: 'text.primary', padding: 0 }}
                    />
                    <Typography variant="h6" sx={{ color: 'text.primary' }} >
                        {new Date().toLocaleDateString(
                            'es-ES', 
                            { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' }
                        )}
                    </Typography>
                </Box>
                <Functions />
                <AdminFunctions /> 
            </Card>
        )
    }
};
