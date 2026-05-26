const service = require('../services/services.js');

const getAllItems = async (req, res) => {
    try {
        const items = await service.listarTodas();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await service.obtenerPorId(req.params.id);
        if (!item) return res.status(404).json({ message: 'No encontrado' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createItem = async (req, res) => {
    try {
        const { rut, nombre, apellido, email, telefono, carrera } = req.body;

        if (!rut || !nombre || !apellido || !email || !telefono || !carrera) {
            return res.status(400).json({ message: 'Campos incompletos' });
        }

        const nuevoItem = await service.crear(req.body);
        res.status(201).json(nuevoItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getAllItems, getItemById, createItem };