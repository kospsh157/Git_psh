// 비구조할당을 이용해서 객체의변수를 꺼내서 사용할 때, this가 들어간 함수에 대해서는 의도대로 작동하지 않는다.
// 이럴땐 비구조할당을 이용하면 안된다. 

const example3 = {
    name : 'psh',
    print(){
        console.log(this.name);
    }
}

example3.print();
const {name, print} = example3;

console.log(name);
print();


