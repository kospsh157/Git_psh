const express = require('express');
const router = express.Router();

// GET /user라우터
router.get('/', (req, res)=>{
    res.send('Hello, User');
});

router.get('/hoho/', (req, res)=>{
    res.send('Hello, User hoho');
});

module.exports = router;