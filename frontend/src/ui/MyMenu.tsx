/*
Componente de menú personalizado para react-admin
Incluye secciones basadas en permisos y un logo
Fecha: 11/08/2025
*/

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
		<div style={{ textAlign: 'center', padding: '1em 0 0 0' }}>
			<img
				src="/logo_ac_pc_1.png"
				alt="Logo-Alcaldía-Cuajimalpa"
				aria-label='Logo Alcaldía Cuajimalpa'
				style={{ maxWidth: '70%', height: 'auto' }}
			/>
		</div>
	);
};

// Menú personalizado basado en permisos
export const MyMenu = () => {
	// Verifica los permisos del usuario para mostrar secciones correspondientes
	const canAccessAdm = useCanAccess({ resource: 'estadisticas_medicas', action: 'list' }).data;
	const canAccessMed = useCanAccess({ resource: 'reportes_medicos', action: 'list' }).data;
	const canAccessUrb = useCanAccess({ resource: 'reportes_urbanos', action: 'list' }).data;

	return (
		<Menu
			sx={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'background.paper',
				borderColor: 'divider',
				height: '100%',
				marginBottom: {
					xs: '5em',
					sm: 0,
				},

				// Elementos del menú
				'& .RaMenuItemLink-root': {
					padding: '0.4em',
					border: '1px solid transparent',
					color: 'text.primary',
					backgroundColor: 'contrast.paper',
				},
				'& .RaMenuItemLink-icon': {
					color: 'info.main',
				},

				// Hover
				'& .RaMenuItemLink-root:hover': {
					borderColor: 'info.dark',
				},

				// Selección
				'& .RaMenuItemLink-active': {
					borderColor: 'info.main',
					color: 'info.main',
					fontWeight: 'bold',
					background: 'rgba(25, 118, 210, 0.12)',
				},
			}}
		>
			<Logo />
			<SectionTitle>Inicio</SectionTitle>
			<Menu.DashboardItem />
			{canAccessAdm && [
				// Mostrar si el usuario tiene acceso a estadísticas
				<Menu.ResourceItem
					key="estadisticas_medicas"
					name="estadisticas_medicas"
					title="Estadísticas Médicas"
					aria-label='Estadísticas Médicas'
				/>,
				<Menu.ResourceItem
					key="estadisticas_urbanas"
					name="estadisticas_urbanas"
					title="Estadísticas Urbanas"
					aria-label='Estadísticas Urbanas'
				/>,
				<Menu.ResourceItem
					key="usuarios"
					name="usuarios"
					title="Usuarios"
					aria-label='Usuarios'
				/>,
			]}

			{canAccessMed && [
				// Mostrar si el usuario tiene acceso a reportes médicos
				<Divider key="divider-medicos" />,
				<SectionTitle key="incidentes-medicos">Incidentes Médicos</SectionTitle>,
				<Menu.ResourceItem
					key="reportes_medicos"
					name="reportes_medicos"
					title="Reportes Médicos"
					aria-label='Reportes Médicos'
				/>,
				<Menu.ResourceItem
					key="notas_medicas"
					name="notas_medicas"
					title="Notas Médicas"
					aria-label='Notas Médicas'
				/>
			]}

			{canAccessUrb && [
				// Mostrar si el usuario tiene acceso a reportes urbanos
				<Divider key="divider-urbanos" />,
				<SectionTitle key="incidentes-urbanos">Incidentes Urbanos</SectionTitle>,
				<Menu.ResourceItem
					key="reportes_urbanos"
					name="reportes_urbanos"
					title="Reportes Urbanos"
					aria-label='Reportes Urbanos'
				/>,
				<Menu.ResourceItem
					key="notas_urbanas"
					name="notas_urbanas"
					title="Notas Urbanas"
					aria-label='Notas Urbanas'
				/>
			]}
		</Menu>
	);
};