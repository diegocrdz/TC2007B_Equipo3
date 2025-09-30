import { DataProvider } from 'react-admin';

type DataStore = {
    [key: string]: any[];
};

const data: DataStore = {
    reportes_medicos: [
        {
            id: 1,
            usuarioId: 3,

            // Historial de cambios
            historialCambios: [
                {
                    usuarioId: 2,
                    folioAnterior: "RU-2024-000",
                    folioNuevo: "RU-2024-001",
                    fechaCambio: "2024-03-15T14:00:00.000Z",
                },
                {
                    usuarioId: 3,
                    folioAnterior: "RU-2024-001",
                    folioNuevo: "RU-2024-002",
                    fechaCambio: "2024-03-15T15:00:00.000Z",
                },
                {
                    usuarioId: 3,
                    folioAnterior: "RM-2024-000",
                    folioNuevo: "RM-2024-001",
                    fechaCambio: "2024-03-15T15:30:00.000Z",
                }
            ],

            // Datos del Servicio
            folio: "RM-2024-001",
            fecha: "2024-03-15",
            turno: 1,
            personalACargo: "Jefe de Turno Carlos Mendoza",
            horaLlam: "14:30",
            horaSal: "14:35",
            horaLlegada: "14:52",
            horaTras: "15:15",
            horaHos: "15:30",
            horaSalidaHos: "16:00",
            horaBase: "16:20",
            nombrePaciente: "Juan Carlos Pérez González",
            nombreTestigo: "María Elena Rodríguez",
            nombreParamedico: "Dr. Luis Fernando Castro",
            nombreMedico: "Dra. Ana Patricia Hernández",
            motivo: "accidente_trafico",
            motivoOtro: "",
            lugarOcurrencia: "trabajo",
            lugarOcurrenciaOtro: "",
            ubicacion: {
                calle: "Av. Insurgentes Sur",
                numExt: "1234",
                numInt: "Calz. de Tlalpan",
                colonia: "Del Valle",
                municipio: "Benito Juárez"
            },
            
            // Control
            control: {
                numAmbulancia: "AMB-001",
                operador: "Carlos Mendoza",
                tum: "Ricardo López",
                socorrista: "Pedro Martínez",
                helicopteroMatricula: "XA-ABC"
            },
            
            // Datos del Paciente
            paciente: {
                sexo: "masculino",
                edad: 35,
                domicilio: "Calle Falsa 123, Col. Centro",
                colonia: "Centro",
                alcaldia: "Cuauhtémoc",
                derechohabiente: "IMSS",
                telefono: "5512345678",
                ubicacion: "Ingeniero"
            },
            
            // Parto
            parto: {
                semanas: "38",
                horaContracciones: "12:00",
                frecuencia: "5 min",
                duracion: "45 seg",
                horaNacimiento: "13:45",
                placenta: "Completa",
                producto: "unico_vivo",
                sexo: "masculino",
                edadGestacional: 38,
                apgar1min: 8,
                apgar5min: 9,
                apgar10min: 9,
                apgar15min: 9,
                apgar20min: 9
            },
            
            // Causa Traumática
            agente: {
                causal: ["vehiculo_motor"],
                especificar: "Colisión frontal"
            },
            accidente: {
                tipo: ["colision_frontal"],
                impacto: ["frontal"],
                cms: "15 cm",
                parabrisas: "estrellado",
                volante: "deformado",
                bolsa: "si",
                cinturon: "colocado",
                dentroVehiculo: "eyectado_no"
            },
            atropellado: {
                vehiculo: "automovil"
            },
            
            // Causa Clínica
            causaClinica: {
                origenProbable: ["cardiovascular"],
                especifique: "Posible infarto agudo al miocardio",
                primeraVez: "Si",
                subsecuente: "No"
            },
            
            // Evaluación Inicial
            evaluacionInicial: {
                nivelConsciencia: "consciente",
                deglucion: "normal",
                viaAerea: "permeable",
                ventilacion: "normal",
                auscultacion: "normal",
                hemitorax: "derecho",
                sitio: "apice",
                presenciaPulsos: "presentes",
                calidad: "buena",
                piel: "normal",
                caracteristicas: "hidratada",
                observaciones: "Paciente consciente y orientado, presenta dolor torácico de intensidad 8/10, refiere dificultad respiratoria leve."
            },
            
            // Evaluación Secundaria
            evalSec: {
                nombre: "Juan Carlos Pérez González",
                asuntoNo: 12345,
                fecha: "2024-03-15",
                zonasLesion: [
                    {
                        zona: 1,
                        lesion: "C"
                    },
                    {
                        zona: 15,
                        lesion: "L"
                    }
                ],
                signosVitales: [
                    {
                        hora: "15:00",
                        fr: "22",
                        fc: "95",
                        tas: "140",
                        tad: "90",
                        sao2: "96",
                        temp: "36.5",
                        glucosa: "110",
                        a: "4",
                        v: "4",
                        d: "4",
                        i: "4"
                    },
                    {
                        hora: "15:15",
                        fr: "20",
                        fc: "88",
                        tas: "135",
                        tad: "85",
                        sao2: "98",
                        temp: "36.8",
                        glucosa: "105",
                        a: "4",
                        v: "4",
                        d: "4",
                        i: "4"
                    }
                ],
                alergias: "Penicilina",
                medicamentos: "Captopril 25mg c/12h, Aspirina 100mg c/24h",
                padecimientos: "Hipertensión arterial sistémica, diagnosticada hace 5 años",
                ultimaComida: "Desayuno a las 08:00 hrs",
                condicion: "estable",
                prioridad: "alta"
            },
            
            // Traslado
            traslado: {
                hospital: "Hospital General de México",
                doctor: "Dr. Roberto Sánchez",
                cru: "CRU-2024-0315-001",
                nombre: "Juan Carlos Pérez González",
                firma: "Firmado digitalmente"
            },
            
            // Tratamiento
            tratamiento: {
                viaAerea: "permeable",
                controlCervical: "collar_rigido",
                asistenciaVentilatoria: ["oxigeno_alto_flujo"],
                medicacion: [
                    {
                        hora: "15:10",
                        medicamento: "Morfina",
                        dosis: "5mg",
                        via: "Intravenosa"
                    },
                    {
                        hora: "15:20",
                        medicamento: "Solución Hartmann",
                        dosis: "500ml",
                        via: "Intravenosa"
                    }
                ],
                doctorTratante: "Dr. Luis Fernando Castro",
                controlHemorragias: ["presion_directa"],
                viasVenosas: {
                    soluciones: ["solucion_salina"],
                    linea: 1,
                    cateter: 18,
                    cantidad: 500
                },
                atencionBasica: ["inmovilizacion", "vendajes"]
            },
            
            // Observaciones
            observaciones: "Paciente trasladado en condiciones estables. Se mantiene monitoreo continuo de signos vitales. Familia notificada del traslado al Hospital General. Se entrega paciente a servicio de urgencias con reporte completo del procedimiento realizado durante el traslado.",
            
            // Ministerio Público
            ministerioPublico: {
                sello: "MP-CDMX-2024-001",
                funcionario: "Lic. Patricia Morales - Agente del Ministerio Público"
            },
            
            // Datos Legales
            datosLegales: {
                autoridadDependencia: "Secretaría de Seguridad Ciudadana CDMX",
                numeroUnidad: "SSC-001",
                numeroOficiales: "12345, 67890",
                vehiculosInvolucrados: [
                    {
                        tipo: "Sedan Honda Civic 2020",
                        placas: "ABC-123-D"
                    },
                    {
                        tipo: "Camión de carga",
                        placas: "XYZ-789-C"
                    }
                ]
            },
            
            // Evidencias
            evidencia: {
                src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
                title: "Evidencia fotográfica del incidente"
            }
        },
        {
            id: 2,
            usuarioId: 4,
            lugarOcurrencia: "transporte_publico",
            paciente: {
                edad: 15,
            },
            evalSec: {
                prioridad: "Media"
            },
        },
        {
            id: 3,
            usuarioId: 5,
            lugarOcurrencia: "escuela",
            paciente: {
                edad: 40,
                sexo: "femenino"
            },
            evalSec: {
                prioridad: "Media"
            },
        },
    ],
    notas_medicas: [
        {
            id: 1,
            // Fecha y Hora
            fecha: "2024-03-15",
            hora: "14:30",
            
            // Involucrados
            nombrePaciente: "Ana María González Vásquez",
            nombreTestigo: "Carlos Eduardo López",
            nombreParamedico: "Lic. Enf. Patricia Mendoza",
            nombreMedico: "Dr. Alejandro Ramírez Torres",
            
            // Ubicación
            ubicacion: {
                calle: "Calle Morelos",
                numExt: "456",
                numInt: "Av. Hidalgo",
                colonia: "Centro Histórico",
                municipio: "Cuauhtémoc"
            },
            
            // Ocurrencia
            ocurrencia: "domicilio_particular",
            ocurrenciaOtro: "",
            
            // Detalles
            asunto: "Seguimiento post-operatorio",
            observaciones: "Paciente femenina de 42 años en seguimiento post-operatorio de colecistectomía laparoscópica realizada hace 5 días. Presenta evolución favorable, heridas quirúrgicas limpias y secas, sin signos de infección. Paciente refiere dolor leve controlado con analgésicos. Se brinda orientación sobre cuidados domiciliarios y signos de alarma. Se programa cita de control en una semana."
        },
    ],
    reportes_urbanos: [
        {
            id: 1,
            // Folio y Fecha
            folio: "RU-2024-001",
            fecha: "2024-03-15T14:30:00.000Z",

            // Historial de cambios
            historialCambios: [
                {
                    usuarioId: 2,
                    folioAnterior: "RU-2024-000",
                    folioNuevo: "RU-2024-001",
                    fechaCambio: "2024-03-15T14:00:00.000Z",
                },
                {
                    usuarioId: 3,
                    folioAnterior: "RU-2024-001",
                    folioNuevo: "RU-2024-002",
                    fechaCambio: "2024-03-15T15:00:00.000Z",
                }
            ],

            // Turno y Personal
            turno: "Matutino",
            personalACargo: "Ing. Roberto Martínez Sánchez",
            
            // Activación del Servicio
            modoActivacion: "llamada_emergencia",
            
            // Tipo de Servicio
            tipoServicio: "Incendio estructural",
            
            // Horarios de Atención
            fechaHoraAtencion: "2024-03-15T14:45:00.000Z",
            tiempoTrasladoMinutos: 15,
        
            // Ubicación
            ubicacion: {
                direccion: "Av. Reforma 1234",
                entreCalles1: "Calle Insurgentes",
                entreCalles2: "Paseo de la República",
                colonia: "Juárez",
                municipio: "Cuauhtémoc"
            },
            
            // Gravedad
            gravedad: "alta",
            
            // Recorrido
            kmRecorridos: 12.5,
            
            // Observaciones
            observacionesGenerales: "Incendio en edificio de oficinas de 8 pisos. Se realizó evacuación completa del inmueble. Bomberos controlaron el incendio en el 4to piso. No se reportaron heridos. Causa preliminar: cortocircuito en el sistema eléctrico.",
            
            // Evidencias
            evidencia: [
                {
                    src: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...",
                    title: "Fachada del edificio afectado"
                },
            ],
            
            // Dictamen
            dictamen: "Emergencia controlada exitosamente. Daños estructurales menores en 4to piso. Edificio habitable tras reparaciones eléctricas.",
            
            // Responsables de la Emergencia
            responsableInmueble: "Lic. Ana Patricia Hernández - Administradora",
            responsableZona: "Cmdte. Carlos Mendoza - Bomberos CDMX",
            
            // Autoridades Participantes
            autoridadesParticipantes: ["bomberos", "policia", "seguridad_publica"]
        },
        {
            id: 2,  modoActivacion: 'escuela',              prioridad: 'MEDIA', alcaldia: 'Benito Juárez',  colonia: 'Del Valle',     tipoIncidente: 'Accidente vial',        tiempoRespuesta: 12 },
  { id: 3,  modoActivacion: 'transporte_publico',   prioridad: 'BAJA',  alcaldia: 'Miguel Hidalgo', colonia: 'Polanco',       tipoIncidente: 'Robo a transeúnte',    tiempoRespuesta: 22 },
  { id: 4,  modoActivacion: 'trabajo',              prioridad: 'ALTA',  alcaldia: 'Cuauhtémoc',     colonia: 'Roma Norte',    tipoIncidente: 'Fuga de gas',          tiempoRespuesta: 16 }
    ],
    notas_urbanas: [
        {
            id: 1,
            // Fecha y hora
            fecha: "2024-03-15",
            hora: "09:30",
            
            // Detalles
            nombreOperador: "Lic. Carmen Solís Peña",
            asunto: "Supervisión de obras públicas",
            observaciones: "Se realizó inspección rutinaria de las obras de pavimentación en Av. Insurgentes entre calles Morelos y Hidalgo. Las obras avanzan según cronograma establecido. Se observó cumplimiento de medidas de seguridad y señalización adecuada. Contratista presenta avance del 65% conforme a lo programado. Se recomienda reforzar la limpieza de escombros al finalizar cada jornada laboral para evitar acumulación de residuos en la vía pública."
        }
    ],
    usuarios: [
        { id: 1, usuario: "admin", contrasena: "123", rol: "admin" },
        { id: 2, usuario: "jefe_turno", contrasena: "123", rol: "jefe", turno: 1 },
        { id: 3, usuario: "paramedico", contrasena: "123", rol: "paramedico", turno: 1 },
        { id: 4, usuario: "urbano", contrasena: "123", rol: "urbano", turno: 2 },
        { id: 5, usuario: "urbano2", contrasena: "123", rol: "urbano", turno: 3 },
    ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDataProvider: DataProvider = {
    getList: async (resource, params) => {
        await delay(300);
        return {
            data: data[resource] || [],
            total: (data[resource] || []).length,
        };
    },
    getOne: async (resource, params) => {
        await delay(200);
        const record = (data[resource] || []).find((item: any) => item.id == params.id); // == en lugar de ===
        if (!record) throw new Error('Not found');
        return { data: record };
    },
    getMany: async (resource, params) => {
        await delay(200);
        return {
            data: (data[resource] || []).filter((item: any) => params.ids.includes(item.id)),
        };
    },
    getManyReference: async (resource, params) => {
        await delay(200);
        return {
            data: (data[resource] || []).filter((item: any) => item[params.target] === params.id),
            total: (data[resource] || []).filter((item: any) => item[params.target] === params.id).length,
        };
    },
    update: async (_resource, params) => {
        await delay(200);
        // Simula actualización en el array
        const { id } = params.data;
        const resourceArr = data[_resource] || [];
        const idx = resourceArr.findIndex((item: any) => item.id === id);
        if (idx !== -1) {
            resourceArr[idx] = { ...resourceArr[idx], ...params.data };
        }
        return { data: resourceArr[idx] };
    },
    updateMany: async (_resource, params) => {
        await delay(200);
        return { data: params.ids };
    },
    create: async (resource, params) => {
        await delay(200);
        const newItem = { ...params.data, id: Date.now() };
        data[resource] = [...(data[resource] || []), newItem];
        return { data: newItem as any };
    },
    delete: async (resource, params) => {
        await delay(200);
        const resourceArr = data[resource] || [];
        const idx = resourceArr.findIndex((item: any) => item.id === params.id);
        let deleted;
        if (idx !== -1) {
            deleted = resourceArr[idx];
            data[resource] = resourceArr.filter((item: any) => item.id !== params.id);
        }
        return { data: deleted };
    },
    deleteMany: async (resource, params) => {
        await delay(200);
        data[resource] = (data[resource] || []).filter((item: any) => !params.ids.includes(item.id));
        return { data: params.ids };
    },
};