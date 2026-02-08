Requisitos previos

Instalar Node.js desde https://nodejs.org/

Clonar o descargar el proyecto
Descarga los archivos en una carpeta de tu computadora

Instalar dependencias
Desde la terminal, ejecutar el siguiente comando
npm install express cors ejs

Si no tienes un archivo package.json, se puede crear ejecutando
npm init -y

Para correr la API, ejecuta el siguiente comando en la terminal
node index.js
En consola deberia salir el sigueinte mensaje: Servidor corriendo en el puerto 3000

Para abrir la pagina, desde tu lavegador ingresa a 
http://localhost:3000

Cambio de puerto
Por defecto, la aplicacion corre en el puerto 3000, pero esto se puede modificar desde el archivo index.js
Busca la linea donde se define la constante PORT y cambia el numero
