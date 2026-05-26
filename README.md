## sistema de gestion academica

este proyecto individual implementa un backend con Node.js y Express conectado a SQLite estructurado bajo el modelo de 3 Capas y validado con datos reales

## flujo de la arquitectura
presentacion (public/ y routes.js): El usuario llena el formulario con datos reales en el navegador fetch.js envía un POST a /api/items el enrutador recibe la petición y llama al controlador
controlador (controllers.js): valida de forma estricta que todos los campos vengan con datos si falta algo, frena el proceso si esta todo lleno delega al servicio
servicio (services.js y db.js): ejecuta la logica de negocio y realiza las consultas SQL (INSERT o SELECT) directamente en la base de datos sistema.db

## seguridad y HTTPS
autenticacion: se usa un Token/API Key en las cabeceras (Authorization) para proteger el endpoint POST si el token no está o es incorrecto el middleware bloquea el paso con un error
HTTPS: en produccion cifra todo el canal entre el cliente y el servidor protegiendo datos sensibles (RUT, email, teléfono) contra interceptaciones en la red

## endpoints 
POST /api/items: registra un nuevo alumno (requiere token y campos con datos)
GET /api/items: lista todos los alumnos en el sistema
GET /api/items/:id: busca un alumno por su ID numerico (maneja error 404 si no existe)

## instalación y ejecucion
instalar dependencias: npm install express sqlite3
iniciar servidor: node src/app.js
abrir en el navegador el link cliqueable que muestra la consola: http://localhost:3000