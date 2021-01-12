// 엑시오스는 프로미스 기반이다. 따라서 async/await 을 사용할 수 있다.

// 엑시오스로 데이터 받아오기
axios.get('https://요청할 api 주소')
    .then((result)=>{
        console.log(result);
        console.log(result.data);
    })
    .catch((error) => {
        console.error(error);
    })

// 엑시오스는 프로미스 기반이므로 async/await 으로 간단하게 생략해서 쓸 수 있다.
(async () => {
    try{
        const result = await axios.get('https://요청 주소');
        console.log(result);
        console.log(result.data);
    }catch{
        console.error(error);
    }
})();


// await으로 axios사용해서 데이터랑 같이 보내고 요청하고 받아오기 
(async () => {
    try{
        const result = await axios.post('https://요청주소', {
            name : 'psh',
            data1 : innerData,
            explame : '두 번째 파라미터로 이렇게 json 형태로 담아서 보내면 됨',
        })
    }catch(error){
        console.log(error);
    }
})();







