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
    UrlField,
    ImageField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const PhotoFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="albumId" label="Album" reference="albums" />,
];

export const PhotosList = () => (
    <List filters={PhotoFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="albumId">
                <ReferenceField source="albumId" reference="albums" link="show" />
            </DataTable.Col>
            <DataTable.Col source="title" />
            <DataTable.Col source="url" >
                <UrlField source="url" />
            </DataTable.Col>
            <DataTable.Col source="thumbnailUrl" >
                <ImageField source="thumbnailUrl" />
            </DataTable.Col>
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
)

export const PhotosEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="albumId" />
            <ReferenceInput source="albumId" reference="albums" />
            <TextInput required source="title" />
            <TextInput required source="url" />
            <TextInput required source="thumbnailUrl" />
        </SimpleForm>
    </Edit>
);

export const PhotosCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="albumId" reference="albums" />
            <TextInput required source="title" />
            <TextInput required source="url" />
            <TextInput required source="thumbnailUrl" />
        </SimpleForm>
    </Create>
);

export const PhotosShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="albumId" reference="albums" label="Album" />
            <TextField source="title" label="Title" />
            <UrlField source="url" label="URL" />
            <ImageField source="thumbnailUrl" label="Thumbnail" />
        </SimpleShowLayout>
    </Show>
);