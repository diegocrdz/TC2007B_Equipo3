/*
    Componentes personalizados reutilizables para formularios
*/

import * as React from "react";
import { useWatch } from "react-hook-form";
import { TextInput } from "react-admin";
import { Box, Typography, ToggleButton, ToggleButtonGroup, Theme } from "@mui/material";
// Toolbar
import { Toolbar, SaveButton } from 'react-admin';
import { useInput } from "ra-core";

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
    marginBottom: '4em',
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
export const RowSection = ({ title, children, border }: { title: string, children: React.ReactNode, border: boolean }) => (
    <Box sx={border ? columnLayoutStyle : undefined}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        <Box sx={rowLayoutStyle}>
            {children}
        </Box>
    </Box>
);
// Componente para sección en columna
export const ColumnSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Box sx={columnLayoutStyle}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        {children}
    </Box>
);
// Componente para sección en grid
export const GridSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <Box sx={columnLayoutStyle}>
        <Typography variant="h6" sx={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </Typography>
        <Box sx={gridLayoutStyle}>
            {children}
        </Box>
    </Box>
);

// Componente de entrada de texto con límite de caracteres
export const TextInputWithCounter = ({source, label, maxLength=0, multiline = true, rows, required = false}: {
    source: string;
    label: string;
    maxLength?: number;
    multiline?: boolean;
    rows?: number;
    required?: boolean;
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
export const MotivoToggleInput = ({ source, label, choices, exclusive=true } : {
    source: string;
    label: string;
    choices: { id: string; name: string }[];
    exclusive?: boolean;
}) => {
    const { field } = useInput({ source });
    
    return (
        <Box>
            <Typography variant="subtitle2" color="textSecondary">{label}</Typography>
            {exclusive
                ? <Typography variant="caption" color="textSecondary">Selecciona una opción</Typography>
                : <Typography variant="caption" color="textSecondary">Selecciona una o más opciones</Typography>
            }
            <ToggleButtonGroup
                value={field.value}
                exclusive={exclusive}
                onChange={(newValue) => field.onChange(newValue)}
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

// Componente de Toolbar personalizado para formularios
export const MyToolbar = () => (
    <Toolbar
        sx={{
            backgroundColor: 'toolbar',

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
    padding: '2em',
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