/*
Recurso para Reportes Urbanos
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
    SelectInput,
    DateInput,
    NumberInput,
    DateTimeInput,
    ImageInput,
    ImageField,
    SimpleShowLayout,
    DateField,
    FunctionField,
    Datagrid,
    useGetIdentity,
} from "react-admin";
// Componentes personalizados
import {
    RowSection, ColumnSection, GridSection, TextInputWithCounter, MyToolbar,
    listBoxSx, evidenceBoxSx, MotivoToggleInput,
    PanelHistorialCambios, CompactoHistorialCambios
} from "../utils/componentes";
import { Typography, Box } from "@mui/material";
import EmergencyIcon from '@mui/icons-material/Emergency';
// Opciones para SelectInput
import { MODO_ACTIVACION_CHOICES, GRAVEDAD_CHOICES, AUTORIDADES_CHOICES } from "../utils/opciones";
// Panel de historial de cambios
import { useMediaQuery } from '@mui/material';
// Mapa
import { MapInput } from "../utils/MapInput";

// Filtros para la lista
export const RUFilters = [
    <TextInput key="search" source="q" label={'ra.action.search'} alwaysOn />,
    <NumberInput key="id" source="id" label="ID" />,
    <DateInput key="fecha" source="fecha" label="Fecha" />,
    <TextInput key="folio" source="folio" label="Folio" />,
    <NumberInput key="turno" source="turno" label="Turno" />,
    <TextInput key="personalACargo" source="personalACargo" label="Nombre del Personal a Cargo" />,
    <TextInput key="tipoServicio" source="tipoServicio" label="Tipo de Servicio" />,
    <SelectInput 
        key="gravedad"
        source="gravedad" 
        label="Gravedad"
        choices={GRAVEDAD_CHOICES}
        optionText="name"
        optionValue="id"
    />,
]

export const RUList = () => {
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
                <EmergencyIcon />
                <Typography variant="h4">
                    Reportes Urbanos
                </Typography>
            </Box>

            <List
                filters={canAccess ? RUFilters : undefined}>
                {isSmall ? (
                    <Datagrid
                        rowClick="show"
                    >
                        <FunctionField
                            label="Reportes"
                            render={(record: any) => (
                                <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                                    <Typography variant="body1" fontWeight='bold'>
                                        {`Folio: ${record.folio}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Personal: ${record.personalACargo ?? '-'}`}
                                    </Typography>
                                    <Typography variant="caption">
                                        {`Fecha: ${new Date(record.fecha).toLocaleDateString()}`}
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
                        <DataTable.Col source="folio" label="Folio" />
                        <DataTable.Col source="fecha" label="Fecha" />
                        <DataTable.Col source="turno" label="Turno" />
                        <DataTable.Col source="personalACargo" label="Nombre del Personal a Cargo" />
                        <DataTable.Col source="tipoServicio" label="Tipo de Servicio" />
                        <DataTable.Col source="gravedad" label="Gravedad" />
                        <DataTable.Col source="ubicacion.direccion" label="Ubicación" />
                        <DataTable.Col>
                        <EditButton />
                        </DataTable.Col>
                    </DataTable>
                )}
            </List>
        </Box>
    );
};

export const RUEdit = () => {
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/reportes_urbanos');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} aside={isSmall ? undefined : <PanelHistorialCambios />} >
            <SimpleForm warnWhenUnsavedChanges>
                {/* Mostrar historial de cambios arriba de reporte en pantallas pequeñas */}
                {isSmall ? <CompactoHistorialCambios /> : null}
                <TextInput source="folio" label="Folio" />
                <DateInput disabled source="fecha" label="Fecha" />
                <NumberInput disabled source="turno" label="Turno" />
                <TextInput disabled source="personalACargo" label="Nombre del Personal a Cargo" />
                <TextInput disabled source="tipoServicio" label="Tipo de Servicio" />
                <SelectInput
                    disabled
                    source="gravedad"
                    label="Gravedad"
                    choices={GRAVEDAD_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
                <TextInput disabled source="ubicacion.direccion" label="Dirección" />
                <TextInputWithCounter
                    disabled
                    source="observacionesGenerales"
                    label="Observaciones Generales"
                    maxLength={500}
                    multiline
                    rows={3}
                />
            </SimpleForm>
        </Edit>
    );
};

