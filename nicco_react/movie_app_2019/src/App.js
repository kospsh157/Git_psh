
function Food({name, age}){
   return <h1>My name is {name}, and My age is {age}</h1>;
}

const people = [
  {name : 'psh1', age : '1'},
  {name : 'psh2', age : '2'},
  {name : 'psh3', age : '3'}
]

function App() {
  return (
    <div className="App">
      <h1>Hello</h1>
      
      {/* 화살표 함수를 쓰면 return은 생략가능하다. 혹은 밑에와 같이 ()로 묶어주면 return임을 알 수 있다. 
      여기서 리턴처리가 안된다면, 의도대로 작동되지 않는다. */}
      {people.map( person => (
         <Food name = {person.name} 
              age = {person.age}/>
      ))}
    </div>
  );
}

export default App;
