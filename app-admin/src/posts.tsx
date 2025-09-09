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

export const PostFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const PostsList = () => (
    <List filters={PostFilters}>
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

export const PostsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" />
            <TextInput source="body" />
        </SimpleForm>
    </Edit>
);

import { required, useUnique, FormDataConsumer } from "react-admin";

export const PostsCreate = () => {
    const unique = useUnique();

    return (
        <Create>
            <SimpleForm>
                <ReferenceInput required source="userId" reference="users" />
                <FormDataConsumer>
                    {({ formData }) => (
                        <TextInput source="title" validate={
                            [required(), unique({
                                resource: "posts", message: "Ese título ya existe para este usuario", filter: { userId: formData.userId }, debounce: 600
                            }),
                        ]}/>
                    )}
                </FormDataConsumer>
                <TextInput required source="body" multiline rows={5} />
            </SimpleForm>
        </Create>
    );
};

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