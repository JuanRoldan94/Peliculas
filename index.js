const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const catalogo = []

app.get('/', (req, res) => {
    req.log = console.log;
    res.render('index');
});

app.get('/peliculas', (req, res) => {
    res.json(catalogo);
});

app.get('/peliculas/:id', (req, res) => {
    const id = req.params.id;
    const pelicula = catalogo.find(p => p.id === id);

    if (pelicula) {
        res.json(pelicula);
    } else {
        res.status(404).json({ message: "Pelicula no encontrada" });
    }
});

app.post('/peliculas', (req, res) => {
    const nuevaPelicula = req.body;

    nuevaPelicula.id = Date.now().toString();

    if (!nuevaPelicula.imagen){
        nuevaPelicula.imagen = '/img/default.jpg';
    }
    
    catalogo.push(nuevaPelicula);
    console.log('Pelicula agregada al catalogo:', nuevaPelicula);

    res.status(201).json({ 
        message: 'Pelicula agregada al catalogo', 
        pelicula: nuevaPelicula 
    });
});

app.delete('/peliculas/:id', (req, res) => {
    const idParaBorrar = req.params.id;
    
    const indice = catalogo.findIndex(pelicula => pelicula.id === idParaBorrar);

    if (indice !== -1) {
        catalogo.splice(indice, 1);
        console.log(`Pelicula con id ${idParaBorrar} eliminada`);
        res.json({ message: "Pelicula eliminada con éxito" });
    } else {
        res.status(404).json({ message: "Pelicula no encontrada" });
    }
});


app.put('/peliculas/:id', (req, res) => {
    const idParaEditar = req.params.id;
    const datosNuevos = req.body;

    const pelicula = catalogo.find(p => p.id === idParaEditar);

    if (pelicula) {
        pelicula.nombre = datosNuevos.nombre || pelicula.nombre;
        pelicula.genero = datosNuevos.genero || pelicula.genero;
        pelicula.imagen = datosNuevos.imagen || "/img/default.jpg";

        console.log(`Pelicula editada: ${pelicula.nombre}`);
        res.json({ message: 'Actualizada correctamente', pelicula: pelicula });
    } else {
        res.status(404).json({ message: 'Pelicula no encontrada' });
    }
});


app.listen(PORT, (req, res) => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`);
});
