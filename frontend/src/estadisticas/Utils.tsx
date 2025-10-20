/*
Utilidades para las estadísticas médicas y urbanas
Fecha: 13/10/2025
*/

import { TextField } from '@mui/material';
import { useState } from 'react';
import { Box, Typography } from '@mui/material';

// Estilos

// Estilos comunes para los contenedores de gráficas
export const estilosContenedorGrafica = () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    gap: '1em',
    padding: '1em',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(42, 104, 70, 0.1)',
    border: '2px solid',
    borderColor: 'primary.main',
    background: '#aee9be44',
    height: '40vh',
    width: '100%',
    transition: '0.2s',

    '&:hover': {
        borderColor: 'secondary.dark',
    }
});

export const estilosContenedorGraficaUrbana = () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    gap: '1em',
    padding: '1em',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(30, 60, 130, 0.2)',
    border: '2px solid',
    borderColor: '#1976d2',
    background: '#a3d5ff44',
    height: '40vh',
    width: '100%',
    transition: '0.2s',

    '&:hover': {
        borderColor: '#0d47a1',
    }
});

// Estilos para las gráficas
export const estilosGrafica = () => ({
    height: '80%',
    width: '100%',
});

// Colores para las gráficas
export const colores = [
    '#51ba6fff', '#ca8282ff', '#ffc658',
    '#9c6d55ff', '#8dade1ff', '#a4de6c',
    '#d0ed57ff', '#8884d8ff', '#82ca9dff',
    '#ffc658ff', '#ff8042ff', '#8dd1e1ff'
];

// Paleta azul para urbanas
export const coloresUrbanos = [
    '#2196f3ff', '#64b5f6ff', '#42a5f5ff',
    '#1e88e5ff', '#1565c0ff', '#90caf9ff',
    '#1976d2ff', '#0d47a1ff', '#82b1ffff',
];

// Componentes

// Componente reutilizable para mostrar un recuadro con datos
export const RecuadroDatos = ({ titulo, valor, icono } : { titulo: string, valor: number, icono: React.ReactNode }) => (
    <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 3,
            border: '2px solid',
            borderColor: 'secondary.dark',
            borderRadius: 3,
            transition: '0.2s',
            maxHeight: 120,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            background: '#ffffff10',
        }}
    >
        <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight="bold"
            fontSize="2em"
        >
            {valor}
        </Typography>
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {icono}
            <Typography variant="subtitle2" color="primary.main" fontWeight="bold" fontSize="0.8em" >
                {titulo}
            </Typography>
        </Box>
    </Box>
);

// Componente para los filtros de las gráficas
export const Filtros = () => {
    // Estados para los filtros
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    const FiltroFechas = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 3,
                    border: '2px solid',
                    borderColor: 'secondary.dark',
                    borderRadius: 3,
                    transition: '0.2s',
                    minHeight: 180,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    background: '#ffffff10',
                    gap: 2,
                }}
            >
                <Typography variant="h6" sx={{ marginBottom: 1, color: 'primary.main', fontWeight: 'bold' }}>
                    Rango de fechas
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        gap: 2,
                        width: '100%',
                    }}
                >
                    <TextField
                        type="date"
                        label="Fecha de inicio"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                        slotProps={{
                            // Establece límites para evitar fechas inválidas
                            htmlInput: {
                                max: fechaFin || undefined,
                            },
                            // Etiqueta siempre visible
                            inputLabel: {
                                shrink: true,
                            },
                        }}
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    />
                    
                    <TextField
                        type="date"
                        label="Fecha de fin"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                        slotProps={{
                            htmlInput: {
                                // Establece límites para evitar fechas inválidas
                                min: fechaInicio || undefined,
                            },
                            inputLabel: {
                                // Etiqueta siempre visible
                                shrink: true,
                            },
                        }}
                        size="small"
                        fullWidth
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            }
                        }}
                    />
                </Box>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '2em' }}>
            <Typography variant="h5">Filtros</Typography>
            <FiltroFechas />
        </Box>
    );
};