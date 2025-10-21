/*
Componentes personalizados reutilizables para formularios
Fecha: 11/08/2025
*/

import * as React from "react";
import { useWatch } from "react-hook-form";
import { TextInput, TimeInput, Labeled } from "react-admin";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Theme, useMediaQuery, TableHead, Button } from "@mui/material";
// Toolbar
import { Toolbar, SaveButton } from 'react-admin';
import { useInput } from "ra-core";
// Historial de cambios
import ShortTextIcon from '@mui/icons-material/ShortText';
import HistoryIcon from '@mui/icons-material/History';
import { useRecordContext } from "react-admin";
import { Stack, Divider } from "@mui/material";
// Tablas
import { Table, TableContainer, TableRow, TableBody, TableCell } from "@mui/material";
// Íconos
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Estilos para diferentes layouts en las secciones del formulario
// Estilo para filas
const rowLayoutStyle = {
    display: 'flex',
    flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'row',
    },
    gap: '1em',
    width: '100%',
};
// Estilo para columnas
const columnLayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1em',
    width: '100%',
    border: '2px solid',
    borderColor: '#485b6fff',
    borderRadius: '8px',
    background: '#ffffff10',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '1em',
    marginBottom: '3em',
};
// Estilo para grid (2 columnas)
const gridLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1em',
    width: '100%',
};

// Estilo personalizado para menús "checkbox"
// 3 columnas para pantallas medianas y grandes
// 1 columna para pantallas pequeñas
export const checkboxGrid3Style = {
    '& .MuiFormGroup-root': {
        display: 'grid',
        gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr',
            md: 'repeat(3, 1fr)',
        },
        gap: '0.5em',
        width: {
            xs: '100%',
            sm: '100%',
            md: '60%',
        },
        // Estilo para cada opción
        '& .MuiFormControlLabel-root': {
            margin: 0,
            padding: '0.5em',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '4px',
        },
    }
};

// Componentes para secciones con diferentes layouts
// Componente para sección en fila
export const RowSection = ({ title, children, border, labeled = false }:
    { title: string; children: React.ReactNode; border: boolean; labeled?: boolean }) => (
    <Box sx={border ? columnLayoutStyle : undefined}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        <Box sx={rowLayoutStyle}>
            {labeled
                // Si labeled es true, envuelve cada hijo Labeled
                // Es usado para show, donde los campos no tienen label por defecto
                ? React.Children.map(children, (child, idx) =>
                    React.isValidElement(child)
                        ? <Labeled key={idx}>{child}</Labeled>
                        : child
                )
                : children
            }
        </Box>
    </Box>
);
// Componente para sección en columna
export const ColumnSection = ({ title, children, labeled = false }:
    { title: string, children: React.ReactNode, labeled?: boolean }) => (
    <Box sx={columnLayoutStyle}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        {labeled
            // Si labeled es true, envuelve cada hijo Labeled
            // Es usado para show, donde los campos no tienen label por defecto
            ? React.Children.map(children, (child, idx) =>
                React.isValidElement(child)
                    ? <Labeled key={idx}>{child}</Labeled>
                    : child
            )
            : children
        }
    </Box>
);
// Componente para sección en grid
export const GridSection = ({ title, children, labeled = false }:
    { title: string, children: React.ReactNode, labeled?: boolean }) => (
    <Box sx={columnLayoutStyle}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        <Box sx={gridLayoutStyle}>
            {labeled
                // Si labeled es true, envuelve cada hijo Labeled
                // Es usado para show, donde los campos no tienen label por defecto
                ? React.Children.map(children, (child, idx) =>
                    React.isValidElement(child)
                        ? <Labeled key={idx}>{child}</Labeled>
                        : child
                )
                : children
            }
        </Box>
    </Box>
);

// Componente para horarios
export const TimeGridSection = ({ title, children, labeled = false }: {
    title: string,
    children: React.ReactNode,
    labeled?: boolean
}) => (
    <Box sx={{
        background: '#ffffff10',
        border: '2px solid',
        borderColor: '#485b6fff',
        borderRadius: '8px',
        padding: 3,
        marginBottom: '4em',
        width: '100%',
    }}>
        <Typography variant="h6" sx={{
            color: 'primary.main',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 3
        }}>
            <AccessTimeIcon fontSize="small" /> {title}
        </Typography>
        <Box sx={{
            display: 'grid',
            gridTemplateColumns: {
                xs: '1fr',
                md: '1fr 1fr 1fr'
            },
            gap: 2,
        }}>
            {React.Children.map(children, (child, index) => (
                <ColumnSection title="" key={index} labeled={labeled}>
                    {React.isValidElement(child) ? child : null}
                </ColumnSection>
            ))}
        </Box>
    </Box>
);
// Componente TimeInput con icono MUI al inicio del label

