const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Login = require('../models/Login');

router.post('/', async (req, res) => {
  try {
    // Obtener el nombre del usuario y la contraseña del cuerpo de la solicitud
    const { user, password } = req.body;

    // Conectar a la base de datos
    await User.connect();
    await Login.connect();

    // Busca el usuario en la colección de usuarios:
    const existingUser = await User.findUser({ user: user, password: password });

    // Si el usuario no existe, devolver un error
    if (!existingUser) {
      return res.status(404).json({ message: 'Usuario no encontrado o contraseña incorrecta' });
    }

    // Crea un nuevo registro de login
    const login = { user: user, timestamp: new Date() };
    
    // Guardar el registro de login en la bd
    await Login.createLogin(login);

    // Devolver una respuesta exitosa
    res.status(201).json({ message: 'Login registrado exitosamente' });

  } catch (error) {
    // Manejo de errores
    res.status(500).json({ message: 'Error al registrar el login', error: error.message });
  }
});

module.exports = router;
