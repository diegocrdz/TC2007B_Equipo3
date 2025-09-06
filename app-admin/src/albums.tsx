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
} from "react-admin";

export const AlbumFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
];

export const AlbumsList = () => (
    <List filters={AlbumFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="userId">
                <ReferenceField source="userId" reference="users" link="show" />
            </DataTable.Col>
            <DataTable.Col source="title" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
)

export const AlbumsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="userId" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" />
        </SimpleForm>
    </Edit>
)

export const AlbumsCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput required source="userId" reference="users" />
            <TextInput required source="title" />
        </SimpleForm>
    </Create>
);

export const AlbumsShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" label="User" />
            <TextField source="title" label="Title" />
        </SimpleShowLayout>
    </Show>
);