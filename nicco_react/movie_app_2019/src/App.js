
import PropTypes from "prop-types";

function Food({name, age}){
   return <h1>My name is {name}, and My age is {age}</h1>;
}
// 반드시 propTypes 를 사용해야 실수를 줄일 수 있다. 
Food.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired
}

const people = [
  {id:1, name : 'psh1', age : '1'},
  {id:2, name : 'psh2', age : '2'},
  {id:3, name : 'psh3', age : '3'}
]

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      
      {/* 화살표 함수를 쓰면 return은 생략가능하다. 혹은 밑에와 같이 ()로 묶어주면 return임을 알 수 있다. 
      여기서 리턴처리가 안된다면, 의도대로 작동되지 않는다. */}
      {people.map( person => {
        return  <Food name = {person.name} 
                age = {person.age}
                key = {person.id}
                />
      })}
    </div>
  );
}

export default App;
