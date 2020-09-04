const express = require('express')
const router = express.Router();

router.get('/', function(req, res, next){
    res.render('form', {
        name : 'Park Sung Ho',
        blog : 'gocoder.tistory.com',
        homepage : 'gocoder.net',
    });
})



router.post('/', function(req, res, next){
    res.json(req.body)


})
module.exports = router



