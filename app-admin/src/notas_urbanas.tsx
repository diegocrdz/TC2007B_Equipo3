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
import { RowSection, ColumnSection, TextInputWithCounter, MyToolbar } from "./componentes";

// Filtros para la lista
export const NUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const NUList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? NUFilters : undefined}>
            <DataTable>
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="hora" label="Hora" />
                <DataTable.Col source="nombreOperador" label="Nombre operador" />
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
        redirect('/notas_urbanas');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <DateInput disabled source="fecha" label="Fecha" />
                <TimeInput disabled source="hora" label="Hora" />
                <TextInput disabled source="nombreOperador" label="Nombre operador" />
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
        <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
            <RowSection title="Fecha y hora">
                <DateInput required source="fecha" label="Fecha"
                    defaultValue={new Date()} // Fecha actual por defecto
                />
                <TimeInput required source="hora" label="Hora"
                    defaultValue={new Date()} // Hora actual por defecto
                />
            </RowSection>
            <ColumnSection title="Detalles">
                <TextInput required source="nombreOperador" label="Nombre operador" />
                <TextInput required source="asunto" label="Asunto" />
                <TextInputWithCounter
                    required
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
            <DateField source="fecha" label="Fecha" />
            <TextField source="hora" label="Hora" />
            <TextField source="nombreOperador" label="Nombre operador" />
            <TextField source="asunto" label="Asunto" />
            <TextField source="observaciones" label="Observaciones" />
        </SimpleShowLayout>
    </Show>
);