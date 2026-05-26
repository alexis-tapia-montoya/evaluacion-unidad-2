const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/routes.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', apiRoutes);

app.listen(PORT, () => {
    console.log(`Servidor operativo en puerto ${PORT}`);
    console.log(`Accede a la aplicación en http://localhost:${PORT}`);
});