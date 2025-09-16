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
} from "react-admin";

import { useWatch } from "react-hook-form";
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

export const RMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const RMList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? RMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="nombre_paciente" label="Nombre paciente" />
                <DataTable.Col source="nombre_testigo" label="Nombre testigo" />
                <DataTable.Col source="nombre_paramedico" label="Nombre paramédico" />
                <DataTable.Col source="nombre_medico" label="Nombre médico" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
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
                <TextInput source="fecha" label="Fecha" />
                <TextInput source="nombre_paciente" label="Nombre paciente" />
                <TextInput source="nombre_testigo" label="Nombre testigo" />
                <TextInput source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput source="nombre_medico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

export const RMCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="folio" label="Folio" />
            <TextInput source="fecha" label="Fecha" />
            <TextInput source="nombre_paciente" label="Nombre paciente" />
            <TextInput source="nombre_testigo" label="Nombre testigo" />
            <TextInput source="nombre_paramedico" label="Nombre paramédico" />
            <TextInput source="nombre_medico" label="Nombre médico" />
        </SimpleForm>
    </Create>
);

// Estilos para diferentes layouts en las secciones del formulario
const rowLayoutStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1em',
    width: '100%',
};
const columnLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    width: '100%',
};
const gridLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1em',
    width: '100%',
};

// Estilo personalizado para CheckboxGroupInput en 3 columnas
export const checkboxGrid3Style = {
    '& .MuiFormGroup-root': {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: 'repeat(3, 1fr)',
        },
        gap: '0.5em',
        width: '80%'
    }
};

// Componentes para secciones con diferentes layouts
const RowSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={rowLayoutStyle}>
            {children}
        </div>
    </div>
);
const ColumnSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        {children}
    </div>
);
const GridSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={gridLayoutStyle}>
            {children}
        </div>
    </div>
);

// Componente de TextInput con límite de caracteres
const TextInputWithCounter = ({source, label, maxLength=0, multiline = true, rows}: {
    source: string;
    label: string;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
}) => {
    const value = useWatch({ name: source }) || "";
    return (
        <Box width="100%">
            <TextInput
                source={source}
                label={label}
                multiline={multiline}
                fullWidth
                rows={rows}
                slotProps={{ input: { inputProps: { maxLength } } }}
            />
            <Typography
                variant="caption"
                color={value.length > maxLength ? "error" : "textSecondary"}
                sx={{ display: "block", textAlign: "right", mt: 0.5 }}
            >{value.length}/{maxLength}
            </Typography>
        </Box>
    );
};



