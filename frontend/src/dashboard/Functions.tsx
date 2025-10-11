/*
Funciones rápidas y administrativas en el dashboard
Fecha: 11/08/2025
*/

import { Box, useTheme } from '@mui/material';
import { useRedirect, usePermissions } from 'react-admin';
// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';

// Funciones rápidas para cada rol
const functionData = {
    admin: [
        { title: 'Ver reportes médicos', to: '/reportes_medicos', icon: <LocalHospitalIcon fontSize="large" /> },
        { title: 'Ver reportes urbanos', to: '/reportes_urbanos', icon: <EmergencyIcon fontSize="large" /> },
        { title: 'Ver notas médicas', to: '/notas_medicas', icon: <ContentPasteIcon fontSize="large" /> },
        { title: 'Ver notas urbanas', to: '/notas_urbanas', icon: <StickyNote2Icon fontSize="large" /> },
    ],
    jefe: [
        { title: 'Ver reportes médicos', to: '/reportes_medicos', icon: <LocalHospitalIcon fontSize="large" /> },
        { title: 'Ver reportes urbanos', to: '/reportes_urbanos', icon: <EmergencyIcon fontSize="large" /> },
        { title: 'Ver notas médicas', to: '/notas_medicas', icon: <ContentPasteIcon fontSize="large" /> },
        { title: 'Ver notas urbanas', to: '/notas_urbanas', icon: <StickyNote2Icon fontSize="large" /> },
    ],
    paramedico: [
        { title: 'Crear reporte', to: '/reportes_medicos/create', icon: <AddCircleIcon fontSize="large" /> },
        { title: 'Crear nota', to: '/notas_medicas/create', icon: <NoteAddIcon fontSize="large" /> },
        { title: 'Ver mis reportes', to: '/reportes_medicos', icon: <LocalHospitalIcon fontSize="large" /> },
        { title: 'Ver mis notas', to: '/notas_medicas', icon: <StickyNote2Icon fontSize="large" /> },
    ],
    urbano: [
        { title: 'Crear reporte', to: '/reportes_urbanos/create', icon: <AddCircleIcon fontSize="large" /> },
        { title: 'Crear nota', to: '/notas_urbanas/create', icon: <NoteAddIcon fontSize="large" /> },
        { title: 'Ver mis reportes', to: '/reportes_urbanos', icon: <EmergencyIcon fontSize="large" /> },
        { title: 'Ver mis notas', to: '/notas_urbanas', icon: <StickyNote2Icon fontSize="large" /> },
    ],
};

// Funciones administrativas (solo para administrador)
const adminFunctionData = {
    admin: [
        { title: 'Ver estadísticas médicas', to: '/estadisticas_medicas', icon: <ShowChartIcon fontSize="large" /> },
        { title: 'Ver estadísticas urbanas', to: '/estadisticas_urbanas', icon: <AutoGraphIcon fontSize="large" /> },
        { title: 'Gestionar usuarios', to: '/usuarios', icon: <SupervisedUserCircleIcon fontSize="large" /> },
    ],
};

// Componente para cada función rápida
const FunctionBox = ({ title, to, idx, icon }: { title: string, to: string, idx: number, icon: any }) => {
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
                position: 'relative',
                '&:hover': {
                    backgroundColor: 'transparent',
                },
            }}
        >
            <h3>{title}</h3>
            <Box
                sx={{
                    color: 'primary.main',
                    opacity: 0.5,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                {icon}
            </Box>
        </Box>
    );
};

// Componente para funciones administrativas con colores específicos
const AdminFunctionBox = ({ title, to, idx, icon }: { title: string, to: string, idx: number, icon: any }) => {
    const redirect = useRedirect();
    const theme = useTheme();
    
    // Colores específicos para funciones administrativas
    const adminColors = {
        dark: ['#7cd393ff', '#5e9bc6ff', '#e4bca7ff'],
        light: ['#4ba061ff', '#3f6c8fff', '#874e34ff'],
    };
    
    const mode = theme.palette.mode;
    const colorArray = mode === 'dark' ? adminColors.dark : adminColors.light;
    const bgColor = colorArray[idx]; // Obtener el color basado en el índice

    return (
        <Box
            onClick={() => redirect(to)}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                border: '2px solid',
                borderColor: bgColor,
                borderRadius: 2,
                padding: 2,
                minHeight: 120,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                '&:hover': {
                    transform: 'translateY(-2px)', // Efecto de elevación
                    boxShadow: `0 8px 16px ${bgColor}`,
                },
            }}
        >
            <h3 style={{ color: bgColor, fontWeight: 'bold' }}>{title}</h3>
            <Box
                sx={{
                    color: bgColor,
                    opacity: 0.7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    width: '100%',
                }}
            >
                {icon}
            </Box>
        </Box>
    );
};

// Contenedor de funciones rápidas
export const Functions = () => {
    // Obtener los permisos del usuario
    const { isPending, permissions } = usePermissions();

    if (isPending) { // Revisar si los permisos aún se están cargando
        return <div>Esperando permisos...</div>;
    } else {
        // Obtener rol y permisos de usuario
        const role = permissions?.role as keyof typeof functionData;
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
                    {functions?.map((fn: { title: string; to: string; icon: any }, idx: number) => (
                        <FunctionBox key={idx} title={fn.title} to={fn.to} idx={idx} icon={fn.icon} />
                    ))}
                </Box>
            </Box>
        );
    }
}

// Contenedor de funciones administrativas
export const AdminFunctions = () => {
    // Obtener los permisos del usuario
    const { isPending, permissions } = usePermissions();

    if (isPending) { // Revisar si los permisos aún se están cargando
        return <div>Esperando permisos...</div>;
    }

    // Solo mostrar para admin
    if (permissions?.role !== 'admin') {
        return null;
    }

    const role = permissions.role as keyof typeof adminFunctionData;
    const adminFunctions = adminFunctionData[role];

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                margin: '0 18px',
            }}
        >
            <h2>Opciones de administración</h2>
            <Box
                sx={{
                    display: 'grid',
                    // Columnas para diferentes tamaños de pantalla
                    gridTemplateColumns: {
                        xs: 'repeat(1, 1fr)', // Muy pequeña
                        sm: 'repeat(1, 1fr)', // Pequeña
                        md: 'repeat(3, 1fr)', // Mediana
                        lg: 'repeat(3, 1fr)', // Grande
                    },
                    gap: '20px',
                }}
            >
                {adminFunctions?.map((fn: { title: string; to: string; icon: any }, idx: number) => (
                    <AdminFunctionBox key={`admin-${idx}`} title={fn.title} to={fn.to} idx={idx} icon={fn.icon} />
                ))}
            </Box>
        </Box>
    );
};