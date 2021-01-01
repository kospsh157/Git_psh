const fs = require('fs').promises;

fs.readdir('./folder')
    .then((dir) => {
        console.log('폴더 내용 확인', dir);
        return fs.unlink('./folder/newfile.js');
        // 여기에서 에러가 나면 어떤 catch문으로 빠지는지?
    })
    .then(() => {
        console.log('파일 삭제 성공');
        return fs.rmdir('./folder');
    })
    .then( () => {
        console.log('폴더 삭제 성공');
    })
    .catch( (err) => {
        console.error(err);
    });

    // 설명
    /*
        1. fs.readdir(경로, 콜백) : 폴더 안의 내용물을 확인 할 수 있다.
        배열이 리턴되고 그 배열 안에 내부 파일과 폴더명이 나열되어 나온다.

        2. fs.unlink(경로, 콜백) : 파일을 지울 수 있다. 파일이 없다면 에러가 발생하므로 먼저 파일이 있는지 꼭 확인해야한다.
        
        3. fs.rmdir(경로, 콜백) : 폴더를 지운다. 폴더 안에 파일들이 있다면 에러가 나므로, 먼저 내부 파일을 모두 지우고 호출해야 한다.

        fsDelete 파일을 노드로 한 번 더 실행하게되면, ENOENT에러가 발생한다. 존재하지 않는 파일을 지우려 했을 때 나온다.

    */


    