# Requerimientos

## Requerimientos funcionales

**RF01**
**Nombre**: Acceso a la aplicación mediante código QR
**Prioridad**: Baja
**Criterios de aceptación**:
- El QR puede ser escaneado por un celular con cámara.
- El acceso mediante código QR redirige a la página de inicio de sesión, respetando las restricciones de niveles de acceso.

**RF02**
**Nombre**: Niveles de acceso por roles
**Prioridad**: Alta
**Criterios de aceptación**:
- La aplicación cuenta con niveles de acceso con sus respectivos permisos:
  - Administrador: puede visualizar todos los registros con sus respectivos datos, fecha de creación y folio
  - Jefe de turno: puede visualizar todos los registros de ese turno.
  - Operador: puede visualizar solo los registros que él haga (No los puede editar una vez han sido creados).
- Se muestran los registros correspondientes dependiendo del nivel de permisos que posea la cuenta.

**RF03**
**Nombre**: Acceso mediante credenciales de inicio de sesión (usuario y contraseña)
**Prioridad**: Alta
**Criterios de aceptación**:
- El sistema obtiene las credenciales de inicio de sesión y valida que existan en la base de datos.
- Si la validación es correcta, se permite acceso a la aplicación de acuerdo al rol del usuario (Operador paramédico, de emergencias urbanas. jefe de turno o administrador).
- Si la validación es incorrecta, se muestra el mensaje "Credenciales incorrectas".

**RF04**
**Nombre**: Seguridad de datos para credenciales de inicio de sesión (usuario y contraseña)
**Prioridad**: Alta
**Criterios de aceptación**:
- Las contraseñas de los usuarios (operadores, jefes de turno o administradores) se encuentran cifradas en la base de datos, mediante el uso de un algoritmo de cifrado.
- Solo se permite la creación de contraseñas seguras, con longitud de 9-12 caracteres, símbolos especiales, números y mayúsculas.

**RF05**
**Nombre**: Interfaz de inicio
**Prioridad**: Alta
**Criterios de aceptación**:
- La aplicación muestra una interfaz adaptada al rol del usuario, permitiendo acceder únicamente a sus respectivas funciones:
  - Paramédico
    - Registrar incidente
    - Ver reportes anteriores
    - Ver notas anteriores
  - Operador de emergencias urbanas
    - Registrar incidente
    - Ver reportes anteriores
    - Ver notas anteriores
  - Jefe de turno
    - Ver reportes del turno
    - Ver notas del turno
  - Administrador
    - Emergencias paramédicas
    - Ver todos los reportes
    - Ver todas las notas
    - Ver panel de estadísticas
    - Emergencias urbanas
    - Ver todos los reportes
    - Ver todas las notas
    - Ver panel de estadísticas
- Se muestra un botón para cada una de las acciones que puede realizar cada tipo de usuario.
- La aplicación identifica automáticamente el rol del usuario tras iniciar sesión.
- Solo se muestran las funciones respectivas de cada rol de usuario.

**RF06**
**Nombre**: Especificación de tipo de reporte a generar
**Prioridad**: Media
**Criterios de aceptación**:
- Al momento de iniciar el proceso de registro de un incidente, el sistema muestra una ventana emergente con el siguiente texto. "¿Qué tipo de reporte deseas generar?".
- La ventana emergente cuenta con 3 opciones:
  - Reporte completo
  - Nota
  - Regresar
- Al presionar cualquiera de los botones, se muestra la interfaz para llenar los respectivos campos del reporte.
- El usuario puede presionar el botón de "Regresar" para salir de la ventana emergente.

**RF07**
**Nombre**: Registro de reporte completo de emergencia prehospitalaria
**Prioridad**: Alta
**Criterios de aceptación**:
- El sistema muestra campos para completar el reporte con la siguiente información:
  - Folio
  - I. Datos del servicio
  - II Control
  - III Datos del paciente
  - IV Parto
  - V Causa traumática
  - VI Causa clínica
  - VII Evaluación inicial
  - VIII Evaluación secundaria
  - IX Traslado
  - X Tratamiento
  - XI Observaciones
  - XII Ministerio público
  - XIII Datos legales
  - Nombre paciente
  - Nombre testigo
  - Nombre paramédico
  - Nombre médico
