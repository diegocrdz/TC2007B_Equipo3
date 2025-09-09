import { usePermissions } from "react-admin";
import { Card, CardContent, CardHeader } from "@mui/material";

import { Photos } from "./Photo";
import { Click_Example } from "./Click_Example";
import { Counter } from "./Counter";

export const Dashboard = () => {
    // Obtener los permisos del usuario
    const { isPending, permissions } = usePermissions();

    if (isPending) { // Indicador de carga
        return <div>Esperando permisos...</div>;
    } else {
        return (
            <Card>
                <CardHeader title="Inicio" />
                {permissions === 'admin' && // Administrador
                    <CardContent>
                        <h2>Portal de Administrador</h2>
                        <Photos />
                        <Click_Example />
                        <Counter />
                    </CardContent>
                } 
                {permissions === 'jefe' && // Jefe de turno
                    <CardContent>
                        <h2>Portal de Jefe de turno</h2>
                    </CardContent>
                }
                {permissions === 'paramedico' && // Paramédico
                    <CardContent>
                        <h2>Portal de Emergencias Médias</h2>
                    </CardContent>
                }
                {permissions === 'urbano' && // Emergencias Urbanas
                    <CardContent>
                        <h2>Portal de Emergencias Urbanas</h2>
                    </CardContent>
                }
                {permissions === '' && // Otros
                    <CardContent>
                        <h2>No tienes acceso a este apartado.</h2>
                    </CardContent>
                }
            </Card>
        )
    }
};
