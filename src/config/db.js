const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '../../sistema.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al abrir la BD:', err.message);
    }
});

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT,
        nombre TEXT,
        apellido TEXT,
        email TEXT,
        telefono TEXT,
        carrera TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS suscripciones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario_email TEXT,
        plan_nombre TEXT,
        metodo_pago TEXT,
        duracion_meses INTEGER,
        codigo_descuento TEXT
    )`);
});

module.exports = db;