const db = require('../config/db.js');

class SuscripcionService {
    async listarTodas() {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * FROM usuarios`, [], (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    }

    async obtenerPorId(id) {
        return new Promise((resolve, reject) => {
            db.get(`SELECT * FROM usuarios WHERE id = ?`, [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    }

    async crear(datos) {
        const { rut, nombre, apellido, email, telefono, carrera } = datos;
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO usuarios (rut, nombre, apellido, email, telefono, carrera) VALUES (?, ?, ?, ?, ?, ?)`;
            db.run(query, [rut, nombre, apellido, email, telefono, carrera], function(err) {
                if (err) reject(err);
                else resolve({ id: this.lastID, ...datos });
            });
        });
    }
}

module.exports = new SuscripcionService();