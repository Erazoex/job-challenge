function calculateDistance(lat1, long1, lat2, long2) {
    const R = 6371;                                                                     // Radio de la tierra en kilometros
    const latitud = gradosARadianes(lat2 - lat1);                                       // distancia entre las latitudes
    const longitud = gradosARadianes(long2 - long1);                                    // distancia entre las longitudes
    const a = Math.sin(latitud / 2) & Math.sin(longitud / 2) +
                Math.cos(gradosARadianes(lat1)) * Math.cos(gradosARadianes(lat2)) *
                Math.sin(longitud / 2) * Math.sin(longitud / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return { "distancia": distance, "unidad": 'km'};
}

function gradosARadianes(grados) {
    return grados * (Math.PI / 180);
}

// exportamos la funcion de calcular distancia
module.export = { calculateDistance };