// 경로에 파일이나 폴더 만들기 연습
// 채이닝 형식으로 만들 것 

const fs = require('fs').promises;
const constants = require('fs').constants;

fs.access('./testMkdir', constants.F_OK | constants.R_OK | constants.W_OK)
    .then(() => {
        return Promise.reject('이미 존재하는 폴더명 입니다.');
    })
    .catch( (err) => {
        if(err.code === 'ENOENT'){
            console.log('폴더명이 존재 하지 않습니다. 해당 폴더명으로 만듭니다.');
            fs.mkdir('./testMkdir');    // mkdir() 메서드도 리턴하는 것은 없다. then(fd)으로 받을 필요없다.
        }else{
            return Promise.reject(err); // 파일이 존재하지 않는 오류가 아닌 다른 오류라면 해당 오류 메시지 보여주고 
                                        // 프로미스를 reject로 리턴하고 끝낸다.
        }
    })
    .then( () => {
        return fs.open('./testMkdir/testfile.txt', 'w'); // 주의할 점은 파일이 존재하지 않으면 여기서 생성하면 되는데
                                                         // 파일까지 경로 중에 폴더가 존재하지 않으면 오류가 난다.
        // open() 메서드는 리턴하는 결과값이 있으므로 리턴해서 다음 then(fd)으로 받게 해서 해당 결과를 보는게 가능하다. 
    })
    .catch( (err) => {
        console.log('파일을 생성 중에 오류가 발생하였습니다.');
        // console.error(err); 이렇게 하면 더 깔끔하게 에러만 보이는데, reject()를 쓸거면 지우는게 낫다.
        // reject(err); 해도 에러가 뭔지는 보여주니깐. 다만 reject()는 디프리케이티드 당해버려서..
        // 결국 console.error(err); 를 쓰고 Promise를 리턴해버리는 방법으로 가야할 것 같다.
        return Promise.reject(err);
    })
    .then( (fd) => {
        console.log('파일이 생성되었습니다.\n', fd);
        return fs.rename('./testMkdir/testfile1.txt', './testMkdir/newTestFile.txt');
        // rename() 메서드는 따로 리턴하는 결과가 없다. 
        // return 하는 결과가 없다고 하더라도 리턴을 해줘야 catch문에서 err를 잡는다.
        // 만약 return을 해주지 않는다면, 오류가 나도 catch()문을 타지 않는다. 
    })
    .catch( (err) => { 
        console.log('잘래내기 중에 오류가 발생하였습니다.');
        return Promise.reject(err); // reject() 해줘야 다음 then() 함수로 넘어가지 않고 채이닝을 종료시킨다.
    })
    .then( () => {
        console.log('파일이 새롭게 잘라내기 되었습니다.');
    })


    // 여기서 배울 점
    // 1. 채이닝을 할 때, return을 안해주면 다음 catch()나 then()함수에서 결과에 대해 알 수 없다.
    // 2. 따라서 채이닝을 할 때는 return으로 이어줘야 한다. 뒤에서 그 결과물을 이용해야하거나 봐야할 경우.
    // 3. Promise.reject()는 디프리케이티드 당했다. 다른 방법으로 프로미스를 리턴시킬 방법을 찾자.
    // 4. then() 메서드는 if문이나 switch문이 아니다. 분기점에 따라 움직이는게 아니라, 반드시 타는 메서드이다.
    // 5. 따라서 then() 메서드는 catch()문을 타게되도, 결국 then()까지 타게 된다.
    // 6. 따라서 catch()로 빠지면 다음 then()까지 안타게 할려면 catch()문에서 채이닝을 끝내는 장치를 해줘야한다.