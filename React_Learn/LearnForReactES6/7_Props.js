// props 에 대해서 알아보자

import PropTypes from "prop-types";

function SomeComponent({name, age}){
    return (
        <div>
            <h1>내 이름은 : {name}  내 나이는 : {age}</h1>
        </div>
    )
}

// 그리고 우리는 반드시 propTypes를 이용해서 실수를 줄여야 한다. 
// 어떤 타입의 prop가 와야 하는지 개발을 할 수록 prop가 많아 질수록 햇갈리기 때문이다.
SomeComponent.propTypes = {
    name : PropTypes.string.isRequired,
    age : PropTypes.number.isRequired
}


const objArr = [
    {id: 1, name: 'psh1', age:10},
    {id: 2, name: 'psh2', age:20},
    {id: 3, name: 'psh3', age:30},
]

function App() {
    return(
        <div>
            {objArr.map((obj)=>{
                return <SomeComponent
                name = {obj.name}
                key = {obj.id}
                age = {obj.age}
                />
            })}
        </div>
    )
}