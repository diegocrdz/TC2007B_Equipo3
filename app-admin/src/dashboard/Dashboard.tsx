import { useGetIdentity, usePermissions } from "react-admin";
import { Box, Card, CardHeader } from "@mui/material";
import { Functions, AdminFunctions } from "./Functions";
import { Typography } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const UsuarioBox = () => {
    // Obtener permisos e identidad de usuario
    const { data: permissionsData, isPending: isPermPending } = usePermissions();
    const { data: identityData, isPending: isIdentityPending } = useGetIdentity();

    if (isPermPending || isIdentityPending) {
        return <div>Cargando usuario...</div>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
            }}
        >
            <AccountBoxIcon sx={{ fontSize: 100, color: 'text.primary' }} />
            <Box>
                <CardHeader
                    title={`${identityData?.fullName ?? "Usuario"}`}
                    sx={{ color: 'text.primary', padding: 0 }}
                />
                <Typography variant="subtitle1" sx={{ color: 'text.disabled' }} >
                    {permissionsData?.role ? `Rol: ${permissionsData.role}` : 'Rol: N/A'}
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'text.disabled' }} >
                    {permissionsData?.turno ? `Turno: ${permissionsData.turno}` : 'Turno: N/A'}
                </Typography>
                {permissionsData?.turno && permissionsData.turno !== 'N/A' && (
                    <Typography variant="subtitle2" sx={{ color: 'text.disabled' }} >
                        Turno: {permissionsData.turno}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export const Dashboard = () => {
    return (
        <Card
            sx={{
                minHeight: '100vh',
                padding: '1vw',
                paddingBottom: '5vh',
            }}
        >
            <Box sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: {
                        xs: 'center', md: 'space-between',
                    },
                    alignItems: 'center',
                    background: '#ffffff10',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: '8px',
                    margin: '18px 18px 0 18px',
                    gap: 2,
                    padding: 2,
                    minHeight: '80px',
                }}
            >
                <UsuarioBox />
                <Typography variant="h6" sx={{ color: 'text.primary', textAlign: { xs: 'center', md: 'right' }, width: { xs: '100%', md: 'auto' } }} >
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
};
