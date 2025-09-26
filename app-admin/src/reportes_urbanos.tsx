/*
    Formularios para Reportes Urbanos
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
    SelectInput,
    DateInput,
    NumberInput,
    DateTimeInput,
    CheckboxGroupInput,
    ImageInput,
    ImageField,
    SimpleShowLayout,
    DateField,
} from "react-admin";
// Componentes personalizados
import { RowSection, ColumnSection, GridSection, checkboxGrid3Style, TextInputWithCounter, MyToolbar, listBoxSx } from "./componentes";
import { Typography, Box } from "@mui/material";
import EmergencyIcon from '@mui/icons-material/Emergency';
// Opciones para SelectInput
import { MODO_ACTIVACION_CHOICES, GRAVEDAD_CHOICES, AUTORIDADES_CHOICES } from "./opciones";

// Filtros para la lista
export const RUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="usuarioId" label="Usuario" reference="usuarios">
        <SelectInput optionText={(choice) => `${choice.usuario} (${choice.rol})`} />
    </ReferenceInput>,
    <DateInput source="fecha" label="Fecha" />,
    <TextInput source="tipoServicio" label="Tipo de Servicio" />,
    <SelectInput 
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
            
            <List filters={canAccess ? RUFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="tipoServicio" label="Tipo de Servicio" />
                <DataTable.Col source="gravedad" label="Gravedad" />
                <DataTable.Col source="personalACargo" label="Personal a Cargo" />
                <DataTable.Col source="ubicacion.direccion" label="Ubicación" />
                <DataTable.Col>
                <EditButton />
                </DataTable.Col>
            </DataTable>
            </List>
        </Box>
    );
};

export const RUEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/reportes_urbanos');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="folio" label="Folio" />
                <DateInput disabled source="fecha" label="Fecha" />
                <SelectInput
                    disabled
                    source="tipoServicio"
                    label="Tipo de Servicio"
                    optionText="name"
                    optionValue="id"
                />
                <SelectInput
                    disabled
                    source="gravedad"
                    label="Gravedad"
                    choices={GRAVEDAD_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
                <TextInput disabled source="personalACargo" label="Personal a Cargo" />
                <TextInput disabled source="ubicacion.direccion" label="Dirección" />
            </SimpleForm>
        </Edit>
    );
};

export const RUCreate = () => ( // Formulario completo para reporte de emergencias urbanas
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <SimpleForm warnWhenUnsavedChanges toolbar={<MyToolbar />} >
            <RowSection title="Folio y Fecha">
                <TextInput required source="folio" label="Folio" />
                <DateTimeInput required source="fecha" label="Fecha" defaultValue={new Date()} />
            </RowSection>
            <RowSection title="Turno y Personal">
                <TextInput required source="turno" label="Turno" />
                <TextInput required source="personalACargo" label="Nombre del Personal a Cargo" />
            </RowSection>
            <ColumnSection title="Activación del Servicio">
                <SelectInput
                    required
                    source="modoActivacion"
                    label="Modo de Activación"
                    choices={MODO_ACTIVACION_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
            </ColumnSection>
            <TextInput required source="tipoServicio" label="Tipo de Servicio" />
            <GridSection title="Horarios de Atención">
                <DateTimeInput required source="fechaHoraAtencion" label="Fecha y Hora de Atención" defaultValue={new Date()} />
                <NumberInput required source="tiempoTrasladoMinutos" label="Tiempo de Traslado (minutos)" />
            </GridSection>
            <ColumnSection title="Ubicación">
                <TextInput required source="ubicacion.direccion" label="Dirección" />
                <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                    <TextInput required source="ubicacion.entreCalles1" label="Entre" />
                    <TextInput required source="ubicacion.entreCalles2" label="Y" />
                </div>
                <TextInput required source="ubicacion.colonia" label="Colonia o Comunidad" />
                <TextInput required source="ubicacion.municipio" label="Alcaldía o Municipio" />
            </ColumnSection>
            <RowSection title="Gravedad">
                <SelectInput
                    required
                    source="gravedad"
                    label="Gravedad de la Emergencia"
                    choices={GRAVEDAD_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
            </RowSection>
            <RowSection title="Recorrido">
                <NumberInput required source="kmRecorridos" label="Kilómetros Recorridos" />
            </RowSection>
            <ColumnSection title="Observaciones">
                <TextInputWithCounter required source="observacionesGenerales" label="Observaciones Generales" maxLength={500} rows={2} />
                <Typography variant="h6" gutterBottom sx={{ marginTop: '1em' }}>
                    Evidencias Adicionales
                </Typography>
                <ImageInput
                    source="evidencia"
                    accept={{ 'image/*': ['.png', '.jpg'] }}
                    maxSize={50000000} // 50 MB
                    multiple // Acepta múltiples imágenes
                    label="Evidencias"
                >
                    <ImageField source="src" title="title" />
                </ImageInput>
            </ColumnSection>
            <TextInput required source="dictamen" label="Dictamen" />
            <ColumnSection title="Responsables de la Emergencia">
                <TextInput required source="responsableInmueble" label="Responsable del Inmueble" />
                <TextInput required source="responsableZona" label="Responsable de la Zona" />
            </ColumnSection>
            <CheckboxGroupInput sx={checkboxGrid3Style}
                source="autoridadesParticipantes"
                label="Autoridades y Dependencias Participantes"
                choices={AUTORIDADES_CHOICES}
            />
        </SimpleForm>
    </Create>
);

export const RUShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="folio" label="Folio" />
            <DateField source="fecha" label="Fecha" showTime />
            <TextField source="turno" label="Turno" />
            <TextField source="personalACargo" label="Nombre del Personal a Cargo" />
            <TextField source="modoActivacion" label="Modo de Activación" />
            <TextField source="tipoServicio" label="Tipo de Servicio" />
            <DateField source="fechaHoraAtencion" label="Fecha y Hora de Atención" showTime />
            <TextField source="tiempoTrasladoMinutos" label="Tiempo de Traslado (minutos)" />
            <TextField source="ubicacion.direccion" label="Dirección" />
            <TextField source="ubicacion.entreCalles1" label="Entre" />
            <TextField source="ubicacion.entreCalles2" label="Y" />
            <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
            <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
            <TextField source="gravedad" label="Gravedad de la Emergencia" />
            <TextField source="kmRecorridos" label="Kilómetros Recorridos" />
            <TextField source="observacionesGenerales" label="Observaciones Generales" />
            <ImageField source="evidencia" label="Evidencias" />
            <TextField source="dictamen" label="Dictamen" />
            <TextField source="responsableInmueble" label="Responsable del Inmueble" />
            <TextField source="responsableZona" label="Responsable de la Zona" />
            <TextField source="autoridadesParticipantes" label="Autoridades y Dependencias Participantes" />
        </SimpleShowLayout>
    </Show>
);
