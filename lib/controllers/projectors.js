const { Router } = require('express');
const Projector = require('../models/Projector');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    const projector = await Projector.insert({
      brand: req.body.brand,
      model: req.body.model,
      size: req.body.size,
    });
    res.send(projector);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const projector = await Projector.getById(id);
    res.json(projector);
  })

  .get('/', async (req, res) => {
    const projectors = await Projector.getAll();

    res.json(projectors);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const projector = await Projector.updateById(id, { ...req.body });

      res.json(projector);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const projector = await Projector.deleteById(id);

    res.json(projector);
  });
