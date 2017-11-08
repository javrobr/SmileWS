// paquetes necesarios
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Reto = require('./models/reto');
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
var port = process.env.PORT || 3000;
// crear ruteo
var router = express.Router();

//Ruta de prueba
router.get('/', function(req, res) {
  res.json({ message: 'Smile!!' });
});

// Registrar la api
app.use('/api', router);

//inicia el server
app.listen(port);
console.log('Wait smile in ' + port);


//codigo RetoS
// Ruta con el prefijo retos
var retosRoute = router.route('/retos');

// endpoint /api/retoss for RETOS
retosRoute.post(function(req, res) {
  //instancia del model Reto
  var reto = new Reto();

  // agregar un reto
  reto.titulo = req.body.titulo;
  reto.descripcion = req.body.descripcion;
  reto.tiempo = req.body.tiempo;
  reto.monedas = req.body.monedas;
  reto.video = req.body.video;

  // Guardar el reto y obtener el error
  reto.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Guardando reto!', data: reto });
  });
});


// endpoint /api/retos GET
retosRoute.get(function(req, res) {
  //Usar el model Reto para obtener todos los retos
  Reto.find(function(err, retos) {
    if (err)
      res.send(err);

    res.json(retos);
  });
});



// Ruta para un reto especifico /retos/:reto_id prefix
var retoRoute = router.route('/retos/:reto_id');

// Create endpoint /api/beers/:beer_id for GET
retoRoute.get(function(req, res) {
  // Use the Beer model to find a specific beer
  Reto.findById(req.params.reto_id, function(err, beer) {
    if (err)
      res.send(err);

    res.json(beer);
  });
});

// endpoint /api/retoss/:reto_id PUT
retoRoute.put(function(req, res) {
  // Use the Beer model to find a specific beer
  Reto.findById(req.params.beer_id, function(err, beer) {
    if (err)
      res.send(err);

    // Actualizar reto
    if (req.body.titulo){
      reto.titulo = req.body.titulo;
    }
    if (req.body.descripcion){
    reto.descripcion = req.body.descripcion;
    }
    if (req.body.tiempo){
      reto.tiempo = req.body.tiempo;
    }
    if (req.body.monedas){
      reto.monedas = req.body.monedas;
    }
    if (req.body.video){
      reto.video = req.body.video;
    }
    // Save the beer and check for errors
    reto.save(function(err) {
      if (err)
        res.send(err);

      res.json(reto);
    });
  });
});


//  /api/retos/:reto_id DELETE
retoRoute.delete(function(req, res) {
  // Use the Beer model to find a specific beer and remove it
  Reto.findByIdAndRemove(req.params.reto_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Reto eliminado!' });
  });
});
