
var mysql  = require('mysql');  
 
//var connection = mysql.createConnection({     
//  host     : 'localhost',       
//  user     : 'root',              
//  password : '24february',       
//  port: '3306',                   
//  database: 'bpmaint', 
//}); 

// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE IF NOT EXISTS customers (name VARCHAR(255), address VARCHAR(255))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});


  connection.query(memberSchema, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

export.module