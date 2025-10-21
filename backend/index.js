/*
Backend para la aplicación SRE (Sistema de Reporte de Emergencias)
Usa Express y MongoDB
Contraseñas hasheadas con Argon2
Autenticación con tokens JWT
Fecha: 20/08/2025
*/

const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const bodyParser=require("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")
const fs=require("fs");
const https = require('https');

const app=express();
app.use(cors());
const PORT=3000;
let db;
// Aumentar tamaño de request para admitir imágenes grandes
app.use(bodyParser.json({ limit: '8mb' }));

// Conexión a la base de datos
async function connectToDB() {
	let client=new MongoClient(await process.env.DB);
	await client.connect();
	db=client.db();
	console.log("conectado a la base de datos");
}

// Obtener siguiente ID
async function getNextId(collectionName) {
	// Obtiene el documento con el ID más alto
	let result = await db.collection(collectionName).find({}).sort({id: -1}).limit(1).toArray();
	if (result.length === 0 || typeof result[0].id !== "number") {
		return 1;
	} else {
		return Number(result[0].id) + 1;
	}
}

// Registro de actualización de folio
async function logFolio(usuarioId, folioAnterior, folioNuevo) {

	// Si el folio no cambió, no hacer nada
	if (folioAnterior===folioNuevo) return;

	// Crear el log
	toLog={};
	toLog["usuarioId"]=usuarioId;
	toLog["folioAnterior"]=folioAnterior;
	toLog["folioNuevo"]=folioNuevo;
	toLog["fechaCambio"]=new Date();

	// Regresar el log creado
	return toLog;
}

// Registro de logs
async function log(sujeto, objeto, accion) {
	toLog={};
	toLog["timestamp"]=new Date();
	toLog["sujeto"]=sujeto;
	toLog["objeto"]=objeto;
	toLog["accion"]=accion;
	await db.collection("logs").insertOne(toLog);
}

// Verificar permisos de usuario
async function verificarPermisos(coleccion, id, token) {
	try {
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let rol=verifiedToken.rol;
		let turno=verifiedToken.turno;

		// admin tiene acceso a todo
		if (rol === "admin") return { permitido: true, usuario: user };

		// Obtener el registro
		let registro = await db.collection(coleccion).findOne({ id: Number(id) });
		if (!registro) return { permitido: false, usuario: user };

		// Verificar permisos según rol
		if (rol === "paramedico" &&
			coleccion.includes("reportes_medicos") &&
			registro.personalACargo === user) {
			return { permitido: true, usuario: user };
		} else if (rol === "urbano" &&
			coleccion.includes("reportes_urbanos") &&
			registro.personalACargo === user) {
			return { permitido: true, usuario: user };
		} else if (rol === "jefe" &&
			registro.turno === turno) {
			return { permitido: true, usuario: user };
		} else {
			return { permitido: false, usuario: user };
		}
	} catch (e) {
		return { permitido: false, usuario: null };
	}
}

// getList

