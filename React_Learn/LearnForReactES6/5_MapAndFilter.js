// 맵과 필터 메서드는 ES5에 생긴 메서드이지만, 리액트에서 자주 쓰이므로 반드시 집고 넘어가야 한다.

// 맵
// 만약 이렇게 서버단에서 JSON 배열로 데이터를 보내왔다면, 
const users = [
    {name : 'psh1', age : 25},
    {name : 'psh2', age : 30},
    {name : 'psh3', age : 40},
];

import React, { Conmponent} from 'react';

class App extends Component {
    // class content
    render(){
        const users = [
            {name : 'psh1', age : 25},
            {name : 'psh2', age : 30},
            {name : 'psh3', age : 40},
        ];
        // map 으로 원소를 하나씩 빼서 객체에 대해 원할한 사용을 하게 해줌
        return (
            <ul>
                {users 
                    .map(user => <li>{user.name}</li>)
                }
            </ul>
        )
    }
}



// map 에 대한 추가적 정보
const arr = ['hello', 'hi', '안녕', '안녕하세요'];

const newArr = arr.map(item => {
   return item;
})

// 리턴을 쓰게 되면, 단순히 반복문이 아니라, 리턴을 반복해서 새로운 배열을 만들어서 
// 그 배열을 반환한다.
console.log(newArr);




// 필터
// 각 요소중에서 조건을 걸어서 필요한 요소만 꺼내서 map으로 돌려서 렌더링 할 수 있음
<ul>
    {users
        .filter(user => user.age > 26)
        .map(user => <li>{user.name}</li>)
    }
</ul>