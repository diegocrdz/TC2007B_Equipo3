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
    SimpleShowLayout,
    TextField,
    useNotify,
    useRefresh,
    useRedirect,
    useCanAccess,
} from "react-admin";

export const PostFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const PostsList = () => {
    // check access
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // If the user has delete access, show filters
        <List filters={canAccess ? PostFilters : undefined}>
            <DataTable>
                <DataTable.Col source="id" label="ID" />
                <DataTable.Col source="userId" label="Usuario">
                    <ReferenceField source="userId" reference="users" link="show" />
                </DataTable.Col>
                <DataTable.Col source="title" label="Título" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const PostsEdit = () => {

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
                <TextInput disabled source="id" />
                <ReferenceInput source="userId" reference="users" />
                <TextInput required source="title" />
                <TextInput source="body" />
            </SimpleForm>
        </Edit>
    );
};

export const PostsCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput required source="userId" reference="users" />
            <TextInput required source="title" />
            <TextInput required source="body" multiline rows={5} />
        </SimpleForm>
    </Create>
);

export const PostsShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" label="User" />
            <TextField source="title" label="Title" />
            <TextField source="body" label="Body" />
        </SimpleShowLayout>
    </Show>
);