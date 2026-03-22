let idEnEdicion = null;
const API_URL = "/peliculas";

async function cargarPeliculas() {
    try {
        const response = await fetch(API_URL);
        const peliculas = await response.json();
        
        const container = document.getElementById('lista-peliculas');
        container.innerHTML = ''; 

        peliculas.forEach(pelicula => {
            const html = `
                <div class="card">
                    <button class="btn-edit" onclick="editarPelicula('${pelicula.id}')">✎</button>
                    <button class="btn-delete" onclick="eliminarPelicula('${pelicula.id}')">x</button>                            
                    <img src="${pelicula.imagen}" onerror="this.src='https://via.placeholder.com/100?text=Sin+Imagen'">
                    <div class="card-content">
                        <h3>${pelicula.nombre}</h3>
                        <p>${pelicula.genero}</p>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    } catch (error) {
        console.error("Error cargando pelicula:", error);
        alert("Asegúrate de que el servidor Node esté corriendo (node server.js)");
    }
}

async function guardarPelicula() {
    const datos = {
        nombre: document.getElementById('nombre').value,
        imagen: document.getElementById('imagen').value,
        genero: document.getElementById('genero').value
    };

    if(!datos.nombre) return alert("El nombre es obligatorio");

    try {
        let url = API_URL;
        let metodo = "POST";

        if (idEnEdicion !== null) {
            url = `${API_URL}/${idEnEdicion}`;
            metodo = "PUT";
        }

        const response = await fetch(url, {
            method: metodo,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            cerrarModal();
            cargarPeliculas();
        } else {
            const errorData = await response.json();
            console.error("Error guardando película:", errorData);
            alert(`Error del servidor: ${response.status} - ${errorData.message || 'Desconocido'}`);
        }

    } catch (error) {
        alert("Error de conexión");
    }
}

async function eliminarPelicula(id) {
    if(!confirm("¿Eliminar esta pelicula?")) return;

    try {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        cargarPeliculas();
    } catch (error) {
        alert("Error eliminando el pelicula");
    }
}

function cargarDatosEnModal(id, nombre, genero, imagen) {
    idEnEdicion = id;

    document.getElementById('nombre').value = nombre;
    document.getElementById('genero').value = genero;
    document.getElementById('imagen').value = imagen;

    document.querySelector('.modal-content h3').innerText = "Editar Película";

    document.getElementById('modal').style.display = 'flex';
}

async function editarPelicula(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`);
        if (!response.ok) throw new Error("No se pudo obtener la película");
        
        const pelicula = await response.json();

        cargarDatosEnModal(pelicula.id, pelicula.nombre, pelicula.genero, pelicula.imagen);

    } catch (error) {
        console.error(error);
        alert("Error al cargar los datos para editar");
    }
}

function abrirModal() { 
    limpiarInputs(); 
    idEnEdicion = null; 
    document.querySelector('.modal-content h3').innerText = "Agregar Nueva Película"; 
    document.getElementById('modal').style.display = 'flex';
}
function cerrarModal() { document.getElementById('modal').style.display = 'none'; }
function limpiarInputs() {
    document.getElementById('nombre').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('genero').value = '';
}

cargarPeliculas();