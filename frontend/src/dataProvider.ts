/*
Proveedor de datos para react-admin usando json-server
Fecha: 11/08/2025
*/

/*
import jsonServerProvider from "ra-data-json-server";

export const dataProvider = jsonServerProvider(
  import.meta.env.VITE_JSON_SERVER_URL,
);
*/

import {fetchUtils} from "react-admin"
import jsonServerProvider from "ra-data-json-server";


const fetchJsonUtil=(url:string, options:fetchUtils.Options={})=>{
	if(!options.headers){
		options.headers=new Headers({Accept: "application/json"});
	}
	options.headers.set("Authentication", sessionStorage.getItem("auth"));
	return fetchUtils.fetchJson(url, options);
};

export const dataProvider = jsonServerProvider(
	import.meta.env.VITE_BACKEND, fetchJsonUtil
);