const express = require('express')
const app = express()

//request body 사용
//app.use(express.json())
//app.use(express.static('public')) // static file 를 사용하기 위함
app.listen(3002, () => {
    console.log(`server is listening at localhost:${process.env.PORT}`);
  }); 


app.get('/', (req, res) => {
    
    
    console.log("노드 / 요청 ")
 
    //res.send("Express");
    res.json({"this":"is good"})
    //fetch('/api/folder').then(res => res.json()).then(json => console.log(json))
    //res.render('index') // index.html render  빌드된 후
  })

app.get('/api', (req, res) => {
    
    
    console.log("노드 /api 요청 ")
 
    //res.send("Express");
    res.json({"this":"API"})
    //fetch('/api/folder').then(res => res.json()).then(json => console.log(json))
    //res.render('index') // index.html render  빌드된 후
  })






