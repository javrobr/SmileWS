// paquetes necesarios
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var retoController = require('./controllers/retos');

// crear aplicacion y db connect

var MONGOLAB_URI = 'mongodb://smileuser:smileuser@ds249605.mlab.com:49605/smiledb';
//var MONGOLAB_URI = 'mongodb://localhost:27017/smile';
mongoose.connect(MONGOLAB_URI);


var app = express();
//Agregar  el body-parser
app.use(bodyParser.urlencoded({
  extended: true
}));
//definir puerto
var port = process.env.PORT || 8080;
// crear ruteo
var router = express.Router();

//Ruta de prueba
router.get('/', function(req, res) {
  res.json({ message: 'Smile!!' });
});

// Registrar la api
app.use('/api', router);

//codigo RetoS
// Ruta con el prefijo retos
router.route('/retos')
  .post(retoController.postRetos)
  .get(retoController.getRetos);

// Create endpoint handlers for /beers/:beer_id
router.route('/retos/:reto_id')
  .get(retoController.getReto)
  .put(retoController.putReto)
  .delete(retoController.deleteReto);


  //inicia el server
  app.listen(8080;
  //console.log('Wait smile in ' + port);
