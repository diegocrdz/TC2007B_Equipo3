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
    TabbedForm,
    SelectInput,
    TabbedShowLayout,
    DateInput,
    TimeInput,
    NumberInput,
    CheckboxGroupInput,
} from "react-admin";

import { useWatch, useFormContext, useFieldArray } from "react-hook-form";
import { useEffect } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { IconButton, Button, Stack } from "@mui/material";
// Opciones para los campos SelectInput
import { MOTIVO_CHOICES, OCURRENCIA_CHOICES, SEXO_CHOICES, PRODUCTO_CHOICES,
    AGENTE_CHOICES, TIPO_ACCIDENTE_CHOICES, IMPACTO_CHOICES,
    PARABRISAS_CHOICES, VOLANTE_CHOICES, SI_NO_CHOICES,
    CINTURON_CHOICES, DENTRO_VEHICULO_CHOICES, ATROPELLADO_CHOICES,
    ORIGEN_PROBABLE_CHOICES, NIVEL_CONSCIENCIA_CHOICES, DEGLUCION_CHOICES,
    VIA_AEREA_CHOICES, VENTILACION_CHOICES, AUSCULTACION_CHOICES,
    HEMITORAX_CHOICES, SITIO_CHOICES, PRESENCIA_PULSOS_CHOICES,
    CALIDAD_CHOICES, PIEL_CHOICES, CARACTERISTICAS_CHOICES
} from "./opciones";

export const RMFilters = [
    <TextInput source="q" label={'ra.action.search'} alwaysOn />,
    <ReferenceInput source="userId" label="User" reference="users" />,
]

export const RMList = () => {
    // Verificar acceso del usuario
    const { canAccess } = useCanAccess({ resource: 'posts', action: 'delete' });

    return (
        // Si el usuario tiene permiso, mostrar filtros
        <List filters={canAccess ? RMFilters : undefined}>
            <DataTable>
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="folio" label="Folio" />
                <DataTable.Col source="fecha" label="Fecha" />
                <DataTable.Col source="nombre_paciente" label="Nombre paciente" />
                <DataTable.Col source="nombre_testigo" label="Nombre testigo" />
                <DataTable.Col source="nombre_paramedico" label="Nombre paramédico" />
                <DataTable.Col source="nombre_medico" label="Nombre médico" />
                <DataTable.Col>
                    <EditButton />
                </DataTable.Col>
            </DataTable>
        </List>
    );
};

export const RMEdit = () => {

    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('Cambios guardados', { undoable: true });
        redirect('/posts');
        refresh();
    };

    return (
        <Edit mutationOptions={{ onSuccess }} >
            <SimpleForm warnWhenUnsavedChanges>
                <TextInput source="folio" label="Folio" />
                <TextInput source="fecha" label="Fecha" />
                <TextInput source="nombre_paciente" label="Nombre paciente" />
                <TextInput source="nombre_testigo" label="Nombre testigo" />
                <TextInput source="nombre_paramedico" label="Nombre paramédico" />
                <TextInput source="nombre_medico" label="Nombre médico" />
            </SimpleForm>
        </Edit>
    );
};

export const RMCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="folio" label="Folio" />
            <TextInput source="fecha" label="Fecha" />
            <TextInput source="nombre_paciente" label="Nombre paciente" />
            <TextInput source="nombre_testigo" label="Nombre testigo" />
            <TextInput source="nombre_paramedico" label="Nombre paramédico" />
            <TextInput source="nombre_medico" label="Nombre médico" />
        </SimpleForm>
    </Create>
);

// Estilos para diferentes layouts en las secciones del formulario
const rowLayoutStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1em',
    width: '100%',
};
const columnLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    width: '100%',
};
const gridLayoutStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1em',
    width: '100%',
};

// Estilo personalizado para CheckboxGroupInput en 3 columnas
export const checkboxGrid3Style = {
    '& .MuiFormGroup-root': {
        display: 'grid',
        gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
        },
        gap: '0.5em',
        width: '80%'
    }
};

// Componentes para secciones con diferentes layouts
const RowSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={rowLayoutStyle}>
            {children}
        </div>
    </div>
);
const ColumnSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        {children}
    </div>
);
const GridSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={gridLayoutStyle}>
            {children}
        </div>
    </div>
);

