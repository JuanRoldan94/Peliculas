const catalogo = [];

const obtenerTodas = () => {
    return catalogo;
};

const obtenerPorId = (id) => {
    return catalogo.find(p => p.id === id);
};

const crear = (datos) => {
    const nuevaPelicula = { ...datos };
    nuevaPelicula.id = Date.now().toString();

    if (!nuevaPelicula.imagen) {
        nuevaPelicula.imagen = '/img/default.jpg';
    }
    
    catalogo.push(nuevaPelicula);
    console.log('Pelicula agregada al catalogo:', nuevaPelicula);
    return nuevaPelicula;
};

const eliminar = (id) => {
    const indice = catalogo.findIndex(pelicula => pelicula.id === id);
    if (indice !== -1) {
        catalogo.splice(indice, 1);
        console.log(`Pelicula con id ${id} eliminada`);
        return true;
    }
    return false;
};

const actualizar = (id, datosNuevos) => {
    const pelicula = catalogo.find(p => p.id === id);
    if (pelicula) {
        pelicula.nombre = datosNuevos.nombre ?? pelicula.nombre;
        pelicula.genero = datosNuevos.genero ?? pelicula.genero;
        pelicula.imagen = datosNuevos.imagen || "/img/default.jpg";
        console.log(`Pelicula editada: ${pelicula.nombre}`);
        return pelicula;
    }
    return null;
};

module.exports = { obtenerTodas, obtenerPorId, crear, eliminar, actualizar };