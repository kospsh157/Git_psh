import React, { useRef, useState, useEffect } from 'react';


function App(){
  const[age, setAge] = useState(20);
  const prevAgeRef = useRef(0);  // 렌더링과 상관 없지만 변수를 사용 하고 싶다면 useRef() 사용

  useEffect(
    ()=> {
      prevAgeRef.current = age;
    },
    [age]    // age가 바뀌때마다 (상탯값이 바뀔 때 마다 useRef의 값도 바뀐다.)

  )
  const prevAge = prevAgeRef.current;
  const text = age ===prevAge ? 'same' : age > prevAge ? 'older' : 'younger'; 

  return(
    <div>
      <p>{`age ${age}  is ${text} than age ${prevAge}`}</p>
    
      <button
        onClick={() => {
          const age = Math.floor(Math.random() * 50 +1 )
          setAge(age)
        }}
      >나이변경
      </button>
    </div>
    )
}





export default App;
