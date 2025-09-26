/*
    Formularios para Reportes Médicos
*/

// react-admin
import {
    List,
    DataTable,
    EditButton,
    Edit,
    SimpleForm,
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
    CheckboxGroupInput,
    ArrayInput,
    SimpleFormIterator,
    ImageInput,
    ImageField,
    SimpleShowLayout,
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
} from "./opciones";
// Componentes personalizados
import { RowSection, ColumnSection, GridSection, checkboxGrid3Style, TextInputWithCounter, MyToolbar, listBoxSx } from "./componentes";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

// Filtros para la lista
export const RMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="usuarioId" label="Usuario" reference="usuarios">
        <SelectInput optionText={(choice) => `${choice.usuario} (${choice.rol})`} />
    </ReferenceInput>,
    <DateInput source="fecha" label="Fecha" />,
    <TextInput source="nombrePaciente" label="Nombre paciente" />,
]

export const RMList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        <Box sx={listBoxSx} >
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
            
            <List filters={canAccess ? RMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="nombrePaciente" label="Nombre paciente" />
                <DataTable.Col source="nombreTestigo" label="Nombre testigo" />
                <DataTable.Col source="nombreParamedico" label="Nombre paramédico" />
                <DataTable.Col source="nombreMedico" label="Nombre médico" />
                <DataTable.Col>
                <EditButton />
                </DataTable.Col>
            </DataTable>
            </List>
        </Box>
    );
};

export const RMEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/posts');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="folio" label="Folio" />
                <TextInput disabled source="fecha" label="Fecha" />
                <TextInput disabled source="nombrePaciente" label="Nombre paciente" />
                <TextInput disabled source="nombreTestigo" label="Nombre testigo" />
                <TextInput disabled source="nombreParamedico" label="Nombre paramédico" />
                <TextInput disabled source="nombreMedico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

