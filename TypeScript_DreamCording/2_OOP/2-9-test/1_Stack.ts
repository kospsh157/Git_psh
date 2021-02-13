// Stack자료구조 노가다로 짜기
/*
    1. 우선 어떤 API를 들고 있어야 할 지 규격(인터페이스)을 정한다.
    2. 그것을 구현하는 클래스를 만든다.


    여기서의 배울점은 이것
    1. 가장 큰 난관으로 push() 메서드를 작성하는데 있었다.
    내 기존 생각으로는 push()로 하나의 변수에 하나의 StringNode타입의 데이터를 만들어서 넣어두면
    그 다음에 또 push()를 호출할 때, 변수명이 겹쳐서 오류가 일어나지 않을까? 였다.
    그러나 실제로 돌려본 후, 그러한 에러는 나지 않았다.
    이유는 분명하다. 메서드 내에서 생성된 지역변수는 전혀 전역변수에 영향을 미치지 못하고 심지어 함수 내에서 
    한번 사용되고 자동으로 폐기처분되기 때문이다.

    또한 함수 내부에서도 그렇게 한번 쓰고 head에 담을 용도로 쓰지 다시 쓸 일이 없다. 
    따라서 const 키워드로 매번 재사용되어도 변수명 중복 오류가 일어나지 않는다.

*/
// 배열도 사용하면 안된다.

// 싱글 링크드 노드를 통해 구현을 해보자
{
    interface Stack {
        readonly size: number;
        pop(): string;
        push(data: string): void;
    }

    type StringNode = {
        // 이 점에서 좀 더 좋게 수정해야 할 점이 있다.
        // 아래와 같이 유니온 타입에 undefined가 있으면, 매번 사용자가 쓸 때 마다 undefined체크를 해야 하기 때문에
        // 매번 피곤해진다.
        back: StringNode | undefined;
        item: string;
    }

    
    class LinkedNode implements Stack {
        private _size: number = 0;
        private _head?: StringNode;
        get size() {
            return this._size;
        }
        get head() {
            return this._head;
        }

        pop(): string{
            this._size--;
            if(this._head){
                const result = this._head.item;
                this._head = this.head!.back;
                return result;
            }else{
                return '없습니다.';
            }
        };

        
        push(str: string){
            const node: StringNode = {
                back: this._head,
                item: str,
            }
            this._size++;
            this._head = node;
        };
    }

    // 사용하기
    const stack = new LinkedNode();
    
    console.log(stack.head);    // undefined
    console.log(stack.size);    // 0

    stack.push("첫번째 데이터");

    console.log(stack.head);    // {back: {undefined}, item: "첫번째 데이터"}
    console.log(stack.size);    // 1

    console.log(stack.pop());   // "첫번째 데이터"

    console.log(stack.head);    // undefined
    console.log(stack.size);    // 0

    stack.push("첫번째 데이터");
    stack.push("두번째 데이터");
    
    console.log(stack.head);    // {back: {back: undefined, item: "첫번째 데이터"}, item: "두번째 데이터"}
    console.log(stack.size);    // 2

    console.log(stack.pop());   // "두번째 데이터"

    console.log(stack.head);    // {back: undefined, item: "첫번째 데이터"}

}
