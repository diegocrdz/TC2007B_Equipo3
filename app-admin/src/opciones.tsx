/*
    Opciones para los campos SelectInput de los reportes y notas médicas y urbanas
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
    { id: 'masculino', name: 'MASC' },
    { id: 'femenino', name: 'FEM' },
];

export const PRODUCTO_CHOICES = [
    { id: 'vivo', name: 'Vivo' },
    { id: 'muerto', name: 'Muerto' },
];

export const AGENTE_CHOICES = [
    { id: 'Agente.arma', name: 'Arma' },
    { id: 'Agente.juguete', name: 'Juguete' },
    { id: 'Agente.explosion', name: 'Explosión' },
    { id: 'Agente.fuego', name: 'Fuego' },
    { id: 'Agente.animal', name: 'Animal' },
    { id: 'Agente.bicicleta', name: 'Bicicleta' },
    { id: 'Agente.automotor', name: 'Automotor' },
    { id: 'Agente.maquinaria', name: 'Maquinaria' },
    { id: 'Agente.herramienta', name: 'Herramienta' },
    { id: 'Agente.electricoDano', name: 'Eléctrico / Daño' },
    { id: 'Agente.sustanciaCaliente', name: 'Sustancia caliente' },
    { id: 'Agente.sustanciaToxica', name: 'Sustancia tóxica' },
    { id: 'Agente.productoBiologico', name: 'Producto biológico' },
    { id: 'Agente.serHumano', name: 'Ser humano' },
    { id: 'Agente.otro', name: 'Otro' },
];

export const TIPO_ACCIDENTE_CHOICES = [
    { id: 'accidente.colision', name: 'Colisión' },
    { id: 'accidente.volcadura', name: 'Volcadura' },
    { id: 'accidente.automotor', name: 'Automotor' },
    { id: 'accidente.bicicleta', name: 'Bicicleta' },
    { id: 'accidente.motocicleta', name: 'Motocicleta' },
    { id: 'accidente.maquinaria', name: 'Maquinaria' },
    { id: 'accidente.objeto', name: 'Contra objeto fijo' },
];

export const IMPACTO_CHOICES = [
    { id: 'accidente.posterior', name: 'Posterior' },
    { id: 'accidente.volcadura', name: 'Volcadura' },
    { id: 'accidente.rotacional', name: 'Rotacional' },
    { id: 'accidente.frontal', name: 'Frontal' },
    { id: 'accidente.lateral', name: 'Lateral' },
];

export const PARABRISAS_CHOICES = [
    { id: 'accidente.integro', name: 'Íntegro' },
    { id: 'accidente.estrellado', name: 'Estrellado' },
];

export const VOLANTE_CHOICES = [
    { id: 'accidente.integro', name: 'Íntegro' },
    { id: 'accidente.doblado', name: 'Doblado' },
];

export const SI_NO_CHOICES = [
    { id: 'si', name: 'Sí' },
    { id: 'no', name: 'No' },
];

export const CINTURON_CHOICES = [
    { id: 'accidente.colocado', name: 'Colocado' },
    { id: 'accidente.no_colocado', name: 'No colocado' },
];

export const DENTRO_VEHICULO_CHOICES = [
    { id: 'accidente.si', name: 'Sí' },
    { id: 'accidente.no', name: 'No' },
    { id: 'accidente.eyectado', name: 'Eyectado' },
];

export const ATROPELLADO_CHOICES = [
    { id: 'atropellado.automotor', name: 'Automotor' },
    { id: 'atropellado.motocicleta', name: 'Motocicleta' },
    { id: 'atropellado.bicicleta', name: 'Bicicleta' },
    { id: 'atropellado.maquinaria', name: 'Maquinaria' },
];

export const ORIGEN_PROBABLE_CHOICES = [
    { id: 'causa_clinica.neurologica', name: 'Neurológica' },
    { id: 'causa_clinica.infecciosa', name: 'Infecciosa' },
    { id: 'causa_clinica.musculoEsqueletico', name: 'Músculo esquelético' },
    { id: 'causa_clinica.urogenital', name: 'Urogenital' },
    { id: 'causa_clinica.digestiva', name: 'Digestiva' },
    { id: 'causa_clinica.cardiovascular', name: 'Cardiovascular' },
    { id: 'causa_clinica.oncologico', name: 'Oncológico' },
    { id: 'causa_clinica.metabolico', name: 'Metabólico' },
    { id: 'causa_clinica.ginecoobstetrica', name: 'Ginecoobstétrica' },
    { id: 'causa_clinica.respiratorio', name: 'Respiratorio' },
    { id: 'causa_clinica.cognitivoEmocional', name: 'Cognitivo emocional' },
    { id: 'causa_clinica.otro', name: 'Otro' },
];

export const NIVEL_CONSCIENCIA_CHOICES = [
    { id: 'evaluacion.alerta', name: 'Alerta' },
    { id: 'evaluacion.dolor', name: 'Dolor' },
    { id: 'evaluacion.verbal', name: 'Verbal' },
    { id: 'evaluacion.inconsciente', name: 'Inconsciente' }
];

export const DEGLUCION_CHOICES = [
    { id: 'evaluacion.ausente', name: 'Ausente' },
    { id: 'evaluacion.presente', name: 'Presente' }
];

export const VIA_AEREA_CHOICES = [
    { id: 'evaluacion.permeable', name: 'Permeable' },
    { id: 'evaluacion.comprometida', name: 'Comprometida' }
];

export const VENTILACION_CHOICES = [
    { id: 'evaluacion.automatismoRegular', name: 'Automatismo regular' },
    { id: 'evaluacion.automatismoIrregular', name: 'Automatismo irregular' },
    { id: 'evaluacion.automatismoRapido', name: 'Automatismo rápido' },
    { id: 'evaluacion.automatismoSuperficial', name: 'Automatismo superficial' },
    { id: 'evaluacion.apnea', name: 'Apnea' }
];

export const AUSCULTACION_CHOICES = [
    { id: 'evaluacion.ruidosNormales', name: 'Ruidos respiratorios normales' },
    { id: 'evaluacion.ruidosDisminuidos', name: 'Ruidos respiratorios disminuidos' },
    { id: 'evaluacion.ruidosAusentes', name: 'Ruidos respiratorios ausentes' }
];

export const HEMITORAX_CHOICES = [
    { id: 'evaluacion.derecho', name: 'Derecho' },
    { id: 'evaluacion.izquierdo', name: 'Izquierdo' }
];

export const SITIO_CHOICES = [
    { id: 'evaluacion.apical', name: 'Apical' },
    { id: 'evaluacion.base', name: 'Base' }
];

export const PRESENCIA_PULSOS_CHOICES = [
    { id: 'evaluacion.carotideo', name: 'Carótideo' },
    { id: 'evaluacion.radial', name: 'Radial' },
    { id: 'evaluacion.paroCardiorespiratorio', name: 'Paro cardiorespiratorio' }
];

export const CALIDAD_CHOICES = [
    { id: 'evaluacion.rapido', name: 'Rápido' },
    { id: 'evaluacion.lento', name: 'Lento' },
    { id: 'evaluacion.ritmico', name: 'Rítmico' },
    { id: 'evaluacion.arritmico', name: 'Arrítmico' }
];

export const PIEL_CHOICES = [
    { id: 'evaluacion.normal', name: 'Normal' },
    { id: 'evaluacion.palida', name: 'Pálida' },
    { id: 'evaluacion.cianotica', name: 'Cianótica' }
];

export const CARACTERISTICAS_CHOICES = [
    { id: 'evaluacion.caliente', name: 'Caliente' },
    { id: 'evaluacion.fria', name: 'Fría' },
    { id: 'evaluacion.diaforesis', name: 'Diaforesis' },
    { id: 'evaluacion.normotermico', name: 'Normotérmico' }
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