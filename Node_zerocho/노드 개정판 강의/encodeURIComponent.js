// encodeURIComponent와 decodeURIComponent
/*
    1. 인터넷 주소창에 한글을 입력하게되면 노드서버가 인식을 못할 때가 있다.
    2. 따라서 주소창에 한글이들어가면 encodeURIComponent로 감싸줘야 한다. 
*/

// 예를 들어서 axios 로 요청을 보낸다고 할 때 요청 주소에 한글이 들어 있다면,
axios.get('https://google.com/api/'+encodeURIComponent('한글이갑자기나온다면?'));
// 혹은 빽틱을 이용해 다음과 같이 적으면 더 편하다. 
axios.get(`https://google.com/api/${encodeURIComponent('한글이갑자기나온다면?')}`);

// 그리고 반드시 이렇게 해서 요청을 보냈다면, 한글이 아스키코드로 바뀌여서 갔을 것이다. 
// 따라서 서버에서는 반드시 decodeURIComponent로 다시 한글로 해석해서 처리하는 코드를 작성해줘야한다.


// 참고로 URL이 아니라 URI 임을 주의해야한다.
/*
    1. URL : 서버의 파일 위치를 나타낸다.
    2. URI : 서버의 자원 위치를 나타낸다. 
    3. 요즘은 URL 보단 URI를 더 많이 사용한다. 
*/