export const RUCreate = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();
    const { identity } = useGetIdentity();

    const onSuccess = () => {
        notify('Reporte creado', { undoable: true });
        redirect('/reportes_urbanos');
        refresh();
    };

    return (
        <Create sx={{ marginBottom: '5em' }} mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />} >
                <RowSection title="Folio y Fecha" border={true}>
                    <TextInput required source="folio" label="Folio" />
                    <DateTimeInput required source="fecha" label="Fecha" defaultValue={new Date()} />
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
                        label="Nombre del Personal a Cargo"
                        defaultValue={identity?.fullName || ''}
                        slotProps={{ input: { readOnly: identity?.rol !== 'admin' } }}
                    />
                </RowSection>
                <ColumnSection title="Activación del Servicio">
                    <MotivoToggleInput
                        required
                        source="modoActivacion"
                        label="Modo de Activación"
                        choices={MODO_ACTIVACION_CHOICES}
                    />
                    <TextInput required source="tipoServicio" label="Tipo de Servicio" />
                </ColumnSection>
                <GridSection title="Horarios de Atención">
                    <DateTimeInput required source="fechaHoraAtencion" label="Fecha y Hora de Atención" defaultValue={new Date()} />
                    <NumberInput required source="tiempoTrasladoMinutos" label="Tiempo de Traslado (minutos)" />
                </GridSection>
                <ColumnSection title="Ubicación">
                    <MapInput name="location" />
                    <TextInput required source="ubicacion.calle" label="Calle" />
                    <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput required source="ubicacion.entreCalles1" label="Entre" />
                        <TextInput required source="ubicacion.entreCalles2" label="Y" />
                    </Box>
                    <TextInput required source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput required source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>
                <ColumnSection title="Gravedad">
                    <MotivoToggleInput
                        required
                        source="gravedad"
                        label="Gravedad de la Emergencia"
                        choices={GRAVEDAD_CHOICES}
                    />
                </ColumnSection>
                <RowSection title="Recorrido" border={true}>
                    <NumberInput required source="kmRecorridos" label="Kilómetros Recorridos" />
                </RowSection>
                <ColumnSection title="Observaciones">
                    <TextInputWithCounter required source="observacionesGenerales" label="Observaciones Generales" maxLength={500} rows={2} />
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                        Evidencias Adicionales
                    </Typography>
                    <ImageInput
                        sx={evidenceBoxSx}
                        source="evidencia"
                        accept={{ 'image/*': ['.png', '.jpg'] }}
                        maxSize={50000000} // 50 MB
                        multiple // Acepta múltiples imágenes
                        label="Evidencias"
                    >
                        <ImageField source="src" title="title" />
                    </ImageInput>
                </ColumnSection>
                <ColumnSection title="Dictamen">
                    <TextInput required source="dictamen" label="Dictamen" />
                </ColumnSection>
                <ColumnSection title="Responsables de la Emergencia">
                    <TextInput required source="responsableInmueble" label="Responsable del Inmueble" />
                    <TextInput required source="responsableZona" label="Responsable de la Zona" />
                </ColumnSection>
                <ColumnSection title="Autoridades y Dependencias Participantes">
                    <MotivoToggleInput
                        required
                        source="autoridadesParticipantes"
                        label="Autoridades y Dependencias Participantes"
                        choices={AUTORIDADES_CHOICES}
                    />
                    <TextInput source="autoridadesParticipantesOtros" label="Otros (especificar)" fullWidth />
                </ColumnSection>
            </SimpleForm>
        </Create>
    );
};

export const RUShow = () => {
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    return (
        <Show aside={isSmall ? undefined : <PanelHistorialCambios />} >
            <SimpleShowLayout>
                {/* Mostrar historial de cambios arriba de reporte en pantallas pequeñas */}
                {isSmall ? <CompactoHistorialCambios /> : null}
                <RowSection title="Folio y Fecha" border={true} labeled>
                    <TextField source="folio" label="Folio" />
                    <DateField source="fecha" label="Fecha" showTime />
                </RowSection>

                <RowSection title="Turno y Personal" border={true} labeled>
                    <TextField source="turno" label="Turno" />
                    <TextField source="personalACargo" label="Nombre del Personal a Cargo" />
                </RowSection>

                <ColumnSection title="Activación del Servicio" labeled>
                    <TextField source="modoActivacion" label="Modo de Activación" />
                    <TextField source="tipoServicio" label="Tipo de Servicio" />
                </ColumnSection>

                <GridSection title="Horarios de Atención" labeled>
                    <DateField source="fechaHoraAtencion" label="Fecha y Hora de Atención" showTime />
                    <TextField source="tiempoTrasladoMinutos" label="Tiempo de Traslado (minutos)" />
                </GridSection>

                <ColumnSection title="Ubicación" labeled>
                    <TextField source="ubicacion.direccion" label="Dirección" />
                    <Box sx={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextField source="ubicacion.entreCalles1" label="Entre" />
                        <TextField source="ubicacion.entreCalles2" label="Y" />
                    </Box>
                    <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>

                <ColumnSection title="Gravedad" labeled>
                    <TextField source="gravedad" label="Gravedad de la Emergencia" />
                </ColumnSection>

                <RowSection title="Recorrido" border={true} labeled>
                    <TextField source="kmRecorridos" label="Kilómetros Recorridos" />
                </RowSection>

                <ColumnSection title="Observaciones" labeled>
                    <TextField source="observacionesGenerales" label="Observaciones Generales" />
                    <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                        Evidencias Adicionales
                    </Typography>
                    <ImageField source="evidencia" label="Evidencias" />
                </ColumnSection>

                <ColumnSection title="Dictamen" labeled>
                    <TextField source="dictamen" label="Dictamen" />
                </ColumnSection>

                <ColumnSection title="Responsables de la Emergencia" labeled>
                    <TextField source="responsableInmueble" label="Responsable del Inmueble" />
                    <TextField source="responsableZona" label="Responsable de la Zona" />
                </ColumnSection>

                <ColumnSection title="Autoridades y Dependencias Participantes" labeled>
                    <TextField source="autoridadesParticipantes" label="Autoridades y Dependencias Participantes" />
                    <TextField source="autoridadesParticipantesOtros" label="Otros (especificar)" />
                </ColumnSection>
            </SimpleShowLayout>
        </Show>
    );
};