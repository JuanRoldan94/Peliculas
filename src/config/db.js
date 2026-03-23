const sql = require('mssql'); 

const dbConfig = {
    user: 'sa',
    password: 'Juanroldan',
    server: 'localhost',
    port: 14333,
    database: 'catalogo_peliculas',
    options: {
        encrypt: false, 
        trustServerCertificate: true 
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Conectado a SQL Server exitosamente');
        return pool;
    })
    .catch(err => {
        console.error('Error al conectar con SQL Server: ', err);
    });

module.exports = {
    sql, 
    poolPromise
};