export const RMCreate2 = () => ( // Prototipo con los campos del reporte de papel
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Datos Servicio">
                <RowSection title="Folio y Fecha">
                    <TextInput required source="folio" label="Folio" />
                    <DateInput required source="fecha" label="Fecha"
                        defaultValue={new Date()} // Fecha actual por defecto
                    />
                </RowSection>
                <GridSection title="Horas">
                    <TimeInput source="horaLlam" label="Hora Llamada" />
                    <TimeInput source="horaSal" label="Hora Salida" />
                    <TimeInput source="horaLlegada" label="Hora Llegada" />
                    <TimeInput source="horaTras" label="Hora Traslado" />
                    <TimeInput source="horaHos" label="Hora Hospital" />
                    <TimeInput source="salodaHos" label="Salida Hospital" />
                    <TimeInput source="horaBase" label="Hora Base" />
                </GridSection>
                <ColumnSection title="Involucrados">
                    <TextInput required source="nombre_paciente" label="Nombre paciente" />
                    <TextInput required source="nombre_testigo" label="Nombre testigo" />
                    <TextInput required source="nombre_paramedico" label="Nombre paramédico" />
                    <TextInput source="nombre_medico" label="Nombre médico" />
                </ColumnSection>
                <ColumnSection title="Motivo del Servicio">
                    <SelectInput
                        source="motivo"
                        label="Motivo"
                        choices={MOTIVO_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                </ColumnSection>
                <ColumnSection title="Ubicación">
                    <TextInput source="ubicacion.calle" label="Calle" />
                    <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput source="ubicacion.numExt" label="Entre" />
                        <TextInput source="ubicacion.numInt" label="Y" />
                    </div>
                    <TextInput source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>
                <ColumnSection title="Motivo del Servicio">
                    <SelectInput
                        source="motivo"
                        label="Motivo"
                        choices={OCURRENCIA_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                    <TextInput source="motivo" label="Otro (especificar)" />
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
                                <TextInput source="" label="Domicilio" />
                                <TextInput source="" label="Colonia o Comunidad" />
                                <TextInput source="" label="Alcaldía o Municipio" />
                            </ColumnSection>
                            <ColumnSection title="Detalles">
                                <TextInput source="" label="Derechohabiente a" />
                                <NumberInput source="" label="Teléfono" />
                                <TextInput source="" label="Ocupación" />
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
                                <TimeInput source="parto.hora_contracciones" label="Hora de inicio de contracciones" />
                            </ColumnSection>
                            <RowSection title="">
                                <TextInput source="parto.frecuencia" label="Frecuencia" />
                                <TextInput source="parto.duracion" label="Duración" />
                            </RowSection>
                            <ColumnSection title="Datos post-parto y del recién nacido">
                                <TimeInput source="parto.hora_nacimiento" label="Hora de nacimiento" />
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
                                    <NumberInput source="parto.edad_gestacional" label="Edad gestacional" />
                                    <NumberInput source="parto.apgar_1min" label="1 minuto" />
                                    <NumberInput source="parto.apgar_5min" label="5 minutos" />
                                    <NumberInput source="parto.apgar_10min" label="10 minutos" />
                                    <NumberInput source="parto.apgar_15min" label="15 minutos" />
                                    <NumberInput source="parto.apgar_20min" label="20 minutos" />
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
                                source="Agente.causal"
                                label="Agente Causal"
                                choices={AGENTE_CHOICES}
                            />
                            <TextInput source="Agente.especificar" label="Otro (Especifique)" />
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
                                source="causa_clinica.origen_probable"
                                label="Origen Probable"
                                choices={ORIGEN_PROBABLE_CHOICES}
                            />
                            <TextInput source="causa_clinica.especifique" label="Otro (Especifique)" />
                            <RowSection title="Frecuencia">
                                <TextInput source="causa_clinica.primeraVez" label="1.ª vez" />
                                <TextInput source="causa_clinica.subsecuente" label="Subsecuente" />
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
                                source="evaluacion_inicial.nivelConsciencia"
                                label="Nivel de Consciencia"
                                choices={NIVEL_CONSCIENCIA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.deglucion"
                                label="Deglución"
                                choices={DEGLUCION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.viaAerea"
                                label="Vía Aérea"
                                choices={VIA_AEREA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.ventilacion"
                                label="Ventilación"
                                choices={VENTILACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.auscultacion"
                                label="Auscultación"
                                choices={AUSCULTACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.hemitorax"
                                label="Hemitórax"
                                choices={HEMITORAX_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.sitio"
                                label="Sitio"
                                choices={SITIO_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.presencia_pulsos"
                                label="Presencia de Pulsos"
                                choices={PRESENCIA_PULSOS_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.calidad"
                                label="Calidad"
                                choices={CALIDAD_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.piel"
                                label="Piel"
                                choices={PIEL_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.caracteristicas"
                                label="Características"
                                choices={CARACTERISTICAS_CHOICES}
                            />
                            <ColumnSection title="Observaciones Adicionales">
                                <TextInputWithCounter
                                    source="evaluacion_inicial.observaciones"
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
                                source="ministerio_publico.sello"
                                label="Sello Ministerio Público Notificado"
                            />
                            <TextInput
                                source="ministerio_publico.funcionario"
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
                                <TextInput source="datos_legales.autoridad_dependencia" label="Dependencia" />
                                <TextInput source="datos_legales.numero_unidad" label="Número de Unidad" />
                                <TextInput source="datos_legales.numero_oficiales" label="Número de los Oficiales" />
                            </ColumnSection>
                            <ArrayInput source="datos_legales.vehiculos_involucrados" label="Vehículos involucrados">
                                <SimpleFormIterator inline>
                                    <TextInput source="tipo" label="Tipo y marca" />
                                    <TextInput source="placas" label="Placas" />
                                </SimpleFormIterator>
                            </ArrayInput>
                        </AccordionDetails>
                    </Accordion>
                    <ImageInput
                        source="evidencia"
                        accept={{ 'image/*': ['.png', '.jpg'] }}
                        maxSize={50000000} // 50 MB
                        multiple // Acepta múltiples imágenes
                        label="Evidencias"
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
                <TextField source="salodaHos" label="Salida Hospital" />
                <TextField source="horaBase" label="Hora Base" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Control">
                <TextField source="control.numAmbulancia" label="Número de ambulancia" />
                <TextField source="control.operador" label="Operador" />
                <TextField source="control.tum" label="T.U.M." />
                <TextField source="control.socorrista" label="Socorrista" />
                <TextField source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);