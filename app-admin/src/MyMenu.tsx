import { Menu, useSidebarState, useCanAccess } from 'react-admin';
import { Divider, ListSubheader } from '@mui/material';

// Componente para los títulos de sección en el menú
const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const [open] = useSidebarState(); // Verdadero si la barra lateral está abierta
  if (!open) return null;
  return (
    // Crear una sección para mostrar el título
    <ListSubheader
        component="div"
        sx={{
            fontSize: '1em',
            letterSpacing: 1,
            color: 'text.secondary',
        }}
    >
      {children}
    </ListSubheader>
  );
};

// Componente para mostrar el logo en el menú
const Logo = () => {
  const [open] = useSidebarState(); // Verdadero si la barra lateral está abierta
  if (!open) return null;
  return (
    <div style={{ textAlign: 'center', padding: '1em 0' }}>
      <img
        src="/logo_ac.png"
        alt="Logo-Alcaldía-Cuajimalpa"
        aria-label='Logo Alcaldía Cuajimalpa'
        style={{ maxWidth: '50%', height: 'auto' }}
      />
    </div>
  );
};

// Menú personalizado basado en permisos
export const MyMenu = () => {
  const canAccessMed = useCanAccess({ resource: 'reportes_medicos', action: 'list' }).data;
  const canAccessUrb = useCanAccess({ resource: 'reportes_urbanos', action: 'list' }).data;

  return (
    <Menu
      sx={{
        '& .RaMenuItemLink-active': {
          borderRight: '4px solid',
          borderRightColor: 'rgba(73, 111, 189, 1)',
        },
      }}
    >
      <Logo />
      <SectionTitle>Inicio</SectionTitle>
      <Menu.DashboardItem />
      <Divider />

      {canAccessMed && (
        // Mostrar si el usuario tiene acceso a reportes médicos
        <>
          <SectionTitle>Incidentes Médicos</SectionTitle>
          <Menu.ResourceItem
            name="reportes_medicos"
            title="Reportes Médicos"
            aria-label='Reportes Médicos'
          />
          <Menu.ResourceItem
            name="notas_medicas"
            title="Notas Médicas"
            aria-label='Notas Médicas'
          />
        </>
      )}

      {canAccessUrb && (
        // Mostrar si el usuario tiene acceso a reportes urbanos
        <>
          <SectionTitle>Incidentes Urbanos</SectionTitle>
          <Menu.ResourceItem
            name="reportes_urbanos"
            title="Reportes Urbanos"
            aria-label='Reportes Urbanos'
          />
          <Menu.ResourceItem
            name="notas_urbanas"
            title="Notas Urbanas"
            aria-label='Notas Urbanas'
          />
        </>
      )}
    </Menu>
  );
};