const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');

console.log( myURL.searchParams);
console.log(myURL.searchParams.getAll('category')); // ['nodejs', 'javascript']
console.log(myURL.searchParams.get('limit'));       // 10   
console.log(myURL.searchParams.has('page'));        // true
console.log(myURL.searchParams.keys());             // {'page', 'limit' , 'category', 'category'}
console.log(myURL.searchParams.values());           // {'3' , '10', 'nodejs', 'javascript'}

myURL.searchParams.append('filter', 'es5');
myURL.searchParams.append('filter', 'es3');
console.log(myURL.searchParams.getAll('fileter'));  // ['es5', 'es3']

myURL.searchParams.set('filter', 'es6');            
console.log(myURL.searchParams.getAll('filter'));   // ['es6']

myURL.searchParams.delete('filter');
console.log(myURL.searchParams.getAll('filter'));   // []


// 쿼리스트링을 문자열로 볼 수 도 있다.
console.log(myURL.searchParams.toString());         // page=3&limit=10&category=nodejs&category=javascript

