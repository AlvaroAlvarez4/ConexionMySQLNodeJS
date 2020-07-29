let express = require('express');
let router = express.Router();
let connection = require('../config/db')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//Traernos datos de la base de datos
router.get('/PrimeraQuery', function(req, res, next) {

let sql = `SELECT * FROM student`

connection.query(sql, function(err, result){
  if(err){
    throw err;
  }
  // console.log(result);
  
  let IdAlumno1 = result[0].student_id
  let nombreAlumno1 = result[0].name
  let apellidoAlumno1 = result[0].last_name
  let añoAlumno1 = result[0].year
  let dniAlumno1 =  result[0].dni
  let filmIdAlumno1 = result[0].film_id

  let IdAlumno2 = result[1].student_id
  let nombreAlumno2 = result[1].name
  let apellidoAlumno2 = result[1].last_name
  let añoAlumno2 = result[1].year
  let dniAlumno2 =  result[1].dni
  let filmIdAlumno2 = result[1].film_id

  let IdAlumno3 = result[2].student_id
  let nombreAlumno3 = result[2].name
  let apellidoAlumno3 = result[2].last_name
  let añoAlumno3 = result[2].year
  let dniAlumno3 =  result[2].dni
  let filmIdAlumno3 = result[2].film_id

  let IdAlumno4 = result[3].student_id
  let nombreAlumno4 = result[3].name
  let apellidoAlumno4 = result[3].last_name
  let añoAlumno4 = result[3].year
  let dniAlumno4 =  result[3].dni
  let filmIdAlumno4 = result[3].film_id

  let IdAlumno5 = result[4].student_id
  let nombreAlumno5 = result[4].name
  let apellidoAlumno5 = result[4].last_name
  let añoAlumno5 = result[4].year
  let dniAlumno5 =  result[4].dni
  let filmIdAlumno5 = result[4].film_id

  res.render('alumnos' ,{IdAlumno1, nombreAlumno1, apellidoAlumno1, añoAlumno1, dniAlumno1, filmIdAlumno1,
    IdAlumno2, nombreAlumno2, apellidoAlumno2, añoAlumno2, dniAlumno2, filmIdAlumno2,
    IdAlumno3, nombreAlumno3, apellidoAlumno3, añoAlumno3, dniAlumno3, filmIdAlumno3,
    IdAlumno4, nombreAlumno4, apellidoAlumno4, añoAlumno4, dniAlumno4, filmIdAlumno4,
    IdAlumno5, nombreAlumno5, apellidoAlumno5, añoAlumno5, dniAlumno5, filmIdAlumno5})
})

});
module.exports = router;
