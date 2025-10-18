/*
Opciones para los campos SelectInput de los reportes y notas
Fecha: 11/08/2025
*/

export const MOTIVO_CHOICES = [
    { id: "Enfermedad", name: "Enfermedad" },
    { id: "Traumatismo", name: "Traumatismo" },
    { id: "Ginecoobstétrico", name: "Ginecoobstétrico" },
];

export const OCURRENCIA_CHOICES = [
    { id: "Transporte público", name: "Transporte público" },
    { id: "Escuela", name: "Escuela" },
    { id: "Trabajo", name: "Trabajo" },
    { id: "Hogar", name: "Hogar" },
    { id: "Recreación y Deporte", name: "Recreación y Deporte" },
    { id: "Vía Pública", name: "Vía Pública" },
    { id: "Otro", name: "Otro" },
];

export const SEXO_CHOICES = [
    { id: 'Masculino', name: 'Masculino' },
    { id: 'Femenino', name: 'Femenino' },
];

export const PRODUCTO_CHOICES = [
    { id: 'Vivo', name: 'Vivo' },
    { id: 'Muerto', name: 'Muerto' },
];

export const AGENTE_CHOICES = [
    { id: 'Arma', name: 'Arma' },
    { id: 'Juguete', name: 'Juguete' },
    { id: 'Explosión', name: 'Explosión' },
    { id: 'Fuego', name: 'Fuego' },
    { id: 'Animal', name: 'Animal' },
    { id: 'Bicicleta', name: 'Bicicleta' },
    { id: 'Automotor', name: 'Automotor' },
    { id: 'Maquinaria', name: 'Maquinaria' },
    { id: 'Herramienta', name: 'Herramienta' },
    { id: 'Eléctrico / Daño', name: 'Eléctrico / Daño' },
    { id: 'Sustancia caliente', name: 'Sustancia caliente' },
    { id: 'Sustancia tóxica', name: 'Sustancia tóxica' },
    { id: 'Producto biológico', name: 'Producto biológico' },
    { id: 'Ser humano', name: 'Ser humano' },
    { id: 'Otro', name: 'Otro' },
];

export const TIPO_ACCIDENTE_CHOICES = [
    { id: 'Colisión', name: 'Colisión' },
    { id: 'Volcadura', name: 'Volcadura' },
    { id: 'Automotor', name: 'Automotor' },
    { id: 'Bicicleta', name: 'Bicicleta' },
    { id: 'Motocicleta', name: 'Motocicleta' },
    { id: 'Maquinaria', name: 'Maquinaria' },
    { id: 'Contra objeto fijo', name: 'Contra objeto fijo' },
];

export const IMPACTO_CHOICES = [
    { id: 'Posterior', name: 'Posterior' },
    { id: 'Volcadura', name: 'Volcadura' },
    { id: 'Rotacional', name: 'Rotacional' },
    { id: 'Frontal', name: 'Frontal' },
    { id: 'Lateral', name: 'Lateral' },
];

export const PARABRISAS_CHOICES = [
    { id: 'Íntegro', name: 'Íntegro' },
    { id: 'Estrellado', name: 'Estrellado' },
];

export const VOLANTE_CHOICES = [
    { id: 'Íntegro', name: 'Íntegro' },
    { id: 'Doblado', name: 'Doblado' },
];

export const SI_NO_CHOICES = [
    { id: 'Sí', name: 'Sí' },
    { id: 'No', name: 'No' },
];

export const CINTURON_CHOICES = [
    { id: 'Colocado', name: 'Colocado' },
    { id: 'No colocado', name: 'No colocado' },
];

export const DENTRO_VEHICULO_CHOICES = [
    { id: 'Sí', name: 'Sí' },
    { id: 'No', name: 'No' },
    { id: 'Eyectado', name: 'Eyectado' },
];

export const ATROPELLADO_CHOICES = [
    { id: 'Automotor', name: 'Automotor' },
    { id: 'Motocicleta', name: 'Motocicleta' },
    { id: 'Bicicleta', name: 'Bicicleta' },
    { id: 'Maquinaria', name: 'Maquinaria' },
];

export const ORIGEN_PROBABLE_CHOICES = [
    { id: 'Neurológica', name: 'Neurológica' },
    { id: 'Infecciosa', name: 'Infecciosa' },
    { id: 'Músculo esquelético', name: 'Músculo esquelético' },
    { id: 'Urogenital', name: 'Urogenital' },
    { id: 'Digestiva', name: 'Digestiva' },
    { id: 'Cardiovascular', name: 'Cardiovascular' },
    { id: 'Oncológico', name: 'Oncológico' },
    { id: 'Metabólico', name: 'Metabólico' },
    { id: 'Ginecoobstétrica', name: 'Ginecoobstétrica' },
    { id: 'Respiratorio', name: 'Respiratorio' },
    { id: 'Cognitivo emocional', name: 'Cognitivo emocional' },
    { id: 'Otro', name: 'Otro' },
];

export const NIVEL_CONSCIENCIA_CHOICES = [
    { id: 'Alerta', name: 'Alerta' },
    { id: 'Dolor', name: 'Dolor' },
    { id: 'Verbal', name: 'Verbal' },
    { id: 'Inconsciente', name: 'Inconsciente' }
];

export const DEGLUCION_CHOICES = [
    { id: 'Ausente', name: 'Ausente' },
    { id: 'Presente', name: 'Presente' }
];

export const VIA_AEREA_CHOICES = [
    { id: 'Permeable', name: 'Permeable' },
    { id: 'Comprometida', name: 'Comprometida' }
];

