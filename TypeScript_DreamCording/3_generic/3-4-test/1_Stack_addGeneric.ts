// 다음은 지난 테스트에서 만들었던 배열을 안쓰고, 스택 자료 구조형을 만든 코드이다.
// 이 코드의 단점은 스트링 타입의 자료 밖에 담지 못한다는 것에 있다.
// 제너릭을 추가해서 어떤 형태의 타입이든 담을 수 있는 자료구조로 만들어 보자

{
    interface Stack<T>{
        push(value: T): void;
        pop(): T;
        readonly size: number; 
    }

    type StackNode<T> = {
        readonly value: T;
        readonly next?: StackNode<T>;
    }

    class StackImpl<T> implements Stack<T> {
        constructor(private capacity: number){

        }

        private _size: number = 0;
        // head?이렇게 선언하면 정확히는 head: StackNode<T> | undefined 이다.
        private head?: StackNode<T>;

        get size() {
            return this._size;
        };

        push(value: T){
            if(this.size === this.capacity){
                throw new Error("Stack is full!");
            }

            // 이미 클래스 맴버로 head에 대해 타입이 선언되었기 때문에, 
            // 자동추론을 이용해서 축약해도 된다.
            const node = {value, next:this.head};
            this.head = node;
            this._size++;
        };

        pop(): T {
            if(this.head == null){
                throw new Error("Stack is empty");
            }
            const node = this.head; 
            this.head = node.next; 
            this._size--;
            return node.value;
        };
    }

    // 여기서는 POP을 하면 그 타입이 unknown으로 나온다. 
    // 클래스에서 제너릭을 쓴다고 했는데, 막상 인스턴스를 쓸 때 그 제너릭 타입을 안써줘서 그런것이다.
    const stack = new StackImpl(10);
    stack.pop()     // return unknown

    // 이렇게 인스턴스를 만들 때에도 제너릭을 표기해야 제너릭을 알아먹는다.
    const stack3 = new StackImpl<string>(10);
    stack3.pop()    // return 값이 string으로 바뀌었다.

    stack.push('Ellie 1');
    stack.push('Bob 2');
    stack.push('Steve 3');
    while(stack.size > 0) {
        console.log(stack.pop());
    }

    
    // 이렇게 쓰는 것은 허용되지 않는다. 
    // 제너릭은 any처럼 마구잡이로 서로 다른 타입의 데이터를 담아 쓰라고 만들어진게 아니다.
    const stack2 = new StackImpl(5);
    stack2.push(3);
    stack2.push('sd');
    stack2.push({value: "haha", next: 33});
    
    console.log(stack2);
}