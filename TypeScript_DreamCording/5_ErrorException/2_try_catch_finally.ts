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

const fileName = 'file';
console.log(readFile(fileName));




