/*
Gráficas Médicas
Se generan gráficas y estadísticas basadas en los datos de reportes y notas médicas.
Fecha: 11/08/2025
*/

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

    // Calcular casos de emergencia (prioridad "Alta")
    const casosEmergencia = reportesMedicos?.filter((reporte: any) => 
        reporte.evalSec.prioridad === "Alta"
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
                />
                <RecuadroDatos
                    titulo="Notas registradas"
                    valor={numeroNotas}
                    icono={<PermContactCalendarIcon />}
                />
                <RecuadroDatos
                    titulo="Casos de prioridad Alta"
                    valor={casosEmergencia}
                    icono={<WarningIcon />}
                />
            </Box>
        </Box>
    );
};

// Gráfica de barras: Traslados por turno
const TrasladosPorTurno = () => {
    // Obtener reportes médicos y usuarios
    const { data: reportesMedicos, isLoading: isLoadingReportes } = useGetList('reportes_medicos');
    const { data: usuarios, isLoading: isLoadingUsuarios } = useGetList('usuarios');

    // Encontrar el turno de cada usuario y contar los traslados por turno
    const turnosCount: { [key: number]: number } = {};

    // Asociar cada reporte con su usuario
    if (reportesMedicos && usuarios) {
        // Crear un mapa de usuarios para acceso rápido
        const usuariosMap = usuarios.reduce((map: any, usuario: any) => {
            map[usuario.id] = usuario;
            return map;
        }, {});

        // Para cada reporte, encontrar el usuario y su turno
        reportesMedicos.forEach((reporte: any) => {
            const usuarioId = reporte.usuarioId;
            const usuario = usuariosMap[usuarioId];
            
            if (usuario && usuario.turno) {
                const turno = usuario.turno;
                if (!turnosCount[turno]) {
                    turnosCount[turno] = 0;
                }
                turnosCount[turno] += 1;
            }
        });
    }
    
    if (isLoadingReportes || isLoadingUsuarios) {
        return <Typography>Cargando...</Typography>;
    }

    // Datos para la gráfica
    const turnos = Object.keys(turnosCount).sort();
    const datos = turnos.map(turno => turnosCount[parseInt(turno)]);
    const etiquetas = turnos.map(turno => `Turno ${turno}`);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6" gutterBottom>
                Traslados por turno
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
const IncidentesPorGenero = () => {
    // Obtener reportes médicos
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');

    // Contar incidentes por género
    const generoCount: { [key: string]: number } = {};

    // Para cada reporte, contar el género del paciente
    if (reportesMedicos) {
        reportesMedicos.forEach((reporte: any) => {
            const genero = reporte.paciente.sexo || 'No especificado';
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
        <Box sx={estilosContenedorGrafica()}>
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

// Reportes generados por operador (Top 10)
const ReportesPorOperador = () => {
    // Obtener reportes médicos y usuarios
    const { data: reportesMedicos, isLoading: isLoadingReportes } = useGetList('reportes_medicos');
    const { data: usuarios, isLoading: isLoadingUsuarios } = useGetList('usuarios');

    // Contar reportes por usuario
    const reportesCount: { [key: number]: number } = {};

    // Asociar cada reporte con su usuario
    if (reportesMedicos) {
        reportesMedicos.forEach((reporte: any) => {
            const usuarioId = reporte.usuarioId;
            if (!reportesCount[usuarioId]) {
                reportesCount[usuarioId] = 0;
            }
            reportesCount[usuarioId] += 1;
        });
    }

    if (isLoadingReportes || isLoadingUsuarios) {
        return <Typography>Cargando...</Typography>;
    }

    // Datos para la gráfica
    const usuariosMap = usuarios?.reduce((map: any, usuario: any) => {
        map[usuario.id] = usuario.usuario;
        return map;
    }, {});

    const sortedUsuarios = Object.keys(reportesCount)
        .sort((a, b) => reportesCount[parseInt(b)] - reportesCount[parseInt(a)])
        .slice(0, 10); // Top 10
    const datos = sortedUsuarios.map(usuarioId => reportesCount[parseInt(usuarioId)]);
    const etiquetas = sortedUsuarios.map(usuarioId => usuariosMap[parseInt(usuarioId)] || `ID ${usuarioId}`);

    return (
        <Box sx={estilosContenedorGrafica()}>
            <Typography variant="h6" gutterBottom>
            Reportes generados por operador (Top 10)
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
const LugarOcurrencia = () => {
    // Obtener reportes médicos
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');

    // Contar incidentes por lugar de ocurrencia
    const lugarCount: { [key: string]: number } = {};

    // Para cada reporte, contar el lugar de ocurrencia
    if (reportesMedicos) {
        reportesMedicos.forEach((reporte: any) => {
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

    return (
        <Box sx={estilosContenedorGrafica()}>
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
                    max: 10,
                    metrics: lugares,
                }}
            />
        </Box>
    );
}

export const GraficasMedicas = () => (
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
            <TrasladosPorTurno />
            <IncidentesPorGenero />
            <ReportesPorOperador />
            <LugarOcurrencia />
        </Box>
    </Box>
);