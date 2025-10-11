/*
Opciones para los campos SelectInput de los reportes y notas
Fecha: 11/08/2025
*/

export const MOTIVO_CHOICES = [
    { id: "enfermedad", name: "Enfermedad" },
    { id: "traumatismo", name: "Traumatismo" },
    { id: "ginecoobstetrico", name: "Ginecoobstétrico" },
];

export const OCURRENCIA_CHOICES = [
    { id: "transporte_publico", name: "Transporte público" },
    { id: "escuela", name: "Escuela" },
    { id: "trabajo", name: "Trabajo" },
    { id: "hogar", name: "Hogar" },
    { id: "recreacion_deporte", name: "Recreación y Deporte" },
    { id: "via_publica", name: "Vía Pública" },
    { id: "otro", name: "Otro" },
];

export const SEXO_CHOICES = [
    { id: 'masculino', name: 'Masculino' },
    { id: 'femenino', name: 'Femenino' },
];

export const PRODUCTO_CHOICES = [
    { id: 'vivo', name: 'Vivo' },
    { id: 'muerto', name: 'Muerto' },
];

export const AGENTE_CHOICES = [
    { id: 'arma', name: 'Arma' },
    { id: 'juguete', name: 'Juguete' },
    { id: 'explosion', name: 'Explosión' },
    { id: 'fuego', name: 'Fuego' },
    { id: 'animal', name: 'Animal' },
    { id: 'bicicleta', name: 'Bicicleta' },
    { id: 'automotor', name: 'Automotor' },
    { id: 'maquinaria', name: 'Maquinaria' },
    { id: 'herramienta', name: 'Herramienta' },
    { id: 'electricoDano', name: 'Eléctrico / Daño' },
    { id: 'sustanciaCaliente', name: 'Sustancia caliente' },
    { id: 'sustanciaToxica', name: 'Sustancia tóxica' },
    { id: 'productoBiologico', name: 'Producto biológico' },
    { id: 'serHumano', name: 'Ser humano' },
    { id: 'otro', name: 'Otro' },
];

export const TIPO_ACCIDENTE_CHOICES = [
    { id: 'colision', name: 'Colisión' },
    { id: 'volcadura', name: 'Volcadura' },
    { id: 'automotor', name: 'Automotor' },
    { id: 'bicicleta', name: 'Bicicleta' },
    { id: 'motocicleta', name: 'Motocicleta' },
    { id: 'maquinaria', name: 'Maquinaria' },
    { id: 'objeto', name: 'Contra objeto fijo' },
];

export const IMPACTO_CHOICES = [
    { id: 'posterior', name: 'Posterior' },
    { id: 'volcadura', name: 'Volcadura' },
    { id: 'rotacional', name: 'Rotacional' },
    { id: 'frontal', name: 'Frontal' },
    { id: 'lateral', name: 'Lateral' },
];

export const PARABRISAS_CHOICES = [
    { id: 'integro', name: 'Íntegro' },
    { id: 'estrellado', name: 'Estrellado' },
];

export const VOLANTE_CHOICES = [
    { id: 'integro', name: 'Íntegro' },
    { id: 'doblado', name: 'Doblado' },
];

export const SI_NO_CHOICES = [
    { id: 'si', name: 'Sí' },
    { id: 'no', name: 'No' },
];

export const CINTURON_CHOICES = [
    { id: 'colocado', name: 'Colocado' },
    { id: 'no_colocado', name: 'No colocado' },
];

export const DENTRO_VEHICULO_CHOICES = [
    { id: 'si', name: 'Sí' },
    { id: 'no', name: 'No' },
    { id: 'eyectado', name: 'Eyectado' },
];

export const ATROPELLADO_CHOICES = [
    { id: 'automotor', name: 'Automotor' },
    { id: 'motocicleta', name: 'Motocicleta' },
    { id: 'bicicleta', name: 'Bicicleta' },
    { id: 'maquinaria', name: 'Maquinaria' },
];

export const ORIGEN_PROBABLE_CHOICES = [
    { id: 'neurologica', name: 'Neurológica' },
    { id: 'infecciosa', name: 'Infecciosa' },
    { id: 'musculoEsqueletico', name: 'Músculo esquelético' },
    { id: 'urogenital', name: 'Urogenital' },
    { id: 'digestiva', name: 'Digestiva' },
    { id: 'cardiovascular', name: 'Cardiovascular' },
    { id: 'oncologico', name: 'Oncológico' },
    { id: 'metabolico', name: 'Metabólico' },
    { id: 'ginecoobstetrica', name: 'Ginecoobstétrica' },
    { id: 'respiratorio', name: 'Respiratorio' },
    { id: 'cognitivoEmocional', name: 'Cognitivo emocional' },
    { id: 'otro', name: 'Otro' },
];

export const NIVEL_CONSCIENCIA_CHOICES = [
    { id: 'alerta', name: 'Alerta' },
    { id: 'dolor', name: 'Dolor' },
    { id: 'verbal', name: 'Verbal' },
    { id: 'inconsciente', name: 'Inconsciente' }
];

export const DEGLUCION_CHOICES = [
    { id: 'ausente', name: 'Ausente' },
    { id: 'presente', name: 'Presente' }
];

export const VIA_AEREA_CHOICES = [
    { id: 'permeable', name: 'Permeable' },
    { id: 'comprometida', name: 'Comprometida' }
];

