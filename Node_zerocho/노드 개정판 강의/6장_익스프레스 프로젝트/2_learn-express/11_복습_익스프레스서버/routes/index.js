const express = require('express');
const router = express.Router();

// /요청
router.get('/', (req, res)=>{
    console.log('클라이언트 / 접속');
    res.send("Hello Express / 접속");
});

module.exports = router;
