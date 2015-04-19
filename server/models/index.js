var db = require('../db');




module.exports = {
  messages: {
    get: function (req, callback) {
      db.retrieveMessages (req, callback);
    }, // a function which produces all the messages
    post: function (message, callback) {
      db.insert(message.username, message.message, message.roomname, callback);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {

    },
    post: function (message, callback) {
      db.insert(message.username, message.message, message.roomname, callback);
    }
  }
};

