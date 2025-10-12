/*
Recurso para usuarios
Se proporcionan operaciones CRUD (listar, crear, editar y mostrar)
Fecha: 11/08/2025
*/

// react-admin
import {
    List,
    DataTable,
    EditButton,
    Edit,
    SimpleForm,
    TextInput,
    Create,
    Show,
    TextField,
    useNotify,
    useRefresh,
    useRedirect,
    SimpleShowLayout,
    NumberInput,
    FunctionField,
    Datagrid,
} from "react-admin";
// Componentes personalizados
import { ColumnSection, MyToolbar, listBoxSx, MotivoToggleInput } from "../utils/componentes";
import { Typography, Box } from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useMediaQuery } from '@mui/material';

// Filtros para la lista
export const NUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <NumberInput source="id" label="ID" />,
    <TextInput source="usuario" label="Usuario" />,
    <TextInput source="nombre" label="Nombre" />,
    <NumberInput source="turno" label="Turno" />,
    <NumberInput source="rol" label="Rol" />,
]

export const UsuarioList = () => {    
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    return (
        <Box sx={listBoxSx} >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    gap: '1em',
                }}
            >
                <AccountBoxIcon />
                <Typography variant="h4">
                    Usuarios
                </Typography>
            </Box>
            
            <List filters={NUFilters}>
                {isSmall ? (
                    <Datagrid
                        rowClick="show"
                    >
                        <FunctionField
                            label="Usuarios"
                            render={(record: any) => (
                                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <Typography variant="body1" fontWeight='bold'>
                                        {record.usuario ?? 'Sin asunto'}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Nombre: ${record.nombre ?? '-'}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Rol: ${record.rol ?? '-'}`}
                                    </Typography>
                                </Box>
                            )}
                        />
                        <FunctionField
                            render={(record: any) => (
                                <EditButton
                                    record={record}
                                    sx={{
                                        border: '1px solid',
                                        borderColor: 'text.disabled',
                                        backgroundColor: '#0000001b',
                                    }}
                                />
                            )}
                        />
                    </Datagrid>
                ) : (
                    <DataTable>
                        <DataTable.Col source="id" label="ID" />
                        <DataTable.Col source="usuario" label="Usuario" />
                        <DataTable.Col source="nombre" label="Nombre" />
                        <DataTable.Col source="turno" label="Turno" />
                        <DataTable.Col source="rol" label="Rol" />
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>
                    </DataTable>
                )}
            </List>
        </Box>
    );
};

export const UsuarioEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/usuarios');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <ColumnSection title="Editar Usuario">
                    <TextInput required source="usuario" label="Usuario" />
                    <TextInput required source="nombre" label="Nombre" />
                    <NumberInput required source="turno" label="Turno" />
                    <MotivoToggleInput
                        source="rol"
                        label="Rol"
                        choices={[
                            { id: "admin", name: "Administrador" },
                            { id: "jefe", name: "Jefe de Turno" },
                            { id: "medico", name: "Médico" },
                            { id: "paramedico", name: "Paramédico" },
                        ]}
                    >
                    </MotivoToggleInput>
                </ColumnSection>
            </SimpleForm>
        </Edit>
    );
};

export const UsuarioCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Usuario creado', { undoable: true });
        redirect('/usuarios');
        refresh();
    };

    return (
        <Create sx={{marginBottom: '5em'}} mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
                <ColumnSection title="Nuevo Usuario">
                    <TextInput required source="usuario" label="Usuario" />
                        <TextInput required source="nombre" label="Nombre" />
                        <NumberInput required source="turno" label="Turno" />
                        <MotivoToggleInput
                            required
                            source="rol"
                            label="Rol"
                            choices={[
                                { id: "admin", name: "Administrador" },
                                { id: "jefe", name: "Jefe de Turno" },
                                { id: "medico", name: "Médico" },
                                { id: "paramedico", name: "Paramédico" },
                            ]}
                        >
                        </MotivoToggleInput>
                </ColumnSection>
            </SimpleForm>
        </Create>
    );
};

export const UsuarioShow = () => (
    <Show sx={{ marginBottom: '5em', }} >
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="usuario" label="Usuario" />
            <TextField source="nombre" label="Nombre" />
            <TextField source="turno" label="Turno" />
            <TextField source="rol" label="Rol" />
        </SimpleShowLayout>
    </Show>
);