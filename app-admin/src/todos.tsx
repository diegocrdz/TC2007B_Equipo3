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
    BooleanInput,
    Show,
    SimpleShowLayout,
    TextField,
    BooleanField,
} from "react-admin";

export const TodoFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
    <BooleanInput source="completed" label="Completed" />,
];

export const TodosList = () => (
    <List filters={TodoFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="userId">
                <ReferenceField source="userId" reference="users" link="show" />
            </DataTable.Col>
            <DataTable.Col source="title" />
            <DataTable.Col source="completed" >
                <BooleanField source="completed" />
            </DataTable.Col>
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
)

export const TodosEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="userId" />
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" />
            <BooleanInput source="completed" />
        </SimpleForm>
    </Edit>
);

export const TodosCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="userId" reference="users" />
            <TextInput required source="title" />
            <BooleanInput source="completed" />
        </SimpleForm>
    </Create>
);

export const TodosShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="userId" reference="users" label="User" />
            <TextField source="title" label="Title" />
            <BooleanField source="completed" label="Completed" />
        </SimpleShowLayout>
    </Show>
);