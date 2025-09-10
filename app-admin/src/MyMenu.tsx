import { Menu, useSidebarState } from 'react-admin';
import { Divider, ListSubheader } from '@mui/material';

const SectionTitle = ({ children }: { children: React.ReactNode }) => {
  const [open] = useSidebarState(); // true cuando el sidebar está expandido
  if (!open) return null;
  return (
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

const Logo = () => {
  const [open] = useSidebarState(); // true cuando el sidebar está expandido
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

export const MyMenu = () => (
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

        <SectionTitle>json</SectionTitle>
        <Menu.ResourceItem name="posts"/>
        <Divider />

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
        <Divider />

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
    </Menu>
);