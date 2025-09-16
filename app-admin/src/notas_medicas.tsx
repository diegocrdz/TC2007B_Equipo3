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
} from "react-admin";

import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const NMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const NMList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? NMFilters : undefined}>
            <DataTable>
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

export const NMEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/notas_medicas');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="fecha" label="Fecha" />
                <TextInput source="nombre_paciente" label="Nombre paciente" />
                <TextInput source="nombre_testigo" label="Nombre testigo" />
                <TextInput source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput source="nombre_medico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

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

export const NMCreate = () => ( 
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Datos Servicio">
                <RowSection title="Fecha">
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
                <ColumnSection title="Ocurrencia">
                    <SelectInput
                        source="ocurrencia"
                        label="Lugar de Ocurrencia"
                        choices={OCURRENCIA_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                    <TextInput source="ocurrencia_otro" label="Otro (especificar)" />
                </ColumnSection>
                <ColumnSection title="Observaciones">
                    <TextInputWithCounter
                        source="observaciones"
                        label="Observaciones"
                        maxLength={1000}
                    />
                </ColumnSection>
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

const PRODUCTO_CHOICES = [
    { id: 'vivo', name: 'Vivo' },
    { id: 'muerto', name: 'Muerto' },
];

export const NMShow = () => (
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
        </TabbedShowLayout>
    </Show>
);
