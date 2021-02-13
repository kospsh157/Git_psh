// 답변 
// 인터페이스를 작성해야 사용하는 사람들은 인터페이스만 쓰고 변경할 것도 없고 고민할 필요도 없다.

interface Stack {
    push(value: string): void;
    pop(): string;
    readonly size: number; // 몇개의 문자열이 있는지 알아야지 그 갯수만큼 팝을 쓸 수 있다.
    // size는 수정할 수 없도록 한다.
}
// 구현 
// 언어에서 주는 배열을 쓰지 않고 스스로 구현해보기
// 배열없이 하려면 연결리스트를 사용해야한다. (이게 맞는지 동의하지 못하겠다. 연결리스트는 배열보다 더 좋은 자료구조아닌가)
// 연결리스트는 단일 연결리스트, 이중 연결리스트가 있고, 스택은 단일 연결리스트로 구현하면 된다.

type StackNode = {
    readonly value: string;
    readonly next?: StackNode;
}

class StackImpl implements Stack {


    // 원래는 이런 자료구조를 만들때에는 항상 제한사이즈를 생성자에 조건부로 넣어줘야 한다.
    constructor(private capacity: number){
        // 조건부 장치 구현하기
    }


    // 내부에서만 쓰이는 자원은 _로 시작한다.
    private _size: number = 0;
    private head?: StackNode;

    get size() {
        return this._size;
    };
    push(value: string){

        // 푸시를 할 때 생성자로 받은 제한값을 넘기 않게 한다.
        if(this.size === this.capacity){
            throw new Error("Stack is full!");
        }

        const node: StackNode = {value, next:this.head};
        this.head = node;
        this._size++;
    };
    pop(): string {
        // 여기서 집고 넘어가야 할 것이 있다.
        // head === undefined로 하면
        // null === undefined 는 false이지만
        // null == undefined 는 true이다. 따라서 == null 이렇게만 확인해줘도 
        // null과 undefined 동시에 확인할 수 있다.
        if(this.head == null){
            throw new Error("Stack is empty");
        }
        const node = this.head; // 리턴하기 위해서 미리 현재 node 다른 곳에 데이터 저장
        this.head = node.next;  // head 에 그 전의 노드로 저장
        this._size--;
        return node.value;
    };

   
}

const stack = new StackImpl(10);
stack.push('Ellie 1');
stack.push('Bob 2');
stack.push('Steve 3');
while(stack.size > 0) {
    console.log(stack.pop());
}

stack.pop() // Error