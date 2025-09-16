/*
    Formularios para Notas Urbanas
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
    DateInput,
    TimeInput,
    SimpleShowLayout,
    DateField,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, TextInputWithCounter } from "./componentes";

// Filtros para la lista
export const NMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const NUList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? NMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="hora" label="Hora" />
                <DataTable.Col source="nombre_operador" label="Nombre operador" />
                <DataTable.Col source="asunto" label="Asunto" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const NUEdit = () => {

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
                <TextInput disabled source="nombre_operador" label="Nombre operador" />
                <TextInput disabled source="asunto" label="Asunto" />
                <TextInput disabled source="observaciones" label="Observaciones" multiline fullWidth rows={3} />
            </SimpleForm>
        </Edit>
    );
};

export const NUCreate = () => ( 
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <SimpleForm warnWhenUnsavedChanges>
            <RowSection title="Fecha y hora">
                <DateInput source="fecha" label="Fecha" />
                <TimeInput source="hora" label="Hora" />
            </RowSection>
            <ColumnSection title="Detalles">
                <TextInput source="nombre_operador" label="Nombre operador" />
                <TextInput source="asunto" label="Asunto" />
                <TextInputWithCounter
                    source="observaciones"
                    label="Observaciones"
                    maxLength={500}
                    multiline
                    rows={3}
                />
            </ColumnSection>
        </SimpleForm>
    </Create>
);

export const NUShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" />
            <DateField source="fecha" label="Fecha" />
            <TextField source="hora" label="Hora" />
            <TextField source="nombre_operador" label="Nombre operador" />
            <TextField source="asunto" label="Asunto" />
            <TextField source="observaciones" label="Observaciones" />
        </SimpleShowLayout>
    </Show>
);