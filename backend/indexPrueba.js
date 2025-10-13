const express=require("express");
const MongoClient=require("mongodb").MongoClient;
var cors=require("cors");
const bodyParser=require("body-parser");
const argon2=require("argon2")
const jwt=require("jsonwebtoken")

const app=express();
app.use(cors());
const PORT=3000;
let db;
app.use(bodyParser.json());


async function log(sujeto, objeto, accion){
    toLog={};
    toLog["timestamp"]=new Date();
    toLog["sujeto"]=sujeto;
    toLog["objeto"]=objeto;
    toLog["accion"]=accion;
    await db.collection("log402").insertOne(toLog);
}

app.get("/reportes", async (req,res)=>{
    try{
    let token=req.get("Authentication");
    let verifiedToken=await jwt.verify(token, "secretKey");
    let user=verifiedToken.usuario;	
    if("_sort" in req.query){//getList
        let sortBy=req.query._sort;
        let sortOrder=req.query._order=="ASC"?1:-1;
        let inicio=Number(req.query._start);
        let fin=Number(req.query._end);
        let sorter={}
        sorter[sortBy]=sortOrder;
        let data= await db.collection("ejemplo402").find({}).sort(sorter).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        data=data.slice(inicio,fin)
        log(user, "reportes", "leer");
        res.json(data)
    }else if("id" in req.query){
        let data=[];
        for(let index=0; index<req.query.id.length; index++){
            let dataParcial=await db.collection("ejemplo402").find({id: Number(req.query.id[index])}.project({_id:0}).toArray())
            data= await data.concat(dataParcial);
        }
        res.json(data);
    }else{
        let data=await db.collection("ejemplo402").find(req.query).project({_id:0}).toArray();
        res.set("Access-Control-Expose-Headers", "X-Total-Count");
        res.set("X-Total-Count", data.length);
        res.json(data);
    }
    }catch{
        res.sendStatus(401);
    }
});

//getOne

app.get("/reportes/:id", async (req,res)=>{
    let data=await db.collection("ejemplo402").find({"id": Number(req.params.id)}).project({_id:0}).toArray();
    res.json(data[0]);
});

//createOne
app.post("/reportes", async (req,res)=>{
    let valores=req.body
    valores["id"]=Number(valores["id"])
    let data=await db.collection("ejemplo402").insertOne(valores);
    res.json(data)
});

//CreateOne Reporte Medico
app.post("/reportes_medicos", async (req, res) => {
    try {
        // Verificar token de autenticación
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.usuario;
        console.log("Usuario autenticado:", user);

        //Información del reporte médico
        // Obtener todos los datos del reporte médico del body
        let reporteMedico = req.body;
        // Fecha de creación
        reporteMedico.fechaCreacion = new Date();
        // Usuario que creó el reporte
        reporteMedico.usuarioCreador = user;
        // Fecha de última modificación
        reporteMedico.ultimaModificacion = new Date();
        // Usuario que hizo la última modificación
        reporteMedico.usuarioModificacion = user;

        // Insertar en la base de datos
        let data = await db.collection("reportes_medicos").insertOne(reporteMedico);

        let reporteCreado = await db.collection("reportes_medicos")
            .find({ folio: reporteMedico.folio })
            .project({ _id: 0 })
            .toArray();

        res.status(201).json(reporteCreado[0]);
        
    } catch (error) {
        console.error("Error al crear reporte médico:", error);
        res.status(401).json({ error: "No autorizado o error en la creación" });
    }
});

//CreateOne Reporte Urbano
app.post("/reportes_urbanos", async (req, res) => {
    try {
        let token = req.get("Authentication");
        let verifiedToken = await jwt.verify(token, "secretKey");
        let user = verifiedToken.usuario;

        let reporteUrbano = req.body;

        reporteUrbano.fechaCreacion = new Date();
        reporteUrbano.usuarioCreador = user;
        reporteUrbano.ultimaModificacion = new Date();
        reporteUrbano.usuarioModificacion = user;

        let data = await db.collection("reportes_urbanos").insertOne(reporteUrbano);

        let reporteCreado = await db.collection("reportes_urbanos")
            .find({ folio: reporteUrbano.folio })
            .project({ _id: 0 })
            .toArray();

        res.status(201).json(reporteCreado[0]);

    } catch (error) {
        console.error("Error al crear reporte urbano:", error);
        res.status(401).json({ error: "No autorizado o error en la creación" });
    }
});



//deleteOne
app.delete("/reportes/:id", async(req,res)=>{
    let data=await db.collection("ejemplo402").deleteOne({"id": Number(req.params.id)});
    res.json(data)
})

//updateOne
app.put("/reportes/:id", async(req,res)=>{
    let valores=req.body
    valores["id"]=Number(valores["id"])
    let data =await db.collection("ejemplo402").updateOne({"id":valores["id"]}, {"$set":valores})
    data=await db.collection("ejemplo402").find({"id":valores["id"]}).project({_id:0}).toArray();
    res.json(data[0]);
})

async function connectToDB(){
    let client=new MongoClient("mongodb://127.0.0.1:27017/tc2007b");
    await client.connect();
    db=client.db();
    console.log("conectado a la base de datos");
}


app.post("/registrarse", async(req, res)=>{
    let user=req.body.username;
    let pass=req.body.password;
    let nombre=req.body.nombre;
    let tipo=req.body.tipo;
    let data=await db.collection("usuarios402").findOne({"usuario":user})
    if(data==null){
        const hash=await argon2.hash(pass, {type: argon2.argon2id, memoryCost: 19*1024, timeCost:2, parallelism:1, saltLength:16})
        let usuarioAgregar={"usuario":user, "password":hash, "nombre":nombre, "tipo":tipo}
        data=await db.collection("usuarios402").insertOne(usuarioAgregar);
        res.sendStatus(201);
    }else{
        res.sendStatus(403)
    }
})

app.post("/login", async (req, res)=>{
    let user=req.body.username;
    let pass=req.body.password;
    let data=await db.collection("usuarios402").findOne({"usuario":user});
    if(data==null){
        res.sendStatus(401);
    }else if(await argon2.verify(data.password, pass)){
        let token=jwt.sign({"usuario":data.usuario}, "secretKey", {expiresIn: 900})
        // res.json({"token":token, "id":data.usuario, "nombre":data.nombre})
        res.json({"token":token, "id":data.usuario, "nombre":data.nombre, "role": data.rol, "turno": data.turno})
    }else{
        res.sendStatus(401);
    }
})

app.listen(PORT, ()=>{
    connectToDB();
    console.log("aplicacion corriendo en puerto 3000");
});