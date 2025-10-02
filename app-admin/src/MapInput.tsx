import { useEffect, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L, { LatLngExpression, LeafletMouseEvent } from "leaflet";

// Tipos de datos del componente de mapa
type Props = {
    name?: string;
    latName?: string; // latitud
    lngName?: string; // longitud
    height?: number | string; // altura
    defaultCenter?: LatLngExpression; // centro inicial (si no hay coordenadas)
    zoom?: number; // zoom inicial
    disabled?: boolean; // si true, no permite mover el pin ni geolocalizar
    saveAddressText?: boolean; // Guardar texto completo de dirección en el form
};

// Componente para recenter el mapa cuando cambian las coordenadas
const Recenter = ({ center }: { center: LatLngExpression }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center);
    }, [center, map]);
    return null;
};

// Componente para manejar clicks en el mapa
const MapClickHandler = ({ onMapClick, disabled }: {
    onMapClick: (e: LeafletMouseEvent) => void,
    disabled: boolean
}) => {
    // Accede al mapa
    const map = useMap();
    
    // Cada renderm 
    useEffect(() => {
        if (disabled) return;
        
        // Manejador de clicks
        const handleClick = (e: LeafletMouseEvent) => {
            onMapClick(e);
        };
        
        // Cuando se hace click en el mapa, llama al manejador
        map.on('click', handleClick);
        
        // Cuando se deja de hacer click, remueve el manejador
        return () => {
            map.off('click', handleClick);
        };
    }, [map, onMapClick, disabled]);
    
    return null;
};

