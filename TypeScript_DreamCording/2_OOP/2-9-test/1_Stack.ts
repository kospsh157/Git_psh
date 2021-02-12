// Stack자료구조 노가다로 짜기
/*
    1. 우선 어떤 API를 들고 있어야 할 지 규격(인터페이스)을 정한다.
    2. 그것을 구현하는 클래스를 만든다.

*/

interface Stack {
    // push
    push(info: string): void;
    // pop
    pop(): string;
}


class DataStack implements Stack {
    public arr:string[] = [];

    push(info: string): void{
        const endIndex = this.arr.length;
        this.arr[endIndex] = info;

    }
    pop(): string{
        const end = this.arr[this.arr.length-1];
        this.arr[this.arr.length-1] = '';
        return end;
    }
}


// 사용 
const dataStack = new DataStack();

// 데이터 전체 조회
dataStack.arr
console.log(dataStack.arr);

// 데이터 삽입
dataStack.push('안녕');
dataStack.push('안드로이드');
console.log(dataStack.arr); // 데이터 확인

// 데이터 팝
console.log(dataStack.pop()); // 데이터 팝,  마지막 인덱스가 출력되어야함
console.log(dataStack.arr); // 데이터 삭제 확인


