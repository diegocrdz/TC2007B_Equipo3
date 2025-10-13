/*
Recurso para Reportes Médicos
Se proporcionan operaciones CRUD (listar, crear, editar y mostrar)
Fecha: 11/08/2025
*/

// react-admin
import {
    List,
    DataTable,
    EditButton,
    Edit,
    SimpleForm,
    Datagrid,
    FunctionField,
    TextInput,
    ReferenceInput,
    Create,
    Show,
    TextField,
    useNotify,
    useRefresh,
    useRedirect,
    useCanAccess,
    TabbedForm,
    SelectInput,
    TabbedShowLayout,
    DateInput,
    TimeInput,
    NumberInput,
    ArrayInput,
    SimpleFormIterator,
    ImageInput,
    ImageField,
    ArrayField,
    SingleFieldList,
    NumberField,
} from "react-admin";
// MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// Opciones para los campos SelectInput
import { MOTIVO_CHOICES, OCURRENCIA_CHOICES, SEXO_CHOICES, PRODUCTO_CHOICES,
    AGENTE_CHOICES, TIPO_ACCIDENTE_CHOICES, IMPACTO_CHOICES,
    PARABRISAS_CHOICES, VOLANTE_CHOICES, SI_NO_CHOICES,
    CINTURON_CHOICES, DENTRO_VEHICULO_CHOICES, ATROPELLADO_CHOICES,
    ORIGEN_PROBABLE_CHOICES, NIVEL_CONSCIENCIA_CHOICES, DEGLUCION_CHOICES,
    VIA_AEREA_CHOICES, VENTILACION_CHOICES, AUSCULTACION_CHOICES,
    HEMITORAX_CHOICES, SITIO_CHOICES, PRESENCIA_PULSOS_CHOICES,
    CALIDAD_CHOICES, PIEL_CHOICES, CARACTERISTICAS_CHOICES,
    CONDICION_PACIENTE_CHOICES, PRIORIDAD_CHOICES, CONTROL_CERVICAL_CHOICES,
    ASISTENCIA_VENTILATORIA_CHOICES, VIA_VENOSAS_CHOICES,
    CONTROL_HEMORRAGIAS_CHOICES, ATENCION_BASICA_CHOICES
} from "../utils/opciones";
// Componentes personalizados
import { RowSection, ColumnSection,
    TextInputWithCounter, MyToolbar, listBoxSx, MotivoToggleInput,
    evidenceBoxSx, accordionSx, TimeGridSection, TimeInputWithIcon,
    PanelHistorialCambios, CompactoHistorialCambios, ZonasLesion,
    Glasgow
} from "../utils/componentes";
// Íconos
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CallIcon from '@mui/icons-material/Call';
import SendIcon from '@mui/icons-material/Send';
import PlaceIcon from '@mui/icons-material/Place';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AirportShuttleIcon from '@mui/icons-material/AirportShuttle';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import HomeIcon from '@mui/icons-material/Home';
import { useMediaQuery } from '@mui/material';
// Mapa
import { MapInput } from "../utils/MapInput";

// Filtros para la lista
export const RMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="usuarioId" label="Usuario" reference="usuarios">
        <SelectInput optionText={(choice) => `${choice.usuario} (${choice.rol})`} />
    </ReferenceInput>,
    <DateInput source="fecha" label="Fecha" />,
    <NumberInput source="turno" label="Turno" />,
    <TextInput source="personalACargo" label="Nombre del Personal a Cargo" />,
    <TextInput source="nombrePaciente" label="Nombre paciente" />,
];

export const RMList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <Box sx={listBoxSx}>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <LocalHospitalIcon />
                <Typography variant="h4">
                    Reportes Médicos
                </Typography>
            </Box>
            
            <List
                filters={canAccess ? RMFilters : undefined}>
                {isSmall ? (
                    <Datagrid
                        rowClick="show"
                    >
                        <FunctionField
                            label="Reportes"
                            render={(record: any) => (
                                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <Typography variant="body1" fontWeight='bold'>
                                        {`Folio: ${record.folio}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Paciente: ${record.nombrePaciente ?? '-'}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Fecha: ${record.fecha ?? '-'}`}
                                    </Typography>
                                </Box>
                            )}
                        />
                        <FunctionField
                            render={(record: any) => (
                                <EditButton
                                    record={record}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'text.disabled',
                                        backgroundColor: '#0000001b',
                                    }}
                                />
                            )}
                        />
                    </Datagrid>
                ) : (
                    <DataTable>
                        <DataTable.Col source="folio" label="Folio" />
                        <DataTable.Col source="fecha" label="Fecha" />
                        <DataTable.Col source="turno" label="Turno" />
                        <DataTable.Col source="personalACargo" label="Nombre del Personal a Cargo" />
                        <DataTable.Col source="nombrePaciente" label="Nombre paciente" />
                        <DataTable.Col source="nombreTestigo" label="Nombre testigo" />
                        <DataTable.Col source="nombreParamedico" label="Nombre paramédico" />
                        <DataTable.Col source="nombreMedico" label="Nombre médico" />
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>
                    </DataTable>
                )}
            </List>
        </Box>
    );
};

