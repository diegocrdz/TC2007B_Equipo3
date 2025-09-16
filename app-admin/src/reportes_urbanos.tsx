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
    DateTimeInput,
    CheckboxGroupInput,
    ImageInput,
    ImageField,
} from "react-admin";

import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const RUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const RUList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? RUFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="tipo_servicio" label="Tipo de Servicio" />
                <DataTable.Col source="gravedad" label="Gravedad" />
                <DataTable.Col source="personal_a_cargo" label="Personal a Cargo" />
                <DataTable.Col source="ubicacion.direccion" label="Ubicación" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const RUEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/reportes_urbanos');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="folio" label="Folio" />
                <DateInput source="fecha" label="Fecha" />
                <TextInput source="personal_a_cargo" label="Personal a Cargo" />
                <SelectInput
                    source="tipo_servicio"
                    label="Tipo de Servicio"
                    optionText="name"
                    optionValue="id"
                />
                <SelectInput
                    source="gravedad"
                    label="Gravedad"
                    choices={GRAVEDAD_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
            </SimpleForm>
        </Edit>
    );
};

export const RUCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="folio" label="Folio" />
            <DateInput source="fecha" label="Fecha" />
            <TextInput source="personal_a_cargo" label="Personal a Cargo" />
            <SelectInput
                source="tipo_servicio"
                label="Tipo de Servicio"
                optionText="name"
                optionValue="id"
            />
            <SelectInput
                source="gravedad"
                label="Gravedad"
                choices={GRAVEDAD_CHOICES}
                optionText="name"
                optionValue="id"
            />
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

const checkboxGrid3Style = {
    '& .MuiFormGroup-root': {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
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
const TextInputWithCounter = ({
    source, label, maxLength = 0, multiline = true
}: {
    source: string;
    label: string;
    maxLength?: number;
    multiline?: boolean;
}) => {
    const value = useWatch({ name: source }) || "";
    return (
        <Box width="100%">
            <TextInput
                source={source}
                label={label}
                multiline={multiline}
                fullWidth
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
export default TextInputWithCounter;

export const RUCreate2 = () => ( // Formulario completo para reporte de emergencias urbanas
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Datos del Servicio">
                <RowSection title="Folio y Fecha">
                    <TextInput required source="folio" label="Folio" />
                    <DateInput required source="fecha" label="Fecha"
                        defaultValue={new Date()} // Fecha actual por defecto
                    />
                    <TimeInput required source="hora" label="Hora" />
                </RowSection>
                <RowSection title="Turno y Personal">
                    <SelectInput
                        source="turno"
                        label="Turno"
                        choices={TURNO_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                    <TextInput required source="personal_a_cargo" label="Nombre del Personal a Cargo" />
                </RowSection>
                <ColumnSection title="Activación del Servicio">
                    <SelectInput
                        source="modo_activacion"
                        label="Modo de Activación"
                        choices={MODO_ACTIVACION_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                </ColumnSection>
                <ColumnSection title="Tipo de Servicio">
                    <Box sx={checkboxGrid3Style}>
                        <CheckboxGroupInput
                            source="tipo_servicio"
                            label="Tipo de Servicio (Petición de mitigación de riesgo)"
                            choices={[
                                { id: 'Opcion1', name: 'Opcion 1' },
                                { id: 'Opcion2', name: 'Opcion 2' },
                                { id: 'Opcion3', name: 'Opcion 3' }
                            ]}
                        />
                    </Box>
                    <TextInput source="tipo_servicio_otro" label="Especificar otro tipo de servicio" />
                </ColumnSection>
                <GridSection title="Horarios de Atención">
                    <DateTimeInput source="fecha_hora_atencion" label="Fecha y Hora de Atención" />
                    <NumberInput source="tiempo_traslado_minutos" label="Tiempo de Traslado (minutos)" />
                </GridSection>
                <ColumnSection title="Ubicación">
                    <TextInput source="ubicacion.direccion" label="Dirección" />
                    <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput source="ubicacion.entre_calles_1" label="Entre" />
                        <TextInput source="ubicacion.entre_calles_2" label="Y" />
                    </div>
                    <TextInput source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput source="ubicacion.municipio" label="Alcaldía o Municipio" />
                    <RowSection title="Coordenadas GPS">
                        <NumberInput source="ubicacion.latitud" label="Latitud" />
                        <NumberInput source="ubicacion.longitud" label="Longitud" />
                    </RowSection>
                </ColumnSection>
                <RowSection title="Gravedad">
                    <SelectInput
                        source="gravedad"
                        label="Gravedad de la Emergencia"
                        choices={GRAVEDAD_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                </RowSection>
                <RowSection title="Recorrido">
                    <NumberInput source="km_recorridos" label="Kilómetros Recorridos" />
                </RowSection>
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Trabajo Realizado">
                <div style={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                Trabajos Realizados
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                Observaciones y Evidencias
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                Conclusión y Dictamen
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Responsables y Autoridades">
                <div style={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                Responsables de la Emergencia
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                Autoridades y Dependencias Participantes
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

// Opciones para los campos SelectInput
const TURNO_CHOICES = [
    { id: "matutino", name: "Matutino" },
    { id: "vespertino", name: "Vespertino" },
    { id: "nocturno", name: "Nocturno" },
];

const MODO_ACTIVACION_CHOICES = [
    { id: "llamada_emergencia", name: "Llamada de emergencia" },
    { id: "seguimiento_oficio", name: "Seguimiento de oficio" },
];

const GRAVEDAD_CHOICES = [
    { id: "baja", name: "Baja" },
    { id: "media", name: "Media" },
    { id: "alta", name: "Alta" },
];

export const RUShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Datos del Servicio">
                <TextField source="folio" label="Folio" />
                <TextField source="fecha" label="Fecha" />
                <TextField source="hora" label="Hora" />
                <TextField source="turno" label="Turno" />
                <TextField source="personal_a_cargo" label="Personal a Cargo" />
                <TextField source="modo_activacion" label="Modo de Activación" />
                <TextField source="tipo_servicio" label="Tipo de Servicio" />
                <TextField source="gravedad" label="Gravedad" />
                <TextField source="km_recorridos" label="Kilómetros Recorridos" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Trabajo Realizado">
                <TextField source="trabajos_realizados.descripcion" label="Descripción del Trabajo" />
                <TextField source="observaciones.descripcion" label="Observaciones" />
                <TextField source="conclusion.dictamen" label="Dictamen Final" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Responsables y Autoridades">
                <TextField source="responsables" label="Responsables" />
                <TextField source="autoridades_participantes" label="Autoridades Participantes" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);
