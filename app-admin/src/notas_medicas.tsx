/*
    Formularios para Notas Médicas
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
    SelectInput,
    DateInput,
    TimeInput,
    SimpleShowLayout,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, TextInputWithCounter, MyToolbar, listBoxSx } from "./componentes";
import { Typography, Box } from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// Opciones para SelectInput
import { OCURRENCIA_CHOICES } from "./opciones";

// Filtros para la lista
export const NMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="usuarioId" label="Usuario" reference="usuarios">
        <SelectInput optionText={(choice) => `${choice.usuario} (${choice.rol})`} />
    </ReferenceInput>,
    <DateInput source="fecha" label="Fecha" />,
    <TextInput source="nombrePaciente" label="Nombre Paciente" />,
    <TextInput source="nombreMedico" label="Nombre Médico" />,
]

export const NMList = () => {
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
                <ContentPasteIcon />
                <Typography variant="h4">
                    Notas Médicas
                </Typography>
            </Box>
            
            <List filters={canAccess ? NMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="hora" label="Hora" />
                <DataTable.Col source="nombrePaciente" label="Nombre paciente" />
                <DataTable.Col source="nombreTestigo" label="Nombre testigo" />
                <DataTable.Col source="nombreParamedico" label="Nombre paramédico" />
                <DataTable.Col source="nombreMedico" label="Nombre médico" />
                <DataTable.Col source="asunto" label="Asunto" />
                <DataTable.Col>
                <EditButton />
                </DataTable.Col>
            </DataTable>
            </List>
        </Box>
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
                <DateInput disabled source="fecha" label="Fecha" />
                <TimeInput disabled source="hora" label="Hora" />
                <TextInput disabled source="nombrePaciente" label="Nombre paciente" />
                <TextInput disabled source="nombreTestigo" label="Nombre testigo" />
                <TextInput disabled source="nombreParamedico" label="Nombre paramédico" />
                <TextInput disabled source="nombreMedico" label="Nombre médico" />
                <TextInput disabled source="asunto" label="Asunto" />
                <TextInput disabled source="observaciones" label="Observaciones" />
            </SimpleForm>
        </Edit>
    );
};

export const NMCreate = () => ( 
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />} >
            { /*------------------------------------------------------*/}
            <RowSection title="Fecha y Hora">
                <DateInput required source="fecha" label="Fecha"
                    defaultValue={new Date()} // Fecha actual por defecto
                />
                <TimeInput required source="hora" label="Hora"
                    defaultValue={new Date()} // Hora actual por defecto
                />
            </RowSection>
            <ColumnSection title="Involucrados">
                <TextInput required source="nombrePaciente" label="Nombre paciente" />
                <TextInput required source="nombreTestigo" label="Nombre testigo" />
                <TextInput required source="nombreParamedico" label="Nombre paramédico" />
                <TextInput required source="nombreMedico" label="Nombre médico" />
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
            <ColumnSection title="Ocurrencia">
                <SelectInput
                    required
                    source="ocurrencia"
                    label="Lugar de Ocurrencia"
                    choices={OCURRENCIA_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
                <TextInput required source="ocurrenciaOtro" label="Otro (especificar)" />
            </ColumnSection>
            <ColumnSection title="Detalles">
                <TextInput required source="asunto" label="Asunto" />
                <TextInputWithCounter
                    source="observaciones"
                    label="Observaciones"
                    maxLength={1000}
                    multiline
                    rows={3}
                />
            </ColumnSection>
        </SimpleForm>
    </Create>
);

export const NMShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="fecha" label="Fecha" />
            <TextField source="hora" label="Hora" />
            <TextField source="nombrePaciente" label="Nombre paciente" />
            <TextField source="nombreTestigo" label="Nombre testigo" />
            <TextField source="nombreParamedico" label="Nombre paramédico" />
            <TextField source="nombreMedico" label="Nombre médico" />
            <TextField source="ubicacion.calle" label="Calle" />
            <TextField source="ubicacion.numExt" label="Entre" />
            <TextField source="ubicacion.numInt" label="Y" />
            <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
            <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
            <TextField source="ocurrencia" label="Lugar de Ocurrencia" />
            <TextField source="ocurrenciaOtro" label="Otro (especificar)" />
            <TextField source="asunto" label="Asunto" />
            <TextField source="observaciones" label="Observaciones" />
        </SimpleShowLayout>
    </Show>
);