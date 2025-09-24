# Sistema de Reporte de Emergencias (SRE) - Alcaldía Cuajimalpa

**Aplicación web para la gestión de emergencias prehospitalarias y urbanas de la Alcaldía de Cuajimalpa**

## Integrantes del equipo:
- Aquiba Yudah Benarroch Bittan (A01783710)
- Diego Córdova Rodríguez (A01781166)
- Jin Sik Yoon (A01026630)
- Julio César Rodríguez Figueroa (A01029680)

## 📖 Descripción del Proyecto

Este sistema permite a la Alcaldía de Cuajimalpa gestionar de manera eficiente las emergencias prehospitalarias y urbanas. La aplicación está diseñada con un enfoque en accesibilidad y manejo por roles.

## 🚀 Características Principales

### 🏥 Gestión de Emergencias
- **Reportes Médicos**: Registro y seguimiento de emergencias médicas y prehospitalarias
- **Notas Médicas**: Documentación detallada de intervenciones médicas
- **Reportes Urbanos**: Gestión de emergencias urbanas (incendios, accidentes, etc.)
- **Notas Urbanas**: Seguimiento de intervenciones en emergencias urbanas

### 👥 Sistema de Roles y Permisos
El sistema cuenta con 4 tipos de usuarios con diferentes niveles de acceso:

- **👑 Administrador (admin)**: Acceso completo a todas las funcionalidades.
- **📊 Jefe de turno**: Puede ver todos los reportes y notas (médicas y urbanas) de su turno.
- **🚑 Personal Médico**: Acceso completo a reportes y notas médicas previas hechas por el usuario.
- **🏢 Personal Urbano**: Acceso completo a reportes y notas urbanas previas hechas por el usuario.

### ♿ Características de Accesibilidad
- **Tamaños de fuente ajustables**: Mediano, Grande y Extra-Grande
- **Fuente para dislexia**: Soporte para fuente OpenDyslexic
- **Temas de alto contraste**: Tema claro y oscuro

### 📊 Dashboard Inteligente
- Panel principal personalizado según el rol del usuario
- Estadísticas médicas (solo para administradores)
- Estadísticas urbanas (solo para administradores)
- Bienvenida personalizada con información del usuario

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Admin** - Framework principal
- **TypeScript** - Tipado estático
- **Material-UI (MUI) 7.0** - Biblioteca de componentes UI

### Librerías Adicionales
- **React Hook Form** - Manejo de formularios

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 18 o superior)
- npm o yarn

### Pasos de instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/diegocrdz/TCB2007B_Equipo3.git
cd TCB2007B_Equipo3/app-admin
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Ejecutar en modo desarrollo**
```bash
npm run dev
```

4. **Construir para producción**
```bash
npm run build
```

5. **Previsualizar build de producción**
```bash
npm run serve
```

## 🎨 Personalización de Accesibilidad

La aplicación incluye un menú de accesibilidad que permite:

1. **Ajustar tamaño de fuente**: 
   - Mediano (14px)
   - Grande (16px) 
   - Extra-Grande (18px)

2. **Cambiar tipo de fuente**:
   - Estándar (Arial)
   - OpenDyslexic (para usuarios con dislexia)

3. **Seleccionar tema**:
   - Tema claro
   - Tema oscuro

Las configuraciones se guardan automáticamente en el navegador del usuario.

## 📊 Funcionalidades por Módulo

### Reportes Médicos
- Registro de emergencias prehospitalarias
- Notas médicas asociadas

### Reportes Urbanos  
- Gestión de emergencias urbanas
- Registro de incidentes y accidentes

### Dashboard Administrativo
- Gráficos de emergencias médicas y urbanas