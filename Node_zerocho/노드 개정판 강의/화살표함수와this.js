// 화살표 함수가 추가되었어도 기존 function 함수 선언법이 사라지지 않는 이유는 
/*
    1. this를 쓸 때 화살표함수랑 function함수랑 서로 다르게 작동한다. 
    2. 

*/

let relationship1 = {
    name: 'zero',
    friends: ['nero', 'hero', 'xero'],
    logFriends:function(){
        let that = this;            // relationship1 를 가리키는 this를 that에 저장
                                    // 부모의 this를 사용하려면 이런 꼼수를 사용해야 한다.                           
        this.friends.forEach(function (friend){
                                    // 이 function()콜백 함수 안에서는 function() 구문을 
                                    // 사용하였이게, 이 안에서 this와 이 밖에서  this는 서로 다르다.
                                    // 이 안에서 this는 relationship1 를 의미하지 않고 이 function()
                                    // 자체를 의미한다.

                                    // 이렇게 부모의 this를 따라가지 않고 자기만의 this가 필요한 경우에는
                                    // 화살표함수를 쓰지 않고 function() 구문을 사용한다.
            console.log(that.name, friend);
        });
    },
};
relationship1.logFriends();         // zero nero, zoro hero, zero xero 가 출력됨.

// 위의 함수를 화살표함수로 바꿔서 표현하면 
const relationship2 = {
    name : 'zero',
    friends:['nero', 'hero', 'xero'],
    logFriends() {                  
        this.friends.forEach(friend => {    // 이렇게 화살표함수를 사용한 콜백함수 안에서의
                                            // 자기만의 this와 부모this가 서로 같은 부모의 this를 
                                            // 가르킨다. 따라서 부모의 this를 그대로 따라가는 this를
                                            // 사용하려면 콜백함수를 화살표함수로 사용한다.
            console.log(this.name, friend);
        });
    },
};
relationship2.logFriends();


// 다른 예를 한번 더 보자
this; 
button.addEventListener('click', () => {
    console.log(this.textContext);        // 화살표 콜백일 경우 밖의 this와 여기 안의 this는 서로 같다. 
                                          // 따라서 이 리스너는 원래 의도와는 다르게 버튼의 text를 출력하지 않고
                                          // 밖의 this의 텍스트를 출력하게될 것이다.
});

button.addEventListener('click', function() {
    console.log(this.textContext);        // 이럴경우 밖의 this와 안의 this는 서로 다르다.
                                          // 이렇게 하면 this는 button을 가르키므로, 의도대로 버튼의 text를
                                          // 출력할 것이다.  
});

// 굳이 화살표 함수를 써야한다면 다음과 같이 해야 의도대로 작동한다.
button.addEventListener('click', (e) => {
    console.log(e.target.textContext); 
});

// 따라서 결론은
// this를 사용해야 한다면 function() 구문법을 사용해서 함수를 작성하고
// this를 쓰지 않아도 된다면, 모든 함수는 기본적으로 화살표함수로 작성하자. 