export const RMEdit = () => {
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/reportes_medicos');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} aside={isSmall ? undefined : <PanelHistorialCambios />} >
            <SimpleForm warnWhenUnsavedChanges>
                {/* Mostrar historial de cambios arriba de reporte en pantallas pequeñas */}
                {isSmall ? <CompactoHistorialCambios /> : null}
                <TextInput source="folio" label="Folio" />
                <DateInput disabled source="fecha" label="Fecha" />
                <NumberInput disabled source="turno" label="Turno" />
                <TextInput disabled source="personalACargo" label="Nombre del Personal a Cargo" />
                <TextInput disabled source="nombrePaciente" label="Nombre paciente" />
                <TextInput disabled source="nombreTestigo" label="Nombre testigo" />
                <TextInput disabled source="nombreParamedico" label="Nombre paramédico" />
                <TextInput disabled source="nombreMedico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

export const RMCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Reporte creado', { undoable: true });
        redirect('/reportes_medicos');
        refresh();
    };

    return (
        <Create sx={{ marginBottom: '5em', }} mutationOptions={{ onSuccess }} >
            <TabbedForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
                { /*------------------------------------------------------*/}
                <TabbedForm.Tab label="Datos Servicio">
                    <RowSection title="Folio y Fecha" border={true}>
                        <TextInput required source="folio" label="Folio" />
                        <DateInput required source="fecha" label="Fecha"
                            defaultValue={new Date()} // Fecha actual por defecto
                        />
                    </RowSection>
                    <RowSection title="Turno y Personal" border={true}>
                        <NumberInput required source="turno" label="Turno" />
                        <TextInput required source="personalACargo" label="Nombre del Personal a Cargo" />
                    </RowSection>
                    <TimeGridSection title="Registro de Horas">
                        <TimeInputWithIcon required source="horaLlam" label="Hora Llamada" icon={<CallIcon />} />
                        <TimeInputWithIcon required source="horaSal" label="Hora Salida" icon={<SendIcon />} />
                        <TimeInputWithIcon required source="horaLlegada" label="Hora Llegada" icon={<PlaceIcon />} />
                        <TimeInputWithIcon required source="horaTras" label="Hora Traslado" icon={<AirportShuttleIcon />} />
                        <TimeInputWithIcon required source="horaHos" label="Hora Hospital" icon={<ApartmentIcon />} />
                        <TimeInputWithIcon required source="horaSalidaHos" label="Salida Hospital" icon={<MeetingRoomIcon />} />
                        <TimeInputWithIcon required source="horaBase" label="Hora Base" icon={<HomeIcon />} />
                    </TimeGridSection>
                    <ColumnSection title="Involucrados">
                        <TextInput required source="nombrePaciente" label="Nombre paciente" />
                        <TextInput required source="nombreTestigo" label="Nombre testigo" />
                        <TextInput required source="nombreParamedico" label="Nombre paramédico" />
                        <TextInput required source="nombreMedico" label="Nombre médico" />
                    </ColumnSection>
                    <ColumnSection title="Motivo de ocurrencia">
                        <MotivoToggleInput
                            required
                            source="motivo"
                            label="Motivo"
                            choices={MOTIVO_CHOICES}
                        />
                    </ColumnSection>
                    <ColumnSection title="Ubicación">
                        <MapInput name="location" />
                        <TextInput required source="ubicacion.calle" label="Calle" />
                        <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                            <TextInput required source="ubicacion.entre" label="Entre" />
                            <TextInput required source="ubicacion.y" label="Y" />
                        </Box>
                        <TextInput required source="ubicacion.colonia" label="Colonia o Comunidad" />
                        <TextInput required source="ubicacion.municipio" label="Alcaldía o Municipio" />
                    </ColumnSection>
                    <ColumnSection title="Lugar de Ocurrencia">
                        <MotivoToggleInput
                            required
                            source="lugarOcurrencia"
                            label="Lugar de Ocurrencia"
                            choices={OCURRENCIA_CHOICES}
                        />
                        <TextInput source="lugarOcurrenciaOtro" label="Otro (especificar)" />
                    </ColumnSection>
                </TabbedForm.Tab>
                { /*------------------------------------------------------*/}
                <TabbedForm.Tab label="Control">
                    <ColumnSection title="">
                        <TextInput source="control.numAmbulancia" label="Número de ambulancia" />
                        <TextInput source="control.operador" label="Operador" />
                        <TextInput source="control.tum" label="T.U.M." />
                        <TextInput source="control.socorrista" label="Socorrista" />
                        <TextInput source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
                    </ColumnSection>
                </TabbedForm.Tab>
                { /*------------------------------------------------------*/}
                <TabbedForm.Tab label="Avanzado">
                    <Box sx={{
                        ...accordionSx,
                    }}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='subtitle1'>
                                    III Datos del Paciente
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Datos Principales">
                                    <MotivoToggleInput
                                        source="paciente.sexo"
                                        label="Sexo"
                                        choices={SEXO_CHOICES}
                                    />
                                    <NumberInput source="paciente.edad" label="Edad" />
                                </ColumnSection>
                                <ColumnSection title="Ubicación">
                                    <TextInput source="paciente.domicilio" label="Domicilio" />
                                    <TextInput source="paciente.colonia" label="Colonia o Comunidad" />
                                    <TextInput source="paciente.alcaldia" label="Alcaldía o Municipio" />
                                </ColumnSection>
                                <ColumnSection title="Detalles">
                                    <TextInput source="paciente.derechohabiente" label="Derechohabiente a" />
                                    <NumberInput source="paciente.telefono" label="Teléfono" />
                                    <TextInput source="paciente.ubicacion" label="Ocupación" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    IV Parto
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Datos de la madre">
                                    <TextInput source="parto.semanas" label="Semanas de gesta" />
                                    <TimeInput source="parto.horaContracciones" label="Hora de inicio de contracciones" />
                                    <RowSection title="" border={false}>
                                        <TextInput source="parto.frecuencia" label="Frecuencia" />
                                        <TextInput source="parto.duracion" label="Duración" />
                                    </RowSection>
                                </ColumnSection>
                                <ColumnSection title="Datos post-parto y del recién nacido">
                                    <TimeInput source="parto.horaNacimiento" label="Hora de nacimiento" />
                                    <TextInput source="parto.placenta" label="Placenta expulsada" />
                                    <MotivoToggleInput
                                        source="parto.producto"
                                        label="Producto"
                                        choices={PRODUCTO_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="parto.sexo"
                                        label="Sexo"
                                        choices={SEXO_CHOICES}
                                    />
                                </ColumnSection>
                                <ColumnSection title="Puntaje de APGAR">
                                    <NumberInput source="parto.edadGestacional" label="Edad gestacional" />
                                    <RowSection title="" border={false}>
                                        <NumberInput source="parto.apgar1min" label="1 minuto" />
                                        <NumberInput source="parto.apgar5min" label="5 minutos" />
                                        <NumberInput source="parto.apgar10min" label="10 minutos" />
                                        <NumberInput source="parto.apgar15min" label="15 minutos" />
                                        <NumberInput source="parto.apgar20min" label="20 minutos" />
                                    </RowSection>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    V Causa Traumática
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Datos del accidente">
                                    <MotivoToggleInput
                                        source="agente.causal"
                                        label="Agente Causal"
                                        choices={AGENTE_CHOICES}
                                    />
                                    <TextInput source="agente.especificar" label="Otro (Especifique)" />
                                </ColumnSection>
                                <ColumnSection title="Accidente Automovilístico">
                                    <MotivoToggleInput
                                        source="accidente.tipo"
                                        label="Tipo de accidente"
                                        choices={TIPO_ACCIDENTE_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="accidente.impacto"
                                        label="Impacto"
                                        choices={IMPACTO_CHOICES}
                                        exclusive={false}
                                    />
                                    <TextInput source="accidente.cms" label="CMS" />
                                    <MotivoToggleInput
                                        source="accidente.parabrisas"
                                        label="Parabrisas"
                                        choices={PARABRISAS_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="accidente.volante"
                                        label="Volante"
                                        choices={VOLANTE_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="accidente.bolsa"
                                        label="Bolsa de aire"
                                        choices={SI_NO_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="accidente.cinturon"
                                        label="Cinturón de seguridad"
                                        choices={CINTURON_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="accidente.dentroVehiculo"
                                        label="Dentro del vehículo"
                                        choices={DENTRO_VEHICULO_CHOICES}
                                    />
                                </ColumnSection>
                                <ColumnSection title="Atropellado">
                                    <MotivoToggleInput
                                        source="atropellado.vehiculo"
                                        label="Tipo de vehículo"
                                        choices={ATROPELLADO_CHOICES}
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VI Causa Clínica
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="">
                                    <MotivoToggleInput
                                        source="causaClinica.origenProbable"
                                        label="Origen Probable"
                                        choices={ORIGEN_PROBABLE_CHOICES}
                                    />
                                    <TextInput source="causaClinica.especifique" label="Otro (Especifique)" />
                                    <RowSection title="Frecuencia" border={false}>
                                        <TextInput source="causaClinica.primeraVez" label="1.ª vez" />
                                        <TextInput source="causaClinica.subsecuente" label="Subsecuente" />
                                    </RowSection>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VII Evaluación Inicial
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Control Cervical">
                                    <MotivoToggleInput
                                        source="evaluacionInicial.nivelConsciencia"
                                        label="Nivel de Consciencia"
                                        choices={NIVEL_CONSCIENCIA_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.deglucion"
                                        label="Deglución"
                                        choices={DEGLUCION_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.viaAerea"
                                        label="Vía Aérea"
                                        choices={VIA_AEREA_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.ventilacion"
                                        label="Ventilación"
                                        choices={VENTILACION_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.auscultacion"
                                        label="Auscultación"
                                        choices={AUSCULTACION_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.hemitorax"
                                        label="Hemitórax"
                                        choices={HEMITORAX_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.sitio"
                                        label="Sitio"
                                        choices={SITIO_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.presenciaPulsos"
                                        label="Presencia de Pulsos"
                                        choices={PRESENCIA_PULSOS_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.calidad"
                                        label="Calidad"
                                        choices={CALIDAD_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.piel"
                                        label="Piel"
                                        choices={PIEL_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evaluacionInicial.caracteristicas"
                                        label="Características"
                                        choices={CARACTERISTICAS_CHOICES}
                                    />
                                </ColumnSection>
                                <ColumnSection title="Observaciones Adicionales">
                                    <TextInputWithCounter
                                        source="evaluacionInicial.observaciones"
                                        label="Observaciones adicionales"
                                        maxLength={500}
                                        multiline
                                        rows={3}
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VIII Evaluación Secundaria
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Zonas de lesión - Exploración Física">
                                    <ZonasLesion />
                                    <RowSection title="" border={false}>
                                        <TextInput source="evalSec.nombre" label="Nombre" />
                                        <NumberInput source="evalSec.asuntoNo" label="Asunto No" />
                                    </RowSection>
                                    <DateInput source="evalSec.fecha" label="Fecha" />
                                    <ArrayInput source="evalSec.zonasLesion" label="Zonas de lesión">
                                        <SimpleFormIterator inline>
                                            <NumberInput source="zona" label="Zona (Número)" />
                                            <TextInput source="lesion" label="Lesión (Siglas)" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </ColumnSection>
                                <ColumnSection title="Signos vitales y monitoreo">
                                    <ArrayInput source="evalSec.signosVitales" label="Signos vitales y monitoreo">
                                        <SimpleFormIterator inline>
                                            <TimeInput source="hora" label="Hora" />
                                            <TextInput source="fr" label="FR" />
                                            <TextInput source="fc" label="FC" />
                                            <TextInput source="tas" label="TAS" />
                                            <TextInput source="tad" label="TAD" />
                                            <TextInput source="sao2" label="SaO2" />
                                            <TextInput source="temp" label="Temp" />
                                            <TextInput source="glucosa" label="Glucosa" />
                                            <Typography variant="body1">NEURO TEST</Typography>
                                            <TextInput source="a" label="A" />
                                            <TextInput source="v" label="V" />
                                            <TextInput source="d" label="D" />
                                            <TextInput source="i" label="I" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </ColumnSection>
                                <ColumnSection title="Glasgow">
                                    <Glasgow />
                                    <NumberInput source="evalSec.glasgowTotal" label="Glasgow Total" />
                                </ColumnSection>
                                <ColumnSection title="Detalles del paciente">
                                    <TextInput source="evalSec.alergias" label="Alergias" />
                                    <TextInput source="evalSec.medicamentos" label="Medicamentos que está ingiriendo" />
                                    <TextInput source="evalSec.padecimientos" label="Padecimientos cirugías" />
                                    <TextInput source="evalSec.ultimaComida" label="La última comida" />
                                    <MotivoToggleInput
                                        source="evalSec.condicion"
                                        label="Condición del paciente"
                                        choices={CONDICION_PACIENTE_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="evalSec.prioridad"
                                        label="Prioridad"
                                        choices={PRIORIDAD_CHOICES}
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    IX Traslado
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="">
                                    <TextInput source="traslado.hospital" label="Hospital" />
                                    <TextInput source="traslado.doctor" label="Doctor" />
                                    <TextInput source="traslado.cru" label="Folio CRU" />
                                    <TextInput source="traslado.nombre" label="Nombre" />
                                    <TextInput source="traslado.firma" label="Firma" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    X Tratamiento
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="">
                                    <MotivoToggleInput
                                        source="tratamiento.viaAerea"
                                        label="Vía aérea"
                                        choices={VIA_AEREA_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="tratamiento.controlCervical"
                                        label="Control cervical"
                                        choices={CONTROL_CERVICAL_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="tratamiento.asistenciaVentilatoria"
                                        label="Asistencia ventilatoria"
                                        choices={ASISTENCIA_VENTILATORIA_CHOICES}
                                        exclusive={false}
                                    />
                                    <ArrayInput source="tratamiento.medicacion" label="Medicación administrada">
                                        <SimpleFormIterator inline>
                                            <TimeInput source="hora" label="Hora" />
                                            <TextInput source="medicamento" label="Medicamento" />
                                            <TextInput source="dosis" label="Dosis" />
                                            <TextInput source="via" label="Vía administración" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                    <TextInput source="tratamiento.doctorTratante" label="Doctor Tratante" />
                                    <MotivoToggleInput
                                        source="tratamiento.controlHemorragias"
                                        label="Control de hemorragias"
                                        choices={CONTROL_HEMORRAGIAS_CHOICES}
                                    />
                                    <MotivoToggleInput
                                        source="tratamiento.viasVenosas.soluciones"
                                        label="Vías venosas y Tipo de solución"
                                        choices={VIA_VENOSAS_CHOICES}
                                    />
                                    <RowSection title="Detalles Vía Venosa" border={false}>
                                        <NumberInput source="tratamiento.viasVenosas.linea" label="Línea IV #" />
                                        <NumberInput source="tratamiento.viasVenosas.cateter" label="Catéter #" />
                                        <NumberInput source="tratamiento.viasVenosas.cantidad" label="Cantidad" />
                                    </RowSection>
                                    <MotivoToggleInput
                                        source="tratamiento.atencionBasica"
                                        label="Atención básica"
                                        choices={ATENCION_BASICA_CHOICES}
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XI Observaciones
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="">
                                    <TextInputWithCounter
                                        source="observaciones"
                                        label="Observaciones"
                                        maxLength={1000}
                                        multiline
                                        rows={3}
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XII Ministerio Público
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="">
                                    <TextInput
                                        source="ministerioPublico.sello"
                                        label="Sello Ministerio Público Notificado"
                                    />
                                    <TextInput
                                        source="ministerioPublico.funcionario"
                                        label="Nombre y firma quien recibe"
                                    />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XIII Datos Legales
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection title="Autoridades que tomaron conocimiento">
                                    <TextInput source="datosLegales.autoridadDependencia" label="Dependencia" />
                                    <TextInput source="datosLegales.numeroUnidad" label="Número de Unidad" />
                                    <TextInput source="datosLegales.numeroOficiales" label="Número de los Oficiales" />
                                </ColumnSection>
                                <ColumnSection title="Vehículos Involucrados">
                                    <ArrayInput source="datosLegales.vehiculosInvolucrados" label="Vehículos involucrados">
                                        <SimpleFormIterator inline>
                                            <TextInput source="tipo" label="Tipo y marca" />
                                            <TextInput source="placas" label="Placas" />
                                        </SimpleFormIterator>
                                    </ArrayInput>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                            Evidencias Adicionales
                        </Typography>
                        <ImageInput
                            sx={evidenceBoxSx}
                            label="Cargar imágenes"
                            source="evidencia"
                            accept={{ 'image/*': ['.png', '.jpg'] }}
                            maxSize={50000000} // 50 MB
                            multiple // Acepta múltiples imágenes
                        >
                            <ImageField source="src" title="title" />
                        </ImageInput>
                    </Box>
                </TabbedForm.Tab>
            </TabbedForm>
        </Create>
    );
};

export const RMShow = () => {
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Show aside={isSmall ? undefined : <PanelHistorialCambios />}>
            <TabbedShowLayout>
                <TabbedShowLayout.Tab label="Datos Servicio">
                    {/* Mostrar historial de cambios arriba de reporte en pantallas pequeñas */}
                    {isSmall ? <CompactoHistorialCambios /> : null}
                    <RowSection labeled title="Folio y Fecha" border={true}>
                        <TextField source="folio" label="Folio" />
                        <TextField source="fecha" label="Fecha" />
                    </RowSection>
                    <RowSection labeled title="Turno y Personal" border={true}>
                        <TextField source="turno" label="Turno" />
                        <TextField source="personalACargo" label="Nombre del Personal a Cargo" />
                    </RowSection>
                    <TimeGridSection labeled title="Registro de Horas">
                        <TextField source="horaLlam" label="Hora Llamada" />
                        <TextField source="horaSal" label="Hora Salida" />
                        <TextField source="horaLlegada" label="Hora Llegada" />
                        <TextField source="horaTras" label="Hora Traslado" />
                        <TextField source="horaHos" label="Hora Hospital" />
                        <TextField source="horaSalidaHos" label="Salida Hospital" />
                        <TextField source="horaBase" label="Hora Base" />
                    </TimeGridSection>
                    <ColumnSection labeled title="Involucrados">
                        <TextField source="nombrePaciente" label="Nombre paciente" />
                        <TextField source="nombreTestigo" label="Nombre testigo" />
                        <TextField source="nombreParamedico" label="Nombre paramédico" />
                        <TextField source="nombreMedico" label="Nombre médico" />
                    </ColumnSection>
                    <ColumnSection labeled title="Motivo de ocurrencia">
                        <TextField source="motivo" label="Motivo" />
                    </ColumnSection>
                    <ColumnSection labeled title="Ubicación">
                        <TextField source="ubicacion.calle" label="Calle" />
                        <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                            <TextField source="ubicacion.numExt" label="Entre" />
                            <TextField source="ubicacion.numInt" label="Y" />
                        </Box>
                        <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
                        <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
                    </ColumnSection>
                    <ColumnSection labeled title="Lugar de Ocurrencia">
                        <TextField source="lugarOcurrencia" label="Lugar de Ocurrencia" />
                        <TextField source="lugarOcurrenciaOtro" label="Otro (especificar)" />
                    </ColumnSection>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Control">
                    <ColumnSection labeled title="">
                        <TextField source="control.numAmbulancia" label="Número de ambulancia" />
                        <TextField source="control.operador" label="Operador" />
                        <TextField source="control.tum" label="T.U.M." />
                        <TextField source="control.socorrista" label="Socorrista" />
                        <TextField source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
                    </ColumnSection>
                </TabbedShowLayout.Tab>

                <TabbedShowLayout.Tab label="Avanzado">
                    <Box sx={{
                        ...accordionSx,
                    }}>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant='subtitle1'>
                                    III Datos del Paciente
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Datos Principales">
                                    <TextField source="paciente.sexo" label="Sexo" />
                                    <TextField source="paciente.edad" label="Edad" />
                                </ColumnSection>
                                <ColumnSection labeled title="Ubicación">
                                    <TextField source="paciente.domicilio" label="Domicilio" />
                                    <TextField source="paciente.colonia" label="Colonia o Comunidad" />
                                    <TextField source="paciente.alcaldia" label="Alcaldía o Municipio" />
                                </ColumnSection>
                                <ColumnSection labeled title="Detalles">
                                    <TextField source="paciente.derechohabiente" label="Derechohabiente a" />
                                    <TextField source="paciente.telefono" label="Teléfono" />
                                    <TextField source="paciente.ubicacion" label="Ocupación" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    IV Parto
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Datos de la madre">
                                    <TextField source="parto.semanas" label="Semanas de gesta" />
                                    <TextField source="parto.horaContracciones" label="Hora de inicio de contracciones" />
                                    <RowSection labeled title="" border={false}>
                                        <TextField source="parto.frecuencia" label="Frecuencia" />
                                        <TextField source="parto.duracion" label="Duración" />
                                    </RowSection>
                                </ColumnSection>
                                <ColumnSection labeled title="Datos post-parto y del recién nacido">
                                    <TextField source="parto.horaNacimiento" label="Hora de nacimiento" />
                                    <TextField source="parto.placenta" label="Placenta expulsada" />
                                    <RowSection labeled title="" border={false}>
                                        <TextField source="parto.producto" label="Producto" />
                                        <TextField source="parto.sexo" label="Sexo" />
                                    </RowSection>
                                </ColumnSection>
                                <ColumnSection labeled title="Puntaje de APGAR">
                                    <TextField source="parto.edadGestacional" label="Edad gestacional" />
                                    <RowSection labeled title="" border={false}>
                                        <TextField source="parto.apgar1min" label="1 minuto" />
                                        <TextField source="parto.apgar5min" label="5 minutos" />
                                        <TextField source="parto.apgar10min" label="10 minutos" />
                                        <TextField source="parto.apgar15min" label="15 minutos" />
                                        <TextField source="parto.apgar20min" label="20 minutos" />
                                    </RowSection>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>

                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    V Causa Traumática
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Datos del accidente">
                                    <TextField source="agente.causal" label="Agente Causal" />
                                    <TextField source="agente.especificar" label="Otro (Especifique)" />
                                </ColumnSection>
                                <ColumnSection labeled title="Accidente Automovilístico">
                                    <TextField source="accidente.tipo" label="Tipo de accidente" />
                                    <TextField source="accidente.impacto" label="Impacto" />
                                    <TextField source="accidente.cms" label="CMS" />
                                    <TextField source="accidente.parabrisas" label="Parabrisas" />
                                    <TextField source="accidente.volante" label="Volante" />
                                    <TextField source="accidente.bolsa" label="Bolsa de aire" />
                                    <TextField source="accidente.cinturon" label="Cinturón de seguridad" />
                                    <TextField source="accidente.dentroVehiculo" label="Dentro del vehículo" />
                                </ColumnSection>
                                <ColumnSection labeled title="Atropellado">
                                    <TextField source="atropellado.vehiculo" label="Tipo de vehículo" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VI Causa Clínica
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="">
                                    <TextField source="causaClinica.origenProbable" label="Origen Probable" />
                                    <TextField source="causaClinica.especifique" label="Otro (Especifique)" />
                                    <RowSection labeled title="Frecuencia" border={false}>
                                        <TextField source="causaClinica.primeraVez" label="1.ª vez" />
                                        <TextField source="causaClinica.subsecuente" label="Subsecuente" />
                                    </RowSection>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VII Evaluación Inicial
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Control Cervical">
                                    <TextField source="evaluacionInicial.nivelConsciencia" label="Nivel de Consciencia" />
                                    <TextField source="evaluacionInicial.deglucion" label="Deglución" />
                                    <TextField source="evaluacionInicial.viaAerea" label="Vía Aérea" />
                                    <TextField source="evaluacionInicial.ventilacion" label="Ventilación" />
                                    <TextField source="evaluacionInicial.auscultacion" label="Auscultación" />
                                    <TextField source="evaluacionInicial.hemitorax" label="Hemitórax" />
                                    <TextField source="evaluacionInicial.sitio" label="Sitio" />
                                    <TextField source="evaluacionInicial.presenciaPulsos" label="Presencia de Pulsos" />
                                    <TextField source="evaluacionInicial.calidad" label="Calidad" />
                                    <TextField source="evaluacionInicial.piel" label="Piel" />
                                    <TextField source="evaluacionInicial.caracteristicas" label="Características" />
                                </ColumnSection>
                                <ColumnSection labeled title="Observaciones Adicionales">
                                    <TextField source="evaluacionInicial.observaciones" label="Observaciones adicionales" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    VIII Evaluación Secundaria
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Zonas de lesión - Exploración Física">
                                    <ZonasLesion />
                                    <RowSection labeled title="" border={false}>
                                        <TextField source="evalSec.nombre" label="Nombre" />
                                        <TextField source="evalSec.asuntoNo" label="Asunto No" />
                                    </RowSection>
                                    <TextField source="evalSec.fecha" label="Fecha" />
                                    <ArrayField source="evalSec.zonasLesion" label="Zonas de lesión">
                                        <SingleFieldList>
                                            <Box sx={{ display: 'flex', gap: '1em', flexWrap: 'wrap', marginBottom: '1em' }}>
                                                <TextField source="zona" label="Zona (Número)" />
                                                <TextField source="lesion" label="Lesión (Siglas)" />
                                            </Box>
                                        </SingleFieldList>
                                    </ArrayField>
                                </ColumnSection>
                                <ColumnSection labeled title="Signos vitales y monitoreo">
                                    <ArrayField source="evalSec.signosVitales" label="Signos vitales y monitoreo">
                                        <SingleFieldList>
                                            <Box sx={{ display: 'flex', gap: '1em', flexWrap: 'wrap', marginBottom: '1em' }}>
                                                <TextField source="hora" label="Hora" />
                                                <TextField source="fr" label="FR" />
                                                <TextField source="fc" label="FC" />
                                                <TextField source="tas" label="TAS" />
                                                <TextField source="tad" label="TAD" />
                                                <TextField source="sao2" label="SaO2" />
                                                <TextField source="temp" label="Temp" />
                                                <TextField source="glucosa" label="Glucosa" />
                                                <Typography variant="body1">NEURO TEST</Typography>
                                                <TextField source="a" label="A" />
                                                <TextField source="v" label="V" />
                                                <TextField source="d" label="D" />
                                                <TextField source="i" label="I" />
                                            </Box>
                                        </SingleFieldList>
                                    </ArrayField>
                                </ColumnSection>
                                <ColumnSection labeled title="Glasgow">
                                    <Glasgow />
                                    <NumberField source="evalSec.glasgowTotal" label="Glasgow Total" />
                                </ColumnSection>
                                <ColumnSection labeled title="Detalles del paciente">
                                    <TextField source="evalSec.alergias" label="Alergias" />
                                    <TextField source="evalSec.medicamentos" label="Medicamentos que está ingiriendo" />
                                    <TextField source="evalSec.padecimientos" label="Padecimientos cirugías" />
                                    <TextField source="evalSec.ultimaComida" label="La última comida" />
                                    <TextField source="evalSec.condicion" label="Condición del paciente" />
                                    <TextField source="evalSec.prioridad" label="Prioridad" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    IX Traslado
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="">
                                    <TextField source="traslado.hospital" label="Hospital" />
                                    <TextField source="traslado.doctor" label="Doctor" />
                                    <TextField source="traslado.cru" label="Folio CRU" />
                                    <TextField source="traslado.nombre" label="Nombre" />
                                    <TextField source="traslado.firma" label="Firma" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    X Tratamiento
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="">
                                    <TextField source="tratamiento.viaAerea" label="Vía aérea" />
                                    <TextField source="tratamiento.controlCervical" label="Control cervical" />
                                    <TextField source="tratamiento.asistenciaVentilatoria" label="Asistencia ventilatoria" />
                                    <ArrayField source="tratamiento.medicacion" label="Medicación administrada">
                                        <SingleFieldList>
                                            <Box sx={{ display: 'flex', gap: '1em', flexWrap: 'wrap', marginBottom: '1em' }}>
                                                <TextField source="hora" label="Hora" />
                                                <TextField source="medicamento" label="Medicamento" />
                                                <TextField source="dosis" label="Dosis" />
                                                <TextField source="via" label="Vía administración" />
                                            </Box>
                                        </SingleFieldList>
                                    </ArrayField>
                                    <TextField source="tratamiento.doctorTratante" label="Doctor Tratante" />
                                    <TextField source="tratamiento.controlHemorragias" label="Control de hemorragias" />
                                    <TextField source="tratamiento.viasVenosas.soluciones" label="Vías venosas y Tipo de solución" />
                                    <RowSection labeled title="Detalles Vía Venosa" border={false}>
                                        <TextField source="tratamiento.viasVenosas.linea" label="Línea IV #" />
                                        <TextField source="tratamiento.viasVenosas.cateter" label="Catéter #" />
                                        <TextField source="tratamiento.viasVenosas.cantidad" label="Cantidad" />
                                    </RowSection>
                                    <TextField source="tratamiento.atencionBasica" label="Atención básica" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XI Observaciones
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="">
                                    <TextField source="observaciones" label="Observaciones" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XII Ministerio Público
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="">
                                    <TextField source="ministerioPublico.sello" label="Sello Ministerio Público Notificado" />
                                    <TextField source="ministerioPublico.funcionario" label="Nombre y firma quien recibe" />
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="subtitle1">
                                    XIII Datos Legales
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <ColumnSection labeled title="Autoridades que tomaron conocimiento">
                                    <TextField source="datosLegales.autoridadDependencia" label="Dependencia" />
                                    <TextField source="datosLegales.numeroUnidad" label="Número de Unidad" />
                                    <TextField source="datosLegales.numeroOficiales" label="Número de los Oficiales" />
                                </ColumnSection>
                                <ColumnSection labeled title="Vehículos Involucrados">
                                    <ArrayField source="datosLegales.vehiculosInvolucrados" label="Vehículos involucrados">
                                        <SingleFieldList>
                                            <Box sx={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
                                                <TextField source="tipo" label="Tipo y marca" />
                                                <TextField source="placas" label="Placas" />
                                            </Box>
                                        </SingleFieldList>
                                    </ArrayField>
                                </ColumnSection>
                            </AccordionDetails>
                        </Accordion>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                            Evidencias Adicionales
                        </Typography>
                        <ImageField source="evidencia" title="Evidencias Adicionales" />
                    </Box>
                </TabbedShowLayout.Tab>
            </TabbedShowLayout>
        </Show>
    );
};