import { Box, Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import WarningIcon from '@mui/icons-material/Warning';
// Gráficas
import { BarChart, PieChart, LineChart, RadarChart } from '@mui/x-charts';

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
    // Obtener el número de reportes médicos
    const { data: reportesMedicos, isLoading } = useGetList('reportes_medicos');
    const numeroTraslados = reportesMedicos?.length || 0;

    // Obtener edad promedio de pacientes atendidos
    const edades = reportesMedicos?.map((reporte: any) => reporte.paciente.edad) || [];
    let edadPromedio;
    if (edades.length !== 0) {
        // .reduce suma todos los elementos de edades
        edadPromedio = Math.round(edades.reduce((a: number, b: number) => a + b, 0) / edades.length)
    } else edadPromedio = 0;

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
                    titulo="Traslados Realizados"
                    valor={numeroTraslados}
                    icono={<LocalHospitalIcon />}
                />
                <RecuadroDatos
                    titulo="Edad Promedio Pacientes"
                    valor={edadPromedio}
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

// Gráfica de pie: Incidentes por sexo
const IncidentesPorSexo = () => {
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
                Incidentes por sexo
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
            <IncidentesPorSexo />
            <ReportesPorOperador />
            <LugarOcurrencia />
        </Box>
    </Box>
);