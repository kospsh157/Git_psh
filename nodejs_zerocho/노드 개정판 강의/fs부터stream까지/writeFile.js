const fs = require('fs').promises;

fs.writeFile('./writeme.txt', '글이 입력됩니다.') // 2번째 인자가 입력내용(문자열로 입력)
.then( () => {
    return fs.readFile('./writeme.txt')
})
.then( (data) => {
    console.log(data.toString());
})
.catch( (err) => {
    console.error(err);
})




