// 화살표 함수 연습 
'use strict'

function something(name){
    this.name = name
}

something.prototype.myname = function(){
    setTimeout(function cb(){
        console.log(' this is name ' + this.name)
    })
}

const a = new something("gigigi");
a.myname();   // this is name undefined

console.log(a); 

// 생성자 함수

function hihihi(hoho, hihi){
    this.name = hoho
    this.power = hihi
}
console.log(new hihihi("didididi", "gugugugugu"))

// map 사용하기
const testMap = new Map();

testMap.set( ()=> 2*2, 5);
testMap.set( ()=> 8, 8); 

console.log(testMap.keys())
console.log(testMap.values())
console.log(testMap.entries())


for (const a of testMap){
    console.log("포문을 활용한 Map 출력 " + a);
}


for (const a of testMap){
    console.log("포문을 활용한 Map 출력 " + a[0] +  "구분자 : " + a[3]);
}

// 위에서 for of 문을 사용하면 이터레이터 변수에는 순서대로 하나씩 키 + 벨류 값이 들어간다. 
// 다만 이터레이터 변수의 인덱스까지 들어가서 출력을 해보면 인덱스 하나당 키+벨류의 한 로우가 들어가 있는게 아니라
// 한 로우의 키 와 벨류값이 분리해서 들어간다. 
// 즉 이터레이터변수[0] 에는 첫번째 키+벨류 로우의 키만 들어있고 이터레이터변수[1]에 그 키에 대한 벨류값만 저장되어 있다. 
// 따라서 맵의 이터레이터변수[2] 은 존재하지 않는다.  
// 0은 해당 로우의 키를 의미하고 1는 해당 로우의 밸류를 의미하므로, 2인덱스는 존재하지 않는다. 
// 따라서 이렇게 이용가능 하다 

for(const a of testMap){
    console.log(a[0] + " = " + a[1]);
}
// 해당 맵의 모든 로우에 대한 키 = 값 으로 출력이된다. 