- Para ver la especificación de todos los campos requeridos para el reporte, revisar el Anexo 1 del documento.
- Se debe ingresar manualmente el número de folio.
- La información debe ser almacenada en la base de datos del sistema.

**RF08**
**Nombre**: Registro de reporte completo de emergencia urbana
**Prioridad**: Alta
**Criterios de aceptación**:
- El sistema muestra campos para completar el reporte con la siguiente información:
  - Folio
  - Día, fecha y hora
  - Turno
  - Nombre del personal a cargo
  - Modo de activación (llamada de emergencia o seguimiento de oficio)
  - Tipo de servicio al que se acude (petición de mitigación de riesgo)
  - Fecha y hora de atención
  - Tiempo de traslado para atender de la emergencia
  - Ubicación (gps o seleccionar en mapa)
  - Gravedad de la emergencia (Baja/Media/Alta)
  - Km recorridos
  - Trabajos realizados
  - Observaciones (texto y fotografías)
  - Conclusión/Dictamen
  - Responsables de la emergencia (responsable del inmueble, zona, etc)
  - Autoridades o dependencias participantes (Seguridad Pública, bomberos, etc)
- Para ver la especificación de todos los campos requeridos para el reporte, revisar el Anexo 2 del documento.
- Se debe ingresar manualmente el número de folio.
- La información debe ser almacenada en la base de datos del sistema.

**RF09**
**Nombre**: Edición de folios e historial de cambios
**Prioridad**: Media
**Criterios de aceptación**:
- El sistema permite que operadores (paramédicos y de emergencias urbanas), jefes de turno y administradores puedan entrar a un reporte y editar el número de folio de un reporte para su corrección.
- Cada edición realizada al folio queda almacenada en un historial de cambios (usuario que lo modificó y fecha con hora).
- El historial de cambios es visible para los jefes de turno y administrador(es).

**RF10**
**Nombre**: Registro de ubicación precisa con GPS y mapa
**Prioridad**: Media
**Criterios de aceptación**:
- Dentro del formato de emergencias prehospitalarias y urbanas, existe un campo de ubicación, donde se observa lo siguiente:
  - Recuadro con mapa GPS
  - Campo de texto de ubicación
- Al seleccionar una ubicación en el mapa GPS, se rellena automáticamente el campo de texto con la ubicación.
- La ubicación se puede ajustar manualmente y se refleja en el mapa GPS.
- Se pueden adjuntar 2 o más fotografías del área afectada como parte de la documentación del reporte.

**RF11**
**Nombre**: Consulta de reportes
**Prioridad**: Alta
**Criterios de aceptación**:
- El sistema debe permitir filtrar los reportes por:
  - Rango de fechas
  - Ubicación (colonia, calle, coordenadas o zona definida)
  - Tipo de incidente (incendio, accidente vial, inundación, etc.)
- Los resultados deben visualizarse en una tabla estructurada con las siguientes columnas:
  - Folio del incidente
  - Fecha y hora
  - Ubicación
  - Tipo de incidente
  - Estado (atendido, en proceso, cerrado)
- Se habilita la opción de exportar los reportes en formato PDF.
- El administrador y jefe de turno son los únicos usuarios capaces de consultar los reportes a los que tienen acceso.

**RF12**
**Nombre**: Panel de estadísticas de emergencias prehospitalarias
**Prioridad**: Alta
**Criterios de aceptación**:
- El panel muestra la siguiente información:
  - Traslados realizados (por turno y en total)
  - Número de casos atendidos
  - Tiempos de respuesta (salidas por c5 vs. otros casos)
  - Gráficas del personal (reportes generados por operador)
  - Número de emergencias siendo atendidas
  - Cantidad de mujeres vs. hombres en incidentes
- El panel permite la exportación de datos en tabla y gráfica en formato PDF.
- El acceso al panel debe estar restringido únicamente a usuarios con rol de administrador.
- Los datos del panel deben actualizarse en tiempo real de acuerdo a la información de la base de datos.

