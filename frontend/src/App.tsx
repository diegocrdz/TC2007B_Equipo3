/*
Componente principal de la aplicación
Configura react-admin con recursos, temas y autenticación
Fecha: 11/08/2025
*/

import { Admin, Resource, CustomRoutes, Authenticated } from "react-admin";
import { Route } from "react-router-dom";
// Recursos
import { RMList, RMEdit, RMCreate, RMShow } from "./reportes/reportes_medicos";
import { NMList, NMEdit, NMCreate, NMShow } from "./notas/notas_medicas";
import { RUList, RUEdit, RUCreate, RUShow } from "./reportes/reportes_urbanos";
import { NUList, NUEdit, NUCreate, NUShow } from "./notas/notas_urbanas";
import { UsuarioList, UsuarioEdit, UsuarioCreate, UsuarioShow } from "./recursos/usuarios";
// Iconos
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
// Dashboard
import { Dashboard } from "./dashboard/Dashboard";
// Estadísticas
import { EstadisticasMedicas } from "./estadisticas/EstadisticasMedicas";
import { EstadisticasUrbanas } from "./estadisticas/EstadisticasUrbanas";
// Inicio de sesión
import { authProvider } from "./authProvider";
// Idioma
import { i18nProviderNoLocale } from './i18nProvider';
// Layout
import { MyLayout } from './ui/MyLayout';
// Tema y accesibilidad
import { AccThemeProvider, useAccSettings } from './ui/MyTheme';
// Página de inicio de sesión
import { LoginPage } from './ui/loginPage';
// dataProvider
import { dataProvider } from "./dataProvider";
// CSS de leaflet (mapas)
import 'leaflet/dist/leaflet.css';

// Componente que envuelve Admin para aplicar el tema con ajustes de accesibilidad
const AppWrapper = () => {
    // Obtiene el tema actual con ajustes de accesibilidad
    const { themes } = useAccSettings();
    // Regresa el componente Admin con los temas aplicados
    return (
        <Admin
            layout={MyLayout}
            dashboard={Dashboard}
            dataProvider={dataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProviderNoLocale}
            darkTheme={themes.dark}
            lightTheme={themes.light}
            loginPage={LoginPage}
        >
            {/* Reportes y notas */}
            <Resource name='reportes_medicos' list={RMList} edit={RMEdit} create={RMCreate} show={RMShow} icon={LocalHospitalIcon} options={{ label: 'Reportes Médicos'}} />
            <Resource name='notas_medicas' list={NMList} edit={NMEdit} create={NMCreate} show={NMShow} icon={ContentPasteIcon} options={{ label: 'Notas Médicas'}} />
            <Resource name='reportes_urbanos' list={RUList} edit={RUEdit} create={RUCreate} show={RUShow} icon={EmergencyIcon} options={{ label: 'Reportes Urbanos'}} />
            <Resource name='notas_urbanas' list={NUList} edit={NUEdit} create={NUCreate} show={NUShow} icon={StickyNote2Icon} options={{ label: 'Notas Urbanas'}} />

            {/* Usuarios */}
            <Resource name='usuarios' list={UsuarioList} edit={UsuarioEdit} create={UsuarioCreate} show={UsuarioShow} icon={AccountBoxIcon} options={{ label: 'Usuarios'}} />
            
            {/* Recursos de estadísticas. No cuentan con CRUD ya que solo sirve para mostrarlas en el menú */}
            <Resource name='estadisticas_medicas' icon={ShowChartIcon} options={{ label: 'Estadísticas Médicas'}} />
            <Resource name='estadisticas_urbanas' icon={AutoGraphIcon} options={{ label: 'Estadísticas Urbanas'}} />
            
            <CustomRoutes>
                <Route path="/estadisticas_medicas" element={<Authenticated><EstadisticasMedicas /></Authenticated>} />
                <Route path="/estadisticas_urbanas" element={<Authenticated><EstadisticasUrbanas /></Authenticated>} />
            </CustomRoutes>
        </Admin>
    );
};

// Componente principal de la aplicación
export const App = () => (
    <AccThemeProvider>
        <AppWrapper />
    </AccThemeProvider>
);