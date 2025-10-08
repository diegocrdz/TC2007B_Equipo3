# Sistema de Reporte de Emergencias (SRE)

**Aplicación web para la gestión de emergencias prehospitalarias y urbanas de la Alcaldía de Cuajimalpa**

![Banner del proyecto](./img/banner_readme.png)

> **Nota:** Este proyecto fue desarrollado como propuesta (MVP) para la automatización de registros de la Alcaldía Cuajimalpa y la Secretaría de Gestión Integral de Riesgos y Protección Civil.

## Integrantes del equipo:
- Aquiba Yudah Benarroch Bittan (A01783710)
- Diego Córdova Rodríguez (A01781166)
- Jin Sik Yoon (A01026630)
- Julio César Rodríguez Figueroa (A01029680)

## :book: Descripción del Proyecto

Este sistema permite a la Alcaldía Cuajimalpa gestionar de manera eficiente las emergencias prehospitalarias y urbanas. La aplicación está diseñada con un enfoque en accesibilidad y manejo por roles.

## :star: Características Principales

### :hospital: Gestión de Emergencias
- **Reportes Médicos**: Registro y seguimiento de emergencias médicas y prehospitalarias
- **Notas Médicas**: Documentación detallada de intervenciones médicas
- **Reportes Urbanos**: Gestión de emergencias urbanas (incendios, accidentes, etc.)
- **Notas Urbanas**: Seguimiento de intervenciones en emergencias urbanas

### :bust_in_silhouette: Sistema de Roles y Permisos
El sistema cuenta con 4 tipos de usuarios con diferentes niveles de acceso:

- **Administrador (admin)**: Acceso completo a todas las funcionalidades.
- **Jefe de turno**: Puede ver todos los reportes y notas (médicas y urbanas) de su turno.
- **Personal Médico**: Acceso completo a reportes y notas médicas previas hechas por el usuario.
- **Personal Urbano**: Acceso completo a reportes y notas urbanas previas hechas por el usuario.

### :wheelchair: Accesibilidad
- **Tamaños de fuente ajustables**: Mediano, Grande y Extra-Grande
- **Fuente para dislexia**: Soporte para fuente OpenDyslexic
- **Temas de alto contraste**: Tema claro y oscuro

### :bar_chart: Dashboard
- Panel principal personalizado según el rol del usuario
   - Bienvenida personalizada con información del usuario
   - Funciones rápidas para cada usuario
- Estadísticas (solo para administradores)
   - Estadísticas médicas
   - Estadísticas urbanas

## :hammer: Tecnologías Utilizadas

### Frontend
- **React-Admin** - Framework principal
- **TypeScript** - Tipado estático
- **[Material-UI (MUI)](https://mui.com/material-ui/getting-started/)** - Biblioteca de componentes UI
- **[Mui X Charts](https://mui.com/x/react-charts/)** - Gráficas
- **[Leaflet](https://leafletjs.com/)** - Mapas interactivos
- **[React Hook Form](https://react-hook-form.com/)** - Manejo de formularios

## :wrench: Instalación y Configuración

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/diegocrdz/TC2007B_Equipo3.git
cd TCB2007B_Equipo3/frontend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```