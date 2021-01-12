const path = require('path');



path.join(__dirname, 'var.js');                // 현재 디렉토리 경로와 + var.js 를 합쳐서 경로를 완성시킨다.
path.join(__dirname, '..', 'var.js')           // 현재 디렉토리 경로의 상위로 한칸 올라가서 + var.js와 합쳐 경로를 완성시킨다.a


//참고로
// __dirname : 현재 실행중인 폴더 경로
// __filename : 현재 실행중인 파일 경로

// join 과 resolve
console.log(path.join(__dirname, '...', '/var.js'));    // join은 절대경로를 무시한다.
console.log(path.resolve(__dirname, '..', '/var.js'));  // resolve는 절대경로만 생각하고 앞에것은 무시한다.
// 참고로 절대경로는 / 를 의미한다. 루트를 뜻하고 윈도우에서는 C를 뜻한다.




// 파일이름 관련 내장함수
const string = __filename;

path.dirname(string)        // 파일의 현재 폴더 경로
path.extname(string)        // 파일의 확장자
path.basename(string)       // 파일의 파일이름 + 확장자 이름까지 합쳐서 출력
path.basename(string, path.extname(string));  // 위의 basename에서 확장자를 뺀 파일이름만 출력 


// 참고로 절대경로는 루트폴더에서 부터 시작해서 파일의 경로까지 나타내는 것이고
// 상대경로는 현재 파일이 있는 폴더로부터 어는 위치게 있는지만 나타내는 것이다.a









