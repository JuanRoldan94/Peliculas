const { sql, poolPromise } = require('../config/db');

const obtenerTodas = async () => {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM peliculas');
    return result.recordset;
};

const obtenerPorId = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('SELECT * FROM peliculas WHERE id = @id');
    
    return result.recordset[0];
};

const crear = async (datos) => {
    let { nombre, genero, imagen } = datos;
    if (!imagen) imagen = '/img/default.jpg';

    const pool = await poolPromise;
    const result = await pool.request()
        .input('nombre', sql.NVarChar, nombre)
        .input('genero', sql.NVarChar, genero)
        .input('imagen', sql.NVarChar, imagen)
        
        .query(`
            INSERT INTO peliculas (nombre, genero, imagen) 
            OUTPUT inserted.id 
            VALUES (@nombre, @genero, @imagen)
        `);


    const insertId = result.recordset[0].id;
    return { id: insertId, nombre, genero, imagen };
};

const eliminar = async (id) => {
    const pool = await poolPromise;
    const result = await pool.request()
        .input('id', sql.Int, id)
        .query('DELETE FROM peliculas WHERE id = @id');
    
    return result.rowsAffected[0] > 0;
};

const actualizar = async (id, datosNuevos) => {
    const peliculaActual = await obtenerPorId(id);
    if (!peliculaActual) return null;

    const nombre = datosNuevos.nombre ?? peliculaActual.nombre;
    const genero = datosNuevos.genero ?? peliculaActual.genero;
    const imagen = datosNuevos.imagen || peliculaActual.imagen || "/img/default.jpg";

    const pool = await poolPromise;
    await pool.request()
        .input('id', sql.Int, id)
        .input('nombre', sql.NVarChar, nombre)
        .input('genero', sql.NVarChar, genero)
        .input('imagen', sql.NVarChar, imagen)
        .query(`
            UPDATE peliculas 
            SET nombre = @nombre, genero = @genero, imagen = @imagen 
            WHERE id = @id
        `);

    return { id, nombre, genero, imagen };
};

module.exports = {
    obtenerTodas,
    obtenerPorId,
    crear,
    eliminar,
    actualizar
};