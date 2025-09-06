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
    EmailField,
    Show,
    SimpleShowLayout,
    TextField,
} from "react-admin";

export const CommentFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="postId" label="Post" reference="posts" />,
];

export const CommentsList = () => (
    <List filters={CommentFilters}>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="postId">
                <ReferenceField source="postId" reference="posts" link="show" />
            </DataTable.Col>
            <DataTable.Col source="name" />
            <DataTable.Col source="email">
                <EmailField source="email" />
            </DataTable.Col>
            <DataTable.Col source="body" />
            <DataTable.Col>
                <EditButton />
            </DataTable.Col>
        </DataTable>
    </List>
)

export const CommentsEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput disabled source="postId" />
            <ReferenceInput source="postId" reference="posts" />
            <TextInput required source="name" />
            <TextInput required source="email" />
            <TextInput required source="body" />
        </SimpleForm>
    </Edit>
);

export const CommentsCreate = () => (
    <Create>
        <SimpleForm>
            <ReferenceInput source="postId" reference="posts" />
            <TextInput required source="name" />
            <TextInput required source="email" />
            <TextInput required source="body" />
        </SimpleForm>
    </Create>
);

export const CommentsShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <ReferenceField source="postId" reference="posts" label="Post" />
            <TextField source="name" label="Name" />
            <EmailField source="email" label="Email" />
            <TextField source="body" label="Body" />
        </SimpleShowLayout>
    </Show>
);