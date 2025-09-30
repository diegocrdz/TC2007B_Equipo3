import { Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos para reportes registrados, notas registradas y tiempo de traslado promedio
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Gráficas
import { BarChart, LineChart, RadarChart } from '@mui/x-charts';

// Componente reutilizable para mostrar un recuadro con datos
const RecuadroDatos = ({ titulo, valor, icono } : { titulo: string, valor: number, icono: React.ReactNode }) => (
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
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {icono}
            <Typography variant="subtitle2" color="primary.main" fontWeight="bold" sx={{ marginLeft: 1 }}>
                {titulo}
            </Typography>
        </Box>
        <Typography
            variant="subtitle1"
            color="primary.main"
            fontWeight="bold"
        >
            {valor}
        </Typography>
    </Box>
);

export const DatosIniciales = () => {
    // Obtener el número de reportes urbanos registrados
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    const numeroReportes = reportesUrbanos?.length || 0;

    // Obtener el número de notas urbanas registradas
    const { data: notasMedicas } = useGetList('notas_urbanas');
    const numeroNotas = notasMedicas?.length || 0;

    // Calcular el tiempo de traslado promedio
    const tiempoPromedio = reportesUrbanos?.reduce((acc: number, reporte: any) => 
        acc + (reporte.tiempoTraslado || 0), 0
    ) / (numeroReportes || 1);

    if (isLoading) return <Typography>Cargando...</Typography>;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: '2em' }}>
            <Typography variant="h5">
                Métricas principales
            </Typography>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        // Tamaños de pantalla
                        xs: '1fr',
                        sm: '1fr 1fr',
                        md: '1fr 1fr 1fr'
                    },
                    gap: 4,
                }}
            >
                <RecuadroDatos
                    titulo="Reportes registrados"
                    valor={numeroReportes}
                    icono={<EmergencyIcon />}
                />
                <RecuadroDatos
                    titulo="Notas registradas"
                    valor={numeroNotas}
                    icono={<StickyNote2Icon />}
                />
                <RecuadroDatos
                    titulo="Tiempo de traslado promedio"
                    valor={tiempoPromedio}
                    icono={<AccessTimeIcon />}
                />
            </Box>
        </Box>
    );
};

// Estilos comunes para los contenedores de gráficas
const estilosContenedorGrafica = () => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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

// Estilos para las gráficas
const estilosGrafica = () => ({
    height: '80%',
    width: '100%',
});

// Colores para las gráficas
const colores = [
    '#51ba6fff', '#ca8282ff', '#ffc658',
    '#9c6d55ff', '#8dade1ff', '#a4de6c',
    '#d0ed57ff', '#8884d8ff', '#82ca9dff',
    '#ffc658ff', '#ff8042ff', '#8dd1e1ff'
];

