// console 은 global객체에 담겨있는 내장 함수다

const string = 'abc'; 
const number = 1;
const boolean = true;
const obj = {
    outside : {
        inside: {
            key : 'value'
        }
    }
}

console.time('시간 측정')
for (let i = 0 ; i<100000000; i++){
    continue;
}

console.timeEnd('시간 측정');


console.dir(obj, {colors:true, depth:2});

