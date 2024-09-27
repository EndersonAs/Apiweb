const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
  const usuario = {
    user: req.body.user,
    password: req.body.password,
    creation_date: req.body.creation_date
  };

  try {
    // Conectar a la base de datos
    await User.connect();

    // Guardar el usuario en la bd
    const saveUser = await User.createUser(usuario);
    res.json({
      message: 'Usuario creado',
      user: saveUser
    });
  } catch (error) {
    res.json({
      message: 'Error al crear usuario',
      error: error
    });
  }
});

module.exports = router;
