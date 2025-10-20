/*
Recurso para Notas Médicas
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
    NumberInput,
    FunctionField,
    Datagrid,
    useGetIdentity,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, TextInputWithCounter, MyToolbar, listBoxSx, MotivoToggleInput } from "../utils/componentes";
import { Typography, Box } from "@mui/material";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { useMediaQuery } from '@mui/material';
// Opciones para SelectInput
import { OCURRENCIA_CHOICES } from "../utils/opciones";
// Mapa
import { MapInput } from "../utils/MapInput";

// Filtros para la lista
export const NMFilters = [
    <TextInput key="q" source="q" label={'ra.action.search'} alwaysOn />,
    <NumberInput key="id" source="id" label="ID" />,
    <DateInput key="fecha" source="fecha" label="Fecha" />,
    <NumberInput key="turno" source="turno" label="Turno" />,
    <TextInput key="personalACargo" source="personalACargo" label="Usuario" />,
    <TextInput key="nombrePaciente" source="nombrePaciente" label="Nombre paciente" />,
    <TextInput key="nombreMedico" source="nombreMedico" label="Nombre médico" />,
]

export const NMList = () => {
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
                <ContentPasteIcon />
                <Typography variant="h4">
                    Notas Médicas
                </Typography>
            </Box>
            
            <List filters={canAccess ? NMFilters : undefined}>
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
                                        {`Paciente: ${record.nombrePaciente ?? '-'}`}
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
                        <DataTable.Col source="nombrePaciente" label="Paciente" />
                        <DataTable.Col source="nombreTestigo" label="Testigo" />
                        <DataTable.Col source="nombreParamedico" label="Paramédico" />
                        <DataTable.Col source="nombreMedico" label="Médico" />
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

export const NMEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/notas_medicas');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <DateInput disabled source="fecha" label="Fecha" />
                <TimeInput disabled source="hora" label="Hora" />
                <NumberInput disabled source="turno" label="Turno" />
                <TextInput disabled source="personalACargo" label="Usuario" />
                <TextInput disabled source="nombrePaciente" label="Nombre paciente" />
                <TextInput disabled source="nombreTestigo" label="Nombre testigo" />
                <TextInput disabled source="nombreParamedico" label="Nombre paramédico" />
                <TextInput disabled source="nombreMedico" label="Nombre médico" />
                <TextInput disabled source="asunto" label="Asunto" />
                <TextInputWithCounter
                    disabled
                    source="observaciones"
                    label="Observaciones"
                    maxLength={1000}
                    multiline
                    rows={3}
                />
            </SimpleForm>
        </Edit>
    );
};

export const NMCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const { identity } = useGetIdentity();

    const onSuccess = () => {
        notify('Nota creada', { undoable: true });
        redirect('/notas_medicas');
        refresh();
    };

    return (
        <Create sx={{ marginBottom: '5em' }} mutationOptions={{ onSuccess }}>
            <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />} >
                { /*------------------------------------------------------*/}
                <RowSection title="Fecha y Hora" border={true}>
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
                        defaultValue={identity?.usuario || ''}
                        slotProps={{ input: { readOnly: identity?.rol !== 'admin' } }}
                    />
                </RowSection>
                <ColumnSection title="Involucrados">
                    <TextInput required source="nombrePaciente" label="Nombre paciente" />
                    <TextInput required source="nombreTestigo" label="Nombre testigo" />
                    <TextInput required source="nombreParamedico" label="Nombre paramédico" />
                    <TextInput required source="nombreMedico" label="Nombre médico" />
                </ColumnSection>
                <ColumnSection title="Ubicación">
                    <MapInput name="location" />
                    <TextInput required source="ubicacion.calle" label="Calle" />
                    <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput required source="ubicacion.numExt" label="Entre" />
                        <TextInput required source="ubicacion.numInt" label="Y" />
                    </Box>
                    <TextInput required source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput required source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>
                <ColumnSection title="Ocurrencia">
                    <MotivoToggleInput
                        required
                        source="ocurrencia"
                        label="Lugar de Ocurrencia"
                        choices={OCURRENCIA_CHOICES}
                    />
                    <TextInput source="ocurrenciaOtro" label="Otro (especificar)" />
                </ColumnSection>
                <ColumnSection title="Detalles">
                    <TextInput required source="asunto" label="Asunto" />
                    <TextInputWithCounter
                        required
                        source="observaciones"
                        label="Observaciones"
                        maxLength={1000}
                        multiline
                        rows={3}
                    />
                </ColumnSection>
            </SimpleForm>
        </Create>
    );
};

export const NMShow = () => (
    <Show sx={{ marginBottom: '5em' }} >
        <SimpleShowLayout>
            { /*------------------------------------------------------*/}
            <RowSection title="Fecha y Hora" border={true} labeled={true}>
                <TextField source="fecha" label="Fecha" />
                <TextField source="hora" label="Hora" />
            </RowSection>
            <RowSection title="Turno y Personal" border={true} labeled={true}>
                <TextField source="turno" label="Turno" />
                <TextField source="personalACargo" label="Usuario" />
            </RowSection>
            <ColumnSection title="Involucrados" labeled={true}>
                <TextField source="nombrePaciente" label="Nombre paciente" />
                <TextField source="nombreTestigo" label="Nombre testigo" />
                <TextField source="nombreParamedico" label="Nombre paramédico" />
                <TextField source="nombreMedico" label="Nombre médico" />
            </ColumnSection>
            <ColumnSection title="Ubicación" labeled={true}>
                <TextField source="ubicacion.calle" label="Calle" />
                <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                    <TextField source="ubicacion.numExt" label="Entre" />
                    <TextField source="ubicacion.numInt" label="Y" />
                </Box>
                <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
                <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
            </ColumnSection>
            <ColumnSection title="Ocurrencia" labeled={true}>
                <TextField source="ocurrencia" label="Lugar de Ocurrencia" />
                <TextField source="ocurrenciaOtro" label="Otro (especificar)" />
            </ColumnSection>
            <ColumnSection title="Detalles" labeled={true}>
                <TextField source="asunto" label="Asunto" />
                <TextField source="observaciones" label="Observaciones" />
            </ColumnSection>
        </SimpleShowLayout>
    </Show>
);