const fs = require('fs').promises;

const folderName = 'folder';
const fileName = 'newFile.js';

fs.readdir(`./${folderName}`)
    .then(dir => {
        console.log('폴더 안에 파일을 확인합니다 : ' , dir);
        console.log(dir.indexOf(fileName));
        if(dir.indexOf(fileName) > -1){
            console.log('삭제하려는 파일이 존재합니다.');
            console.log('안에 다른 파일이 있는지 살펴봅니다');
            if(dir.length > 1){
                console.log('삭제하려는 파일 외에 다른 파일도 있습니다. 다른 파일도 삭제해야 폴더도 삭제됩니다.');
                return Promise.reject('프로미스를 종료합니다.'); // 이렇게 끝나면 catch()문도 안탐
            }else{
                console.log('파일이 하나만 존재합니다. 파일을 삭제하겠습니다.');
                return fs.unlink(`./${folderName}/${fileName}`);
            }
        }else{
            console.log('삭제하려는 파일이 존재하지 않습니다.');
            return Promise.reject('프로미스를 종료합니다.'); // 이렇게 끝나면 catch()문도 안탐
        }
    })
    .then( () => {
        console.log('파일 삭제 성공');
        return fs.rmdir(`./${folderName}`);
    })
    // readdir 부터 해서  redir 까지 도중에 에러가 생기면 다 이 catch문으로 빠진다.
    .catch( err => {
        console.log('캣치문 입니다. : ');
        console.error(err);
    })
