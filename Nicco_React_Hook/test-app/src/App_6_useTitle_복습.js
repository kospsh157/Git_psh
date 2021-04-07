import {useState, useEffect} from "react";
import axios from 'axios';

// 커스텀 훅 함수 만들기
// useEffect() 훅을 이용해서 노드 서버에 요청해서 데이터 받기 
// 초기값으로는 지정된 노드 서버에서 한번 받아오고
// 그 다음 부터는 사용자가 버튼을 누르면, 다른 노드 서버에서 데이터를 받아오기
const pullData = (initRequestAddress, effectFunc) => {
    const [address, setAddress] = useState(initRequestAddress);
    const resultData = effectFunc(address);
    useEffect(effectFunc(address), [address]);
    
    return {
        setAddress,
        resultData
    }
}

const requestFunc = async (address) => {
    const data = await axios.get(address);
    console.log(data);

    return data;
}

const App = () => {
    const {setAddress, result} = pullData("localhost:3500/api/react/1", requestFunc);
    
    
    return (
        <div className = "App">
            <div>Hi</div>
            <button onClick={()=> setAddress('localhost:3500/apt/react/1')}> 여기를 누르면 링크1 데이터</button>
            <button onClick={()=> setAddress('localhost:3500/apt/react/2')}> 여기를 누르면 링크2 데이터</button>
            <div> {serverData} </div>
        </div>
    )
}

export default App;