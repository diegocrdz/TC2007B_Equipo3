/*
Generación de temas personalizados con opciones de accesibilidad (tamaño y tipo de letra)
Basado en los temas bwDarkTheme y bwLightTheme de react-admin
Fecha: 11/08/2025

Referencias:
- Temas de react-admin: https://marmelab.com/react-admin/Theming.html#using-a-custom-theme
- Tipografía en Material-UI: https://mui.com/material-ui/customization/typography/
- Deepmerge y sobreescribir temas: https://mui.com/material-ui/customization/theming/#theme-provider
- Crear contexto: https://react.dev/reference/react/createContext
- useMemo: https://react.dev/reference/react/useMemo
*/

import React from 'react';
import { bwDarkTheme, bwLightTheme } from 'react-admin';
import { deepmerge } from '@mui/utils';

// Tipos para los ajustes de accesibilidad
export type AccSettings = {
    fontSizeScale: 'M' | 'G' | 'XG';
    fontFamilyType: 'estandar' | 'dislexico';
};

// Valores por defecto
const defaults: AccSettings = {
    fontSizeScale: 'M',
    fontFamilyType: 'estandar',
};

// Mapa para establecer el tamaño de letra
const valoresTipografia: Record<AccSettings['fontSizeScale'], number> = {
    M: 14,
    G: 16,
    XG: 18,
};
// Mapa para establecer el tipo de letra
const valoresTipoLetra: Record<AccSettings['fontFamilyType'], string> = {
    estandar: 'Arial, sans-serif',
    dislexico: 'OpenDyslexic, Arial, sans-serif',
};

// Nombre de llave con la que se almacenarán los ajustes en localStorage
const AJUSTES_ACC = 'accSettings';

// Función para cargar los ajustes desde localStorage
function loadAccSettings(): AccSettings {
    try {
        const ajustes = localStorage.getItem(AJUSTES_ACC);

        // Si no los encuentra, regresa los valores por defecto
        if (!ajustes) return defaults;

        // Si los encuentra, los parsea y regresa
        const parsed = JSON.parse(ajustes);
        return parsed;
    } catch {
        // Si hay un error, regresa los valores por defecto
        return defaults;
    }
}

// Función para guardar los ajustes en localStorage
function saveAccSettings(ajustes: AccSettings) {
    localStorage.setItem(AJUSTES_ACC, JSON.stringify(ajustes));
}

// Función para establecer la tipografía basada en los ajustes
function resolveTypography(s: AccSettings) {
    // Establecer tamaño y tipo de letra
    const fontSize = valoresTipografia[s.fontSizeScale];
    const fontFamily = valoresTipoLetra[s.fontFamilyType];
    // Regresa los valores de tipografía
    return {
        fontSize,
        fontFamily,
    };
}

// Función para constuir los temas (claro y oscuro) basados en los ajustes
function buildThemes(settings: AccSettings) {
    // Obtener tipografía basada en los ajustes
    const typography = resolveTypography(settings);

    // Ajustes para tema oscuro
    const dark = deepmerge(bwDarkTheme, {
        typography,
        palette: {
            background: { default: "#1b1b1bff", paper: "#1b1b1bff" },
            divider: "#b4b4b4ff",
            toolbar: "#333f56ff", // Para barra de herramientas de formularios
        },
        components: {
            MuiAppBar: { styleOverrides: { root: { backgroundColor: "#1b1b1bff" } } },
            MuiCard: { styleOverrides: { root: { background: "linear-gradient(180deg, #333f56ff 0%, #1b1b1bff 50%)" } } },
            MuiFormControl: { styleOverrides: { root: { backgroundColor: "none" } } },
            MuiAccordion: { styleOverrides: { root: { backgroundColor: "#1b1b1bff" } } },
            RaToolbar: { styleOverrides: { root: { backgroundColor: "#333f56ff" } } },
        },
    });

    // Ajustes para tema claro
    const light = deepmerge(bwLightTheme, {
        typography,
        palette: {
            background: { default: "#c1cbddff", paper: "#c1cbddff" },
            divider: "#313131ff",
            toolbar: "#8d9ab4ff", // Para barra de herramientas de formularios
        },
        components: {
            MuiAppBar: { styleOverrides: { root: { backgroundColor: "#6a7996ff" } } },
            MuiCard: { styleOverrides: { root: { background: "linear-gradient(180deg, #c1cbddff 0%, #ffffffcc 50%)" } } },
            MuiFormControl: { styleOverrides: { root: { backgroundColor: "none" } } },
            MuiAccordion: { styleOverrides: { root: { backgroundColor: "#ffffffcc" } } },
            RaToolbar: { styleOverrides: { root: { backgroundColor: "#8d9ab4ff" } } },
        },
    });
    
    // Regresa ambos temas
    return { dark, light };
}

// Contexto para los ajustes y temas de accesibilidad
type Ctx = {
    settings: AccSettings;
    // updateSettings puede recibir uno o más campos de AccSettings para actualizar
    updateSettings: (patch: Partial<AccSettings>) => void;
    themes: { dark: any; light: any };
};

// Crear el contexto para los ajustes de accesibilidad
// Sirve para compartir datos entre componentes sin tener que pasar props manualmente
const AccCtx = React.createContext<Ctx | null>(null);

// Proveedor del contexto para los ajustes de accesibilidad
export const AccThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Estado para los ajustes de accesibilidad
    const [settings, setSettings] = React.useState(loadAccSettings());

    // Actualizar los ajustes
    const updateSettings = (newSettings: Partial<AccSettings>) => {
        // Solo agrega los ajustes nuevos y deja los otros igual
        const ajustes = { ...settings, ...newSettings };
        setSettings(ajustes);
        saveAccSettings(ajustes);
    };

    // Obtiene los temas basados en los ajustes actuales
    // Se useMemo, que memoriza el valor para no tener que recalcularlo en cada ciclo
    const themes = React.useMemo(() => buildThemes(settings), [settings]);

    // Regresa el proveedor del contexto con los valores actuales
    return (
        <AccCtx.Provider value={{ settings, updateSettings, themes }}>
            {children}
        </AccCtx.Provider>
    );
};

// Hook para usar los ajustes de accesibilidad en otros componentes
// Lanza un error si se usa fuera de AccThemeProvider
export function useAccSettings() {
    const ctx = React.useContext(AccCtx);
    if (!ctx) throw new Error('useAccSettings debe usarse dentro de AccThemeProvider');
    return ctx;
}