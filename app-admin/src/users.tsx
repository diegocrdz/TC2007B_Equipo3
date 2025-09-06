import {
    List,
    DataTable,
    Edit,
    SimpleForm,
    TextInput,
    EmailField,
    EditButton,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const UserFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <TextInput source="name" label="Name" />,
    <TextInput source="email" label="Email" />,
    <TextInput source="username" label="Username" />,
];

export const UsersList = () => (
    <List filters={UserFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col source="username" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="address.street" />
            <DataTable.Col source="phone" />
            <DataTable.Col source="website" />
            <DataTable.Col source="company.name" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
);

export const UsersEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput required source="name" />
            <TextInput required source="username" />
            <TextInput required source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Edit>
)

export const UsersCreate = () => (
    <Edit>
        <SimpleForm>
            <TextInput required source="name" />
            <TextInput required source="username" />
            <TextInput required source="email" />
            <TextInput source="address.street" />
            <TextInput source="phone" />
            <TextInput source="website" />
            <TextInput source="company.name" />
        </SimpleForm>
    </Edit>
);

export const UsersShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="name" label="Name" />
            <EmailField source="email" label="Email" />
            <TextField source="phone" label="Phone" />
            <TextField source="address.street" label="Address street" />
            <TextField source="website" label="Website" />
            <TextField source="company.name" label="Company" />
        </SimpleShowLayout>
    </Show>
);