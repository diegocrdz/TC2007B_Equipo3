/*
Gráficas Médicas
Se generan gráficas y estadísticas basadas en los datos de reportes y notas médicas.
Fecha: 11/08/2025
*/

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import WarningIcon from '@mui/icons-material/Warning';
// Gráficas
import { BarChart, PieChart, LineChart, RadarChart } from '@mui/x-charts';
// Utilidades
import { Filtros, RecuadroDatos, estilosContenedorGrafica, estilosGrafica, colores } from './Utils';

const DatosIniciales = () => {
    // Obtener el número de reportes médicos registrados
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');

    const numeroTraslados = reportesMedicos?.length || 0;

    // Obtener el número de notas médicas registradas
    const { data: notasMedicas } = useGetList('notas_medicas');
    const numeroNotas = notasMedicas?.length || 0;

    // Calcular casos de emergencia
    const casosEmergencia = reportesMedicos?.filter((reporte: any) =>
        // Verificar si existe el campo
        reporte.evalSec && reporte.evalSec.prioridad === 'Negra'
    ).length || 0;

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
                    valor={numeroTraslados}
                    icono={<LocalHospitalIcon />}
                    graficas="medicas"
                />
                <RecuadroDatos
                    titulo="Notas registradas"
                    valor={numeroNotas}
                    icono={<PermContactCalendarIcon />}
                    graficas="medicas"
                />
                <RecuadroDatos
                    titulo="Casos de prioridad Negra"
                    valor={casosEmergencia}
                    icono={<WarningIcon />}
                    graficas="medicas"
                />
            </Box>
        </Box>
    );
};

// Gráfica de barras: Traslados por turno
const ReportesPorTurno = ({ fechaInicio, fechaFin }: {
    fechaInicio?: string,
    fechaFin?: string,
}) => {
    // Obtener reportes médicos y usuarios
    const { data: reportesMedicos, isLoading: isLoadingReportes } = useGetList('reportes_medicos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesMedicos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Encontrar el turno de cada reporte
    const turnosCount: { [key: string]: number } = {};

    // Para cada reporte, contar el turno
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const turno = reporte.turno || 'No especificado';
            if (!turnosCount[turno]) {
                turnosCount[turno] = 0;
            }
            turnosCount[turno] += 1;
        });
    }

    if (isLoadingReportes) {
        return <Typography>Cargando...</Typography>;
    }

    // Datos para la gráfica
    const turnos = Object.keys(turnosCount).sort();
    const datos = turnos.map(turno => turnosCount[turno]);
    const etiquetas = turnos.map(turno => `Turno ${turno}`);

    return (
        <Box sx={estilosContenedorGrafica("medicas")}>
            <Typography variant="h6" gutterBottom>
                Reportes por turno
            </Typography>
            <BarChart showToolbar
                sx={estilosGrafica()}
                colors={colores}
                series={[
                    { data: datos, label: 'Traslados' },
                ]}
                xAxis={[{ data: etiquetas, scaleType: 'band' }]}
            />
        </Box>
    );
}

// Gráfica de pie: Incidentes por género
const IncidentesPorGenero = ({ fechaInicio, fechaFin }: {
    fechaInicio?: string,
    fechaFin?: string,
}) => {
    // Obtener reportes médicos
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesMedicos || [];

    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar incidentes por género
    const generoCount: { [key: string]: number } = {};

    // Para cada reporte, contar el género del paciente
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const genero = reporte.paciente && reporte.paciente.sexo ? reporte.paciente.sexo : 'No especificado';
            if (!generoCount[genero]) {
                generoCount[genero] = 0;
            }
            generoCount[genero] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const generos = Object.keys(generoCount);
    const datos = generos.map((genero, idx) => ({
        value: generoCount[genero],
        label: genero,
        id: idx,
    }));

    return (
        <Box sx={estilosContenedorGrafica("medicas")}>
            <Typography variant="h6">
                Incidentes por género
            </Typography>
            <PieChart
                sx={estilosGrafica()}
                colors={colores}
                series={[{
                    data: datos,
                }]}
            />
        </Box>
    );
};

