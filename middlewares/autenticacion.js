var jwt = require('jsonwebtoken');

var SEED = require('../config/config').SEED;

// ===========================================
// Verificar token (middleware)
// ===========================================
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();

        // res.status(200).json({
        //     ok: true,
        //     decoded: decoded
        // });

    });
}

// ===========================================
// Verificar ADMIN (middleware)
// ===========================================
exports.verificaADMIN_ROLE = function(req, res, next) {

    var usuario = req.usuario;
    // console.log(usuario);

    if (usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es Administrador',
            errors: { message: 'No es administrador, no puede hacer eso' }
        });
    }
}

// ===========================================
// Verificar ADMIN o Mismo Usuario (middleware)
// ===========================================
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {

    var usuario = req.usuario;
    var id = req.params.id;
    // console.log(usuario);

    if (usuario.role === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto - No es Administrador ni es el mismo usuario',
            errors: { message: 'No es administrador ni es el mismo usuario, no puede hacer eso' }
        });
    }
}