// Radar: Gráfica de modo de activación de servicio
const ModoActivacion = () => {
    // Obtener reportes médicos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    // Contar modos de activación
    const modoCount: { [key: string]: number } = {};

    // Para cada reporte, contar el modo de activación
    if (reportesUrbanos) {
        reportesUrbanos.forEach((reporte: any) => {
            const modo = reporte.modoActivacion || 'No especificado';
            if (!modoCount[modo]) {
                modoCount[modo] = 0;
            }
            modoCount[modo] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const modos = Object.keys(modoCount);
    const datos = modos.map(modo => modoCount[modo]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Incidentes por modo de activación
            </Typography>
            <RadarChart
                sx={estilosGrafica()}
                colors={[colores[0]]}
                series={[{
                    data: datos,
                    label: 'Incidentes',
                }]}
                radar={{
                    max: 10,
                    metrics: modos,
                }}
            />
        </Box>
    );
}

// Barra: Gráfica de reportes por prioridad de emergencia (BAJA/MEDIA/ALTA)
const PrioridadEmergencia = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    // Contar prioridades
    const prioridadCount: { [key: string]: number } = { 'BAJA': 0, 'MEDIA': 0, 'ALTA': 0 };

    // Para cada reporte, contar la prioridad
    if (reportesUrbanos) {
        reportesUrbanos.forEach((reporte: any) => {
            const prioridad = reporte.prioridad || 'BAJA';
            if (!prioridadCount[prioridad]) {
                prioridadCount[prioridad] = 0;
            }
            prioridadCount[prioridad] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const prioridades = Object.keys(prioridadCount);
    const datos = prioridades.map(prioridad => prioridadCount[prioridad]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Incidentes por prioridad de emergencia
            </Typography>
            <BarChart
                sx={estilosGrafica()}
                colors={[colores[1]]}
                series={[{
                    data: datos,
                    label: 'Incidentes',
                }]}
                xAxis={[
                    {
                        data: prioridades,
                        label: 'Prioridad',
                    }
                ]}
                yAxis={[
                    {
                        label: 'Número de incidentes',
                    }
                ]}
            />
        </Box>
    );
}

// Línea: Gráfica de alcaldías con más emergencias
const AlcaldiasMasEmergencias = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    // Contar alcaldías
    const alcaldiaCount: { [key: string]: number } = {};

    // Para cada reporte, contar la alcaldía
    if (reportesUrbanos) {
        reportesUrbanos.forEach((reporte: any) => {
            const alcaldia = reporte.alcaldia || 'No especificado';
            if (!alcaldiaCount[alcaldia]) {
                alcaldiaCount[alcaldia] = 0;
            }
            alcaldiaCount[alcaldia] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const alcaldias = Object.keys(alcaldiaCount);
    const datos = alcaldias.map(alcaldia => alcaldiaCount[alcaldia]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Alcaldías con más emergencias
            </Typography>
            <LineChart
                showToolbar
                sx={estilosGrafica()}
                colors={[colores[2]]}
                series={[{
                    data: datos,
                    label: 'Incidentes',
                }]}
                xAxis={[{ data: alcaldias, scaleType: 'band' }]}
                yAxis={[{ width: 50 }]}
            />
        </Box>
    );
}

// Línea: Gráfica de colonias con más emergencias
const ColoniasMasEmergencias = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    // Contar colonias
    const coloniaCount: { [key: string]: number } = {};

    // Para cada reporte, contar la colonia
    if (reportesUrbanos) {
        reportesUrbanos.forEach((reporte: any) => {
            const colonia = reporte.colonia || 'No especificado';
            if (!coloniaCount[colonia]) {
                coloniaCount[colonia] = 0;
            }
            coloniaCount[colonia] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const colonias = Object.keys(coloniaCount);
    const datos = colonias.map(colonia => coloniaCount[colonia]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Colonias con más emergencias
            </Typography>
            <LineChart
                showToolbar
                sx={estilosGrafica()}
                colors={[colores[3]]}
                series={[{
                    data: datos,
                    label: 'Incidentes',
                }]}
                xAxis={[{ data: colonias, scaleType: 'band' }]}
                yAxis={[{ width: 50 }]}
            />
        </Box>
    );
}

// Barra: Gráfica de tiempo promedio de respuesta por tipo de incidente
const TiempoRespuestaPorTipo = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    // Acumular tiempos por tipo de incidente
    const tipoTiempo: { [key: string]: { total: number, count: number } } = {};

    // Para cada reporte, acumular el tiempo por tipo de incidente
    if (reportesUrbanos) {
        reportesUrbanos.forEach((reporte: any) => {
            const tipo = reporte.tipoIncidente || 'No especificado';
            const tiempo = reporte.tiempoRespuesta || 0;
            if (!tipoTiempo[tipo]) {
                tipoTiempo[tipo] = { total: 0, count: 0 };
            }
            tipoTiempo[tipo].total += tiempo;
            tipoTiempo[tipo].count += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Calcular promedios
    const tipos = Object.keys(tipoTiempo);
    const promedios = tipos.map(tipo => 
        tipoTiempo[tipo].count ? tipoTiempo[tipo].total / tipoTiempo[tipo].count : 0
    );

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Tiempo promedio de respuesta por tipo de incidente
            </Typography>
            <BarChart
                sx={estilosGrafica()}
                colors={[colores[4]]}
                series={[{
                    data: promedios,
                    label: 'Tiempo promedio (minutos)',
                }]}
                xAxis={[
                    {
                        data: tipos,
                        label: 'Tipo de incidente',
                    }
                ]}
                yAxis={[
                    {
                        label: 'Tiempo promedio (minutos)',
                    }
                ]}
            />
        </Box>
    );
}

export const GraficasUrbanas = () => (
    <Box>
        <DatosIniciales />
        <Typography variant="h5" sx={{ marginBottom: '1em' }}>
            Gráficas
        </Typography>
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: {
                    md: '1fr',
                    lg: '1fr 1fr',
                },
                gap: 4,
            }}
        >
            <ModoActivacion />
            <PrioridadEmergencia />
            <AlcaldiasMasEmergencias />
            <ColoniasMasEmergencias />
            <TiempoRespuestaPorTipo />
        </Box>
    </Box>
);