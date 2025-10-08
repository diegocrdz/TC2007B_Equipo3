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
    SelectInput,
    NumberInput,
    FunctionField,
    Datagrid,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, TextInputWithCounter, MyToolbar, listBoxSx } from "../componentes";
import { Typography, Box } from "@mui/material";
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { useMediaQuery } from '@mui/material';

// Filtros para la lista
export const NUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="usuarioId" label="Usuario" reference="usuarios">
        <SelectInput optionText={(choice) => `${choice.usuario} (${choice.rol})`} />
    </ReferenceInput>,
    <DateInput source="fecha" label="Fecha" />,
    <NumberInput source="turno" label="Turno" />,
    <TextInput source="personalACargo" label="Personal a Cargo" />,
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
                                        {`Personal: ${record.personalACargo ?? '-'}`}
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
                        <DataTable.Col source="personalACargo" label="Personal a Cargo" />
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
                <TextInput disabled source="personalACargo" label="Nombre del Personal a Cargo" />
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

export const NUCreate = () => ( 
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />}>
            <RowSection title="Fecha y hora" border={true}>
                <DateInput required source="fecha" label="Fecha"
                    defaultValue={new Date()} // Fecha actual por defecto
                />
                <TimeInput required source="hora" label="Hora"
                    defaultValue={new Date()} // Hora actual por defecto
                />
            </RowSection>
            <RowSection title="Turno y Personal" border={true}>
                <NumberInput required source="turno" label="Turno" />
                <TextInput required source="personalACargo" label="Nombre del Personal a Cargo" />
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

export const NUShow = () => (
    <Show sx={{ marginBottom: '5em', }} >
        <SimpleShowLayout>
            <RowSection title="Fecha y hora" border={true} labeled={true}>
                <DateField source="fecha" label="Fecha" />
                <TextField source="hora" label="Hora" />
            </RowSection>
            <RowSection title="Turno y Personal" border={true} labeled={true}>
                <TextField source="turno" label="Turno" />
                <TextField source="personalACargo" label="Nombre del Personal a Cargo" />
            </RowSection>
            <ColumnSection title="Detalles" labeled={true}>
                <TextField source="asunto" label="Asunto" />
                <TextField source="observaciones" label="Observaciones" />
            </ColumnSection>
        </SimpleShowLayout>
    </Show>
);