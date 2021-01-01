// 버퍼와 스트림 이해하기 
/*

    파일을 읽거나 쓰는 방식에는 크게 두 가지 방식이 있다.
        1. 버퍼를 이용하는 방식
        2. 스트림을 이용하는 방식
    노드의 파일시스템도 버퍼와 스트림방식으로 파일을 읽고 쓴다.

    노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련하고 이 곳에 파일을 저장한 뒤, 사용자가 조작할 수 있도록 한다.
    이때 메모리에 저장된 데이터가 버퍼이다.

*/

// 버퍼를 직접 다를 수 있는 클래스가 있다. Buffer 클래스이다.
const buffer = Buffer.from(`저를 버퍼로 바꿔보세요`);

console.log('from()', buffer);
console.log('length', buffer.length);
console.log('toString()', buffer.toString());

const array = [Buffer.from('띄엄 '), Buffer.from('띄엄 '), Buffer.from('띄어쓰기')];
const buffer2 = Buffer.concat(array);
console.log('concat()', buffer2.toString());

const buffer3 = Buffer.alloc(5);
console.log('alloc()', buffer3);

// Buffer클래스의 유용한 메서드들
// from() : 문자열을 버퍼롤 바꾼다.
// toString() :  버퍼를 다시 문자열로 바꾼다.
// concat() :  배열 안에 든 버퍼들을 하나로 합친다.
// alloc() : 빈 버퍼를 생성한다. 바이트를 인수로 넣으면 해당 크기의 버퍼가 생성된다.

// readFile() 방식의 버퍼가 편리하기는 하지만 문제점이 있다.
/*
    용량이 100mb인 파일이 있으면 읽을 때 메모리 100mb의 버퍼를 반드시 만들어야 한다.
    이 작업을 동시에 열 개만해도 1gb에 달하는 메모리가 사용된다.
    특히 서버처럼 몇 명이 이용할지 모르는 환경에서는 메모리 문제가 발생할 수 있다.

    또한 모든 내용을 버퍼에 다 쓴 후에야 다음 동작으로 넘어가므로, 파일 읽기, 압축, 쓰기 등의 조작을 연달아 할 때 
    매번 전체 용량을 버퍼로 처리해야 다음 단계로 넘어갈 수 있다. 

    그래서 버퍼의 크기를 작게 만든 후 여러 번으로 나눠 보내는 방식이 등장했다.
    예를 들어 버퍼 1mb를 만든 후 100mb파일을 백번에 걸쳐서 나눠 보내는 방식이다.
    이로써 메모리 1mb로 100mb파일을 전송할 수 있다. 이처럼 이를 편리하게 만든 것이 바로 스트림이다.

    다음 createReadStream.js 파일에서 스트림 사용법에 대해 알아보자
*/