export const VENTILACION_CHOICES = [
    { id: 'Automatismo regular', name: 'Automatismo regular' },
    { id: 'Automatismo irregular', name: 'Automatismo irregular' },
    { id: 'Automatismo rápido', name: 'Automatismo rápido' },
    { id: 'Automatismo superficial', name: 'Automatismo superficial' },
    { id: 'Apnea', name: 'Apnea' }
];

export const AUSCULTACION_CHOICES = [
    { id: 'Ruidos respiratorios normales', name: 'Ruidos respiratorios normales' },
    { id: 'Ruidos respiratorios disminuidos', name: 'Ruidos respiratorios disminuidos' },
    { id: 'Ruidos respiratorios ausentes', name: 'Ruidos respiratorios ausentes' }
];

export const HEMITORAX_CHOICES = [
    { id: 'Derecho', name: 'Derecho' },
    { id: 'Izquierdo', name: 'Izquierdo' }
];

export const SITIO_CHOICES = [
    { id: 'Apical', name: 'Apical' },
    { id: 'Base', name: 'Base' }
];

export const PRESENCIA_PULSOS_CHOICES = [
    { id: 'Carótideo', name: 'Carótideo' },
    { id: 'Radial', name: 'Radial' },
    { id: 'Paro cardiorespiratorio', name: 'Paro cardiorespiratorio' }
];

export const CALIDAD_CHOICES = [
    { id: 'Rápido', name: 'Rápido' },
    { id: 'Lento', name: 'Lento' },
    { id: 'Rítmico', name: 'Rítmico' },
    { id: 'Arrítmico', name: 'Arrítmico' }
];

export const PIEL_CHOICES = [
    { id: 'Normal', name: 'Normal' },
    { id: 'Pálida', name: 'Pálida' },
    { id: 'Cianótica', name: 'Cianótica' }
];

export const CARACTERISTICAS_CHOICES = [
    { id: 'Caliente', name: 'Caliente' },
    { id: 'Fría', name: 'Fría' },
    { id: 'Diaforesis', name: 'Diaforesis' },
    { id: 'Normotérmico', name: 'Normotérmico' }
];

export const ASISTENCIA_VENTILATORIA_CHOICES = [
    { id: "Balón válvula mascarilla", name: "Balón válvula mascarilla" },
    { id: "Válvula de demanda", name: "Válvula de demanda" },
    { id: "Hiperventilación", name: "Hiperventilación" },
    { id: "Puntas nasales", name: "Puntas nasales" },
    { id: "Mascarilla simple", name: "Mascarilla simple" },
    { id: "Ventilador automático", name: "Ventilador automático" },
    { id: "Hemitorax derecho", name: "Hemitorax derecho" },
    { id: "Hemitorax izquierdo", name: "Hemitorax izquierdo" },
    { id: "Descompresión pleural con agua", name: "Descompresión pleural con agua" },
    { id: "Mascarilla con reservorio", name: "Mascarilla con reservorio" },
    { id: "Mascarilla Venturi", name: "Mascarilla Venturi" },
];

export const CONTROL_CERVICAL_CHOICES = [
    { id: "Manual", name: "Manual" },
    { id: "Collarín rígido", name: "Collarín rígido" },
    { id: "Collarín blando", name: "Collarín blando" },
];

export const CONTROL_HEMORRAGIAS_CHOICES = [
    { id: "Presión directa", name: "Presión directa" },
    { id: "Presión indirecta", name: "Presión indirecta" },
    { id: "Gravedad", name: "Gravedad" },
    { id: "Vendaje compresivo", name: "Vendaje compresivo" },
    { id: "Crioterapia", name: "Crioterapia" },
    { id: "MAST", name: "MAST" },
];

export const VIA_VENOSAS_CHOICES = [
    { id: "Hartmann", name: "Hartmann" },
    { id: "NaCl 0.9 %", name: "NaCl 0.9 %" },
    { id: "Mixta", name: "Mixta" },
    { id: "Glucosa 5%", name: "Glucosa 5%" },
    { id: "Otra", name: "Otra" },
];

export const ATENCION_BASICA_CHOICES = [
    { id: "RCP básica", name: "RCP básica" },
    { id: "RCP avanzada", name: "RCP avanzada" },
    { id: "Curación", name: "Curación" },
    { id: "Inmovilización de extremidades", name: "Inmovilización de extremidades" },
    { id: "Empaquetamiento", name: "Empaquetamiento" },
    { id: "Vendaje", name: "Vendaje" },
];

export const CONDICION_PACIENTE_CHOICES = [
    { id: "Crítico", name: "Crítico" },
    { id: "Estable", name: "Estable" },
    { id: "No crítico", name: "No crítico" },
    { id: "Inestable", name: "Inestable" },
];

export const PRIORIDAD_CHOICES = [
    { id: "Rojo", name: "Rojo" },
    { id: "Amarillo", name: "Amarillo" },
    { id: "Verde", name: "Verde" },
    { id: "Negra", name: "Negra" },
];

// Reportes urbanos

export const MODO_ACTIVACION_CHOICES = [
    { id: "Llamada de emergencia", name: "Llamada de emergencia" },
    { id: "Seguimiento de oficio", name: "Seguimiento de oficio" },
];

export const GRAVEDAD_CHOICES = [
    { id: "Baja", name: "Baja" },
    { id: "Media", name: "Media" },
    { id: "Alta", name: "Alta" },
];

export const AUTORIDADES_CHOICES = [
    { id: "Seguridad Pública", name: "Seguridad Pública" },
    { id: "Policía", name: "Policía" },
    { id: "Bomberos", name: "Bomberos" },
    { id: "Cruz Roja", name: "Cruz Roja" },
    { id: "Otra", name: "Otra" },
];