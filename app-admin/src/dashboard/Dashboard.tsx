import { useGetIdentity, usePermissions } from "react-admin";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Functions } from "./Functions";

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
                        <h2>Portal de Administrador</h2>
                    </CardContent>
                } 
            </Card>
        )
    }
};
