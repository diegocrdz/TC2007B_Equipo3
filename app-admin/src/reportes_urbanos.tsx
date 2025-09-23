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
import { RowSection, ColumnSection, GridSection, checkboxGrid3Style, TextInputWithCounter, MyToolbar } from "./componentes";
import { Typography } from "@mui/material";

// Filtros para la lista
export const RUFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const RUList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? RUFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="tipo_servicio" label="Tipo de Servicio" />
                <DataTable.Col source="gravedad" label="Gravedad" />
                <DataTable.Col source="personal_a_cargo" label="Personal a Cargo" />
                <DataTable.Col source="ubicacion.direccion" label="Ubicación" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
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
                <DateInput source="fecha" label="Fecha" />
                <TextInput source="personal_a_cargo" label="Personal a Cargo" />
                <SelectInput
                    source="tipo_servicio"
                    label="Tipo de Servicio"
                    optionText="name"
                    optionValue="id"
                />
                <SelectInput
                    source="gravedad"
                    label="Gravedad"
                    choices={GRAVEDAD_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
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
                <TextInput required source="personal_a_cargo" label="Nombre del Personal a Cargo" />
            </RowSection>
            <ColumnSection title="Activación del Servicio">
                <SelectInput
                    required
                    source="modo_activacion"
                    label="Modo de Activación"
                    choices={MODO_ACTIVACION_CHOICES}
                    optionText="name"
                    optionValue="id"
                />
            </ColumnSection>
            <TextInput required source="tipo_servicio" label="Tipo de Servicio" />
            <GridSection title="Horarios de Atención">
                <DateTimeInput required source="fecha_hora_atencion" label="Fecha y Hora de Atención" defaultValue={new Date()} />
                <NumberInput required source="tiempo_traslado_minutos" label="Tiempo de Traslado (minutos)" />
            </GridSection>
            <ColumnSection title="Ubicación">
                <TextInput required source="ubicacion.direccion" label="Dirección" />
                <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                    <TextInput required source="ubicacion.entre_calles_1" label="Entre" />
                    <TextInput required source="ubicacion.entre_calles_2" label="Y" />
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
                <NumberInput required source="km_recorridos" label="Kilómetros Recorridos" />
            </RowSection>
            <ColumnSection title="Observaciones">
                <TextInputWithCounter required source="observaciones_generales" label="Observaciones Generales" maxLength={500} rows={2} />
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
                <TextInput required source="responsable_inmueble" label="Responsable del Inmueble" />
                <TextInput required source="responsable_zona" label="Responsable de la Zona" />
            </ColumnSection>
            <CheckboxGroupInput sx={checkboxGrid3Style}
                source="autoridades_participantes"
                label="Autoridades y Dependencias Participantes"
                choices={AUTORIDADES_CHOICES}
            />
        </SimpleForm>
    </Create>
);

const MODO_ACTIVACION_CHOICES = [
    { id: "llamada_emergencia", name: "Llamada de emergencia" },
    { id: "seguimiento_oficio", name: "Seguimiento de oficio" },
];

const GRAVEDAD_CHOICES = [
    { id: "baja", name: "Baja" },
    { id: "media", name: "Media" },
    { id: "alta", name: "Alta" },
];

const AUTORIDADES_CHOICES = [
    { id: "seguridad_publica", name: "Seguridad Pública" },
    { id: "policia", name: "Policía" },
    { id: "bomberos", name: "Bomberos" },
    { id: "cruz_roja", name: "Cruz Roja" },
    { id: "otra", name: "Otra" },
];

export const RUShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="folio" label="Folio" />
            <DateField source="fecha" label="Fecha" showTime />
            <TextField source="turno" label="Turno" />
            <TextField source="personal_a_cargo" label="Nombre del Personal a Cargo" />
            <TextField source="modo_activacion" label="Modo de Activación" />
            <TextField source="tipo_servicio" label="Tipo de Servicio" />
            <DateField source="fecha_hora_atencion" label="Fecha y Hora de Atención" showTime />
            <TextField source="tiempo_traslado_minutos" label="Tiempo de Traslado (minutos)" />
            <TextField source="ubicacion.direccion" label="Dirección" />
            <TextField source="ubicacion.entre_calles_1" label="Entre" />
            <TextField source="ubicacion.entre_calles_2" label="Y" />
            <TextField source="ubicacion.colonia" label="Colonia o Comunidad" />
            <TextField source="ubicacion.municipio" label="Alcaldía o Municipio" />
            <TextField source="ubicacion.latitud" label="Latitud" />
            <TextField source="ubicacion.longitud" label="Longitud" />
            <TextField source="gravedad" label="Gravedad de la Emergencia" />
            <TextField source="km_recorridos" label="Kilómetros Recorridos" />
            <TextField source="observaciones_generales" label="Observaciones Generales" />
            <ImageField source="evidencia" label="Evidencias" />
            <TextField source="dictamen" label="Dictamen" />
            <TextField source="responsable_inmueble" label="Responsable del Inmueble" />
            <TextField source="responsable_zona" label="Responsable de la Zona" />
            <TextField source="autoridades_participantes" label="Autoridades y Dependencias Participantes" />
        </SimpleShowLayout>
    </Show>
);
