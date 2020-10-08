// module, exports 에 대하여 

// 모듈을 만들 때 module.exports  = 로 하는게 대부분이지만 
// exports 객체로만도 모듈을 만들 수 있다. 

/*
    exports 객체는 module.exports 객체를 참조한다. 따라서 exports 만 써도 되는데 다만 
    객체의 참조관계가 끊기지 않게 해야한다. 

    함수를 담아 보낼 경우에는 사용하지 못한다.


*/

exports.odd = '홀수'
exports.even = '짝수' 
// 가장 큰 차이점은 이렇게 분리해서 여러개로 담아 보낼 수 있다는 점이다. 
