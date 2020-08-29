// 먼저 보기 안좋은 섞여있는 코드

const { useEffect } = require("react");

function Profile({userId}){
    const [user, setUser] = useState();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(()=> {
        getUserApi(userId).then(data => setUser(data));
    }, [userId]) 

    
}