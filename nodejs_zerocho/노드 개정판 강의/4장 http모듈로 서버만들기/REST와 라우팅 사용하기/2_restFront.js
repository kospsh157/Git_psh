async function getUser() { // 로딩 시 사용자 정보를 가져오는 함수
    try{
        const res = await axios.get('/users');
        const users = res.data;
        const list = document.getElementById('list');
        list.innerHTML = '';
        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            const edit = document.createElement('button');
            edit.textContent = '수정';
            edit.addEventListener('click', async () => {    // 수정 버튼 클릭
                const name = prompt("바꿀 이름을 입력하세요.");
                if(!name){
                    return alert("이름을 반드시 입력하셔야 합니다.");
                }        
                try{
                    await axios.put('/user/' + key, {name});
                    getUser();
                }catch(err){
                    console.error(err);
                }
            });
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            remove.addEventListener('click', async () => {  // 삭제 버큰 클릭
                try{
                    await axios.delete('/user/' + key);
                    getUser();
                }catch(err){
                    console.error(err);
                }
            });
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);
            console.log(res.data);
        });
    }catch(err){
        console.error(err);
    }
}

window.onload = getUser; // 화면 로딩 시 getUser 호출
    // 폼 제출 (submit) 시 실행
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = e.target.username.value;
    if(!name){
        return alert('이름을 입력하세요.');
    }
    try{
        await axios.post('/user', {name});
        getUser();
    }catch(err){
        console.error(err);
    }
    e.target.username.value = '';
});



// 등록 버튼을 누르면 
/*
    1. 폼에다가 'submit' 리스너를 등록한다.
    2. e.preventDefault(); >>> submit 이벤트가 작동되도 페이지가 넘어가는 것은 방지한다.
    3. const name = e.target.username.value; 이벤트가 일어나는 element의 username 태그네임을 찾고 
    그 요소의 value 를 가져와서 name 변수에 담는다.
    4. name 변수에 아무거도 담기지 않았다면, alert창을 띄운다.
    5. name 변수에 문자열이 담겨있다면, axios를 호출해서 서버와 통신을 한다.
    이때 POST 방식으로 요청주소는 localhost:8082/user 이다
    또한 {name}로 name을 같이 첨부해서 보낸다.
    주의할 점은 axios에 await을 썼다는 것이다. 그 이유는 통신이 끝날때까지 기달리고 
    getUser() 함수를 호출하라는 뜻이다. 
    6. 통신관련 작업에는 항상 try/catch 문으로 감싸서 오류를 확인해주자.
*/