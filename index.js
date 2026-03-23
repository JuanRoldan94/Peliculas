const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

const getMoviesRoutes = require('./src/getMovies/getMoviesRoutes');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {
    req.log = console.log;
    res.render('index');
});

app.use('/peliculas', getMoviesRoutes);

app.listen(PORT, (req, res) => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});