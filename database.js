const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';    // URL de la conexion con mongodb
const dataBaseName = 'job-challenge';       // nombre de mi base de datos
const collectionName = 'lugares';           // nombre de la coleccion dentro de mi base de datos

let client;     // cliente de la base de datos

// realizamos la conexion con la base de datos
async function connect() {
    try {
        client = await MongoClient.connect(url, { useUnifiedTopology: true });
        console.log("conexion establecida");
    } catch (error) {
        console.error('Hubo un error al conectarse con la base de datos', error);
    }
}

// insertar un nuevo documento
async function insertNewDocument(newDocument) {
    try {
        const db = client.db(dataBaseName);                     // obtenemos la base de datos
        const collection = db.collection(collectionName);       // obtenemos la coleccion de la base de datos
        const result = await collection.insertOne(newDocument); // insertamos un nuevo documento en la base de datos
        console.log('Nuevo lugar insertado con exito:', result.insertId);
    } catch (error) {
        console.error('Error al insertar el documento', error);
    }   
}

// obtener coordenadas de un documento
async function getCoordinates(placeName) {
    const db = client.db(dataBaseName);                             // obtenemos la base de datos
    const collection = db.collection(collectionName);               // obtenemos la coleccion de la base de datos
    const result = await collection.findOne({ nombre: placeName }); // resultado de la busqueda

    // comprobar que si devolvio algo el resultado de la busqueda
    // sino devolver nulo
    if (result && result.latitud && result.longitud) {
        return { lat: result.latitud, long: result.longitud };
    } else {
        return null;
    }
}

// cerramos la conexion con la base de datos
function close() {
    client.close();
}

// exportamos la funcion insertNewDocument
module.exports = { connect, insertNewDocument, getCoordinates, close };