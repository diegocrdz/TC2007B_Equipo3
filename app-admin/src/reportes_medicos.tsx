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
    DateTimeInput,
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

const checkboxGrid3Style = {
    '& .MuiFormGroup-root': {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
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
                            <ColumnSection title="Agente Causal">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="Agente.causal"
                                        label="Agente Causal"
                                        choices={[
                                            { id: 'Agente.arma', name: 'Arma' },
                                            { id: 'Agente.juguete', name: 'Juguete' },
                                            { id: 'Agente.explosion', name: 'Explosión' },
                                            { id: 'Agente.fuego', name: 'Fuego' },
                                            { id: 'Agente.animal', name: 'Animal' },
                                            { id: 'Agente.bicicleta', name: 'Bicicleta' },
                                            { id: 'Agente.automotor', name: 'Automotor' },
                                            { id: 'Agente.maquinaria', name: 'Maquinaria' },
                                            { id: 'Agente.herramienta', name: 'Herramienta' },
                                            { id: 'Agente.electricoDano', name: 'Eléctrico / Daño' },
                                            { id: 'Agente.sustanciaCaliente', name: 'Sustancia caliente' },
                                            { id: 'Agente.sustanciaToxica', name: 'Sustancia tóxica' },
                                            { id: 'Agente.productoBiologico', name: 'Producto biológico' },
                                            { id: 'Agente.serHumano', name: 'Ser humano' },
                                            { id: 'Agente.otro', name: 'Otro' }
                                        ]}
                                    />
                                </Box>
                                <TextInput source="Agente.especificar" label="Especifique" />
                            </ColumnSection>
                            <ColumnSection title="Accidente Automovilístico">
                                <RowSection title="Tipo de accidente">
                                    <CheckboxGroupInput
                                        source="accidente.tipo"
                                        label=""
                                        choices={[
                                            { id: 'accidente.colision', name: 'Colisión' },
                                            { id: 'accidente.volcadura', name: 'Volcadura' },
                                            { id: 'accidente.automotor', name: 'Automotor' },
                                            { id: 'accidente.bicicleta', name: 'Bicicleta' },
                                            { id: 'accidente.motocicleta', name: 'Motocicleta' },
                                            { id: 'accidente.maquinaria', name: 'Maquinaria' }
                                        ]}
                                    />
                                </RowSection>
                                <RowSection title="Tipo de impacto">
                                    <CheckboxGroupInput
                                        source="accidente.impacto"
                                        label=""
                                        choices={[
                                            { id: 'accidente.contraObjetoFijo', name: 'Contra objeto fijo' },
                                            { id: 'accidente.impacto', name: 'Impacto' },
                                            { id: 'accidente.posterior', name: 'Posterior' }
                                        ]}
                                    />
                                </RowSection>
                                <RowSection title="Tipo de volcadura">
                                    <CheckboxGroupInput
                                        source="accidente.volcadura"
                                        label=""
                                        choices={[
                                            { id: 'accidente.rotacional', name: 'Rotacional' },
                                            { id: 'accidente.frontal', name: 'Frontal' },
                                            { id: 'accidente.lateral', name: 'Lateral' }
                                        ]}
                                    />
                                </RowSection>
                                <RowSection title="Detalles del accidente">
                                    <CheckboxGroupInput
                                        source="accidente.detalles"
                                        label=""
                                        choices={[
                                            { id: 'accidente.hundimiento', name: 'Hundimiento' },
                                            { id: 'accidente.parabrisas', name: 'Parabrisas' },
                                            { id: 'accidente.volante', name: 'Volante' },
                                            { id: 'accidente.bolsaAire', name: 'Bolsa de aire' }
                                        ]}
                                    />
                                </RowSection>
                                <RowSection title="Estado del cinturón">
                                    <CheckboxGroupInput
                                        source="accidente.cinturon"
                                        label=""
                                        choices={[
                                            { id: 'accidente.integro', name: 'Íntegro' },
                                            { id: 'accidente.estrellado', name: 'Estrellado' },
                                            { id: 'accidente.doblado', name: 'Doblado' },
                                            { id: 'accidente.si', name: 'Sí' },
                                            { id: 'accidente.no', name: 'No' }
                                        ]}
                                    />
                                </RowSection>
                                <RowSection title="Cinturón de seguridad y ubicación">
                                    <CheckboxGroupInput
                                        source="accidente.ubicacion"
                                        label=""
                                        choices={[
                                            { id: 'accidente.dentroVehiculo', name: 'Dentro del vehículo' },
                                            { id: 'accidente.colocado', name: 'Colocado' },
                                            { id: 'accidente.noColocado', name: 'No colocado' },
                                            { id: 'accidente.eyectado', name: 'Eyectado' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Atropellado">
                                <CheckboxGroupInput
                                    source="atropellado.vehiculo"
                                    label="Tipo de vehículo"
                                    choices={[
                                        { id: 'atropellado.automotor', name: 'Automotor' },
                                        { id: 'atropellado.motocicleta', name: 'Motocicleta' },
                                        { id: 'atropellado.bicicleta', name: 'Bicicleta' },
                                        { id: 'atropellado.maquinaria', name: 'Maquinaria' }
                                    ]}
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
                            <ColumnSection title="Origen Probable">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="causa_clinica.origen_probable"
                                        label="Origen Probable"
                                        choices={[
                                            { id: 'causa_clinica.neurologica', name: 'Neurológica' },
                                            { id: 'causa_clinica.infecciosa', name: 'Infecciosa' },
                                            { id: 'causa_clinica.musculoEsqueletico', name: 'Músculo esquelético' },
                                            { id: 'causa_clinica.urogenital', name: 'Urogenital' },
                                            { id: 'causa_clinica.digestiva', name: 'Digestiva' },
                                            { id: 'causa_clinica.cardiovascular', name: 'Cardiovascular' },
                                            { id: 'causa_clinica.oncologico', name: 'Oncológico' },
                                            { id: 'causa_clinica.metabolico', name: 'Metabólico' },
                                            { id: 'causa_clinica.ginecoobstetrica', name: 'Ginecoobstétrica' },
                                            { id: 'causa_clinica.respiratorio', name: 'Respiratorio' },
                                            { id: 'causa_clinica.otro', name: 'Otro' },
                                            { id: 'causa_clinica.cognitivoEmocional', name: 'Cognitivo emocional' }
                                        ]}
                                    />
                                </Box>
                            </ColumnSection>
                            <ColumnSection title="Especifique">
                                <TextInput source="causa_clinica.especifique" label="Especifique" multiline />
                            </ColumnSection>
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
                            <ColumnSection title="Nivel de Consciencia">
                                <RowSection title="">
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.nivelConsciencia"
                                        label=""
                                        choices={[
                                            { id: 'evaluacion.alerta', name: 'Alerta' },
                                            { id: 'evaluacion.dolor', name: 'Dolor' },
                                            { id: 'evaluacion.verbal', name: 'Verbal' },
                                            { id: 'evaluacion.inconsciente', name: 'Inconsciente' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Deglución">
                                <RowSection title="">
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.deglucion"
                                        label="Deglución"
                                        choices={[
                                            { id: 'evaluacion.ausente', name: 'Ausente' },
                                            { id: 'evaluacion.presente', name: 'Presente' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Vía Aérea">
                                <RowSection title="">
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.viaAerea"
                                        label="Vía Aérea"
                                        choices={[
                                            { id: 'evaluacion.permeable', name: 'Permeable' },
                                            { id: 'evaluacion.comprometida', name: 'Comprometida' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Ventilación">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.ventilacion"
                                        label="Ventilación"
                                        choices={[
                                            { id: 'evaluacion.automatismoRegular', name: 'Automatismo regular' },
                                            { id: 'evaluacion.automatismoIrregular', name: 'Automatismo irregular' },
                                            { id: 'evaluacion.apnea', name: 'Apnea' },
                                            { id: 'evaluacion.automatismoRapido', name: 'Automatismo rápido' },
                                            { id: 'evaluacion.automatismoSuperficial', name: 'Automatismo superficial' }
                                        ]}
                                    />
                                </Box>
                            </ColumnSection>
                            <ColumnSection title="Auscultación">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.auscultacion"
                                        label="Auscultación"
                                        choices={[
                                            { id: 'evaluacion.ruidosNormales', name: 'Ruidos respiratorios normales' },
                                            { id: 'evaluacion.ruidosDisminuidos', name: 'Ruidos respiratorios disminuidos' },
                                            { id: 'evaluacion.ruidosAusentes', name: 'Ruidos respiratorios ausentes' },
                                            { id: 'evaluacion.hemitoraxD', name: 'Hemitórax Derecho' },
                                            { id: 'evaluacion.hemitoraxI', name: 'Hemitórax Izquierdo' },
                                            { id: 'evaluacion.sitioApical', name: 'Sitio Apical' },
                                            { id: 'evaluacion.sitioBase', name: 'Sitio Base' }
                                        ]}
                                    />
                                </Box>
                            </ColumnSection>
                            <ColumnSection title="Presencia de Pulsos">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.presencia_pulsos"
                                        label="Presencia de Pulsos"
                                        choices={[
                                            { id: 'evaluacion.carotideo', name: 'Carótideo' },
                                            { id: 'evaluacion.radial', name: 'Radial' },
                                            { id: 'evaluacion.paroCardiorespiratorio', name: 'Paro cardiorespiratorio' }
                                        ]}
                                    />
                                </Box>
                            </ColumnSection>
                            <ColumnSection title="Calidad">
                                <RowSection title="">
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.calidad"
                                        label=""
                                        choices={[
                                            { id: 'evaluacion.rapido', name: 'Rápido' },
                                            { id: 'evaluacion.lento', name: 'Lento' },
                                            { id: 'evaluacion.ritmico', name: 'Rítmico' },
                                            { id: 'evaluacion.arritmico', name: 'Arrítmico' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Piel">
                                <Box sx={checkboxGrid3Style}>
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.piel"
                                        label="Piel"
                                        choices={[
                                            { id: 'evaluacion.normal', name: 'Normal' },
                                            { id: 'evaluacion.palida', name: 'Pálida' },
                                            { id: 'evaluacion.cianotica', name: 'Cianótica' }
                                        ]}
                                    />
                                </Box>
                            </ColumnSection>
                            <ColumnSection title="Características">
                                <RowSection title="">
                                    <CheckboxGroupInput
                                        source="evaluacion_inicial.caracteristicas"
                                        label=""
                                        choices={[
                                            { id: 'evaluacion.caliente', name: 'Caliente' },
                                            { id: 'evaluacion.fria', name: 'Fría' },
                                            { id: 'evaluacion.diaforesis', name: 'Diaforesis' },
                                            { id: 'evaluacion.normotermico', name: 'Normotérmico' }
                                        ]}
                                    />
                                </RowSection>
                            </ColumnSection>
                            <ColumnSection title="Observaciones Adicionales">
                                <TextInputWithCounter
                                    source="evaluacion_inicial.observaciones"
                                    label="Observaciones adicionales"
                                    maxLength={500}
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

const MOTIVO_CHOICES = [
    { id: "enfermedad", name: "Enfermedad" },
    { id: "traumatismo", name: "Traumatismo" },
    { id: "ginecoobstetrico", name: "Ginecoobstétrico" },
];

const OCURRENCIA_CHOICES = [
    { id: "transporte_publico", name: "Transporte público" },
    { id: "escuela", name: "Escuela" },
    { id: "trabajo", name: "Trabajo" },
    { id: "hogar", name: "Hogar" },
    { id: "recreacion_deporte", name: "Recreación y Deporte" },
    { id: "via_publica", name: "Vía Pública" },
    { id: "otro", name: "Otro" },
];

const SEXO_CHOICES = [
    { id: 'masculino', name: 'MASC' },
    { id: 'femenino', name: 'FEM' },
];

const PRODUCTO_CHOICES = [
    { id: 'vivo', name: 'Vivo' },
    { id: 'muerto', name: 'Muerto' },
];

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