export const VENTILACION_CHOICES = [
    { id: 'automatismoRegular', name: 'Automatismo regular' },
    { id: 'automatismoIrregular', name: 'Automatismo irregular' },
    { id: 'automatismoRapido', name: 'Automatismo rápido' },
    { id: 'automatismoSuperficial', name: 'Automatismo superficial' },
    { id: 'apnea', name: 'Apnea' }
];

export const AUSCULTACION_CHOICES = [
    { id: 'ruidosNormales', name: 'Ruidos respiratorios normales' },
    { id: 'ruidosDisminuidos', name: 'Ruidos respiratorios disminuidos' },
    { id: 'ruidosAusentes', name: 'Ruidos respiratorios ausentes' }
];

export const HEMITORAX_CHOICES = [
    { id: 'derecho', name: 'Derecho' },
    { id: 'izquierdo', name: 'Izquierdo' }
];

export const SITIO_CHOICES = [
    { id: 'apical', name: 'Apical' },
    { id: 'base', name: 'Base' }
];

export const PRESENCIA_PULSOS_CHOICES = [
    { id: 'carotideo', name: 'Carótideo' },
    { id: 'radial', name: 'Radial' },
    { id: 'paroCardiorespiratorio', name: 'Paro cardiorespiratorio' }
];

export const CALIDAD_CHOICES = [
    { id: 'rapido', name: 'Rápido' },
    { id: 'lento', name: 'Lento' },
    { id: 'ritmico', name: 'Rítmico' },
    { id: 'arritmico', name: 'Arrítmico' }
];

export const PIEL_CHOICES = [
    { id: 'normal', name: 'Normal' },
    { id: 'palida', name: 'Pálida' },
    { id: 'cianotica', name: 'Cianótica' }
];

export const CARACTERISTICAS_CHOICES = [
    { id: 'caliente', name: 'Caliente' },
    { id: 'fria', name: 'Fría' },
    { id: 'diaforesis', name: 'Diaforesis' },
    { id: 'normotermico', name: 'Normotérmico' }
];

export const ASISTENCIA_VENTILATORIA_CHOICES = [
    { id: "balon_valvula_mascarilla", name: "Balón válvula mascarilla" },
    { id: "valvula_demanda", name: "Válvula de demanda" },
    { id: "hiperventilacion", name: "Hiperventilación" },
    { id: "puntas_nasales", name: "Puntas nasales" },
    { id: "mascarilla_simple", name: "Mascarilla simple" },
    { id: "ventilador_automatico", name: "Ventilador automático" },
    { id: "hemitorax_derecho", name: "Hemitorax derecho" },
    { id: "hemitorax_izquierdo", name: "Hemitorax izquierdo" },
    { id: "descompresion_pleural", name: "Descompresión pleural con agua" },
    { id: "mascarilla_reservorio", name: "Mascarilla con reservorio" },
    { id: "mascarilla_venturi", name: "Mascarilla Venturi" },
];

export const CONTROL_CERVICAL_CHOICES = [
    { id: "manual", name: "Manual" },
    { id: "collarin_rigido", name: "Collarín rígido" },
    { id: "collarin_blando", name: "Collarín blando" },
];

export const CONTROL_HEMORRAGIAS_CHOICES = [
    { id: "presion_directa", name: "Presión directa" },
    { id: "presion_indirecta", name: "Presión indirecta" },
    { id: "gravedad", name: "Gravedad" },
    { id: "vendaje_compresivo", name: "Vendaje compresivo" },
    { id: "criotepia", name: "Crioterapia" },
    { id: "mast", name: "MAST" },
];

export const VIA_VENOSAS_CHOICES = [
    { id: "hartmann", name: "Hartmann" },
    { id: "nacl_09", name: "NaCl 0.9 %" },
    { id: "mixta", name: "Mixta" },
    { id: "glucosa5", name: "Glucosa 5%" },
    { id: "otra", name: "Otra" },
];

export const ATENCION_BASICA_CHOICES = [
    { id: "rcp_basica", name: "RCP básica" },
    { id: "rcp_avanzada", name: "RCP avanzada" },
    { id: "curacion", name: "Curación" },
    { id: "inmovilizacion", name: "Inmovilización de extremidades" },
    { id: "empaquetamiento", name: "Empaquetamiento" },
    { id: "vendaje", name: "Vendaje" },
];

export const CONDICION_PACIENTE_CHOICES = [
    { id: "critico", name: "Crítico" },
    { id: "estable", name: "Estable" },
    { id: "no_critico", name: "No crítico" },
    { id: "inestable", name: "Inestable" },
];

export const PRIORIDAD_CHOICES = [
    { id: "rojo", name: "Rojo" },
    { id: "amarillo", name: "Amarillo" },
    { id: "verde", name: "Verde" },
    { id: "negra", name: "Negra" },
];

// Reportes urbanos

export const MODO_ACTIVACION_CHOICES = [
    { id: "llamada_emergencia", name: "Llamada de emergencia" },
    { id: "seguimiento_oficio", name: "Seguimiento de oficio" },
];

export const GRAVEDAD_CHOICES = [
    { id: "baja", name: "Baja" },
    { id: "media", name: "Media" },
    { id: "alta", name: "Alta" },
];

export const AUTORIDADES_CHOICES = [
    { id: "seguridad_publica", name: "Seguridad Pública" },
    { id: "policia", name: "Policía" },
    { id: "bomberos", name: "Bomberos" },
    { id: "cruz_roja", name: "Cruz Roja" },
    { id: "otra", name: "Otra" },
];