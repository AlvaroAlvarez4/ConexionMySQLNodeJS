var express = require('express');
var router = express.Router();
let connection = require('../config/db.js')
/* GET users listing. */
router.get('/', function(req, res) {
    let sql = `SELECT * FROM student`
    connection.query(sql, function(err, result) {
        if (err) {
            throw err;
        }
        console.log(result);
        res.render('vistaClase', { result })
    })
});
//crear una ruta con la direccion ('/InfoAlumno')
//Vamos  a hacer un select del nombre del alumno y el nombre de la pelicula
//Cuando tengamos los datos pintarlo en vistaClase.ejs
router.get('/vistaClase', function(req, res) {
    let sql1 = `SELECT * FROM student`
    let sql2 = `SELECT student.name , film.name_film FROM student,film
    WHERE student.film_id = film.film_id`;
    //Primera query
    connection.query(sql1, function(err, result) {
        console.log('Primera query ---------------------------')
        console.log(result)
        if (err) {
            throw err;
        }
        //Dentro de la Primera query ESTA SERIA LA SEGUNDA ( QUERY ANIDADA )
        connection.query(sql2, function(err, infoResult) {
            console.log('Segunda query ---------------------------')
            console.log(infoResult)
            if (err) {
                throw err;
            }
            res.render('vistaClase', { result, infoResult })
        })
    })
});

router.get('/Register', function(req,res){

    res.render('Register')
})
router.post('/InsertStudent', function(req,res){

    console.log(req.body);
    let name = req.body.name;
    let last_name = req.body.lastName
    let year = req.body.year;
    let dni = req.body.dni;

    let sql = `INSERT INTO student (name , last_name, year, dni) VALUES('${name}', '${last_name}','${year}','${dni}')`

    connection.query(sql, function(err, result) {
        
            if (err) {
                throw err;
                res.send('Da Error')
            }else{
                res.send('ok');
            }
        })
        
    })

    router.get('/Register2Table', function(req, res) {
        //renderizar una vista
        res.render('RegisterForeingKey')
    })
    //----INSERT  BASICO  2 TABLAS--------
    router.post('/RegisterForeign', function(req, res) {
        //req.body recojo los valores del formulario
        //Traer todos los datos formulario
        let name_film = req.body.nameFilm;
        let name = req.body.name;
        let last_name = req.body.lastName;
        let year = req.body.year;
        let dni = req.body.dni;
        let sqlFilm = `INSERT INTO film (name_film) VALUE ('${name_film}')`
        //1 . Query con la tabla que tiene la foreing key == Crear la pelicula para despues coger el film_id 
        // y insertarlo en la tabla de student
        connection.query(sqlFilm, function(err, result) {
            //este result es un objeto
            /*
            OkPacket {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 8,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0 
                        }
                y de este obje nos interesa el insertId que es el id_film que nos crea
                mysql al tener el campo como auto_increment
            */
            console.log(result)
            console.log('--------------------')
                //meto ese insertId en una variable
            let film_id = result.insertId; // 7
            if (err) {
                throw err;
            }
            //2. Hago un insert con todos los campos del student INCLUIDO   el film_id
            let sql = `INSERT INTO student ( name, last_name,year,dni,film_id ) VALUES ( '${name}', '${last_name}', '${year}', '${dni}',${film_id} )`
            connection.query(sql, function(err, results) {
                if (err) {
                    throw err;
                }
                res.send('Las dos tablas se han guardado')
            })
        })
    })
    module.exports = router;