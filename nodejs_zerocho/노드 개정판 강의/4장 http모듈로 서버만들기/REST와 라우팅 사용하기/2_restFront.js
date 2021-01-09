async function getUser() { // 로딩 시 사용자 정보를 가져오는 함수
    try{
        // getUse() 함수가 실행되면 일단은 무조건
        // axios.get(/users)로 /users로 요청을 보낸다.
        // 이 요청은 서버에 있는 users 객체를 받아오는 요청이다.
        
        const res = await axios.get('/users');
        // await이 붙어 있으므로, 요청 후 요청을 받을 때 까지 기다린다.
        // 그리고 다음줄로 넘어간다.
        const users = res.data;
        // 여기서 응답 본문에 data가 있는데 data라는 것은 정해져 있는 프로퍼티이름이다.
        // res.data에는 서버에서 응답시 보낸 데이터가 담겨있다. 
        // 서버에서 보내 온 users 객체가 JSON 문자열 형태로 왔고, 이를 const users =res.data;
        // 로 users에 다시 담았다.


        const list = document.getElementById('list');
        // list 요소를 불러와서 사용하기 위해 js 변수 list에 담는다.
        
        list.innerHTML = '';
        // list 요소에 모든 요소를 빈칸으로 초기화 시킨다.

        // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
        // 초기화한 list에 이제 다시 반복문으로 데이터마다 돌면서 붙일 것이다. 
        // Object.keys() 메소드는 해당 객체의 프로퍼티를 뽑아서 배열로 만든 후 반환한다.
        // 배열 안의 원소 순서는 객체의 프로퍼티 순서와 같다. 
        // map() 함수는 앞에 기존 배열을 이용해서 새로운 배열을 만들고 반환한다.
        // 이때 어떤 배열을 만들지는 콜백에서 정의하면 된다. 
        Object.keys(users).map(function (key) {
            const userDiv = document.createElement('div');
            const span = document.createElement('span');
            span.textContent = users[key];
            // 해당 key값의 value를 span.textContent 에다 넣는다.

            const edit = document.createElement('button');
            // 수정 버튼을 만든다.

            edit.textContent = '수정';
            // 수정이라고 써주고

            // 수정 버튼에 리스너를 달아준다.
            // click이벤트 발생시, 비동기를 동기로 바꿔주는 async 함수가 콜백으로 작동된다.
            // 참고로 이 안은 아직 map() 메서드의 콜백 함수 안이다.
            // 즉 이 안의 모든 코드들은 위의 Object.keys()의 배열 원소마다 반복되는 코드인 것이다.
            // 즉 users 객체의 key 각각 하나 마다, 리스너를 붙여주는 것이다.
            edit.addEventListener('click', async () => {    // 수정 버튼 클릭
                // 프롬프트 메시지 창을 띄운다.
                // 프롬포트의 특징은 사용자가 답을 써서 넣으면 그때 const name 변수에 값이 담긴다는 것이다.
                const name = prompt("바꿀 이름을 입력하세요.");

                // 만약 빈 내용을 보내면 얼럿창을 보여주고 종료한다.
                if(!name){
                    return alert("이름을 반드시 입력하셔야 합니다.");
                }     

                // 그게 아니라면, 수정 요청을 보내야 한다.
                // put메서드로 /user/key값 주소로 요청을 한다. 
                try{
                    // key 값은 요청시 파라미터로 같이 보내고, 
                    // 사용자가 새롭게 수정한 name은 본문 데이터에 담아 요청을 보낸다.
                    await axios.put('/user/' + key, {name});
                    
                    // 요청이 잘 되었으면 아마 서버의 users 객체가 수정되었을 것이다.
                    // 그럼 수정된 users 객체를 다시 불러다가 프론트단에다가 뿌려줘야 한다.
                    // 따라서 다시 getUser() 함수를 호출한다. 
                    getUser();

                    // 항상 axios 요청같은 것을 할 때는 catch를 해주자
                }catch(err){
                    console.error(err);
                }
            });

            // 삭제 버튼을 만든다.
            const remove = document.createElement('button');
            remove.textContent = '삭제';
            // 삭제 버튼 리스너를 달아준다.
            remove.addEventListener('click', async () => {  // 삭제 버큰 클릭
                try{
                    // 어떤 것을 삭제 할 지 알아야 하는데, 
                    // 여기선 그 고유값으로 users의 key값을 선택했다.
                    // 아직 Object.keys(users).map(key)의 콜백함수 안이라는 것을 잊지말자
                    // 때문에 users의 프로퍼티 하나하나 마다 고유 key값으로 삭제 및 등록 리스너를 만들 수 있다.
                    await axios.delete('/user/' + key);
                    // 서버의 users 객체 프로퍼티들이 바뀌었으니 다시 불러온다.
                    getUser();
                }catch(err){
                    console.error(err);
                }
            });

            // 데이터를 다 받고 했으면 이제 데이터를 기반으로 다시 프론트단을 그리면 완성된다.
            // 필요한 요소들은 이미 위에서 이미 다 만들었다.
            // div 에 span 을 넣고
            // 그 다음 수정버튼, 삭제버튼을 넣는다.
            // 그리고 list 요소에 위에서 한줄 만든 div요소를 넣는다.
            // 아직도 map() 콜백 함수 안이라는 것을 명심하자.
            // 지금 여깄는 코드들은 users객체의 key값마다 반복된다.
            userDiv.appendChild(span);
            userDiv.appendChild(edit);
            userDiv.appendChild(remove);
            list.appendChild(userDiv);

            // 참고로 여기는 프론트단 js 파일이다. 여기서 console.log를 찍으면 브라우저 콘솔창에서 보인다.
            // 노드서버를 실행중인 프로세스에서는 당연히 뜨지 않아야 한다. 
            // 참고로 res.data에는 서버에서 보낸 데이터가 들어있다.
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