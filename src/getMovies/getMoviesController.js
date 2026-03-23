const getMoviesService = require('./getMoviesService');

const getPeliculas = async (req, res) => {
    try {
        const peliculas = await getMoviesService.obtenerTodas();
        res.json(peliculas);
    } catch (error) {
        console.error('Error al obtener peliculas:', error);
        res.status(500).json({ message: 'Error al obtener peliculas' });
    }
};

const getPeliculaById = async (req, res) => {
    try {
        const pelicula = await getMoviesService.obtenerPorId(req.params.id);
        if (pelicula) {
            res.json(pelicula);
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" });
        }
    } catch (error) {
        console.error('Error al obtener pelicula:', error);
        res.status(500).json({ message: 'Error al obtener pelicula' });
    }
};

const createPelicula = async (req, res) => {
    try {
        const nuevaPelicula = await getMoviesService.crear(req.body);
        res.status(201).json({ 
            message: 'Pelicula agregada al catalogo', 
            pelicula: nuevaPelicula 
        });
    } catch (error) {
        console.error('Error al crear pelicula:', error);
        res.status(500).json({ message: 'Error al crear pelicula' });
    }
};

const deletePelicula = async (req, res) => {
    try {
        const exito = await getMoviesService.eliminar(req.params.id);
        if (exito) {
            res.json({ message: "Pelicula eliminada con éxito" });
        } else {
            res.status(404).json({ message: "Pelicula no encontrada" });
        }
    } catch (error) {
        console.error('Error al eliminar pelicula:', error);
        res.status(500).json({ message: 'Error al eliminar pelicula' });
    }
};

const updatePelicula = (req, res) => {
    try {
        const peliculaActualizada = getMoviesService.actualizar(req.params.id, req.body);
        if (peliculaActualizada) {
            res.json({ message: 'Actualizada correctamente', pelicula: peliculaActualizada });
        } else {
            res.status(404).json({ message: 'Pelicula no encontrada' });
        }
    } catch (error) {
        console.error('Error al actualizar pelicula:', error);
        res.status(500).json({ message: 'Error al actualizar pelicula' });
    }
};

module.exports = {
    getPeliculas, getPeliculaById, createPelicula, deletePelicula, updatePelicula
};