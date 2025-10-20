/*
Página de inicio de sesión personalizada
Fecha: 11/08/2025
*/

import { useLogin, useNotify, useTheme, PasswordInput, SimpleForm, TextInput } from "react-admin";
import { Box, Paper, Button, Typography, IconButton } from "@mui/material";
// Íconos de cambio de tema
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
// Botón de accesibilidad
import { SwipeableTemporaryDrawer } from "./accMenu";
import { useEffect } from "react";

export const LoginPage = () => {
    const login = useLogin(); // Función para iniciar sesión del authProvider
    const notify = useNotify(); // Notificaciones de por parte del authprovider

    // Cerrar sesión cuando se monta el componente
    useEffect(() => {
        sessionStorage.removeItem("auth");
        sessionStorage.removeItem("identity");
    }, []);

    // Estado global de tema para la aplicación
    const [theme, setTheme] = useTheme();
    const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

    // Submit del inicio de sesión para SimpleForm
    const handleSubmit = async (formData: any) => {
        try {
            await login({ username: formData.username, password: formData.password });
        } catch {
            notify("Credenciales inválidas", { type: "error" });
        }
    };

    return (
        <Box
            component="main"
            sx={{
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                px: 2,
                bgcolor: "background.default",
                color: "text.primary",
                position: "relative",
                // Fondo de la página de login
                backgroundImage: 'url("/fondo_login.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? "rgba(175, 212, 241, 0.8)"
                        : "rgba(0,0,0,0.8)",
                backgroundBlendMode: "overlay",
            }}
        >
            {/* Esquina superior derecha: opciones de accesibilidad (Cambio de tema, fuente y tamaño de la fuente)*/}
            <Box
                sx={{
                    position: "fixed",
                    top: { xs: 8, sm: 12 },
                    right: { xs: 8, sm: 12 },
                    display: "flex",
                    gap: 1,
                    zIndex: (t) => t.zIndex.drawer + 1,
                }}
            >
                {/* Botón de cambio de tema, recreando el mismo botón de adentro del tablero */}
                <IconButton
                    onClick={toggleTheme}
                    color="inherit"
                    aria-label="Cambiar tema"
                >
                    {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                {/* Botón de accesibilidad */}
                <SwipeableTemporaryDrawer />
            </Box>

            {/* Tarjeta de para el inicio de sesión */}
            <Paper
                elevation={3}
                sx={(theme) => ({
                    width: "100%",
                    maxWidth: 420,
                    p: { xs: 3, sm: 4 },
                    borderRadius: 3,
                    bgcolor: "background.paper",
                    border: `1px solid ${theme.palette.divider}`, 
                    textAlign: "center",
                    boxShadow: theme.palette.mode === "light"
                        ? "0 0 100px rgba(0, 0, 0, 0.8)"
                        : "0 0 40px rgba(255, 255, 255, 0.1)",
                })}
                aria-label="Tarjeta de inicio de sesión"
            >

                {/* Logo de la alcaldía */}
                <Box sx={{ mb: 2 }}>
                    <img
                        src="/logo_color_ac.png" 
                        alt="Logo Alcaldía Cuajimalpa"
                        aria-label="Logo Alcaldía Cuajimalpa"
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </Box>

                {/* Título del sistema */}
                <Typography
                    component="h1"
                    variant="h5"
                    sx={{ textAlign: "center", mb: 3 }}
                >
                    Sistema de Registro de Emergencias
                </Typography>

                {/* Formulario de inicio de sesión */}
                <SimpleForm
                    onSubmit={handleSubmit}
                    toolbar={false}
                    sx={{ 
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                    }}
                >
                    <TextInput
                        label="Usuario"
                        source="username"
                        required
                    />

                    <PasswordInput
                        label="Contraseña"
                        source="password"
                        required
                    />

                    <Button // Botón para enviar formulario
                        type="submit"
                        variant="contained"
                        sx={{
                            padding: 1.5,
                            width: '100%',
                        }}
                    >
                        <Typography
                            component="h6"
                            sx={{ textAlign: "center", fontWeight: 'bold' }}
                        >
                            Iniciar Sesión
                        </Typography>
                    </Button>
                </SimpleForm>
            </Paper>
        </Box>
    );
};