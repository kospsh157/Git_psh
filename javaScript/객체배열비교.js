// 서로 비슷하지만 다른 객체를 포함하고 있는 객체배열이 있을때,
// 그 둘의 원소(=객체)들을 비교해서 같은 객체가 있는지 찾아내기

objArr = [
    {name:'psh1'},
    {name:'psh2'},
    {name:'psh3'},
    {name:'psh4'},
]
objArr2 = [
    {name:'psh1'},
    {name:'psh5'},
    {name:'psh6'},
    {name:'psh7'}
]

// JSON.stringify() 사용하기 : 이 함수는 JSON 형태의 문자열로 바꿔주는 메서드이다.
console.log(JSON.stringify(objArr));


// 위 함수를 이용해서 배열에 있는 객체를 서로 문자열로 치환해서 비교해보자
for (let i of objArr){
    if( JSON.stringify(objArr2).includes(JSON.stringify(i))){
        console.log(i);
    }
}

