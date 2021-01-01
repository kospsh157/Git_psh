const fs = require('fs').promises;         // fs를 프로미스로 이용
const constants = require('fs').constants; // fs의 상수 자원들을 이용

fs.access('./folder', constants.F_OK | constants.W_OK | constants.R_OK)
    .then( () => {
        return Promise.reject('이미 폴더 있음');    // 오류가 안나면 프로미스 종료시키고 메시지 보여줌.
    })

    .catch( (err) => {                          // 오류가 난다는 것은 파일이 없거나, 읽기권한이없거나, 쓰기권한이 없을때
        if (err.code === 'ENOENT'){             // 따라서 오류가 날 때, 그 메시지가 ENOENT이면 파일이 없다는 뜻
            console.log('폴더 없음');             // 따라서 폴더나 파일이 존재하지 않으니 이제 만들면 된다.
            return fs.mkdir('./folder');
        }
        return Promise.reject(err);             // 만약 파일이 없어서 난 오류가 아니면 역시 똑같이 
    })                                          // reject해버려서 프로미스를 끝내고, 에러를 보여준다.

    .then( () => {
        console.log('폴더 만들기 성공');
        return fs.open('./folder/file.js', 'w'); // 만약 여기서 옵션이 'r'이 었다면, 오류를 발생했을 것 이다.
    })                                           // 'w' 옵션은 쓰기 옵션으로, 파일이 존재하지 않으면 생성한다.

    .then( (fd) => {
        console.log('빈 파일 만들기 성공', fd);
        fs.rename('./folder/file.js', './folder/newfile.js');
    })

    .then( ()=>{
        console.log('이름 바꾸기 성공');
    })

    .catch( (err) => {                          // 만약 파일 만들기에서 오류가 일어났다면 여기로 빠졌을 것이다.
        console.error(err);                     // then()과 catch()의 채이닝 문법 흐름을 잘 파악하자.
    });

    // 설명
    /*
        1. 설명 
        2. fs.access(경로, 옵션, 콜백) : 
        폴더나 파일에 접근할 수 있는지 체크한다. 두 번째 인수로 상수을 넣었다.
        F_OK    : 파일 존재 여부
        R_OK    : 읽기 권한 여부
        W_OK    : 쓰기 권한 여부
        파일/폴더 권한이 없다면 에러가 발생한다. 
        파일/폴더가 없을 때도 에러가 나는데 이때 에러코드가 ENOENT이다. 

        3. fs.mkdir(경로, 콜백) : 
        폴더를 만드는 메서드. 이미 폴더가 있다면 에러가 발생하므로, 먼저 access메서드를 호출해서 확인하는 것이 중요하다.

        4. fs.open(경로, 옵션, 콜백) :
        파일의 아이디(fd변수)를 가져오는 메서드이다. 
        파일이 없다면 생성한 뒤 그 아이디를 가져온다.
        가져온 아이디를 이용해 fs.read 나 fs.write로 읽거나 쓸 수 있다.
        두 번째 인자로 어떤 동작을 할 것인지 설정할 수 있다.
        w : 쓰기, r : 읽기, a : 기존 파일에 추가
        
        5. fs.rename(기존경로, 새 경로, 콜백) :
        파일의 이름을 바꾼다. 경로가 바뀌면 잘라내기 형식처럼 사용된다. 

    */

