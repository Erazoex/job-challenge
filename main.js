const express = require('express');
const cors = require('cors');
const db = require('./database');
const app = express();
const PORT = 3000;

// parsear entrada a formato json
app.use(express.json());

// habilitando cors para todos los endpoints
app.use(cors());

app.post('/lugar', (req, res) => {
    // lugar en formato json
    const nuevoLugar = req.body;
    if (!nuevoLugar) {
        res.status(400).json({ error: 'Se deben de proporcionar un lugar' });
    }
    db.connect()                                            // conectamos con la base de datos
        .then(() => db.insertNewDocument(nuevoLugar))       // insertamos un nuevo lugar
        .finally(() => db.close());
    // status de la solicitud
    res.status(201).json({ mensaje: 'lugar agregado exitosamente', nuevoLugar });
});

app.get('/distancia', (req, res) => {
    const { placeOne, placeTwo } = req.query;
    // comprobar que existan los dos lugares
    if (!placeOne || !placeTwo) {
        res.status(400).json({ error: 'Se deben de proporcionar dos lugares para calcular su distancia' });
    }
    db.connect()
        .then(() => {
            ({ lat1, long1 } = db.getCoordinates(placeOne));
            ({ lat1, long1 } = db.getCoordinates(placeOne));
            res.status(201).json(calculateDistance(lat1, long1, lat2, long2));
        })
        .finally(() => db.close());
});

app.listen(PORT, () => {
    console.log(`escuchando en el puerto:${PORT}`);
});