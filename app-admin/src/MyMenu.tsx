import { Menu, useSidebarState } from 'react-admin';
import { Divider, ListSubheader } from '@mui/material';
import { BorderRight } from '@mui/icons-material';

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
        <Menu.ResourceItem name="comments"/>
        <Menu.ResourceItem name="albums"/>
        <Menu.ResourceItem name="photos"/>
        <Menu.ResourceItem name="todos"/>
        <Menu.ResourceItem name="users"/>
        <Divider />

        <SectionTitle>Emergencias</SectionTitle>
        <Menu.ResourceItem
            name="x1"
            title="Emergencias Médicas"
            aria-label='Emergencias Médicas'
        />
        <Menu.ResourceItem
            name="x2"
            title="Emergencias Urbanas"
            aria-label='Emergencias Urbanas'
        />
    </Menu>
);