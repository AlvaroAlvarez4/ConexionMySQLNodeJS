const mysql = require('mysql');

//funcion para crear conexion
var connection = mysql.createConnection({
   
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'db_nodejs'
  });
  
  connection.connect(
      function(error){
          if(error){
              throw error;
          }else{
              console.log('Conexión correcta')
          }
      }
  );
  module.exports = connection;
  