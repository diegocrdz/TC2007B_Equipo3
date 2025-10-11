/*
Componente del menú de accesibilidad
Permite a los usuarios ajustar configuraciones como el tamaño y tipo de letra
Fecha: 11/08/2025

Referencias:
- Menú lateral: https://mui.com/material-ui/react-drawer/#swipeable
- Stack: https://mui.com/material-ui/react-stack/
- Select: https://mui.com/material-ui/react-select/
*/

import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Divider from '@mui/material/Divider';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Button from '@mui/material/Button';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import FontDownloadIcon from '@mui/icons-material/FontDownload';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { useAccSettings } from './MyTheme';

// Opciones para tipo de letra
const FONT_FAMILY_OPTIONS = [
    { value: 'estandar', label: 'Estándar' },
    { value: 'dislexico', label: 'OpenDyslexic' },
];
// Opciones para tamaño de letra
const FONT_SIZE_OPTIONS = [
    { value: 'M', label: 'Mediano' },
    { value: 'G', label: 'Grande' },
    { value: 'XG', label: 'Extra-Grande' },
];

// Componente para cada opción del menú de accesibilidad
const StackItem = ({ title, icon, opt_title, options, value, onChange }:
    { title: string, icon: React.ReactNode, opt_title: string,
        options: { value: string, label: string }[],
        value: string, onChange: (e: SelectChangeEvent) => void
    }) => {

    return (
        <Stack
            sx={{
                display: 'flex',
                flexDirection: {
                    xs: 'column',
                    md: 'row',
                },
                justifyContent: {
                    xs: 'flex-start',
                    md: 'space-evenly',
                },
                alignItems: {
                    xs: 'flex-start',
                    md: 'center',
                },
                marginBottom: '20px',
            }}
        >
            {/* Icono y título */}
            <Box 
                sx={{
                    display: 'flex',
                    gap: 1,
                    alignItems: 'center',
                    width: {
                        xs: '100%',
                        md: '50%',
                    },
                }}
            >
                {icon}
                <Typography variant="subtitle1">
                    {title}
                </Typography>
            </Box>
            {/* Menú de opciones */}
            <FormControl
                sx={{
                    width: {
                        xs: '100%',
                        md: '50%',
                    },
                }}
            >
                <InputLabel id={`${title}-label`}>{opt_title}</InputLabel>
                <Select
                    labelId={`${title}-label`}
                    label={opt_title}
                    value={value}
                    onChange={onChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
    )
};

// Tipo para las anclas del menú lateral
type Anchor = 'top' | 'left' | 'bottom' | 'right';

// Componente del menú lateral de accesibilidad
export const SwipeableTemporaryDrawer = () => {
    const { settings, updateSettings } = useAccSettings();

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const handleFontSize = (e: SelectChangeEvent) => {
        updateSettings({ fontSizeScale: e.target.value as typeof settings.fontSizeScale });
    };
    const handleFontFamily = (e: SelectChangeEvent) => {
        updateSettings({ fontFamilyType: e.target.value as typeof settings.fontFamilyType });
    };

    const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
            )
        { return; }
        setState({ ...state, [anchor]: open });
    };

    const list = () => (
        <Box
            sx={{
                width: {
                    xs: '50vw',
                    md: '30vw',
                },
                padding: '20px',
            }}
            role="presentation"
        >
            <Stack>
                <Typography variant="h5" gutterBottom>
                    Accesibilidad
                </Typography>
                <Divider sx={{ marginBottom: '20px' }} />

                <StackItem
                    title="Tamaño de letra"
                    icon={<FormatSizeIcon />}
                    opt_title="Selecciona un tamaño de letra"
                    options={FONT_SIZE_OPTIONS}
                    value={settings.fontSizeScale}
                    onChange={handleFontSize}
                />

                <StackItem
                    title="Tipo de letra"
                    icon={<FontDownloadIcon />}
                    opt_title="Selecciona un tipo de letra"
                    options={FONT_FAMILY_OPTIONS}
                    value={settings.fontFamilyType}
                    onChange={handleFontFamily}
                />
            </Stack>
        </Box>
    );

    return (
        <Box>
            <Button
                onClick={toggleDrawer('right', true)}
                sx={{
                    minWidth: 0,
                    margin: 0,
                    border: 'none',
                    color: 'inherit',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    }
                }}
                aria-label='Accesibilidad'
            >
                <AccessibilityIcon />
            </Button>
            <SwipeableDrawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer('right', false)}
                onOpen={toggleDrawer('right', true)}
            >
                {list()}
            </SwipeableDrawer>
        </Box>
    );
}