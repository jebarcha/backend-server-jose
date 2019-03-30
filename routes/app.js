var express = require('express');

var app = express(); // definiendo mi servidor express

// Ruta  Principal
app.get('/', (req, res, next) => {
    res.status(200).json({
        ok: true,
        mensaje: 'ok test. Peticion realizada correctamente.'
    });
});

module.exports = app;