app.get("/reportes_medicos", async (req,res)=>{
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let rol=verifiedToken.rol;
		let turno=verifiedToken.turno;

		// Diccionario para construir filtros
		let filters = {};

		// Filtros default
		if (rol === "paramedico") {
			filters.personalACargo = user;
		} else if (rol === "jefe" && turno) {
			filters.turno = turno;
		}
		
		// Manejo del filtro de búsqueda global (q)
		if (req.query.q) {
			// Regex para ignorar mayúsculas y minúsculas
			const regex = new RegExp(req.query.q, "i");
			// $or para buscar en múltiples campos
			filters.$or = [
				{ id: Number(req.query.q) },
				{ fecha: regex },
				{ folio: regex },
				{ turno: Number(req.query.q) },
				{ personalACargo: regex },
				{ nombrePaciente: regex }
			];
		}

		// Filtros específicos
		if (req.query.id) filters.id = Number(req.query.id);
		if (req.query.fecha) filters.fecha = req.query.fecha;
		if (req.query.folio) filters.folio = req.query.folio;
		if (req.query.turno) filters.turno = Number(req.query.turno);
		if (req.query.personalACargo) filters.personalACargo = req.query.personalACargo;
		if (req.query.nombrePaciente) filters.nombrePaciente = req.query.nombrePaciente;

		if("_sort" in req.query) {
			let sortBy=req.query._sort;
			let sortOrder=req.query._order=="ASC"?1:-1;
			let inicio=Number(req.query._start);
			let fin=Number(req.query._end);
			let sorter={}
			sorter[sortBy]=sortOrder;
			let data= await db.collection("reportes_medicos").find(filters).sort(sorter).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data=data.slice(inicio,fin)
			log(user, "reportes_medicos", "leer"); // Log de acción
			res.json(data)
		} else if ("id" in req.query) {
			let data=[];
			for(let index=0; index<req.query.id.length; index++) {
				let dataParcial=await db.collection("reportes_medicos").find({id: Number(req.query.id[index])}).project({_id:0}).toArray()
				data= await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data=await db.collection("reportes_medicos").find(filters).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/reportes_urbanos", async (req,res)=>{
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let rol=verifiedToken.rol;
		let turno=verifiedToken.turno;

		// Diccionario para construir filtros
		let filters = {};

		// Filtros default
		if (rol === "urbano") {
			filters.personalACargo = user;
		} else if (rol === "jefe" && turno) {
			filters.turno = turno;
		}
		
		// Manejo del filtro de búsqueda global (q)
		if (req.query.q) {
			// $or para buscar en múltiples campos relevantes para reportes urbanos con regex case-insensitive
			const regex = new RegExp(req.query.q, "i");
			filters.$or = [
				{ id: Number(req.query.q) },
				{ fecha: regex },
				{ folio: regex },
				{ turno: Number(req.query.q) },
				{ personalACargo: regex },
				{ tipoServicio: regex },
				{ gravedad: regex }
			];
		}

		// Filtros específicos
		if (req.query.id) filters.id = Number(req.query.id);
		if (req.query.fecha) filters.fecha = req.query.fecha;
		if (req.query.turno) filters.turno = Number(req.query.turno);
		if (req.query.folio) filters.folio = req.query.folio;
		if (req.query.personalACargo) filters.personalACargo = req.query.personalACargo;
		if (req.query.tipoServicio) filters.tipoServicio = req.query.tipoServicio;
		if (req.query.gravedad) filters.gravedad = req.query.gravedad;
		
		if("_sort" in req.query) {
			let sortBy=req.query._sort;
			let sortOrder=req.query._order=="ASC"?1:-1;
			let inicio=Number(req.query._start);
			let fin=Number(req.query._end);
			let sorter={}
			sorter[sortBy]=sortOrder;
			let data= await db.collection("reportes_urbanos").find(filters).sort(sorter).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data=data.slice(inicio,fin)
			log(user, "reportes_urbanos", "leer"); // Log de acción
			res.json(data)
		} else if ("id" in req.query) {
			let data=[];
			for(let index=0; index<req.query.id.length; index++) {
				let dataParcial=await db.collection("reportes_urbanos").find({id: Number(req.query.id[index])}).project({_id:0}).toArray()
				data= await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data=await db.collection("reportes_urbanos").find(filters).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/notas_medicas", async (req,res)=>{
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let rol=verifiedToken.rol;
		let turno=verifiedToken.turno;

		// Diccionario para construir filtros
		let filters = {};

		// Filtros default
		if (rol === "paramedico") {
			filters.personalACargo = user;
		} else if (rol === "jefe" && turno) {
			filters.turno = turno;
		}
		
		// Manejo del filtro de búsqueda global (q)
		if (req.query.q) {
			// $or para buscar en múltiples campos relevantes para notas médicas con regex case-insensitive
			const regex = new RegExp(req.query.q, "i");
			filters.$or = [
				{ id: Number(req.query.q) },
				{ fecha: regex },
				{ turno: Number(req.query.q) },
				{ personalACargo: regex },
				{ nombrePaciente: regex },
				{ nombreMedico: regex }
			];
		}

		// Filtros específicos
		if (req.query.id) filters.id = Number(req.query.id);
		if (req.query.fecha) filters.fecha = req.query.fecha;
		if (req.query.turno) filters.turno = Number(req.query.turno);
		if (req.query.personalACargo) filters.personalACargo = req.query.personalACargo;
		if (req.query.nombrePaciente) filters.nombrePaciente = req.query.nombrePaciente;
		if (req.query.nombreMedico) filters.nombreMedico = req.query.nombreMedico;

		if("_sort" in req.query) {
			let sortBy=req.query._sort;
			let sortOrder=req.query._order=="ASC"?1:-1;
			let inicio=Number(req.query._start);
			let fin=Number(req.query._end);
			let sorter={}
			sorter[sortBy]=sortOrder;
			let data= await db.collection("notas_medicas").find(filters).sort(sorter).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data=data.slice(inicio,fin)
			log(user, "notas_medicas", "leer"); // Log de acción
			res.json(data)
		} else if ("id" in req.query) {
			let data=[];
			for(let index=0; index<req.query.id.length; index++) {
				let dataParcial=await db.collection("notas_medicas").find({id: Number(req.query.id[index])}).project({_id:0}).toArray()
				data= await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data=await db.collection("notas_medicas").find(filters).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/notas_urbanas", async (req,res)=>{
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let rol=verifiedToken.rol;
		let turno=verifiedToken.turno;

		// Diccionario para construir filtros
		let filters = {};

		// Filtros default
		if (rol === "urbano") {
			filters.personalACargo = user;
		} else if (rol === "jefe" && turno) {
			filters.turno = turno;
		}
		
		// Manejo del filtro de búsqueda global (q)
		if (req.query.q) {
			// Regex para búsqueda parcial e ignorar mayúsculas y minúsculas
			const regex = new RegExp(req.query.q, "i");
			// $or para buscar en múltiples campos
			filters.$or = [
				{ id: Number(req.query.q) },
				{ fecha: regex },
				{ turno: Number(req.query.q) },
				{ personalACargo: regex }
			];
		}

		// Filtros específicos
		if (req.query.id) filters.id = Number(req.query.id);
		if (req.query.fecha) filters.fecha = req.query.fecha;
		if (req.query.turno) filters.turno = Number(req.query.turno);
		if (req.query.personalACargo) filters.personalACargo = req.query.personalACargo;

		if("_sort" in req.query) {
			let sortBy=req.query._sort;
			let sortOrder=req.query._order=="ASC"?1:-1;
			let inicio=Number(req.query._start);
			let fin=Number(req.query._end);
			let sorter={}
			sorter[sortBy]=sortOrder;
			let data= await db.collection("notas_urbanas").find(filters).sort(sorter).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data=data.slice(inicio,fin)
			log(user, "notas_urbanas", "leer"); // Log de acción
			res.json(data)
		} else if ("id" in req.query) {
			let data=[];
			for(let index=0; index<req.query.id.length; index++) {
				let dataParcial=await db.collection("notas_urbanas").find({id: Number(req.query.id[index])}).project({_id:0}).toArray()
				data= await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data=await db.collection("notas_urbanas").find(filters).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

app.get("/usuarios", async (req,res)=>{
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;

		// Diccionario para construir filtros
		let filters = {};
		
		// Manejo del filtro de búsqueda global (q)
		if (req.query.q) {
			// Regex para búsqueda parcial e ignorar mayúsculas y minúsculas
			const regex = new RegExp(req.query.q, "i");
			// $or para buscar en múltiples campos
			filters.$or = [
				{ id: Number(req.query.q) },
				{ usuario: regex },
				{ nombre: regex },
				{ rol: regex }
			];
		}

		// Filtros específicos
		if (req.query.id) filters.id = Number(req.query.id);
		if (req.query.usuario) filters.usuario = req.query.usuario;
		if (req.query.nombre) filters.nombre = req.query.nombre;
		if (req.query.turno) filters.turno = Number(req.query.turno);
		if (req.query.rol) filters.rol = req.query.rol;

		if("_sort" in req.query) {
			let sortBy=req.query._sort;
			let sortOrder=req.query._order=="ASC"?1:-1;
			let inicio=Number(req.query._start);
			let fin=Number(req.query._end);
			let sorter={}
			sorter[sortBy]=sortOrder;
			let data= await db.collection("usuarios").find(filters).sort(sorter).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			data=data.slice(inicio,fin)
			log(user, "usuarios", "leer"); // Log de acción
			res.json(data)
		} else if ("id" in req.query) {
			let data=[];
			for(let index=0; index<req.query.id.length; index++) {
				let dataParcial=await db.collection("usuarios").find({id: Number(req.query.id[index])}).project({_id:0}).toArray()
				data= await data.concat(dataParcial);
			}
			res.json(data);
		} else {
			let data=await db.collection("usuarios").find(filters).project({_id:0}).toArray();
			res.set("Access-Control-Expose-Headers", "X-Total-Count");
			res.set("X-Total-Count", data.length);
			res.json(data);
		}
	} catch {
		res.sendStatus(401);
	}
});

// getOne

app.get("/reportes_medicos/:id", async (req,res)=>{
	// Verificar permisos
	let token = req.get("Authentication");
	let permiso = await verificarPermisos("reportes_medicos", req.params.id, token);
	if (!permiso.permitido) return res.sendStatus(403);
	log(permiso.usuario, "reportes_medicos", "leer"); // Log de acción
	let data=await db.collection("reportes_medicos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

app.get("/reportes_urbanos/:id", async (req,res)=>{
	// Verificar permisos
	let token = req.get("Authentication");
	let permiso = await verificarPermisos("reportes_urbanos", req.params.id, token);
	if (!permiso.permitido) return res.sendStatus(403);
	log(permiso.usuario, "reportes_urbanos", "leer"); // Log de acción
	let data=await db.collection("reportes_urbanos").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

app.get("/notas_medicas/:id", async (req,res)=>{
	// Verificar permisos
	let token = req.get("Authentication");
	let permiso = await verificarPermisos("notas_medicas", req.params.id, token);
	if (!permiso.permitido) return res.sendStatus(403);
	log(permiso.usuario, "notas_medicas", "leer"); // Log de acción
	let data=await db.collection("notas_medicas").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

app.get("/notas_urbanas/:id", async (req,res)=>{
	// Verificar permisos
	let token = req.get("Authentication");
	let permiso = await verificarPermisos("notas_urbanas", req.params.id, token);
	if (!permiso.permitido) return res.sendStatus(403);
	log(permiso.usuario, "notas_urbanas", "leer"); // Log de acción
	let data=await db.collection("notas_urbanas").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
	res.json(data[0]);
});

app.get("/usuarios/:id", async (req,res)=>{
	// Verificar permisos
	let token = req.get("Authentication");
	let permiso = await verificarPermisos("usuarios", req.params.id, token);
	if (!permiso.permitido) return res.sendStatus(403);
	log(permiso.usuario, "usuarios", "leer"); // Log de acción
    let data=await db.collection("usuarios").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
    res.json(data[0]);
});

// createOne

app.post("/reportes_medicos", async (req, res) => {
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let valores = req.body;
		valores["id"]=await getNextId("reportes_medicos");
		await db.collection("reportes_medicos").insertOne(valores);
		log(user, "reportes_medicos", "crear"); // Log de acción
		return res.status(201).json(valores);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "create_failed" });
	}
});

app.post("/reportes_urbanos", async (req, res) => {
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let valores = req.body;
		valores["id"]=await getNextId("reportes_urbanos");
		await db.collection("reportes_urbanos").insertOne(valores);
		log(user, "reportes_urbanos", "crear"); // Log de acción
		return res.status(201).json(valores);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "create_failed" });
	}
});

app.post("/notas_medicas", async (req, res) => {
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let valores = req.body;
		valores["id"]=await getNextId("notas_medicas");
		await db.collection("notas_medicas").insertOne(valores);
		log(user, "notas_medicas", "crear"); // Log de acción
		return res.status(201).json(valores);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "create_failed" });
	}
});

app.post("/notas_urbanas", async (req, res) => {
	try {
		let token=req.get("Authentication");
		let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
		let user=verifiedToken.usuario;
		let valores = req.body;
		valores["id"]=await getNextId("notas_urbanas");
		await db.collection("notas_urbanas").insertOne(valores);
		log(user, "notas_urbanas", "crear"); // Log de acción
		return res.status(201).json(valores);
	} catch (e) {
		console.error(e);
		return res.status(500).json({ error: "create_failed" });
	}
});

app.post("/usuarios", async (req,res)=>{
    try {
        let user=req.body.usuario;
        let pass=req.body.contrasena;
        let nombre=req.body.nombre;
        let rol=req.body.rol;
        let turno=req.body.turno ?? null;

        let data=await db.collection("usuarios").findOne({"usuario":user})

        if(data==null) {
            // Hashea la contraseña
            const hash=await argon2.hash(pass, {type: argon2.argon2id, memoryCost: 19*1024, timeCost:2, parallelism:1, saltLength:16})

            // Obtener siguiente ID
            let id=await getNextId("usuarios");

            // Inserta el nuevo usuario
            let usuarioAgregar={"id": id, "usuario":user, "contrasena":hash, "rol":rol, "nombre":nombre, "turno":turno}
            await db.collection("usuarios").insertOne(usuarioAgregar);

			log(user, "usuarios", "crear"); // Log de acción
            
            // Regresa el usuario creado
            res.status(201).json(usuarioAgregar);
        } else {
            res.sendStatus(403)
        }
    } catch(error) {
        console.error("Error en POST usuarios:", error);
        res.status(500).json({error: "Error interno del servidor"});
    }
});

// deleteOne

app.delete("/reportes_medicos/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let data=await db.collection("reportes_medicos").deleteOne({"id": Number(req.params.id)});
	log(user, "reportes_medicos", "eliminar"); // Log de acción
	res.json(data)
})

app.delete("/reportes_urbanos/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let data=await db.collection("reportes_urbanos").deleteOne({"id": Number(req.params.id)});
	log(user, "reportes_urbanos", "eliminar"); // Log de acción
	res.json(data)
})

app.delete("/notas_medicas/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let data=await db.collection("notas_medicas").deleteOne({"id": Number(req.params.id)});
	log(user, "notas_medicas", "eliminar"); // Log de acción
	res.json(data)
})

app.delete("/notas_urbanas/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let data=await db.collection("notas_urbanas").deleteOne({"id": Number(req.params.id)});
	log(user, "notas_urbanas", "eliminar"); // Log de acción
	res.json(data)
})

app.delete("/usuarios/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let data=await db.collection("usuarios").deleteOne({"id": Number(req.params.id)});
	log(user, "usuarios", "eliminar"); // Log de acción
	res.json(data)
})

// updateOne

app.put("/reportes_medicos/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])

	// Evitar que se sobreescriban el historial de cambios
	delete valores["historialCambios"]

	// Obtener el folio anterior
	let reporteAnterior=await db.collection("reportes_medicos").findOne({"id":valores["id"]})
	let folioAnterior=reporteAnterior ? reporteAnterior["folio"] : null
	let folioNuevo=valores["folio"]

	// Obtener usuario del token
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let usuario=verifiedToken.usuario;

	// Constuir nuevo log de cambios
	let nuevoLog = await logFolio(usuario, folioAnterior, folioNuevo);

	// Si hay un cambio de folio, agregarlo al historial de cambios
	if (nuevoLog) {
		if (!reporteAnterior.historialCambios) {
			valores.historialCambios = [];
		} else {
			valores.historialCambios = reporteAnterior.historialCambios;
		}
		valores.historialCambios.push(nuevoLog);
	}

	// Actualizar el reporte
	let data =await db.collection("reportes_medicos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes_medicos").find({"id":valores["id"]}).project({_id:0}).toArray();
	log(usuario, "reportes_medicos", "actualizar"); // Log de acción
	res.json(data[0]);
})

app.put("/reportes_urbanos/:id", async(req,res)=>{
	let valores=req.body
	valores["id"]=Number(valores["id"])

	// Evitar que se sobreescriban el historial de cambios
	delete valores["historialCambios"]

	// Obtener el folio anterior
	let reporteAnterior=await db.collection("reportes_urbanos").findOne({"id":valores["id"]})
	let folioAnterior=reporteAnterior ? reporteAnterior["folio"] : null
	let folioNuevo=valores["folio"]

	// Obtener usuario del token
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let usuario=verifiedToken.usuario;

	// Constuir nuevo log de cambios
	let nuevoLog = await logFolio(usuario, folioAnterior, folioNuevo);

	// Si hay un cambio de folio, agregarlo al historial de cambios
	if (nuevoLog) {
		if (!reporteAnterior.historialCambios) {
			valores.historialCambios = [];
		} else {
			valores.historialCambios = reporteAnterior.historialCambios;
		}
		valores.historialCambios.push(nuevoLog);
	}

	// Actualizar el reporte
	let data =await db.collection("reportes_urbanos").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("reportes_urbanos").find({"id":valores["id"]}).project({_id:0}).toArray();
	log(usuario, "reportes_urbanos", "actualizar"); // Log de acción
	res.json(data[0]);
})

app.put("/notas_medicas/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("notas_medicas").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("notas_medicas").find({"id":valores["id"]}).project({_id:0}).toArray();
	log(user, "notas_medicas", "actualizar"); // Log de acción
	res.json(data[0]);
})

