var mysql = require('mysql');

var dbConnection = mysql.createConnection({
  user: "root",
  password: "",
  database: "chat"
});
dbConnection.connect();


// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat". //result.insertId

exports.retrieveMessages = function(req, callback){
  //figure out what request requirements are
  //select join all 3 tables
  dbConnection.query({sql: 'select users.name, messages.text, rooms.name from messages join users on users.id=messages.userId join rooms on rooms.id=messages.roomId',
    nestTables: true}, function(callback, err, result) {
    console.log('Message GET error: ', err);
    console.log('Message GET results: ', result);
    console.log('callback: ', callback);
    var messages = [];
    var temp;
    for(var i = 0; i < result.length; i++) {
      temp = result[i];
      messages.push({username: temp.users.name, message: temp.messages.text, roomname: temp.rooms.name});
    }
    callback(undefined, messages);

    //build better message object to return
  }.bind(null, callback));
};

exports.insert = function(user, message, room, callback){
  var info = {
    'room': room,
    'user': user,
    'message': message,
    'userId': null,
    'roomId': null,
    'messageId': null,
    'callback': callback
  };
  if(user !== undefined){
    dbConnection.query('select id from users where name = \''+info.user+'\'', function(err, result){
      var roomStuff = function(info){
        var messageStuff = function(info){
          console.log('Inside message stuff: ', info.message);
          if(info.message !== undefined){
            ///this is not working ########
            console.log('Attemting to INSERT: ', info);
            dbConnection.query('INSERT INTO messages SET ?', {text: info.message, userId:info.userId, roomId:info.roomId}, function(err, result){
              console.log("MESSAGE INSERT ERROR", err);
              console.log('MESSAGE INSERT RESULTS', result);
              if(err){
                //this didn't work, let someone know
                this.callback(err, this);
              }else{
                //all is good callback to someone that cares
                this.messageId = result.insertId;
                this.callback(err, this);
              }
            }.bind(info));
          }else{
            //say there is no message
          }
        };
        if(info.room !== undefined){
          dbConnection.query('select id from rooms where name = \''+info.room+'\'',function(err, result){
            if(result.length === 0){
              dbConnection.query('INSERT INTO rooms set ?', {'name': this.room}, function(err, result){
                this.roomId = result.insertId;
                console.log('passing into message stuff', this);
                messageStuff(this);
              }.bind(this));
            }else{
              this.roomId = result.insertId;
              console.log('passing into message stuff', this);
              messageStuff(this);
            }
          }.bind(info));
        }else{
          //there is no room associated
        }
      };

      if(result.length === 0){ // Check for lookup failure
        console.log('User Id lookup results: ', result);
        console.log('See if user exists error: ', err);
        dbConnection.query('INSERT INTO users set ?', {name: this.user}, function(err, result){
          if(err){
            console.log("USER INSERTION FAILED ", err);
          }else{
            console.log('USER INSTERTED: ID: '+result.insertId);
            this.userId = result.insertId;
            roomStuff(this);
          }
         }.bind(this));
      }else{
        this.userId = result.insertId;
        roomStuff(this);
      }
      if(this.message === undefined) { //Send response for posting user without message
        this.callback(err, this);
      }
    }.bind(info));
  }else{
    //there is no user so do somthing

  }
};







// CREATE TABLE child (
//     id INT,
//     parent_id INT,
//     INDEX par_ind (parent_id),
//     FOREIGN KEY (parent_id)
//         REFERENCES parent(id)
//         ON DELETE CASCADE
// ) ENGINE=INNODB;



/*var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
  // Neat!
});

var stuff = ["judy", "her 140 character messsage here"];
dbConnection.query("INSERT" + variableName + ? ?", stuff, function(){});

*/
