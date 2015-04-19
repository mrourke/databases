var models = require('../models');
var bluebird = require('bluebird');



module.exports = {
  messages: {
    get: function (req, res) {
      console.log("INSIDE OF CONTROLLER: MESSAGES: GET:");
      models.messages.get(req, function(res, err, info) {
        console.log('Inside Message GET callback');
        console.log(info);
        res.end(JSON.stringify(info)); //JSON string of data
      }.bind(this, res))


    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log("INSIDE OF CONTROLLER: MESSAGES: POST:");
      var message = req.body;
      models.messages.post(message, function(res, err, info) {
        console.log('message success');
        res.end();
      }.bind(this, res));
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log("INSIDE OF CONTROLLER: USERS: POST:");
      var message = req.body;
      models.users.post(message, function(res, err, info) {
        console.log('message success');
        res.end();
      }.bind(this, res));
    }
  }
};



/*for (var route in controllers) {
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
*/
