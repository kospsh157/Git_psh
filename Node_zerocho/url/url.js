const url = require('url');

const {URL}  = url;

// WHATWG 주소체계
myURL = new URL('http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log(myURL);
console.log(url.format(myURL));
console.log('--------------------------------')



// 기존 node 주소체계
const parseUrl = url.parse('http://gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor');

console.log(parseUrl);
console.log(url.format(parseUrl));


// 전부다 url 모듈로부터 나온다. 
// 다만 WHATWG 방식은 호스트가 없는 주소에서는 쓰면안되다.
// 대신 WHATWG 방식은 쿼리스트링부분이 searchParams 라는 특수한 객체로 반환되는데 유용하게 사용할 수 있다.

// 기존 node >> 쿼리스트링 사용 
// WHATWG >> searchParams 사용




