/*
Recurso para Notas Urbanas
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
    useCanAccess,
    DateInput,
    TimeInput,
    SimpleShowLayout,
    DateField,
    NumberInput,
    FunctionField,
    Datagrid,
    useGetIdentity,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, TextInputWithCounter, MyToolbar, listBoxSx } from "../utils/componentes";
import { Typography, Box } from "@mui/material";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useMediaQuery } from '@mui/material';

// Filtros para la lista
export const NUFilters = [
    <TextInput key="q" source="q" label={'ra.action.search'} alwaysOn />,
    <NumberInput key="id" source="id" label="ID" />,
    <DateInput key="fecha" source="fecha" label="Fecha" />,
    <NumberInput key="turno" source="turno" label="Turno" />,
    <TextInput key="personalACargo" source="personalACargo" label="Usuario" />,
]

export const NUList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });
    
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
                <StickyNote2Icon />
                <Typography variant="h4">
                    Notas Urbanas
                </Typography>
            </Box>
            
            <List filters={canAccess ? NUFilters : undefined}>
                {isSmall ? (
                    <Datagrid
                        rowClick="show"
                    >
                        <FunctionField
                            label="Notas"
                            render={(record: any) => (
                                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <Typography variant="body1" fontWeight='bold'>
                                        {record.asunto ?? 'Sin asunto'}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Usuario: ${record.personalACargo ?? '-'}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Fecha: ${record.fecha} - ${record.hora}`}
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
                        <DataTable.Col source="fecha" label="Fecha" />
                        <DataTable.Col source="hora" label="Hora" />
                        <DataTable.Col source="turno" label="Turno" />
                        <DataTable.Col source="personalACargo" label="Usuario" />
                        <DataTable.Col source="asunto" label="Asunto" />
                        <DataTable.Col>
                            <EditButton />
                        </DataTable.Col>
                    </DataTable>
                )}
            </List>
        </Box>
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
                <NumberInput disabled source="turno" label="Turno" />
                <TextInput disabled source="personalACargo" label="Usuario" />
                <TextInput disabled source="asunto" label="Asunto" />
                <TextInputWithCounter
                    disabled
                    source="observaciones"
                    label="Observaciones"
                    maxLength={500}
                    multiline
                    rows={3}
                />
            </SimpleForm>
        </Edit>
    );
};

export const NUCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const { identity } = useGetIdentity();

    const onSuccess = () => {
        notify('Nota creada', { undoable: true });
        redirect('/notas_urbanas');
        refresh();
    };

    return (
        <Create sx={{ marginBottom: '5em' }} mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
                <RowSection title="Fecha y hora" border={true}>
                    <DateInput required source="fecha" label="Fecha"
                        defaultValue={new Date().toISOString().split('T')[0]} // Fecha actual en formato YYYY-MM-DD
                    />
                    <TimeInput required source="hora" label="Hora"
                        defaultValue={new Date()} // Hora actual por defecto
                    />
                </RowSection>
                <RowSection title="Turno y Personal" border={true}>
                    <NumberInput
                        required source="turno"
                        label="Turno"
                        defaultValue={identity?.turno || 1}
                        slotProps={{ input: { readOnly: identity?.rol !== 'admin' } }}
                    />
                    <TextInput
                        required source="personalACargo"
                        label="Usuario"
                        defaultValue={identity?.fullName || ''}
                        slotProps={{ input: { readOnly: identity?.rol !== 'admin' } }}
                    />
                </RowSection>
                <ColumnSection title="Detalles">
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
};

export const NUShow = () => (
    <Show sx={{ marginBottom: '5em', }} >
        <SimpleShowLayout>
            <RowSection title="Fecha y hora" border={true} labeled={true}>
                <DateField source="fecha" label="Fecha" />
                <TextField source="hora" label="Hora" />
            </RowSection>
            <RowSection title="Turno y Personal" border={true} labeled={true}>
                <TextField source="turno" label="Turno" />
                <TextField source="personalACargo" label="Usuario" />
            </RowSection>
            <ColumnSection title="Detalles" labeled={true}>
                <TextField source="asunto" label="Asunto" />
                <TextField source="observaciones" label="Observaciones" />
            </ColumnSection>
        </SimpleShowLayout>
    </Show>
);