export const TimeInputWithIcon = ({
    source,
    label,
    icon,
    required = false,
    ...props
}: {
    source: string,
    label: string,
    icon?: React.ReactNode,
    required?: boolean,
    [key: string]: any
}) => (
    <TimeInput
        source={source}
        label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                {label}
            </Box>
        }
        required={required}
        sx={{ width: '100%' }}
        {...props}
    />
);

// Componente de entrada de texto con límite de caracteres
export const TextInputWithCounter = (
    { source, label, maxLength = 0, multiline = true, rows, required = false, disabled = false }: {
        source: string;
        label: string;
        maxLength?: number;
        multiline?: boolean;
        rows?: number;
        required?: boolean;
        disabled?: boolean;
    }) => {
    // Observa el valor del campo para contar caracteres
    const value = useWatch({ name: source }) || "";
    return (
        <Box width="100%">
            <TextInput
                source={source}
                label={label}
                multiline={multiline}
                fullWidth
                rows={rows}
                required={required}
                disabled={disabled}
                slotProps={{ input: { inputProps: { maxLength } } }}
            />
            <Typography
                variant="caption"
                color={value.length > maxLength ? "error" : "textSecondary"}
                sx={{ display: "block", textAlign: "right", mt: 0.5 }}
            >
                {value.length}/{maxLength}
            </Typography>
        </Box>
    );
};

