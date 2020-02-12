var path = require('path');
var rutaLocal = path.normalize(__dirname + '/..'); // Me permite encontrar la ruta en la que estoy.
var ambiente = 'test';

var configuracion = {
    test: {
    baseUrl: "/",
    ruta: rutaLocal,
    app: {
      name: 'PPTEndava'
    },,
    puerto: process.env.PORT || 3000
  },
  produccion: {
    baseUrl: "/",
    ruta: rutaLocal,
    app: {
      name: 'PPTEndava'
    },
    puerto: process.env.PORT || 3000
  }
};
module.exports = configuracion[ambiente]