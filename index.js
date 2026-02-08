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
    res.render('index');
});

app.get('/peliculas', (req, res) => {
    res.json(catalogo);
});

app.post('/peliculas', (req, res) => {
    const nuevaPelicula = req.body;

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

app.listen(PORT, (req, res) => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
