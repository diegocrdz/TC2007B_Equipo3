import {
    List,
    DataTable,
    ReferenceField,
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
} from "react-admin";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
        <Edit mutationOptions={{onSuccess}} >
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

export const RMCreate2 = () => ( // Prototipo con los campos del reporte de papel
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm>
            { /*------------------------------------------------------*/ }
            <TabbedForm.Tab label="I Datos del Servicio">
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
            { /*------------------------------------------------------*/ }
            <TabbedForm.Tab label="II Control">
                <TextInput source="control.numAmbulancia" label="Número de ambulancia" />
                <TextInput source="control.operador" label="Operador" />
                <TextInput source="control.tum" label="T.U.M." />
                <TextInput source="control.socorrista" label="Socorrista" />
                <TextInput source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/ }
            <TabbedForm.Tab label="III-XIII Avanzado">
                <div style={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            III Datos del Paciente
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
                            IV Parto
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            V Causa Traumática
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            VI Causa Clínica
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            VII Evaluación Inicial
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            VIII Evaluación Secundaria
                        </AccordionSummary>
                        <AccordionDetails>
                            <NumberInput source="evalSec.signos.tas" label="TA Sistólica (mmHg)" />
                            <NumberInput source="evalSec.signos.tad" label="TA Diastólica (mmHg)" />
                            <NumberInput source="evalSec.signos.fc" label="Frecuencia cardiaca (lpm)" />
                            <NumberInput source="evalSec.signos.fr" label="Frecuencia respiratoria (rpm)" />
                            <NumberInput source="evalSec.signos.spo2" label="SpO₂ (%)" />
                            <NumberInput source="evalSec.signos.temp" label="Temperatura (°C)" />
                            <NumberInput source="evalSec.signos.glucosa" label="Glucosa (mg/dL)" />

                            <TextInput source="evalSec.estado" label="Estado" />
                            <TextInput source="evalSec.exploracionFisica" label="Exploración física" multiline />
                            <TextInput source="evalSec.valoracionCirculatoria" label="Valoración circulatoria" multiline />
                            <TextInput source="evalSec.escalas" label="Reevaluación de las escalas específicas" multiline />
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            IX Traslado
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInput source="traslado.hospital" label="Hospital" />
                            <TextInput source="traslado.doctor" label="Doctor" />
                            <TextInput source="traslado.cru" label="CRU" />
                            <TextInput source="traslado.nombre" label="Nombre" />
                            <TextInput source="traslado.firma" label="Firma" />
                        </AccordionDetails>
                        </Accordion>
                        <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            X Tratamiento
                        </AccordionSummary>
                        <AccordionDetails>
                            <CheckboxGroupInput
                            source="tratamiento.viaAerea"
                            label="Vía aérea"
                            choices={VIA_AEREA_CHOICES}
                            />
                            <SelectInput
                                source="tratamiento.controlCervical"
                                label="Control cervical"
                                choices={CONTROL_CERVICAL_CHOICES}
                            />
                            <CheckboxGroupInput
                            source="tratamiento.asistenciaVentilatoria"
                            label="Asistencia ventilatoria (Checklist)"
                            choices={ASISTENCIA_VENTILATORIA_CHOICES}
                            />
                            <ArrayInput source="tratamiento.medicacion" label="Medicación administrada">
                            <SimpleFormIterator inline>
                                <TextInput source="medicamento" label="Medicamento" />
                                <TextInput source="dosis" label="Dosis" />
                                <TextInput source="via" label="Vía" />
                                <TimeInput source="hora" label="Hora" />
                            </SimpleFormIterator>
                            </ArrayInput>
                            <TextInput source="tratamiento.doctorTratante" label="Doctor Tratante" />
                            <CheckboxGroupInput
                                source="tratamiento.controlHemorragias"
                                label="Control de hemorragias"
                                choices={CONTROL_HEMORRAGIAS_CHOICES}
                            />
                            <CheckboxGroupInput
                                source="tratamiento.viasVenosas.soluciones"
                                label="Vías venosas y tipo de solución"
                                choices={VIA_VENOSAS_CHOICES}
                            />
                            <TextInput source="tratamiento.viasVenosas.linea" label="Línea IV #" />
                            <TextInput source="tratamiento.viasVenosas.cateter" label="Catéter #" />
                            <TextInput source="tratamiento.viasVenosas.cantidad" label="Cantidad" />
                            <CheckboxGroupInput
                                source="tratamiento.atencionBasica"
                                label="Atención básica"
                                choices={ATENCION_BASICA_CHOICES}
                            />
                        </AccordionDetails>
                        </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            XI Observaciones
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            XII Ministerio Público
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            XIII Datos Legales
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

const MOTIVO_CHOICES = [
  { id: "enfermedad", name: "Enfermedad" },
  { id: "traumatismo", name: "Traumatismo" },
  { id: "ginecoobstetrico", name: "Ginecoobstétrico" },
];

const OCURRENCIA_CHOICES = [
    { id: "transporte_publico", name: "Transporte público" },
    { id: "escuela", name: "Escuela" },
    { id: "trabajo", name: "Trabajo" },
    { id: "hogar", name: "Hogar" },
    { id: "recreacion_deporte", name: "Recreación y Deporte" },
    { id: "via_publica", name: "Vía Pública" },
    { id: "otro", name: "Otro" },
];

const SEXO_CHOICES = [
    { id: 'masculino', name: 'MASC' },
    { id: 'femenino', name: 'FEM' },
];

const ASISTENCIA_VENTILATORIA_CHOICES = [
  { id: "o2_canula_nasal", name: "O₂ cánula nasal" },
  { id: "o2_mascara_simple", name: "O₂ máscara simple" },
  { id: "o2_reservorio", name: "Máscara con reservorio" },
  { id: "bvm", name: "Bolsa-válvula-mascarilla (BVM)" },
  { id: "aspiracion_via_aerea", name: "Aspiración de vía aérea" },
  { id: "cpap_peep", name: "CPAP/PEEP" },
];

const VIA_AEREA_CHOICES = [
    { id: "permeable", name: "Permeable / espontánea" },
    { id: "obstruida", name: "Obstruida" },
    { id: "cannula_orofaringea", name: "Cánula orofaríngea" },
    { id: "cannula_nasofaringea", name: "Cánula nasofaríngea" },
    { id: "dispositivo_supraglotico", name: "Dispositivo supraglótico" },
    { id: "intubacion", name: "Intubación orotraqueal" },
];

const CONTROL_CERVICAL_CHOICES = [
    { id: "manual", name: "Manual" },
    { id: "collarin_rigido", name: "Collarín rígido" },
    { id: "collarin_blando", name: "Collarín blando" },
    { id: "no_aplica", name: "No aplica" },
];

const CONTROL_HEMORRAGIAS_CHOICES = [
    { id: "presion_directa", name: "Presión directa" },
    { id: "presion_indirecta", name: "Presión indirecta" },
    { id: "gravedad", name: "Gravedad" },
    { id: "vendaje_compresivo", name: "Vendaje compresivo" },
    { id: "criotepia", name: "Crioterapia" },
    { id: "mast", name: "MAST" },
];

const VIA_VENOSAS_CHOICES = [
    { id: "hartmann", name: "Hartmann" },
    { id: "nacl_09", name: "NaCl 0.9 %" },
    { id: "mixta", name: "Mixta" },
    { id: "glucosa5", name: "Glucosa 5%" },
    { id: "otra", name: "Otra" },
];

const ATENCION_BASICA_CHOICES = [
    { id: "rcp_basica", name: "RCP básica" },
    { id: "rcp_avanzada", name: "RCP avanzada" },
    { id: "curacion", name: "Curación" },
    { id: "inmovilizacion", name: "Inmovilización de extremidades" },
    { id: "empaquetamiento", name: "Empaquetamiento" },
    { id: "vendaje", name: "Vendaje" },
];

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