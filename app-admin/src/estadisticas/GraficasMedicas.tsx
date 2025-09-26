import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { useGetList } from 'react-admin';
// Íconos
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import WarningIcon from '@mui/icons-material/Warning';

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
            borderColor: 'primary.main',
            borderRadius: 3,
            transition: '0.2s',
            maxHeight: 120,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            '&:hover': {
                borderColor: 'secondary.dark',
            }
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

    if (isLoading) {
        return (
            <Typography>Cargando...</Typography>
        );
    }

    return (
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
    );
};