// Componente de TextInput con límite de caracteres
const TextInputWithCounter = ({
    source, label, maxLength = 0, multiline = true
}: {
    source: string;
    label: string;
    maxLength?: number;
    multiline?: boolean;
}) => {
    const value = useWatch({ name: source }) || "";
    return (
        <Box width="100%">
            <TextInput
                source={source}
                label={label}
                multiline={multiline}
                fullWidth
                slotProps={{ input: { inputProps: { maxLength } } }}
            />
            <Typography
                variant="caption"
                color={value.length > maxLength ? "error" : "textSecondary"}
                sx={{ display: "block", textAlign: "right", mt: 0.5 }}
            >{value.length}/{maxLength}
            </Typography>
        </Box>
    );
};
export default TextInputWithCounter;

// Componente para manejar un arreglo de vehículos con agregar/eliminar
const VehiclesRepeater = () => {
    const notify = useNotify();
    const { control } = useFormContext();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "datos_legales.vehiculos", // ← usamos un ARREGLO
    });

    useEffect(() => {
        if (fields.length === 0) append({ tipo: "", placas: "" });
    }, []);

    const handleRemove = (index: number) => {
        if (fields.length <= 1) {
            notify("Debe permanecer al menos un vehículo.", { type: "warning" });
            return;
        }
        remove(index);
    };
    const handleAdd = () => append({ tipo: "", placas: "" });

    return (
        <Box sx={{ width: "100%" }}>
            {fields.map((field, index) => (
                <Box
                    key={field.id}
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr auto" },
                        gap: 2,
                        mb: 1,
                        alignItems: "center",
                    }}
                >
                    <TextInput
                        source={`datos_legales.vehiculos.${index}.tipo`}
                        label="Tipo y marca"
                        fullWidth
                    />
                    <TextInput
                        source={`datos_legales.vehiculos.${index}.placas`}
                        label="Placas"
                        fullWidth
                    />
                    <Stack
                        direction="row"
                        sx={{ alignSelf: 'flex-start' }}
                    >
                        <IconButton
                            aria-label="Eliminar"
                            onClick={() => handleRemove(index)}
                            sx={{ transform: 'translateY(8px)' }}
                        >
                            <RemoveCircleOutlineIcon />
                        </IconButton>
                    </Stack>
                </Box>
            ))}
            <Button variant="outlined" startIcon={<AddCircleOutlineIcon />} onClick={handleAdd}>
                Agregar vehículo
            </Button>
        </Box>
    );
};

