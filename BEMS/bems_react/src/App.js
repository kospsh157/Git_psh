import React, { useEffect } from 'react';

function Login() {
  useEffect(

    ()=>{

      fetch(http://localhost:8080/, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
      .then(response => response.json());
      // 응답받은 JS오브젝트를 JSON객체로 변환합니다.
      // JSON 구조의 데이터를 사용하기위해 변환작업을 하는 것입니다.
    },
    []
  )




  return (
    



  );
}


function logingInput(){
  return(
    <>
    <div>
      <div>
        
  
  
      </div>
      <div> 
        <input type="text" autoComplete="on" placeholder="ID" autoFocus></input>
        <input type="password" autoComplete="on" placeholder="PWD" autoFocus></input>
      </div>
    </div>
    </>
  )
}

export default App;


