const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', function(req, res, next){

    const connection = mysql.createConnection({
        host : 'localhost',
        port : '3306',
        user : 'root',
        password : '1004', 
        database : 'test',
    })

    connection.connect(function(err) {
        if(err) {
            res.render('mysql', { connect : '연결실패', err:err})
            console.error(err);
            throw err;
        }else{
            res.render('mysql', { connect: '연결성공', err:'없음'})
        }
    }) 
    connection.end();
})