const express = require ('express')
const cors = require ('cors')
const app = express()
const PORT = 3000

app.use(cors());
app.use(express.json());

const catalogo=[]

app.get('/', (req, res) =>{
    res.json(catalogo);
})

app.post('/', (req, res) =>{
    const nuevaPelicula = req.body;
    
    if (!nuevaPelicula.imagen){
        nuevaPelicula.imagen = "https://www.shutterstock.com/image-vector/film-reel-vector-cinema-logo-600nw-2353280887.jpg"
    }
//  if (!nuevaPelicula.nombre || !nuevaPelicula.imagen || !nuevaPelicula.genero){
//      return res.status(400).json({ error: "Faltan datos"});
//  }

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