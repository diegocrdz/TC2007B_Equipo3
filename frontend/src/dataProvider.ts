/*
Proveedor de datos para react-admin usando json-server
Fecha: 20/08/2025
*/

import { fetchUtils, withLifecycleCallbacks, DataProvider } from 'react-admin';
import jsonServerProvider from "ra-data-json-server";

// Agrega el header de autenticación a cada petición
const fetchJsonUtil=(url:string, options:fetchUtils.Options={})=>{
	if(!options.headers){
		options.headers=new Headers({Accept: "application/json"});
	}
	options.headers.set("Authentication", sessionStorage.getItem("auth"));
	return fetchUtils.fetchJson(url, options);
};

/*
Convertir un objeto `File` devuelto por el input de subida en una cadena base 64.
No es la forma más optimizada de almacenar imágenes en producción, pero es
suficiente para ilustrar la idea de subir imágenes en react-admin.
*/
const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file.rawFile);
    });

// Procesa las imagenes y las convierte a base64 antes de guardarlas
const procesarImagenes = async (params: any, dataProvider: DataProvider) => {
    // Busca las imagenes con rawFile que es una instancia de File
    const newPictures = params.evidencia.filter(
        p => p.rawFile instanceof File
    )

    // Busca las imagenes que ya estaban guardadas (no son instancias de File)
    const formerPictures = params.evidencia.filter(
        p => !(p.rawFile instanceof File)
    )

    // Convierte las nuevas imagenes a base64
    const base64Pictures = await Promise.all(
        newPictures.map(convertFileToBase64)
    )
    
    // Combina las imagenes nuevas y las antiguas
    const pictures = [
        ...base64Pictures.map((dataUrl, index) => ({
            src: dataUrl,
            title: newPictures[index].title || `Image ${index + 1}`,
        })),
        ...formerPictures,
    ];

    // Devuelve los parametros actualizados con las imagenes en base64
    return {
        ...params,
        data: {
            ...params.data,
            pictures,
        }
    };
};

// Data provider que convierte las imágenes subidas a base64 antes de guardarlas
// Ref: https://marmelab.com/react-admin/DataProviders.html#sending-files-in-base64
export const dataProvider = withLifecycleCallbacks(
	jsonServerProvider(import.meta.env.VITE_BACKEND, fetchJsonUtil
), [
    // Aplicar formateo de imagenes para recursos
    {
        resource: 'reportes_medicos',
        beforeSave: procesarImagenes,
    },
    {
        resource: 'reportes_urbanos',
        beforeSave: procesarImagenes,
    }
]);