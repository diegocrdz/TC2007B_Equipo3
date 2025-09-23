import { Admin, Resource } from "react-admin";
// import {dataProvider} from "./dataProvider";
import { mockDataProvider } from "./mockDataProvider";
// jsonplaceholder
import { PostsList, PostsEdit, PostsCreate, PostsShow } from "./posts";
// Recursos
import { RMList, RMEdit, RMCreate, RMShow } from "./reportes_medicos";
import { NMList, NMEdit, NMCreate, NMShow } from "./notas_medicas";
import { RUList, RUEdit, RUCreate, RUShow } from "./reportes_urbanos";
import { NUList, NUEdit, NUCreate, NUShow } from "./notas_urbanas";
// Icons
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EmergencyIcon from '@mui/icons-material/Emergency';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
// Dashboard
import { Dashboard } from "./dashboard/Dashboard";
// Inicio de sesión
import { authProvider } from "./authProvider";
// Idioma
import { i18nProviderNoLocale } from './i18nProvider';
// Layout
import { MyLayout } from './MyLayout';
// Tema y accesibilidad
import { AccThemeProvider, useAccSettings } from './MyTheme';
// Página de inicio de sesión
import { LoginPage } from './loginPage';

// Componente que envuelve Admin para aplicar el tema con ajustes de accesibilidad
const AppWrapper = () => {
    // Obtiene el tema actual con ajustes de accesibilidad
    const { themes } = useAccSettings();
    // Regresa el componente Admin con los temas aplicados
    return (
        <Admin
            layout={MyLayout}
            dashboard={Dashboard}
            dataProvider={mockDataProvider}
            authProvider={authProvider}
            i18nProvider={i18nProviderNoLocale}
            darkTheme={themes.dark}
            lightTheme={themes.light}
            loginPage={LoginPage}
        >
            <Resource name='reportes_medicos' list={RMList} edit={RMEdit} create={RMCreate} show={RMShow} icon={LocalHospitalIcon} options={{ label: 'Reportes Médicos'}} />
            <Resource name='notas_medicas' list={NMList} edit={NMEdit} create={NMCreate} show={NMShow} icon={ContentPasteIcon} options={{ label: 'Notas Médicas'}} />
            <Resource name='reportes_urbanos' list={RUList} edit={RUEdit} create={RUCreate} show={RUShow} icon={EmergencyIcon} options={{ label: 'Reportes Urbanos'}} />
            <Resource name='notas_urbanas' list={NUList} edit={NUEdit} create={NUCreate} show={NUShow} icon={StickyNote2Icon} options={{ label: 'Notas Urbanas'}} />
        </Admin>
    );
};

// Componente principal de la aplicación
export const App = () => (
    <AccThemeProvider>
        <AppWrapper />
    </AccThemeProvider>
);