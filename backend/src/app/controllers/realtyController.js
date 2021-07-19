const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Realty = require('../models/realty');

const router = express.Router();

router.use(authMiddleware);

router.post('/create', async (req, res) => {
  try {
    const realty = await Realty.create(req.body);

    return res.send({ realty });

  } catch (err) {
    return res.status(400).send({ error: 'It was not possible to register the property'})
  }
});

router.get('/list', async (req, res) => {
  try {
    const realty = await Realty.findAll();

    return res.send({ realty });

  } catch (err) {
    return res.status(400).send({ error: 'It was not possible to recover the properties' });
  }
})

module.exports = app => app.use('/realty', router);
