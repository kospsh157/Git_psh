const person = {
    name : 'chul-su',
    old : 30,

    get info() {   // getter 함수 info 정의  // 여기서 function 키워드를 사용하지 않고 함수를 정의한것에 주목, 이 점이 바뀐점이다.
        return "name is " + this.name + "  _  " + "old is " + this.old
    },
    // info 로 함수 이름은 같지만, 파라미터값의 갯수가 달라서 오버로딩으로 함수를 여러개 정의한다. 

    set info(name_old) { // setter 함수 info 정의  
        let temp = name_old.split("_");
        this.name = temp[0]
        this.old = temp[1]
        console.log(this.name)
        console.log(this.old)
    }
}

console.log(person)
console.log(person.info)
// console.log(person.info())
console.log(person.info = '박성호 _ 40')