/*
Proveedor de datos para react-admin usando json-server
Fecha: 11/08/2025
*/

import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);