// Componente principal
export const MapInput = ({
    name = "location",
    latName,
    lngName,
    height = 340,
    defaultCenter = [19.4326, -99.1332], // Coordenadas del centro de CDMX
    zoom = 15,
    disabled = false,
}: Props) => {
    // Obtiene valores del formulario
    const { setValue, watch, getValues } = useFormContext();

    // Lee coordenadas desde el formulario
    const value = watch(name);
    const lat = latName ? watch(latName) : value?.lat;
    const lng = lngName ? watch(lngName) : value?.lng;

    const [lastReverseAt, setLastReverseAt] = useState<{ lat: number; lng: number } | null>(null);

    // Memoriza la posición para no recalcularla en cada render
    const position = useMemo<LatLngExpression>(() => {
        // Valida que las coordenadas sean números
        const la = Number(lat)
        const ln = Number(lng);

        // Si no son números finitos, usa el centro por defecto
        return (Number.isFinite(la) && Number.isFinite(ln)) ? [la, ln] : defaultCenter;

    }, [lat, lng, defaultCenter]);

    // Manejador para escribir coordenadas en el formulario
    // Si se usan campos separados para lat y lng, los actualiza
    // Si se usa un solo campo (objeto con lat y lng), actualiza ese campo
    const writePosition = (la: number, ln: number) => {
        if (latName && lngName) {
            setValue(latName, la, { shouldDirty: true, shouldValidate: true });
            setValue(lngName, ln, { shouldDirty: true, shouldValidate: true });
        } else {
            // Obtiene el valor actual
            const current = getValues(name) || {};

            // Actualiza las coordenadas, manteniendo otros campos si existen
            setValue(name, { ...current, lat: la, lng: ln }, { shouldDirty: true, shouldValidate: true });
        }
    };

    // Usa Nominatim para obtener direcciones desde coordenadas
    const reverseGeocode = async (la: number, ln: number) => {
        try {
            // Evita llamadas repetidas si el pin no se movió mucho
            // lastReverseAt guarda la última posición consultada
            const last = lastReverseAt;

            // Si la última posición está cerca de la actual, no hace nada
            if (last && Math.hypot(last.lat - la, last.lng - ln) < 0.0005) return;

            // Actualiza la última posición consultada
            setLastReverseAt({ lat: la, lng: ln });

            // Busca las coordenadas en Nominatim
            const url = new URL("https://nominatim.openstreetmap.org/reverse");

            // Utiliza searchParams para construir la URL
            url.searchParams.set("format", "jsonv2"); // Formato JSON
            url.searchParams.set("lat", String(la)); // Agrega latitud
            url.searchParams.set("lon", String(ln)); // Agrega longitud
            url.searchParams.set("addressdetails", "1"); // 1 para obtener detalles de dirección

            // Hace la petición a Nominatim
            // Solo acepta español
            const res = await fetch(url.toString(), { headers: { "Accept-Language": "es" } });
            const data = await res.json();
            const a = data?.address || {};

            // Extrae los campos
            const calle = a.road || a.pedestrian || a.residential ||
                          a.cycleway || a.footway || a.path || a.highway || "";

            // Colonia/comunidad
            const colonia = a.neighbourhood || a.suburb || a.quarter || a.village || 
                            a.town || a.hamlet || a.city_district || "";

            // Municipio/Alcaldía
            const municipio = a.state_district || a.municipality || a.city ||
                              a.town || a.county || "";

            // Establece los valores en el formulario
            setValue("ubicacion.calle", calle, { shouldDirty: true });
            setValue("ubicacion.colonia", colonia, { shouldDirty: true });
            setValue("ubicacion.municipio", municipio, { shouldDirty: true });

        } catch (error) {
            // Muestra un error en consola
            console.error("Error al extraer datos del mapa: ", error);
        }
    };

    // Si se hace un click en el mapa, mueve el pin y actualiza coordenadas
    const handleMapClick = (e: LeafletMouseEvent) => {
        if (disabled) return;
        const { lat, lng } = e.latlng;
        writePosition(lat, lng);
        reverseGeocode(lat, lng);
    };

    // Botón para seleccionar la ubicación actual
    const ubicacionActual = () => {
        // Si la geolocalización no está disponible, regresa
        if (!navigator.geolocation || disabled) return;

        // Solicita la ubicación actual
        navigator.geolocation.getCurrentPosition((pos) => {
            const la = pos.coords.latitude;
            const ln = pos.coords.longitude;
            writePosition(la, ln);
            reverseGeocode(la, ln);
        });
    };

    // Si no hay coordenadas, intenta obtener la ubicación actual al cargar
    useEffect(() => {
        // Valida que las coordenadas sean números
        const la = Number(lat)
        const ln = Number(lng);

        // Si no son números finitos, intenta geolocalizar
        if (!Number.isFinite(la) || !Number.isFinite(ln)) ubicacionActual();

    }, []);

    // Componente para el formulario
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'stretch',
                gap: 1, mb: 2 
            }}
        >
            {/* Contenedor del mapa */}
            <Box sx={{ height, borderRadius: '4px', overflow: "hidden", border: "1px solid", borderColor: "divider" }}>
                <MapContainer
                    center={position as [number, number]}
                    zoom={zoom}
                    style={{ height: "100%", width: "100%" }}
                    dragging={!disabled}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <Recenter center={position} />
                    <MapClickHandler onMapClick={handleMapClick} disabled={disabled} />
                    <Marker
                        position={position}
                        draggable={!disabled}
                        eventHandlers={{
                            // Cuando se termina de arrastrar el pin, actualiza coordenadas
                            dragend: (e: L.DragEndEvent) => {
                                const pin = e.target as L.Marker;
                                // Extrae las nuevas coordenadas
                                const { lat: la, lng: ln } = pin.getLatLng();
                                writePosition(la, ln);
                                reverseGeocode(la, ln);
                            },
                        }}
                    />
                </MapContainer>
            </Box>

            {/* Nota */}
            <Typography variant="caption" color="text.secondary">
                Selecciona una ubicación en el mapa o arrastra el pin para ajustar la ubicación.
            </Typography>

            {/* Botón para usar ubicación actual */}
            <Button
                onClick={ubicacionActual}
                disabled={disabled}
                sx={{
                    color: 'success.light',
                    backgroundColor: '#60cf6235',
                    border: '1px solid',
                    borderColor: 'success.light',
                    borderRadius: '4px',
                    textTransform: 'none',
                    padding: 2,
                    '&:hover': {
                        color: 'white',
                        backgroundColor: 'success.light',
                        borderColor: 'success.dark',
                    },
                }}
            >
                <Typography variant="button" sx={{ textTransform: 'none' }}>
                    Usar mi ubicación actual
                </Typography>
            </Button>
        </Box>
    );
};
