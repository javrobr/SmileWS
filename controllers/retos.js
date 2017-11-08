var Reto = require('../models/reto');

// endpoint /api/retoss for RETOS
exports.postRetos = function(req, res) {
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
};

// endpoint /api/retos GET
exports.getRetos = function(req, res) {
  //Usar el model Reto para obtener todos los retos
  Reto.find(function(err, retos) {
      if (err)
        res.send(err);

      res.json(retos);
    });
  };


  // Create endpoint /api/beers/:beer_id for GET
  exports.getReto = function(req, res) {
    // Use the Beer model to find a specific beer
    Reto.findById(req.params.reto_id, function(err, beer) {
      if (err)
        res.send(err);

      res.json(beer);
    });
  };

  // endpoint /api/retoss/:reto_id PUT
  exports.putReto= function(req, res) {
    // Use the Beer model to find a specific beer
    Reto.findById(req.params.reto_id, function(err, beer) {
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
  };


  //  /api/retos/:reto_id DELETE
  exports.deleteReto= function(req, res) {
    // Use the Beer model to find a specific beer and remove it
    Reto.findByIdAndRemove(req.params.reto_id, function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Reto eliminado!' });
    });
  };