export const RMCreate = () => ( // Prototipo con los campos del reporte de papel
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Datos Servicio">
                <RowSection title="Folio y Fecha">
                    <TextInput required source="folio" label="Folio" />
                    <DateInput required source="fecha" label="Fecha"
                        defaultValue={new Date()} // Fecha actual por defecto
                    />
                </RowSection>
                <GridSection title="Horas">
                    <TimeInput required source="horaLlam" label="Hora Llamada" />
                    <TimeInput required source="horaSal" label="Hora Salida" />
                    <TimeInput required source="horaLlegada" label="Hora Llegada" />
                    <TimeInput required source="horaTras" label="Hora Traslado" />
                    <TimeInput required source="horaHos" label="Hora Hospital" />
                    <TimeInput required source="horaSalidaHos" label="Salida Hospital" />
                    <TimeInput required source="horaBase" label="Hora Base" />
                </GridSection>
                <ColumnSection title="Involucrados">
                    <TextInput required source="nombrePaciente" label="Nombre paciente" />
                    <TextInput required source="nombreTestigo" label="Nombre testigo" />
                    <TextInput required source="nombreParamedico" label="Nombre paramédico" />
                    <TextInput required source="nombreMedico" label="Nombre médico" />
                </ColumnSection>
                <ColumnSection title="Motivo de ocurrencia">
                    <SelectInput
                        required
                        source="motivo"
                        label="Motivo de ocurrencia"
                        choices={MOTIVO_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                </ColumnSection>
                <ColumnSection title="Ubicación">
                    <TextInput required source="ubicacion.calle" label="Calle" />
                    <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput required source="ubicacion.numExt" label="Entre" />
                        <TextInput required source="ubicacion.numInt" label="Y" />
                    </div>
                    <TextInput required source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput required source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>
                <ColumnSection title="Lugar de Ocurrencia">
                    <SelectInput
                        required
                        source="lugarOcurrencia"
                        label="Lugar de ocurrencia"
                        choices={OCURRENCIA_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                    <TextInput source="lugarOcurrenciaOtro" label="Otro (especificar)" />
                </ColumnSection>
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Control">
                <TextInput source="control.numAmbulancia" label="Número de ambulancia" />
                <TextInput source="control.operador" label="Operador" />
                <TextInput source="control.tum" label="T.U.M." />
                <TextInput source="control.socorrista" label="Socorrista" />
                <TextInput source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Avanzado">
                <Box sx={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                III Datos del Paciente
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput
                                source="paciente.sexo"
                                label="Sexo"
                                choices={SEXO_CHOICES}
                                optionText="name"
                                optionValue="id"
                            />
                            <NumberInput source="paciente.edad" label="Edad" />
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
                            </ColumnSection>
                            <RowSection title="">
                                <TextInput source="parto.frecuencia" label="Frecuencia" />
                                <TextInput source="parto.duracion" label="Duración" />
                            </RowSection>
                            <ColumnSection title="Datos post-parto y del recién nacido">
                                <TimeInput source="parto.horaNacimiento" label="Hora de nacimiento" />
                                <TextInput source="parto.placenta" label="Placenta expulsada" />
                                <RowSection title="">
                                    <SelectInput
                                        source="parto.producto"
                                        label="Producto"
                                        choices={PRODUCTO_CHOICES}
                                        optionText="name"
                                        optionValue="id"
                                    />
                                    <SelectInput
                                        source="parto.sexo"
                                        label="Sexo"
                                        choices={SEXO_CHOICES}
                                        optionText="name"
                                        optionValue="id"
                                    />
                                </RowSection>
                                <ColumnSection title="Puntaje de APGAR">
                                    <NumberInput source="parto.edadGestacional" label="Edad gestacional" />
                                    <NumberInput source="parto.apgar1min" label="1 minuto" />
                                    <NumberInput source="parto.apgar5min" label="5 minutos" />
                                    <NumberInput source="parto.apgar10min" label="10 minutos" />
                                    <NumberInput source="parto.apgar15min" label="15 minutos" />
                                    <NumberInput source="parto.apgar20min" label="20 minutos" />
                                </ColumnSection>
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
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="agente.causal"
                                label="Agente Causal"
                                choices={AGENTE_CHOICES}
                            />
                            <TextInput source="agente.especificar" label="Otro (Especifique)" />
                            <ColumnSection title="Accidente Automovilístico">
                                <CheckboxGroupInput sx={checkboxGrid3Style}
                                    source="accidente.tipo"
                                    label="Tipo de accidente"
                                    choices={TIPO_ACCIDENTE_CHOICES}
                                />
                                <CheckboxGroupInput sx={checkboxGrid3Style}
                                    source="accidente.impacto"
                                    label="Impacto"
                                    choices={IMPACTO_CHOICES}
                                />
                                <TextInput source="accidente.cms" label="CMS" />
                                <SelectInput
                                    source="accidente.parabrisas"
                                    label="Parabrisas"
                                    choices={PARABRISAS_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.volante"
                                    label="Volante"
                                    choices={VOLANTE_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.bolsa"
                                    label="Bolsa de aire"
                                    choices={SI_NO_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.cinturon"
                                    label="Cinturón de seguridad"
                                    choices={CINTURON_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.dentroVehiculo"
                                    label="Dentro del vehículo"
                                    choices={DENTRO_VEHICULO_CHOICES}
                                />
                            </ColumnSection>
                            <ColumnSection title="Atropellado">
                                <SelectInput
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
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="causaClinica.origenProbable"
                                label="Origen Probable"
                                choices={ORIGEN_PROBABLE_CHOICES}
                            />
                            <TextInput source="causaClinica.especifique" label="Otro (Especifique)" />
                            <RowSection title="Frecuencia">
                                <TextInput source="causaClinica.primeraVez" label="1.ª vez" />
                                <TextInput source="causaClinica.subsecuente" label="Subsecuente" />
                            </RowSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VII Evaluación Inicial
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput
                                source="evaluacionInicial.nivelConsciencia"
                                label="Nivel de Consciencia"
                                choices={NIVEL_CONSCIENCIA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.deglucion"
                                label="Deglución"
                                choices={DEGLUCION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.viaAerea"
                                label="Vía Aérea"
                                choices={VIA_AEREA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.ventilacion"
                                label="Ventilación"
                                choices={VENTILACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.auscultacion"
                                label="Auscultación"
                                choices={AUSCULTACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.hemitorax"
                                label="Hemitórax"
                                choices={HEMITORAX_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.sitio"
                                label="Sitio"
                                choices={SITIO_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.presenciaPulsos"
                                label="Presencia de Pulsos"
                                choices={PRESENCIA_PULSOS_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.calidad"
                                label="Calidad"
                                choices={CALIDAD_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.piel"
                                label="Piel"
                                choices={PIEL_CHOICES}
                            />
                            <SelectInput
                                source="evaluacionInicial.caracteristicas"
                                label="Características"
                                choices={CARACTERISTICAS_CHOICES}
                            />
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
                            <ImageInput
                                source="evidencia"
                                accept={{ 'image/*': ['.png', '.jpg'] }}
                                maxSize={50000000} // 50 MB
                                label="Exploración física"
                            >
                                <ImageField source="src" title="title" />
                            </ImageInput>
                            <ArrayInput source="evalSec.signosVitales" label="Signos Vitales y monitoreo">
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
                            <TextInput source="evalSec.alergias" label="Alergias" />
                            <TextInput source="evalSec.medicamentos" label="Medicamentos que está ingiriendo" />
                            <TextInput source="evalSec.padecimientos" label="Padecimientos cirugías" />
                            <TextInput source="evalSec.ultimaComida" label="La última comida" />
                            <SelectInput
                                source="evalSec.condicion"
                                label="Condición del paciente"
                                choices={CONDICION_PACIENTE_CHOICES}
                            />
                            <SelectInput
                                source="evalSec.prioridad"
                                label="Prioridad"
                                choices={PRIORIDAD_CHOICES}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                IX Traslado
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInput source="traslado.hospital" label="Hospital" />
                            <TextInput source="traslado.doctor" label="Doctor" />
                            <TextInput source="traslado.cru" label="Folio CRU" />
                            <TextInput source="traslado.nombre" label="Nombre" />
                            <TextInput source="traslado.firma" label="Firma" />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                X Tratamiento
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput
                                source="tratamiento.viaAerea"
                                label="Vía aérea"
                                choices={VIA_AEREA_CHOICES}
                            />
                            <SelectInput
                                source="tratamiento.controlCervical"
                                label="Control cervical"
                                choices={CONTROL_CERVICAL_CHOICES}
                            />
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="tratamiento.asistenciaVentilatoria"
                                label="Asistencia ventilatoria"
                                choices={ASISTENCIA_VENTILATORIA_CHOICES}
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
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="tratamiento.controlHemorragias"
                                label="Control de hemorragias"
                                choices={CONTROL_HEMORRAGIAS_CHOICES}
                            />
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="tratamiento.viasVenosas.soluciones"
                                label="Vías venosas y Tipo de solución"
                                choices={VIA_VENOSAS_CHOICES}
                            />
                            <RowSection title="Detalles Vía Venosa">
                                <NumberInput source="tratamiento.viasVenosas.linea" label="Línea IV #" />
                                <NumberInput source="tratamiento.viasVenosas.cateter" label="Catéter #" />
                                <NumberInput source="tratamiento.viasVenosas.cantidad" label="Cantidad" />
                            </RowSection>
                            <CheckboxGroupInput sx={checkboxGrid3Style}
                                source="tratamiento.atencionBasica"
                                label="Atención básica"
                                choices={ATENCION_BASICA_CHOICES}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XI Observaciones
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInputWithCounter
                                source="observaciones"
                                label="Observaciones"
                                maxLength={1000}
                                multiline
                                rows={3}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XII Ministerio Público
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInput
                                source="ministerioPublico.sello"
                                label="Sello Ministerio Público Notificado"
                            />
                            <TextInput
                                source="ministerioPublico.funcionario"
                                label="Nombre y firma quien recibe"
                            />
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
                            <ArrayInput source="datosLegales.vehiculosInvolucrados" label="Vehículos involucrados">
                                <SimpleFormIterator inline>
                                    <TextInput source="tipo" label="Tipo y marca" />
                                    <TextInput source="placas" label="Placas" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </AccordionDetails>
                    </Accordion>
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                        Evidencias Adicionales
                    </Typography>
                    <ImageInput
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

export const RMShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Datos del Servicio">
                <TextField source="folio" label="Folio" />
                <TextField source="fecha" label="Fecha" />
                <TextField source="horaLlam" label="Hora Llamada" />
                <TextField source="horaSal" label="Hora Salida" />
                <TextField source="horaLlegada" label="Hora Llegada" />
                <TextField source="horaTras" label="Hora Traslado" />
                <TextField source="horaHos" label="Hora Hospital" />
                <TextField source="horaSalidaHos" label="Salida Hospital" />
                <TextField source="horaBase" label="Hora Base" />
                <TextField source="nombrePaciente" label="Nombre paciente" />
                <TextField source="nombreTestigo" label="Nombre testigo" />
                <TextField source="nombreParamedico" label="Nombre paramédico" />
                <TextField source="nombreMedico" label="Nombre médico" />
                <TextField source="motivo" label="Motivo" />
                <TextField source="motivoOtro" label="Otro motivo (especificar)" />
                <TextField source="lugarOcurrencia" label="Lugar de ocurrencia" />
                <TextField source="ubicacion.calle" label="Calle" />
                <TextField source="ubicacion.numExt" label="Entre" />
                <TextField source="ubicacion.numInt" label="Y" />
                <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
                <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Control">
                <TextField source="control.numAmbulancia" label="Número de ambulancia" />
                <TextField source="control.operador" label="Operador" />
                <TextField source="control.tum" label="T.U.M." />
                <TextField source="control.socorrista" label="Socorrista" />
                <TextField source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Avanzado">
                <Box sx={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                III Datos del Paciente
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                {/* Se agrega SimpleShowLayout para que se muestren correctamente
                                las labels, de otra forma aparece todo sin formato */}
                                <TextField source="paciente.sexo" label="Sexo" />
                                <TextField source="paciente.edad" label="Edad" />
                                <TextField source="paciente.domicilio" label="Domicilio" />
                                <TextField source="paciente.colonia" label="Colonia o Comunidad" />
                                <TextField source="paciente.alcaldia" label="Alcaldía o Municipio" />
                                <TextField source="paciente.derechohabiente" label="Derechohabiente a" />
                                <TextField source="paciente.telefono" label="Teléfono" />
                                <TextField source="paciente.ubicacion" label="Ocupación" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                IV Parto
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="parto.semanas" label="Semanas de gesta" />
                                <TextField source="parto.horaContracciones" label="Hora de inicio de contracciones" />
                                <TextField source="parto.frecuencia" label="Frecuencia" />
                                <TextField source="parto.duracion" label="Duración" />
                                <TextField source="parto.horaNacimiento" label="Hora de nacimiento" />
                                <TextField source="parto.placenta" label="Placenta expulsada" />
                                <TextField source="parto.producto" label="Producto" />
                                <TextField source="parto.sexo" label="Sexo" />
                                <TextField source="parto.edadGestacional" label="Edad gestacional" />
                                <TextField source="parto.apgar1min" label="1 minuto" />
                                <TextField source="parto.apgar5min" label="5 minutos" />
                                <TextField source="parto.apgar10min" label="10 minutos" />
                                <TextField source="parto.apgar15min" label="15 minutos" />
                                <TextField source="parto.apgar20min" label="20 minutos" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                V Causa Traumática
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="agente.causal" label="Agente Causal" />
                                <TextField source="agente.especificar" label="Otro (Especifique)" />
                                <TextField source="accidente.tipo" label="Tipo de accidente" />
                                <TextField source="accidente.impacto" label="Impacto" />
                                <TextField source="accidente.cms" label="CMS" />
                                <TextField source="accidente.parabrisas" label="Parabrisas" />
                                <TextField source="accidente.volante" label="Volante" />
                                <TextField source="accidente.bolsa" label="Bolsa de aire" />
                                <TextField source="accidente.cinturon" label="Cinturón de seguridad" />
                                <TextField source="accidente.dentroVehiculo" label="Dentro del vehículo" />
                                <TextField source="atropellado.vehiculo" label="Tipo de vehículo" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VI Causa Clínica
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="causaClinica.origenProbable" label="Origen Probable" />
                                <TextField source="causaClinica.especifique" label="Otro (Especifique)" />
                                <TextField source="causaClinica.primeraVez" label="1.ª vez" />
                                <TextField source="causaClinica.subsecuente" label="Subsecuente" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VII Evaluación Inicial
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
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
                                <TextField source="evaluacionInicial.observaciones" label="Observaciones adicionales" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VIII Evaluación Secundaria
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <ImageField source="evidencia.src" title="Exploración física" />
                                <TextField source="evalSec.alergias" label="Alergias" />
                                <TextField source="evalSec.medicamentos" label="Medicamentos que está ingiriendo" />
                                <TextField source="evalSec.padecimientos" label="Padecimientos cirugías" />
                                <TextField source="evalSec.ultimaComida" label="La última comida" />
                                <TextField source="evalSec.condicion" label="Condición del paciente" />
                                <TextField source="evalSec.prioridad" label="Prioridad" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                IX Traslado
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="traslado.hospital" label="Hospital" />
                                <TextField source="traslado.doctor" label="Doctor" />
                                <TextField source="traslado.cru" label="Folio CRU" />
                                <TextField source="traslado.nombre" label="Nombre" />
                                <TextField source="traslado.firma" label="Firma" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                X Tratamiento
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="tratamiento.viaAerea" label="Vía aérea" />
                                <TextField source="tratamiento.controlCervical" label="Control cervical" />
                                <TextField source="tratamiento.asistenciaVentilatoria" label="Asistencia ventilatoria" />
                                <TextField source="tratamiento.doctorTratante" label="Doctor Tratante" />
                                <TextField source="tratamiento.controlHemorragias" label="Control de hemorragias" />
                                <TextField source="tratamiento.viasVenosas.soluciones" label="Vías venosas y Tipo de solución" />
                                <TextField source="tratamiento.viasVenosas.linea" label="Línea IV #" />
                                <TextField source="tratamiento.viasVenosas.cateter" label="Catéter #" />
                                <TextField source="tratamiento.viasVenosas.cantidad" label="Cantidad" />
                                <TextField source="tratamiento.atencionBasica" label="Atención básica" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XI Observaciones
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="observaciones" label="Observaciones" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XII Ministerio Público
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="ministerioPublico.sello" label="Sello Ministerio Público Notificado" />
                                <TextField source="ministerioPublico.funcionario" label="Nombre y firma quien recibe" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XIII Datos Legales
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SimpleShowLayout sx={{ padding: 0 }}>
                                <TextField source="datosLegales.autoridadDependencia" label="Dependencia" />
                                <TextField source="datosLegales.numeroUnidad" label="Número de Unidad" />
                                <TextField source="datosLegales.numeroOficiales" label="Número de los Oficiales" />
                            </SimpleShowLayout>
                        </AccordionDetails>
                    </Accordion>
                    <ImageField source="evidencia" title="Evidencias Adicionales" />
                </Box>
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);