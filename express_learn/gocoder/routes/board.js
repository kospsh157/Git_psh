var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
 
 
router.get('/list/:page', function(req, res, next) {
    var page = req.params.page;
    var sql = "select idx, name, title, hit, date_format(modidate,'%Y-%m-%d %H:%i:%s') modidate, " +
        "date_format(regdate,'%Y-%m-%d %H:%i:%s') regdate from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {title: '게시판 리스트', rows: rows});
    });
});


router.get('/list', function(req, res, next){
  res.redirect('/board/list/1')
})

router.get('/write', function(req, res, next){
  res.render('write', {title:"게시판 글 쓰기"})

})

router.post('/write', function(req, res, next){
  const name = req.body.name;
  const title = req.body.title;
  const content = req.body.content;
  const passwd = req.body.passwd;
  const datas = [name, title, content, passwd];
  
 
  const sql = 'insert into board(name, title, content, regdate, modidate, passwd, hit) values(?,?,?,now(),now(), ?,0)';
  conn.query(sql, datas, function(err, rows){
    if(err) console.error('err + ' + err)
    res.redirect('/board/list')
  })
})


router.get('/read/:idx', function(req, res, next){
  const idx = req.params.idx;
  const sql =  "select idx, name, title, content, date_format(modidate, '%Y-%m-%d %H:%i:%s') modidate, " +
  "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit from board where idx = ?"

  conn.query(sql, [idx], function (err, row){
    if(err) console.error(err);
    res.render('read', {title:"글 상세", row:row[0]})
  })
})

router.post('/update', function(req, res, next){
  const idx = req.body.idx
  const name = req.body.name
  const title = req.body.title
  const content = req.body.content
  const passwd = req.body.passwd
  const datas = [name, title, content, idx, passwd]

  const sql = 'update board set name = ?, title=?, content=?, modidate=now() where idx=? and passwd =?'
  conn.query(sql, datas, function(err, result){
    if(err) console.error(err);
    if(result.affectedRows == 0){
      res.send('<script> alert("패스워드가 일치 하지 않습니다."); history.back();</script>');
    }else{
      res.redirect('/board/read/' + idx)
    }
  })  
})


router.post('/delete', function(req, res, next){
  const idx = req.body.idx;
  const passwd = req.body.passwd;
  const datas = [idx, passwd]

  const sql = "delete from board where idx=? and passwd=?"

  conn.query(sql, datas, function(err, result){
    if(err) console.error(err)
    if(result.affectedRows == 0){
      res.send("<script> alert('패스워드가 일치하지 않습니다.'); history.back(); </script>")

    }else{
      res.redirect('/board/list/')
    }
  })
})




// 여기서 부터 페이징

router.get('/page/:page', function(req, res, next){
   const page = req.params.page;
   const sql = "select idx, name, title, date_format(modidate, '%Y-%m-%d %H:%i:%s')modidate, " +
                "date_format(regdate, '%Y-%m-%d %H:%i:%s') regdate, hit from board" 
   conn.query(sql, function(req, res, next){
     if(err)console.error('err : ' + err);
     res.render('page', {title:'게시판 리스트', rows:rows, page:page, length:rows.length-1, page_num:10, pass:true})
     console.log(rows.length-1)
   }) 
})








module.exports = router
