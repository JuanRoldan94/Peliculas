const express = require ('express')
const cors = require ('cors')
const app = express()
const PORT = 3000

app.use(cors());
app.use(express.json());

const catalogo=[
    {
        nombre: "Inception",
        imagen: "https://wallpapercave.com/dwp1x/msi4htu.jpg",
        genero: "Ciencia Ficcion"
    }
]

app.get('/', (req, res) =>{
    res.json(catalogo);
})

app.post('/', (req, res) =>{
    const nuevaPelicula = req.body;

    if (!nuevaPelicula.nombre || !nuevaPelicula.imagen || !nuevaPelicula.genero){
        return res.status(400).json({ error: "Faltan datos"});
    }

    catalogo.push(nuevaPelicula);
    console.log("Pelicula agregada: ", nuevaPelicula);

    res.status(201).json({
        mensaje: "Pelicula creada con exito",
        pelicula: nuevaPelicula
    });
});

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})