app.put("/notas_urbanas/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("notas_urbanas").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("notas_urbanas").find({"id":valores["id"]}).project({_id:0}).toArray();
	log(user, "notas_urbanas", "actualizar"); // Log de acción
	res.json(data[0]);
})

app.put("/usuarios/:id", async(req,res)=>{
	let token=req.get("Authentication");
	let verifiedToken=await jwt.verify(token, await process.env.JWTKEY);
	let user=verifiedToken.usuario;
	let valores=req.body
	valores["id"]=Number(valores["id"])
	let data =await db.collection("usuarios").updateOne({"id":valores["id"]}, {"$set":valores})
	data=await db.collection("usuarios").find({"id":valores["id"]}).project({_id:0, contrasena:0}).toArray();
	log(user, "usuarios", "actualizar"); // Log de acción
	res.json(data[0]);
})

// Login

app.post("/login", async (req, res)=>{
	let user=req.body.username;
	let pass=req.body.password;
	let data=await db.collection("usuarios").findOne({"usuario":user});
	if(data==null){
		res.sendStatus(401);
	}else if(await argon2.verify(data.contrasena, pass)){
		let token=jwt.sign({"usuario":data.usuario, "nombre":data.nombre, "rol": data.rol, "turno": data.turno}, await process.env.JWTKEY, {expiresIn: 900})
		log(user, "sistema", "login"); // Log de acción
		res.json({"token":token, "id":data.id, "usuario":data.usuario, "nombre":data.nombre, "rol":data.rol, "turno":data.turno});
	}else{
		res.sendStatus(401);
	}
})

// Iniciar servidor

const options = {
	key: fs.readFileSync('backend.key'),
	cert: fs.readFileSync('backend.crt')
};

https.createServer(options, app).listen(3000, async () => {
	await process.loadEnvFile(".env");
	connectToDB();
	console.log('HTTPS Server running on port 3000');
});