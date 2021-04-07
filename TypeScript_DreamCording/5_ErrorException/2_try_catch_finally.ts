// 설명을 위하여 다음과 같은 함수들이 있다고 치자 대충 파일을 읽고 다시 스트림을 닫는 함수이다.

function readFile(fileName: string): string {
    if(fileName === 'not exist!') {
        throw new Error(`file not exist! ${fileName}`);
    }
    return 'file contents';
}

function closeFile(file: string) {
    // 
}
const fileName = 'not exist!';


try {
    console.log(readFile(fileName));
}catch(err){
    console.log(err);   // 이 부분이 없다면 에러메시지가 어떻게 나오는지도 확인해보자 
    // 이 부분이 없다면, 에러가 나도 전혀 에러에 대한 메시지를 표시해주지 않는다. 따라서 반드시 catch부분에 있어야한다.
} finally {
    closeFile(fileName);
    console.log('hi')
}

console.log("!!!"); // try 구문으로 감싸면, 여기까지 실행되는 모습을 볼 수 있다.
// 여기서 알아야할 점은 콘솔창에서 에러가나서 죽었을 때만 새로운 커서창이 준비되는 것이아니다. 
// 프로그램이 정상 종료되어도 커서창이 준비된다. 그 점을 혼동하지 말길 바란다.    