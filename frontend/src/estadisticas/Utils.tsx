/*
Utilidades para las estadísticas médicas y urbanas
Fecha: 13/10/2025
*/

import { TextField } from '@mui/material';
import { Box, Typography } from '@mui/material';

// Estilos

// Estilos comunes para los contenedores de gráficas
export const estilosContenedorGrafica = (graficas?: string) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    justifyContent: 'center',
    gap: '1em',
    padding: '1em',
    borderRadius: '12px',
    border: '2px solid',
    borderColor: 'secondary.dark',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    background: graficas === 'medicas' ? '#aef2c141' : '#7b9fe641',
    height: '40vh',
    width: '100%',
    transition: '0.2s',

    '&:hover': {
        borderColor: 'secondary.dark',
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

// Componentes

// Componente reutilizable para mostrar un recuadro con datos
export const RecuadroDatos = ({ titulo, valor, icono, graficas }: {
    titulo: string,
    valor: string | number,
    icono: React.ReactNode,
    graficas?: string,
}) => (
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
            background: graficas === 'medicas' ? '#aef2c141' : '#7b9fe641',
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
                gap: '0.5em',
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
export const Filtros = ({fechaInicio, setFechaInicio, fechaFin, setFechaFin} : {
    fechaInicio: string,
    setFechaInicio: (fecha: string) => void,
    fechaFin: string,
    setFechaFin: (fecha: string) => void,
}) => {
    const FiltroFechas = () => {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
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
                        flexDirection: { xs: 'column', sm: 'row' },
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