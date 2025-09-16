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
import { RowSection, ColumnSection, TextInputWithCounter } from "./componentes";
// Opciones para SelectInput
import { OCURRENCIA_CHOICES } from "./opciones";

// Filtros para la lista
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
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="hora" label="Hora" />
                <DataTable.Col source="nombre_paciente" label="Nombre paciente" />
                <DataTable.Col source="nombre_testigo" label="Nombre testigo" />
                <DataTable.Col source="nombre_paramedico" label="Nombre paramédico" />
                <DataTable.Col source="nombre_medico" label="Nombre médico" />
                <DataTable.Col source="asunto" label="Asunto" />
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
                <TextInput disabled source="id" />
                <DateInput disabled source="fecha" label="Fecha" />
                <TimeInput disabled source="hora" label="Hora" />
                <TextInput disabled source="nombre_paciente" label="Nombre paciente" />
                <TextInput disabled source="nombre_testigo" label="Nombre testigo" />
                <TextInput disabled source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput disabled source="nombre_medico" label="Nombre médico" />
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
        <SimpleForm warnWhenUnsavedChanges>
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
                <TextInput required source="nombre_paciente" label="Nombre paciente" />
                <TextInput required source="nombre_testigo" label="Nombre testigo" />
                <TextInput required source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput source="nombre_medico" label="Nombre médico" />
            </ColumnSection>
            <ColumnSection title="Ubicación">
                <TextInput required source="ubicacion.calle" label="Calle" />
                <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                    <TextInput source="ubicacion.numExt" label="Entre" />
                    <TextInput source="ubicacion.numInt" label="Y" />
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
                <TextInput source="ocurrencia_otro" label="Otro (especificar)" />
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
            <TextField source="id" />
            <TextField source="fecha" label="Fecha" />
            <TextField source="horaLlam" label="Hora Llamada" />
            <TextField source="horaSal" label="Hora Salida" />
            <TextField source="horaLlegada" label="Hora Llegada" />
            <TextField source="horaTras" label="Hora Traslado" />
            <TextField source="horaHos" label="Hora Hospital" />
            <TextField source="salodaHos" label="Salida Hospital" />
            <TextField source="horaBase" label="Hora Base" />
        </SimpleShowLayout>
    </Show>
);
