const getMoviesService = require('./getMoviesService');

const getPeliculas = (req, res) => {
    const peliculas = getMoviesService.obtenerTodas();
    res.json(peliculas);
};

const getPeliculaById = (req, res) => {
    const pelicula = getMoviesService.obtenerPorId(req.params.id);
    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ message: "Pelicula no encontrada" });
    }
};

const createPelicula = (req, res) => {
    const nuevaPelicula = getMoviesService.crear(req.body);
    res.status(201).json({ 
        message: 'Pelicula agregada al catalogo', 
        pelicula: nuevaPelicula 
    });
};

const deletePelicula = (req, res) => {
    const exito = getMoviesService.eliminar(req.params.id);
    if (exito) {
        res.json({ message: "Pelicula eliminada con éxito" });
    } else {
        res.status(404).json({ message: "Pelicula no encontrada" });
    }
};

const updatePelicula = (req, res) => {
    const peliculaActualizada = getMoviesService.actualizar(req.params.id, req.body);
    if (peliculaActualizada) {
        res.json({ message: 'Actualizada correctamente', pelicula: peliculaActualizada });
    } else {
        res.status(404).json({ message: 'Pelicula no encontrada' });
    }
};

module.exports = {
    getPeliculas, getPeliculaById, createPelicula, deletePelicula, updatePelicula
};