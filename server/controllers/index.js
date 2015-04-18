var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {}, // a function which handles a get request for all messages
    post: function (req, res) {
      var message = req.body;
      models.messages.post(message);
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {}
  }
};



for (var route in controllers) {
  router.route("/" + route)
    .get(controllers[route].get)
    .post(controllers[route].post);
}

wwww.stuff.com/classes/messages.get


  app.use(express.static(__dirname + '/client'));
  var dbUrl = __dirname + "/db/messages";

  app.route('/classes/messages')
    .get(function(request, response){
      fs.readFile(dbUrl, 'utf-8', function(err, data){
        var parsed = JSON.parse(data); 
        response.send({results: parsed});
      })
    })
    .post(function(request, response){
      var message = request.body;

      fs.readFile(dbUrl, 'utf-8', function(err, data){
        var data = JSON.parse(data);
        data.push(message);

        fs.writeFile(dbUrl, JSON.stringify(data), function(err) {
          console.log("The file was saved!");
          response.send('saved');
        }); 
      });
    });