// Reportes generados por operador
const ReportesPorOperador = ({ fechaInicio, fechaFin }: {
    fechaInicio?: string,
    fechaFin?: string,
}) => {
    // Obtener reportes médicos y usuarios
    const { data: reportesMedicos, isLoading: isLoadingReportes } = useGetList('reportes_medicos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesMedicos || [];
    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Encontrar el usuario de cada reporte
    const reportesCount: { [key: string]: number } = {};

    // Para cada reporte, contar el usuario
    reportesFiltrados.forEach((reporte: any) => {
        const usuario = reporte.personalACargo || 'No especificado';
        if (!reportesCount[usuario]) {
            reportesCount[usuario] = 0;
        }
        reportesCount[usuario] += 1;
    });

    if (isLoadingReportes) {
        return <Typography>Cargando...</Typography>;
    }

    // Datos para la gráfica - ya no necesitas mapear por ID
    const sortedUsuarios = Object.keys(reportesCount)
        .sort((a, b) => reportesCount[b] - reportesCount[a])
        .slice(0, 10); // Top 10
    const datos = sortedUsuarios.map(usuarioNombre => reportesCount[usuarioNombre]);
    const etiquetas = sortedUsuarios; // Usar directamente los nombres de usuario

    return (
        <Box sx={estilosContenedorGrafica("medicas")}>
            <Typography variant="h6" gutterBottom>
                Operadores con más reportes
            </Typography>
            <LineChart
                showToolbar
                sx={estilosGrafica()}
                colors={[colores[1]]}
                series={[
                    { data: datos, label: 'Reportes', id: 'reportesId' },
                ]}
                xAxis={[{ data: etiquetas, scaleType: 'band' }]}
                yAxis={[{ width: 50 }]}
            />
        </Box>
    );
};

// Radar: Gráfica de lugar de ocurrencia
const LugarOcurrencia = ({ fechaInicio, fechaFin }: {
    fechaInicio?: string,
    fechaFin?: string,
}) => {
    // Obtener reportes médicos
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');

    // Filtrar reportes por fechas
    let reportesFiltrados = reportesMedicos || [];

    if (fechaInicio && fechaFin) {
        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);
        reportesFiltrados = reportesFiltrados.filter((reporte: any) => {
            const fechaReporte = new Date(reporte.fecha);
            return fechaReporte >= inicio && fechaReporte <= fin;
        });
    }

    // Contar incidentes por lugar de ocurrencia
    const lugarCount: { [key: string]: number } = {};

    // Para cada reporte, contar el lugar de ocurrencia
    if (reportesFiltrados) {
        reportesFiltrados.forEach((reporte: any) => {
            const lugar = reporte.lugarOcurrencia || 'No especificado';
            if (!lugarCount[lugar]) {
                lugarCount[lugar] = 0;
            }
            lugarCount[lugar] += 1;
        });
    }

    if (isLoading) return <Typography>Cargando...</Typography>;

    // Datos para la gráfica
    const lugares = Object.keys(lugarCount);
    const datos = lugares.map(lugar => lugarCount[lugar]);

    // Si hay menos de 3 lugares, usar un gráfico de barras
    if (lugares.length < 2) {
        return (
            <Box sx={estilosContenedorGrafica("medicas")}>
                <Typography variant="h6">
                    Incidentes por lugar de ocurrencia
                </Typography>
                <BarChart
                    sx={estilosGrafica()}
                    colors={[colores[2]]}
                    series={[{
                        data: datos,
                        label: 'Incidentes',
                    }]}
                    xAxis={[{ data: lugares, scaleType: 'band' }]}
                />
            </Box>
        );
    } else {
        return (
            <Box sx={estilosContenedorGrafica("medicas")}>
                <Typography variant="h6">
                    Incidentes por lugar de ocurrencia
                </Typography>
                <RadarChart
                    sx={estilosGrafica()}
                    colors={[colores[2]]}
                    series={[{
                        data: datos,
                        label: 'Incidentes',
                    }]}
                    radar={{
                        max: Math.max(...datos) + 1, // Ajustar tamaño máximo a datos
                        metrics: lugares,
                    }}
                />
            </Box>
        );
    }
}

export const GraficasMedicas = () => {
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
                <ReportesPorTurno fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <IncidentesPorGenero fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <ReportesPorOperador fechaInicio={fechaInicio} fechaFin={fechaFin} />
                <LugarOcurrencia fechaInicio={fechaInicio} fechaFin={fechaFin} />
            </Box>
        </Box>
    );
};