**RF13**
**Nombre**: Panel de estadísticas de emergencias urbanas
**Prioridad**: Alta
**Criterios de aceptación**:
- El panel muestra la siguiente información:
  - Número total de emergencias registradas en un periodo
  - Ubicaciones con mayor frecuencia de incidentes (ranking)
  - Tiempo promedio de respuesta por tipo de incidente
  - Recursos utilizados (vehículos, personal, equipos)
- El panel permite la exportación de datos en tabla y gráfica en formato PDF.
- El acceso al panel debe estar restringido únicamente a usuarios con rol de administrador.
- Los datos del panel deben actualizarse en tiempo real de acuerdo a la información de la base de datos.

**RF14**
**Nombre**: Disponibilidad de la aplicación
**Prioridad**: Media
**Criterios de aceptación**:
La aplicación debe permanecer disponible durante los tiempos de cada turno:
- Turno 1: lunes a viernes de 8 a.m. a 3 p.m.
- Turno 2: lunes a viernes de 3 p.m. a 9 p.m.
- Turno 3: lunes, miércoles y viernes de 9 p.m. a 8 a.m.
- Turno 4: martes jueves y domingo de 9 p.m. a 8 a.m.
- Turno 5: sábados, domingos y días festivos de 8 a.m. a 8 p.m.
- Turno 6: sábados, domingos y días festivos 8 p.m. a 8 a.m

## Requerimientos no funcionales

**RNF01**
**Descripción**: Tiempo de respuesta de registros y consultas
**Criterio**: El tiempo de respuesta de la aplicación con la base de datos no debe superar los 5 segundos, considerando las siguientes acciones:
- Registro de reportes
- Registro de notas de incidente
- Consulta de reportes
- Obtención de estadísticas

Se debe considerar que el operador no siempre contará con una buena cobertura de red.

**RNF02**
**Descripción**: Usabilidad
**Criterio**: Se debe poder acceder a cada función principal en menos de 3 acciones, comprendiendo lo siguiente:
- Registro de reportes
- Registro de notas de incidente
- Consulta de reportes
- Obtención de estadísticas

**RNF03**
**Descripción**: Escalabilidad
**Criterio**: La aplicación es capaz de soportar los 62 trabajadores de emergencias prehospitalarias y urbanas de forma concurrente.

**RNF04**
**Descripción**: Tiempo de registro de reportes
**Criterio**: Los operadores deben ser capaces de generar un reporte completo en un tiempo no mayor a 10 minutos desde que inicia la aplicación hasta que finaliza el proceso de registro.

**RNF05**
**Descripción**: Accesibilidad
**Criterio**: Cumplir con los principios de accesibilidad establecidos por Web Accessibility Initiative (WAI):
- Perceptible
- Operable
- Entendible
- Robusto

La aplicación debe cumplir con el 80% de porcentaje de accesibilidad usando la extensión "Lighthouse".

**RNF06**
**Descripción**: Consumo de memoria
**Criterio**: La aplicación en la web debe usar menos de la mitad de la memoria RAM del dispositivo.

**RNF07**
**Descripción**: Tiempo de acceso a la aplicación
**Criterio**: El tiempo de respuesta de la página web de la aplicación no debe superar los 3 segundos al momento de que un operador ingresa desde un incidente.

**RNF08**
**Descripción**: Tiempo de exportación de estadísticas
**Criterio**: El tiempo de respuesta de la aplicación al momento de que un administrador exporta estadísticas no debe superar los 3 segundos, desde que se presiona el botón hasta que se tiene el archivo descargado.

**RNF09**
**Descripción**: Tiempo de validación de credenciales
**Criterio**: El tiempo de respuesta de la aplicación no debe superar los 2 segundos desde que se ingresan las credenciales del usuario (usuario y contraseña) hasta que se ingresa a la aplicación.

**RNF10**
**Descripción**: Tiempo de carga de reportes filtrados
**Criterio**: El tiempo de respuesta de la aplicación no debe superar los 2 segundos desde que se confirma la acción de filtrar los reportes.

**RNF11**
**Descripción**: Compatibilidad de dispositivos
**Criterio**: La aplicación debe ser ejecutada correctamente en al menos 2 dispositivos distintos (computadora de escritorio y teléfono móvil IOS).