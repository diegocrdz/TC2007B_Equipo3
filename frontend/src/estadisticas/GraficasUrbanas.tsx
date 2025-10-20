/*
Gráficas Urbanas
Se generan gráficas y estadísticas basadas en los datos de reportes urbanos y notas urbanas.
Fecha: 11/08/2025
*/

import { Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos para reportes registrados, notas registradas y tiempo de traslado promedio
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Gráficas
import { BarChart, LineChart, RadarChart } from '@mui/x-charts';
// Utilidades
import { Filtros, RecuadroDatos, estilosContenedorGraficaUrbana as estilosContenedorGrafica, estilosGrafica, coloresUrbanos as colores } from './Utils';

export const DatosIniciales = () => {
    // Obtener el número de reportes urbanos registrados
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    const numeroReportes = reportesUrbanos?.length || 0;

    // Obtener el número de notas urbanas registradas
    const { data: notasMedicas } = useGetList('notas_urbanas');
    const numeroNotas = notasMedicas?.length || 0;

    // Calcular el tiempo de traslado promedio
    const totalTraslado = reportesUrbanos?.reduce(
        (acc: number, r: any) => acc + (r?.tiempoTrasladoMinutos ?? 0), 0
    ) ?? 0;
    const tiempoPromedio = numeroReportes ? +(totalTraslado / numeroReportes).toFixed(1) : 0;

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

// Radar: Gráfica de modo de activación de servicio
const ModoActivacion = () => {
    // Obtener reportes médicos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Para cada reporte, contar el modo de activación
    const modoCount: Record<string, number> = {};
    (reportesUrbanos ?? []).forEach((r: any) => {
        const modo = r?.modoActivacion || 'No especificado';
        modoCount[modo] = (modoCount[modo] ?? 0) + 1;
    });

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

    // Para cada reporte, contar la prioridad
    const gravedadCount: Record<string, number> = {};
    (reportesUrbanos ?? []).forEach((r: any) => {
        const g = r?.gravedad || 'No especificada';
        gravedadCount[g] = (gravedadCount[g] ?? 0) + 1;
    });

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const gravedades = Object.keys(gravedadCount);
    const datos = gravedades.map(g => gravedadCount[g]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Incidentes por gravedad de emergencia
            </Typography>
            <BarChart
                sx={estilosGrafica()}
                colors={[colores[1]]}
                series={[
                    { data: datos, label: 'Incidentes' },
                ]}
                xAxis={[
                    { data: gravedades, scaleType: 'band', label: 'Gravedad' },
                ]}
                yAxis={[
                    { label: 'Número de incidentes' },
                ]}
            />
        </Box>
    );
}

// Línea: Gráfica de alcaldías con más emergencias
const AlcaldiasMasEmergencias = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Para cada reporte, contar la alcaldía
    const alcaldiaCount: Record<string, number> = {};
    (reportesUrbanos ?? []).forEach((r: any) => {
        const alcaldia = r?.ubicacion?.municipio || 'No especificado';
        alcaldiaCount[alcaldia] = (alcaldiaCount[alcaldia] ?? 0) + 1;
    });

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const alcaldias = Object.keys(alcaldiaCount);
    const datos = alcaldias.map(a => alcaldiaCount[a]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Alcaldías con más emergencias
            </Typography>
            <LineChart
                showToolbar
                sx={estilosGrafica()}
                colors={[colores[2]]}
                series={[
                    { data: datos, label: 'Incidentes' },
                ]}
                xAxis={[{ data: alcaldias.map(t => t.replace(/\s+/g, '\n')), scaleType: 'band', label: 'Alcaldías' }]}
                yAxis={[{ width: 50, label: 'Número de incidentes' }]}
            />
        </Box>
    );
}

// Línea: Gráfica de colonias con más emergencias
const ColoniasMasEmergencias = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Para cada reporte, contar la colonia
    const coloniaCount: Record<string, number> = {};
    (reportesUrbanos ?? []).forEach((r: any) => {
        const col = r?.ubicacion?.colonia || 'No especificado';
        coloniaCount[col] = (coloniaCount[col] ?? 0) + 1;
    });

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const colonias = Object.keys(coloniaCount);
    const datos = colonias.map(c => coloniaCount[c]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Colonias con más emergencias
            </Typography>
            <LineChart
                showToolbar
                sx={estilosGrafica()}
                colors={[colores[3]]}
                series={[
                    { data: datos, label: 'Incidentes' },
                ]}
                xAxis={[{ data: colonias.map(t => t.replace(/\s+/g, '\n')), scaleType: 'band', label: 'Colonias' }]}
                yAxis={[{ width: 50, label: 'Número de incidentes' }]}
            />
        </Box>
    );
}

// Barra: Gráfica de tiempo promedio de respuesta por tipo de incidente
const TiempoRespuestaPorTipo = () => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Para cada reporte, acumular el tiempo por tipo de incidente
    const tipoTiempo: Record<string, { total: number; count: number }> = {};
    (reportesUrbanos ?? []).forEach((r: any) => {
        const tipo = r?.tipoServicio || 'No especificado';
        const t = r?.tiempoTrasladoMinutos ?? 0;

        if (!tipoTiempo[tipo]) tipoTiempo[tipo] = { total: 0, count: 0 };
        tipoTiempo[tipo].total += t;
        tipoTiempo[tipo].count += 1;
    });

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Calcular promedios
    const tipos = Object.keys(tipoTiempo);
    const promedios = tipos.map(
        (tipo) => +(tipoTiempo[tipo].total / (tipoTiempo[tipo].count || 1)).toFixed(1)
    );
    
    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Tiempo promedio de respuesta por tipo de incidente
            </Typography>
            <BarChart
                sx={estilosGrafica()}
                colors={[colores[4]]}
                series={[{ data: promedios, label: 'Promedio (minutos)' }]}
                xAxis={[{ data: tipos.map(t => t.replace(/\s+/g, '\n')), scaleType: 'band', label: 'Tipo de servicio'}]}
                yAxis={[{ label: 'Minutos promedio' }]}
            />
        </Box>
    );
}

export const GraficasUrbanas = () => (
    <Box>
        <DatosIniciales />
        <Filtros />
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