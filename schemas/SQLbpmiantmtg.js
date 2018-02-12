
var mysql  = require('mysql');  
 
//var connection = mysql.createConnection({     
//  host     : 'localhost',       
//  user     : 'root',              
//  password : '24february',       
//  port: '3306',                   
//  database: 'bpmaint', 
//}); 
表
// connect to the MySQL server
connection.connect(function(err) {
  if (err) {
    return console.error('error: ' + err.message);
  }

  let createDATABASE = `CREATE TABLE IF NOT EXISTS member(
  						id int primary key auto_increment,
  						poster varchar(255)not null,
  						bage_number varchar(255)not null,
  						first_name varchar(255)not null,
  						last_name varchar(255)not null,
  						department varchar(255)not null,
                        completed tinyint(1) not null default 0
                      )`;

  connection.query(createDATABASE, function(err, results, fields) {
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

