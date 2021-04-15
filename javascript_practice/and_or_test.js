// &&, || 연산자 연습

console.log( 'abc' && 1);   // 1
console.log('' && 0 );      // ''
console.log(1 && 0);        // 0
console.log('' && 0 && 1);  // ''
console.log('' && 0 && 0);  // ''


console.log('ab' || false || '');   // ab
console.log('' || -1 || 0 );        // 0
console.log(0 || null || 1);        // 1

 
// && 연산자는 모든 항이 참이여야만 참이다.      >>> 하나만 false면 false다.
// || 연산자는 모든 항이 거짓이어야만 거짓이다.   >>> 하나만 true면 true다.
// 그러므로 다음과 같이 생각해도 된다.
/*
    1. &&, || 연산자는 계산의 효율성을 위해서 각각 조건이 부합되는 어떤 항을 만나면, 나머지 항은 보지도 않고 바로 결과를 도출한다.
    2. 따라서, && 연산자는 순서대로 항을 보다가, 만약에 false를 만나게 되면 그 나머지 항은 볼 필요도 없이 결과값은 false가 된다.
    3. 같지만 반대로, || 연산자는 순서대로 항을 보다가, true를 만나게 되면 나머지 항은 안봐도 결과값은 true이니 연산을 멈추고 true를 반환한다.
    4. 위를 종합하면
        1. && 연산자는 처음으로 만나는 false항이나, 마지막항이 리턴값이다.
        2. || 연산자는 처음으로 만나는 true항이나, 마지막항이 리턴값이다.
        3. 마지막항까지 가는 경우는 마지막 항까지 검사하는 경우의수다.
*/
if(true && 1) console.log('이것은 반드시 보여야해.');
if(true && 0 && 1) console.log('이것은 반드시 보이지 않는다.');

if(false || 0 || '')console.log('이것은 보이면 안돼.');
if(-1 || 0 || '' || true)console.log('이것은 반드시 보인다.');

const v1 = true && 1 && 9;
console.log(v1);
if(v1)console.log('v1은 참이다.');

// 주의해야 할 점은 그냥 숫자나 문자열끼리 연산하면, 연산 규칙에 의해서 해당하는 숫자나 문자를 리턴한다.
// boolean 값과 숫자나 문자열을 같이 연산하면, 그냥 해당 값이 나온다. 전체적으로 boolean타입으로 바뀌어서 리턴되지 않는다.
let a = true;
let b = 1;
let c = 1;
let d = 10;
console.log((a || b && (c && d)));
console.log(a && d);


// 
let ab = true;
let cd = 'ddf';
let ef = 10;

console.log((ab && cd && ef));      // 10
console.log((ab && (cd && ef)));    // 10    
