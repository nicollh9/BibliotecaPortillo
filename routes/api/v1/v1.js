const express = require('express');
const router = express.Router();
const { verifyApiHeaderToken } = require('./headerVerifyMiddleware');
const { passport, jwtMiddleware } = require('./seguridad/jwtHelper');

const seguridadRoutes = require('./seguridad/seguridad');
const clientesRoutes = require('./clientes/clientes');
router.use(passport.initialize());

//public
/*router.use('/seguridad',
    verifyApiHeaderToken,
    seguridadRoutes);
*/

router.use(
    '/clientes',
    verifyApiHeaderToken,
    //jwtMiddleware,
    clientesRoutes
);

module.exports = router;