const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
const { passport, jwtMiddleware } = require('./seguridad/jwtHelper');

const seguridadRoutes = require('./seguridad/seguridad');
const clientesRoutes = require('./clientes/clientes');
const empleadosRoutes = require('./empleados/empleados');
const librosRoutes = require('./libros/libros');
const fichasRoutes = require('./fichas/fichas');
router.use(passport.initialize());

//public
router.use('/seguridad',
    verifyApiHeaderToken,
    seguridadRoutes);

//middlewares
router.use(
    '/clientes',
    verifyApiHeaderToken,
    jwtMiddleware,
    clientesRoutes
);

router.use(
    '/empleados',
    verifyApiHeaderToken,
    empleadosRoutes
);

router.use(
    '/libros',
    verifyApiHeaderToken,
    librosRoutes
);

router.use(
    '/fichas',
    verifyApiHeaderToken,
    fichasRoutes
);

module.exports = router;