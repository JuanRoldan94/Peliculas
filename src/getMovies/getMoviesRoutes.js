const express = require('express');
const router = express.Router();
const controller = require('./getMoviesController');

router.get('/', controller.getPeliculas);
router.get('/:id', controller.getPeliculaById);
router.post('/', controller.createPelicula);
router.delete('/:id', controller.deletePelicula);
router.put('/:id', controller.updatePelicula);

module.exports = router;