// Componente de botones para múltiples opciones (toggle buttons)
export const MotivoToggleInput = ({ source, label, choices, exclusive = true, required = false }: {
    source: string;
    label: string;
    choices: { id: string; name: string }[];
    exclusive?: boolean;
    required?: boolean;
}) => {
    // Usa useInput para usar el campo en react-admin
    const { field, fieldState } = useInput({
        source,
        // Si es obligatorio, revisa que tenga valor
        validate: required ? (value) => {
            if (!value) {
                return 'Requerido';
            }
            return undefined;
        } : undefined,
    });

    const error = fieldState.error !== undefined;

    return (
        <Box>
            {required
                ? <Typography variant="subtitle2" color="textSecondary">{label}*</Typography>
                : <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
            }
            {exclusive
                ? <Typography variant="caption" color="textSecondary">Selecciona una opción</Typography>
                : <Typography variant="caption" color="textSecondary">Selecciona una o más opciones</Typography>
            }
            {error && (
                <Typography variant="caption" color="error" display="block">Campo requerido</Typography>
            )}
            <ToggleButtonGroup
                value={field.value}
                exclusive={exclusive}
                onChange={(event, newValue) => field.onChange(newValue)}
                aria-label={label}
                sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        sm: '1fr',
                        md: 'repeat(auto-fit, minmax(120px, 1fr))',
                    },
                    width: {
                        xs: '100%',
                        sm: '100%',
                        md: '60%',
                    },
                    marginBottom: '1em',
                    // Borde para botones
                    '& .MuiToggleButton-root': {
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: '4px',
                        padding: '1em',
                    },
                    // Fondo para botones seleccionados
                    '& .MuiToggleButton-root.Mui-selected': {
                        backgroundColor: 'success.light',
                        color: 'primary.contrastText',
                        '&:hover': {
                            backgroundColor: 'success.main',
                        },
                    },
                }}
            >
                {choices.map((choice) => (
                    <ToggleButton
                        key={choice.id}
                        value={choice.id}
                        aria-label={choice.name}
                    >
                        {choice.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </Box>
    );
};

// Componente de Toolbar personalizado para formularios (Create)
export const MyToolbar = () => (
    <Toolbar
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            // Estilos para el botón de guardar
            '& .MuiButton-contained': {
                backgroundColor: 'success.main',
                color: 'white',
            },
            '& .MuiButton-contained:hover': {
                backgroundColor: 'success.dark',
            },
            '& .MuiButton-containedPrimary:disabled': {
                backgroundColor: 'error.main',
                color: 'text.disabled',
            },
        }}
    >
        <SaveButton label="Guardar" aria-label="Guardar" />
        <Button
            aria-label="Volver arriba"
            sx={{
                color: 'info.main',
                borderColor: 'info.main',
                '&:hover': {
                    color: 'info.light',
                    borderColor: 'info.light',
                },
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Volver arriba
        </Button>
    </Toolbar>
);

// Estilos sx para la sección de lista de formularios
export const listBoxSx = {
    // Diferente fondo según el tema
    background: (theme: Theme) =>
        theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #c1cbddff 0%, #ffffffcc 50%)'
            : 'linear-gradient(180deg, #333f56ff 0%, #1b1b1bff 50%)',
    minHeight: '100vh',
    padding: {
        xs: '1em',
        sm: '1em',
        md: '2em',
    },
    width: '100%',

    // Tabla
    '& .RaList-actions': {
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    // Barra de herramientas
    '& .MuiToolbar-root': {
        display: 'flex',
        backgroundColor: 'transparent',
    },

};

// Estilos sx para la sección de evidencias (imágenes)
export const evidenceBoxSx = {
    padding: '1em',
    border: '1px dashed',
    borderColor: 'primary.main',
    borderRadius: '4px',
    backgroundColor: 'background.paper',
    marginBottom: '2em',
};

// Estilos sx para acordeones
export const accordionSx = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: '1em',

    '& .MuiAccordion-root': {
        background: '#ffffff10',
        border: '2px solid',
        borderColor: 'divider',
        borderRadius: '8px',
        boxShadow: 'none',
        '& .MuiAccordionSummary-root': {
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&.Mui-expanded': {
                minHeight: '48px',
            },
        },
        '& .MuiAccordionDetails-root': {
            padding: '16px',
        },
    },
};

// Componente para mostrar historial de cambios en reportes
export const PanelHistorialCambios = () => {
    // Obtener tamaño de pantalla
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));

    // Obtener el registro actual
    const registro: any = useRecordContext();
    if (!registro) {
        return (
            <Box sx={{ width: '30%', margin: 0, padding: 0 }}>
                <Typography variant="subtitle2">
                    No hay datos disponibles.
                </Typography>
            </Box>
        );
    }

    // Obtener el historial de cambios del registro
    const historial = (registro.historialCambios || [])
        // Crear una copia para no modificar el original
        .slice()
        // Ordenar por fecha de cambio ascendente
        .sort((a: any, b: any) => new Date(a.fechaCambio).getTime() - new Date(b.fechaCambio).getTime());

    return (
        <Box
            sx={{
                width: isSmall ? '100%' : '30%',
                margin: 0,
                padding: 0,
                position: 'sticky',
                top: 10,
                alignSelf: 'flex-start',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                marginBottom: isSmall ? 6 : 0,
                marginLeft: isSmall ? 0 : 2,
            }}
        >
            {/* Resumen del reporte */}
            <Box
                sx={{
                    background: '#ffffff10',
                    border: '2px solid',
                    borderColor: '#485b6fff',
                    borderRadius: 2,
                    padding: 2,
                }}>
                {/* Título */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <ShortTextIcon fontSize="small" />
                    <Typography variant="subtitle2" gutterBottom>Resumen</Typography>
                </Box>
                {/* Detalles del reporte */}
                <Typography variant="body2">Folio: {registro.folio}</Typography>
                <Typography variant="body2">Fecha: {registro.fecha ? new Date(registro.fecha).toLocaleString() : '—'}</Typography>
            </Box>

            {/* Historial de cambios */}
            <Box
                sx={{
                    background: '#ffffff10',
                    border: '2px solid',
                    borderColor: '#485b6fff',
                    borderRadius: 2,
                    margin: 0,
                    padding: 2,
                }}
            >
                {/* Título */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <HistoryIcon fontSize="small" />
                    <Typography variant="subtitle2">Historial de Cambios</Typography>
                </Box>
                {/* Mensaje si no hay cambios */}
                {historial.length === 0 && (
                    <Typography variant="caption" color="text.secondary">Sin cambios registrados.</Typography>
                )}
                {/* Lista de cambios */}
                <Stack divider={<Divider />} spacing={1}>
                    {/* Crea un mapa con cada cambio */}
                    {historial.map((cambio: any, idx: number) => (
                        <Box key={idx}>
                            <Typography variant="caption" sx={{ display: 'block' }}>
                                {new Date(cambio.fechaCambio).toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ lineHeight: 1.2 }}>
                                Folio: {cambio.folioAnterior} → {cambio.folioNuevo}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <PersonIcon fontSize="small" />
                                <Typography variant="caption" color="text.secondary">
                                    Usuario: {cambio.usuarioId}
                                </Typography>
                            </Box>
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

// Versión compacta del panel de historial de cambios
// Para usar en pantallas pequeñas
export const CompactoHistorialCambios = () => (
    <Box sx={{ width: '100%' }}>
        <Divider
            sx={{ marginY: 2 }}
            textAlign="center"
            children="Historial de Cambios"
        />
        <PanelHistorialCambios />
        <Divider
            sx={{ marginY: 2 }}
            textAlign="center"
            children="Información del Reporte"
        />
    </Box>
);

// Estilos para encabezados y celdas de tablas
export const tableHeaderSx = { borderColor: 'divider', borderBottom: '2px solid', fontWeight: 'bold' };
export const tableCellSx = { borderColor: 'divider', borderBottom: '1px solid' };

// Sección de zonas de lesión
export const ZonasLesion = () => (
    <Box
        sx={{
            width: '100%',
            textAlign: 'center',
            display: 'flex',
            flexDirection: {
                xs: 'column',
                md: 'row',
            },
            gap: '1em',
        }}
    >
        <TableContainer
            component={Box}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                overflow: 'hidden',
            }}
        >
            <Table
                size="small"
                aria-label="Tabla de zonas de lesión"
            >
                <TableBody>
                    {[
                        { numero: 1, nombre: 'Deformidades', codigo: 'D' },
                        { numero: 2, nombre: 'Contusiones', codigo: 'CCO' },
                        { numero: 3, nombre: 'Abrasiones', codigo: 'A' },
                        { numero: 4, nombre: 'Penetraciones', codigo: 'P' },
                        { numero: 5, nombre: 'Movimiento paradójico', codigo: 'MP' },
                        { numero: 6, nombre: 'Crepitación', codigo: 'C' },
                        { numero: 7, nombre: 'Heridas', codigo: 'H' },
                        { numero: 8, nombre: 'Fracturas', codigo: 'F' },
                        { numero: 9, nombre: 'Enfisema subcutáneo', codigo: 'ES' },
                        { numero: 10, nombre: 'Quemaduras', codigo: 'Q' },
                        { numero: 11, nombre: 'Laceraciones', codigo: 'L' },
                        { numero: 12, nombre: 'Edema', codigo: 'E' },
                        { numero: 13, nombre: 'Alteración de sensibilidad', codigo: 'AS' },
                        { numero: 14, nombre: 'Alteración de movilidad', codigo: 'AM' },
                        { numero: 15, nombre: 'Dolor', codigo: 'DD' },
                    ].map((row) => (
                        <TableRow key={row.codigo} hover>
                            <TableCell align="center" sx={tableCellSx}>{row.numero}</TableCell>
                            <TableCell align="center" sx={tableCellSx}>{row.nombre}</TableCell>
                            <TableCell align="center" sx={tableCellSx}>{row.codigo}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Box
            sx={{
                border: '2px solid',
                borderColor: 'divider',
                borderRadius: '8px',
                padding: '1em',
                backgroundColor: 'background.paper',
            }}
        >
            <Typography variant="caption" color="textSecondary">
                Cuerpo completo masculino - Vista anterior y posterior
            </Typography>
            <Box
                sx={{ width: '100%' }}
                component="img"
                src="/mapa_cuerpo.png"
                alt="Mapa corporal para seleccionar zonas de lesión"
                aria-label="Mapa corporal para seleccionar zonas de lesión"
            />
            <Typography variant="caption" color="textSecondary" display="block">
                Diagrama de cuerpo para selección de zonas de lesión (Frontiers, s.f.)
            </Typography>
        </Box>
    </Box>
);

// Tablas de Glasgow
export const Glasgow = () => (
    <TableContainer
        component={Box}
        sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            overflow: 'hidden',
        }}
    >
        <Table
            size="small"
            aria-label="Tabla de zonas de lesión"
        >
            <TableHead>
                <TableRow>
                    <TableCell align="center" sx={tableHeaderSx}>Parámetro</TableCell>
                    <TableCell align="center" sx={tableHeaderSx}>Descripción</TableCell>
                    <TableCell align="center" sx={tableHeaderSx}>Valor</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {[
                    // Apertura ocular
                    { param: 'Apertura ocular', desc: 'Espontánea', valor: 4 },
                    { param: 'Apertura ocular', desc: 'A la voz', valor: 3 },
                    { param: 'Apertura ocular', desc: 'Al dolor', valor: 2 },
                    { param: 'Apertura ocular', desc: 'Ninguna', valor: 1 },
                    // Respuesta verbal
                    { param: 'Respuesta verbal', desc: 'Orientada', valor: 5 },
                    { param: 'Respuesta verbal', desc: 'Confusa', valor: 4 },
                    { param: 'Respuesta verbal', desc: 'Palabras inapropiadas', valor: 3 },
                    { param: 'Respuesta verbal', desc: 'Sonidos incomprensibles', valor: 2 },
                    { param: 'Respuesta verbal', desc: 'Ninguna', valor: 1 },
                    // Respuesta motora
                    { param: 'Respuesta motora', desc: 'Espontánea, normal', valor: 6 },
                    { param: 'Respuesta motora', desc: 'Localiza al lacto', valor: 5 },
                    { param: 'Respuesta motora', desc: 'Localiza al dolor', valor: 4 },
                    { param: 'Respuesta motora', desc: 'Decorticación', valor: 3 },
                    { param: 'Respuesta motora', desc: 'Descerebración', valor: 2 },
                    { param: 'Respuesta motora', desc: 'Ninguna', valor: 1 },
                ].map((row, idx) => (
                    <TableRow key={idx} hover>
                        <TableCell align="center" sx={tableCellSx}>{row.param}</TableCell>
                        <TableCell align="center" sx={tableCellSx}>{row.desc}</TableCell>
                        <TableCell align="center" sx={tableCellSx}>{row.valor}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);