# Sistema de Gestión de Emergencias - Alcaldía Cuajimalpa

**Aplicación web para la gestión de emergencias prehospitalarias y urbanas de la Alcaldía de Cuajimalpa**

## Integrantes del equipo:
- Aquiba Yudah Benarroch Bittan (A01783710)
- Diego Córdova Rodríguez (A01781166)
- Jin Sik Yoon (A01026630)
- Julio César Rodríguez Figueroa (A01029680)

## 📖 Descripción del Proyecto

Este sistema permite a la Alcaldía de Cuajimalpa gestionar de manera eficiente las emergencias prehospitalarias y urbanas. La aplicación está diseñada con un enfoque en accesibilidad, manejo por roles y una interfaz intuitiva para diferentes tipos de usuarios del sistema de emergencias.

## 🚀 Características Principales

### 🏥 Gestión de Emergencias
- **Reportes Médicos**: Registro y seguimiento de emergencias médicas y prehospitalarias
- **Notas Médicas**: Documentación detallada de intervenciones médicas
- **Reportes Urbanos**: Gestión de emergencias urbanas (incendios, accidentes, etc.)
- **Notas Urbanas**: Seguimiento de intervenciones en emergencias urbanas

### 👥 Sistema de Roles y Permisos
El sistema cuenta con 4 tipos de usuarios con diferentes niveles de acceso:

- **👑 Administrador (admin)**: Acceso completo a todas las funcionalidades.
- **📊 Jefe**: Puede ver todos los reportes y notas (médicas y urbanas) de su turno.
- **🚑 Paramédico**: Acceso completo a reportes y notas médicas previas hechas por el usuario.
- **🏢 Personal Urbano**: Acceso completo a reportes y notas urbanas previas hechas por el usuario.

### ♿ Características de Accesibilidad
- **Tamaños de fuente ajustables**: Mediano, Grande y Extra-Grande
- **Fuente para dislexia**: Soporte para fuente OpenDyslexic
- **Temas de alto contraste**: Tema claro y oscuro optimizados para visibilidad
- **Navegación accesible**: Interfaz compatible con lectores de pantalla
- **Menú de accesibilidad integrado**: Fácil configuración de preferencias

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
- **Vite 6.2** - Herramienta de construcción y desarrollo

### Librerías Adicionales
- **ECharts 6.0** - Gráficos y visualizaciones
- **Emotion** - Styled components
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
   - Tema claro con alto contraste
   - Tema oscuro con alto contraste

Las configuraciones se guardan automáticamente en el navegador del usuario.

## 📊 Funcionalidades por Módulo

### Reportes Médicos
- Registro de emergencias prehospitalarias
- Formularios detallados con información del paciente
- Sistema de seguimiento de casos
- Notas médicas asociadas

### Reportes Urbanos  
- Gestión de emergencias urbanas
- Registro de incidentes y accidentes
- Seguimiento de intervenciones
- Documentación de resolución

### Dashboard Administrativo
- Estadísticas en tiempo real
- Gráficos de emergencias médicas y urbanas
- Resúmenes de actividad por período
- Métricas de rendimiento del sistema

## 🌐 Internacionalización

La aplicación está configurada en español mexicano e incluye:
- Interfaz completamente traducida
- Formatos de fecha y hora localizados
- Mensajes de error en español
- Terminología específica del sector salud