export const RMCreate2 = () => ( // Prototipo con los campos del reporte de papel
    <Create
        sx={{
            marginBottom: '5em',
        }}
    >
        <TabbedForm>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Datos Servicio">
                <RowSection title="Folio y Fecha">
                    <TextInput required source="folio" label="Folio" />
                    <DateInput required source="fecha" label="Fecha"
                        defaultValue={new Date()} // Fecha actual por defecto
                    />
                </RowSection>
                <GridSection title="Horas">
                    <TimeInput source="horaLlam" label="Hora Llamada" />
                    <TimeInput source="horaSal" label="Hora Salida" />
                    <TimeInput source="horaLlegada" label="Hora Llegada" />
                    <TimeInput source="horaTras" label="Hora Traslado" />
                    <TimeInput source="horaHos" label="Hora Hospital" />
                    <TimeInput source="salodaHos" label="Salida Hospital" />
                    <TimeInput source="horaBase" label="Hora Base" />
                </GridSection>
                <ColumnSection title="Involucrados">
                    <TextInput required source="nombre_paciente" label="Nombre paciente" />
                    <TextInput required source="nombre_testigo" label="Nombre testigo" />
                    <TextInput required source="nombre_paramedico" label="Nombre paramédico" />
                    <TextInput source="nombre_medico" label="Nombre médico" />
                </ColumnSection>
                <ColumnSection title="Motivo del Servicio">
                    <SelectInput
                        source="motivo"
                        label="Motivo"
                        choices={MOTIVO_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                </ColumnSection>
                <ColumnSection title="Ubicación">
                    <TextInput source="ubicacion.calle" label="Calle" />
                    <div style={{ display: 'flex', gap: '1em', width: '100%' }}>
                        <TextInput source="ubicacion.numExt" label="Entre" />
                        <TextInput source="ubicacion.numInt" label="Y" />
                    </div>
                    <TextInput source="ubicacion.colonia" label="Colonia o Comunidad" />
                    <TextInput source="ubicacion.municipio" label="Alcaldía o Municipio" />
                </ColumnSection>
                <ColumnSection title="Motivo del Servicio">
                    <SelectInput
                        source="motivo"
                        label="Motivo"
                        choices={OCURRENCIA_CHOICES}
                        optionText="name"
                        optionValue="id"
                    />
                    <TextInput source="motivo" label="Otro (especificar)" />
                </ColumnSection>
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Control">
                <TextInput source="control.numAmbulancia" label="Número de ambulancia" />
                <TextInput source="control.operador" label="Operador" />
                <TextInput source="control.tum" label="T.U.M." />
                <TextInput source="control.socorrista" label="Socorrista" />
                <TextInput source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedForm.Tab>
            { /*------------------------------------------------------*/}
            <TabbedForm.Tab label="Avanzado">
                <div style={{
                    marginBottom: '1em',
                    width: '100%',
                }}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='subtitle1'>
                                III Datos del Paciente
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput
                                source="paciente.sexo"
                                label="Sexo"
                                choices={SEXO_CHOICES}
                                optionText="name"
                                optionValue="id"
                            />
                            <NumberInput source="paciente.edad" label="Edad" />
                            <ColumnSection title="Ubicación">
                                <TextInput source="" label="Domicilio" />
                                <TextInput source="" label="Colonia o Comunidad" />
                                <TextInput source="" label="Alcaldía o Municipio" />
                            </ColumnSection>
                            <ColumnSection title="Detalles">
                                <TextInput source="" label="Derechohabiente a" />
                                <NumberInput source="" label="Teléfono" />
                                <TextInput source="" label="Ocupación" />
                            </ColumnSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                IV Parto
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ColumnSection title="Datos de la madre">
                                <TextInput source="parto.semanas" label="Semanas de gesta" />
                                <TimeInput source="parto.hora_contracciones" label="Hora de inicio de contracciones" />
                            </ColumnSection>
                            <RowSection title="">
                                <TextInput source="parto.frecuencia" label="Frecuencia" />
                                <TextInput source="parto.duracion" label="Duración" />
                            </RowSection>
                            <ColumnSection title="Datos post-parto y del recién nacido">
                                <TimeInput source="parto.hora_nacimiento" label="Hora de nacimiento" />
                                <TextInput source="parto.placenta" label="Placenta expulsada" />
                                <RowSection title="">
                                    <SelectInput
                                        source="parto.producto"
                                        label="Producto"
                                        choices={PRODUCTO_CHOICES}
                                        optionText="name"
                                        optionValue="id"
                                    />
                                    <SelectInput
                                        source="parto.sexo"
                                        label="Sexo"
                                        choices={SEXO_CHOICES}
                                        optionText="name"
                                        optionValue="id"
                                    />
                                </RowSection>
                                <ColumnSection title="Puntaje de APGAR">
                                    <NumberInput source="parto.edad_gestacional" label="Edad gestacional" />
                                    <NumberInput source="parto.apgar_1min" label="1 minuto" />
                                    <NumberInput source="parto.apgar_5min" label="5 minutos" />
                                    <NumberInput source="parto.apgar_10min" label="10 minutos" />
                                    <NumberInput source="parto.apgar_15min" label="15 minutos" />
                                    <NumberInput source="parto.apgar_20min" label="20 minutos" />
                                </ColumnSection>
                            </ColumnSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                V Causa Traumática
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={checkboxGrid3Style}>
                                <CheckboxGroupInput
                                    source="Agente.causal"
                                    label="Agente Causal"
                                    choices={AGENTE_CHOICES}
                                />
                            </Box>
                            <TextInput source="Agente.especificar" label="Otro (Especifique)" />
                            <ColumnSection title="Accidente Automovilístico">
                                <CheckboxGroupInput
                                    source="accidente.tipo"
                                    label="Tipo de accidente"
                                    choices={TIPO_ACCIDENTE_CHOICES}
                                />
                                <CheckboxGroupInput
                                    source="accidente.impacto"
                                    label="Impacto"
                                    choices={IMPACTO_CHOICES}
                                />
                                <TextInput source="accidente.cms" label="CMS" />
                                <SelectInput
                                    source="accidente.parabrisas"
                                    label="Parabrisas"
                                    choices={PARABRISAS_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.volante"
                                    label="Volante"
                                    choices={VOLANTE_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.bolsa"
                                    label="Bolsa de aire"
                                    choices={SI_NO_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.cinturon"
                                    label="Cinturón de seguridad"
                                    choices={CINTURON_CHOICES}
                                />
                                <SelectInput
                                    source="accidente.dentroVehiculo"
                                    label="Dentro del vehículo"
                                    choices={DENTRO_VEHICULO_CHOICES}
                                />
                            </ColumnSection>
                            <ColumnSection title="Atropellado">
                                <SelectInput
                                    source="atropellado.vehiculo"
                                    label="Tipo de vehículo"
                                    choices={ATROPELLADO_CHOICES}
                                />
                            </ColumnSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VI Causa Clínica
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={checkboxGrid3Style}>
                                <CheckboxGroupInput
                                    source="causa_clinica.origen_probable"
                                    label="Origen Probable"
                                    choices={ORIGEN_PROBABLE_CHOICES}
                                />
                            </Box>
                            <TextInput source="causa_clinica.especifique" label="Otro (Especifique)" />
                            <RowSection title="Frecuencia">
                                <TextInput source="causa_clinica.primeraVez" label="1.ª vez" />
                                <TextInput source="causa_clinica.subsecuente" label="Subsecuente" />
                            </RowSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VII Evaluación Inicial
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectInput
                                source="evaluacion_inicial.nivelConsciencia"
                                label="Nivel de Consciencia"
                                choices={NIVEL_CONSCIENCIA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.deglucion"
                                label="Deglución"
                                choices={DEGLUCION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.viaAerea"
                                label="Vía Aérea"
                                choices={VIA_AEREA_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.ventilacion"
                                label="Ventilación"
                                choices={VENTILACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.auscultacion"
                                label="Auscultación"
                                choices={AUSCULTACION_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.hemitorax"
                                label="Hemitórax"
                                choices={HEMITORAX_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.sitio"
                                label="Sitio"
                                choices={SITIO_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.presencia_pulsos"
                                label="Presencia de Pulsos"
                                choices={PRESENCIA_PULSOS_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.calidad"
                                label="Calidad"
                                choices={CALIDAD_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.piel"
                                label="Piel"
                                choices={PIEL_CHOICES}
                            />
                            <SelectInput
                                source="evaluacion_inicial.caracteristicas"
                                label="Características"
                                choices={CARACTERISTICAS_CHOICES}
                            />
                            <ColumnSection title="Observaciones Adicionales">
                                <TextInputWithCounter
                                    source="evaluacion_inicial.observaciones"
                                    label="Observaciones adicionales"
                                    maxLength={500}
                                    multiline
                                />
                            </ColumnSection>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                VIII Evaluación Secundaria
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                IX Traslado
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                X Tratamiento
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XI Observaciones
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInputWithCounter
                                source="observaciones"
                                label="Observaciones"
                                maxLength={1000}
                                multiline
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XII Ministerio Público
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextInput
                                source="ministerio_publico.sello"
                                label="Sello Ministerio Público Notificado"
                            />
                            <TextInput
                                source="ministerio_publico.funcionario"
                                label="Nombre y firma quien recibe"
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1">
                                XIII Datos Legales
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ColumnSection title="Autoridades que tomaron conocimiento">
                                <TextInput source="datos_legales.autoridad_dependencia" label="Dependencia" />
                                <TextInput source="datos_legales.numero_unidad" label="Número de Unidad" />
                                <TextInput source="datos_legales.numero_oficiales" label="Número de los Oficiales" />
                            </ColumnSection>
                            <GridSection title="Vehículos involucrados">
                                <VehiclesRepeater />
                            </GridSection>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </TabbedForm.Tab>
        </TabbedForm>
    </Create>
);

export const RMShow = () => (
    <Show>
        <TabbedShowLayout>
            <TabbedShowLayout.Tab label="Datos del Servicio">
                <TextField source="folio" label="Folio" />
                <TextField source="fecha" label="Fecha" />
                <TextField source="horaLlam" label="Hora Llamada" />
                <TextField source="horaSal" label="Hora Salida" />
                <TextField source="horaLlegada" label="Hora Llegada" />
                <TextField source="horaTras" label="Hora Traslado" />
                <TextField source="horaHos" label="Hora Hospital" />
                <TextField source="salodaHos" label="Salida Hospital" />
                <TextField source="horaBase" label="Hora Base" />
            </TabbedShowLayout.Tab>

            <TabbedShowLayout.Tab label="Control">
                <TextField source="control.numAmbulancia" label="Número de ambulancia" />
                <TextField source="control.operador" label="Operador" />
                <TextField source="control.tum" label="T.U.M." />
                <TextField source="control.socorrista" label="Socorrista" />
                <TextField source="control.helicopteroMatricula" label="Helicóptero (matrícula)" />
            </TabbedShowLayout.Tab>
        </TabbedShowLayout>
    </Show>
);