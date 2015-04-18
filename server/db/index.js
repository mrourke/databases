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

export.insert = function(user, message, room){
  var info = {};
  if(user !== undefined){
    dbConnection.query('select name id from users where name = ' + user +";",function(err, result){
      var roomStuff = function(){
        var messageStuff = function(){
          if(message !== undefined){
            dbConnection.query('INSERT INTO messages set ?',{text:message.text,userId:info.userId,roomId:info.roomId}, function(err, result){
              if(err){
                //this didn't work, let someone know
              }else{
                //all is good callback to someone that cares
              }
            });
          }else{
            //say there is no message
          }
        };
        if(room !== undefined){
          dbConnection.query('select name id from rooms where name = ' + room + ";",function(err, result){
            if(err){
              dbConnection.query('INSERT INTO rooms (name) values (\''+ room +'\');', function(err, result){
                info.roomId = result.insertId;
                messageStuff();
              });
            }else{
              info.roomId = result.insertId;
              messageStuff();
            }
          }
        }else{
          //there is no room associated
        }
      };

      if(err){
         dbConnection.query('INSERT INTO users (name) values (\''+ user +'\');', function(err, result){
           info.userId = result.insertId;
           roomStuff();
         });
      }else{
        info.userId = result.insertId;
        roomStuff();
      }
    });
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
