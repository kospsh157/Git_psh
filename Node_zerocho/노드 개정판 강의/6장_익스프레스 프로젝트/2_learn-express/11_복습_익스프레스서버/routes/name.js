const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log('클라이언트 /myname 접속');
    res.send('myname 접속');
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    console.log('클라이언트 라우터파라미터로 접속' + id);
    res.send('name 라우터파라미터 접속 : ' + id);
});

module.exports = router;