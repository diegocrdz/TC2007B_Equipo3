/*
Gráficas Urbanas
Se generan gráficas y estadísticas basadas en los datos de reportes urbanos y notas urbanas.
Fecha: 20/08/2025
*/

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos para reportes registrados, notas registradas y tiempo de traslado promedio
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
// Gráficas
import { BarChart, LineChart, RadarChart } from '@mui/x-charts';
// Utilidades
import { Filtros, RecuadroDatos, estilosContenedorGrafica, estilosGrafica, colores } from './Utils';

export const DatosIniciales = () => {
    // Obtener el número de reportes urbanos registrados
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');
    const numeroReportes = reportesUrbanos?.length || 0;

    // Obtener el número de notas urbanas registradas
    const { data: notasMedicas } = useGetList('notas_urbanas');
    const numeroNotas = notasMedicas?.length || 0;

    // Calcular el tiempo de traslado promedio
    const tiempoPromedio = reportesUrbanos?.reduce((acc: number, reporte: any) => 
        acc + (reporte.tiempoTrasladoMinutos || 0), 0
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
                    titulo="Tiempo de traslado promedio (minutos)"
                    valor={tiempoPromedio}
                    icono={<AccessTimeIcon />}
                />
            </Box>
        </Box>
    );
};

// Radar: Gráfica de modo de activación de servicio
const ModoActivacion = ({ fechaInicio, fechaFin }: {
    fechaInicio: string,
    fechaFin: string
}) => {
    // Obtener reportes médicos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesUrbanos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar modos de activación
    const modoCount: { [key: string]: number } = {};

    // Para cada reporte, contar el modo de activación
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
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

    // Si hay menos de 3 lugares, usar un gráfico de barras
    if (modos.length < 3) {
        return (
            <Box sx={estilosContenedorGrafica()}>
                <Typography variant="h6">
                    Incidentes por modo de activación
                </Typography>
                <BarChart
                    sx={estilosGrafica()}
                    colors={[colores[0]]}
                    series={[{
                        data: datos,
                        label: 'Incidentes',
                    }]}
                    xAxis={[
                        {
                            data: modos,
                            label: 'Modo de activación',
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
    } else {
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
}

// Barra: Gráfica de reportes por gravedad de emergencia (BAJA/MEDIA/ALTA)
const GravedadEmergencia = ({ fechaInicio, fechaFin }: {
    fechaInicio: string,
    fechaFin: string
}) => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesUrbanos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar gravedad
    const gravedadCont: { [key: string]: number } = {};

    // Para cada reporte, contar la prioridad
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const gravedad = reporte.gravedad || 'No especificado';
            if (!gravedadCont[gravedad]) {
                gravedadCont[gravedad] = 0;
            }
            gravedadCont[gravedad] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const gravedades = Object.keys(gravedadCont);
    const datos = gravedades.map(gravedad => gravedadCont[gravedad]);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6">
                Incidentes por gravedad de emergencia
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
                        data: gravedades,
                        label: 'Gravedad',
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
const AlcaldiasMasEmergencias = ({ fechaInicio, fechaFin }: {
    fechaInicio: string,
    fechaFin: string
}) => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesUrbanos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar alcaldías
    const alcaldiaCount: { [key: string]: number } = {};

    // Para cada reporte, contar la alcaldía
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const alcaldia = reporte.ubicacion.municipio || 'No especificado';
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
const ColoniasMasEmergencias = ({ fechaInicio, fechaFin }: {
    fechaInicio: string,
    fechaFin: string
}) => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesUrbanos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar colonias
    const coloniaCount: { [key: string]: number } = {};

    // Para cada reporte, contar la colonia
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const colonia = reporte.ubicacion.colonia || 'No especificado';
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

// Barra: Gráfica de tiempo promedio de respuesta por modo de activación
const TiempoRespuestaPorTipo = ({ fechaInicio, fechaFin }: {
    fechaInicio: string,
    fechaFin: string
}) => {
    // Obtener reportes urbanos
    const { data: reportesUrbanos, isLoading } = useGetList('reportes_urbanos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesUrbanos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Acumular tiempos pormodo de activación
    const tipoTiempo: { [key: string]: { total: number, count: number } } = {};

    // Para cada reporte, acumular el tiempo por modo de activación
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const modo = reporte.modoActivacion || 'No especificado';
            const tiempo = reporte.tiempoTrasladoMinutos || 0;
            if (!tipoTiempo[modo]) {
                tipoTiempo[modo] = { total: 0, count: 0 };
            }
            tipoTiempo[modo].total += tiempo;
            tipoTiempo[modo].count += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Calcular promedios
    const tipos = Object.keys(tipoTiempo);
    const promedios = tipos.map(modo => 
        tipoTiempo[modo].count ? tipoTiempo[modo].total / tipoTiempo[modo].count : 0
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
                        label: 'Modo de activación',
                    }
                ]}
                yAxis={[
                    {
                        label: 'Tiempo prom. (min.)',
                    }
                ]}
            />
        </Box>
    );
}

export const GraficasUrbanas = () => {
    // Fechas para los filtros
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    return (
        <Box>
            <DatosIniciales />
            <Filtros
                fechaInicio={fechaInicio}
                setFechaInicio={setFechaInicio}
                fechaFin={fechaFin}
                setFechaFin={setFechaFin}
            />
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
                <ModoActivacion fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <GravedadEmergencia fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <AlcaldiasMasEmergencias fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <ColoniasMasEmergencias fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <TiempoRespuestaPorTipo fechaInicio={fechaInicio} fechaFin={fechaFin} />
            </Box>
        </Box>
    )
};