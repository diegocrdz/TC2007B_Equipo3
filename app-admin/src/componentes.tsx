/*
    Componentes personalizados reutilizables para formularios
*/

import * as React from "react";
import { useWatch } from "react-hook-form";
import { TextInput } from "react-admin";
import { Box, Typography } from "@mui/material";
// Toolbar
import { Toolbar, SaveButton } from 'react-admin';

// Estilos para diferentes layouts en las secciones del formulario
// Estilo para filas
const rowLayoutStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1em',
    width: '100%',
};
// Estilo para columnas
const columnLayoutStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5em',
    width: '100%',
};
// Estilo para grid (2 columnas)
const gridLayoutStyle: React.CSSProperties = {
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
        width: '80%'
    }
};

// Componentes para secciones con diferentes layouts
// Componente para sección en fila
export const RowSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={rowLayoutStyle}>
            {children}
        </div>
    </div>
);
// Componente para sección en columna
export const ColumnSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        {children}
    </div>
);
// Componente para sección en grid
export const GridSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div style={columnLayoutStyle}>
        <h3 style={{ margin: 0, padding: 0, fontSize: '1em' }}>
            {title}
        </h3>
        <div style={gridLayoutStyle}>
            {children}
        </div>
    </div>
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
    background: (theme) =>
    theme.palette.mode === 'light'
        ? 'linear-gradient(180deg, #c1cbddff 0%, #ffffffcc 50%)'
        : 'linear-gradient(180deg, #333f56ff 0%, #1b1b1bff 50%)',
    minHeight: '100vh',
    padding: '2em',
};