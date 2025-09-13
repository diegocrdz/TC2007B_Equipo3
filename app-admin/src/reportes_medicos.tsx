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
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            IX Traslado
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            X Tratamiento
                        </AccordionSummary>
                        <AccordionDetails>
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