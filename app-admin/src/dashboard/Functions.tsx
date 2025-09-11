import { Box, useTheme } from '@mui/material';
import { lightBlue, orange } from '@mui/material/colors';
import { useRedirect, usePermissions } from 'react-admin';

// Funciones rápidas para cada rol
const functionData = {
    admin: [
        { title: 'Ver reportes médicos', to: '/reportes_medicos' },
        { title: 'Ver reportes urbanos', to: '/reportes_urbanos' },
        { title: 'Ver notas médicas', to: '/notas_medicas' },
        { title: 'Ver notas urbanas', to: '/notas_urbanas' },
    ],
    jefe: [
        { title: 'Ver reportes médicos', to: '/reportes_medicos' },
        { title: 'Ver reportes urbanos', to: '/reportes_urbanos' },
        { title: 'Ver notas médicas', to: '/notas_medicas' },
        { title: 'Ver notas urbanas', to: '/notas_urbanas' },
    ],
    paramedico: [
        { title: 'Crear reporte', to: '/reportes_medicos/create' },
        { title: 'Crear nota', to: '/reportes_medicos/create' },
        { title: 'Ver mis reportes', to: '/reportes_medicos' },
        { title: 'Ver mis notas', to: '/notas_medicas' },
    ],
    urbano: [
        { title: 'Crear reporte', to: '/reportes_urbanos/create' },
        { title: 'Crear nota', to: '/notas_urbanas/create' },
        { title: 'Ver mis reportes', to: '/reportes_urbanos' },
        { title: 'Ver mis notas', to: '/notas_urbanas' },
    ],
};

// Componente para cada función rápida
const Function_Box = ({ title, to, idx }: { title: string, to: string, idx: number }) => {
    const redirect = useRedirect();
    const theme = useTheme();
    // Colores para los cuadros
    const boxColors = {
        dark: ['#215f23ff', '#975e20ff', '#30718fff', '#27326cff'],
        light: ['#9cd39eff', '#ebccabff', '#a7d1e4ff', '#b9c0e4ff']
    };
    const mode = theme.palette.mode; // Obtener el tema de la app
    const colorArray = mode === 'dark' ? boxColors.dark : boxColors.light; // Seleccionar colores basados en el tema
    const bgColor = colorArray[idx]; // Obtener el color basado en el índice

    return (
        <Box
            onClick={() => redirect(to)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                padding: 2,
                minHeight: 120,
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                backgroundColor: bgColor,
                '&:hover': {
                    backgroundColor: 'action.hover',
                },
            }}
        >
            <h3>{title}</h3>
        </Box>
    );
};

// Contenedor de funciones rápidas
export const Functions = () => {
    // Obtener los permisos del usuario
    const { isPending, permissions } = usePermissions();

    if (isPending) { // Check if permissions are still loading
        return <div>Esperando permisos...</div>;
    } else {
        // Obtener rol y permisos de usuario
        const role = permissions as keyof typeof functionData;
        const functions = functionData[role];

        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '0 18px',
                }}
            >
                <h2>Funciones rápidas</h2>
                <Box
                    sx={{
                        display: 'grid',
                        // Columnas para diferentes tamaños de pantalla
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)', // Muy pequeña
                            sm: 'repeat(2, 1fr)', // Pequeña
                            md: 'repeat(4, 1fr)', // Mediana
                            lg: 'repeat(4, 1fr)', // Grande
                        },
                        gap: '20px',
                    }}
                >
                    {functions.map((fn: { title: string; to: string }, idx: number) => (
                        <Function_Box key={idx} title={fn.title} to={fn.to} idx={idx} />
                    ))}
                </Box>
            </Box>
        );
    }
}