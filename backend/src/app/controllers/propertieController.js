const express = require('express');

const Propertie = require('../models/propertie');

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const propertie = await Propertie.create(req.body);

    return res.send({ propertie });

  } catch (err) {
    return res.status(400).send({ error: 'It was not possible to register the property'})
  }
});

router.get('/', async (req, res) => {
  try {
    const propertie = await Propertie.find();

    return res.send({ propertie });

  } catch (err) {
    return res.status(400).send({ error: 'It was not possible to recover the properties' });
  }
});

router.get('/:propertiesId', async (req, res) => {
  try {
    const propertie = await Propertie.findById(req.params.propertiesId);

    return res.send({ propertie });
  } catch (err) {
    return res.status(400).send({ error: 'Error loading propertie' });
  }
});

router.put('/:propertiesId', async (req, res) => {
  try {
    const propertie = await Propertie.findByIdAndUpdate(req.params.propertiesId, req.body, { new: true });

    await propertie.save();

    return res.send({ propertie });

  } catch (err) {
    return res.status(400).send({ error: 'Error updating propertie' });
  }
});

router.delete('/:propertieId', async (req, res) => {
  try {
    await Propertie.findByIdAndRemove(req.params.propertieId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: 'Error deleting propertie' });
  }
});

module.exports = app => app.use('/propertie', router);
