// 간단하게 index.js하나만 작성해서 npm에 배포해보자

// package.json에서 main 부분의 파일명과 일치해야 한다.
// 그래야 npm에서 이 파일이 패키지의 진입점임을 알 수 있다.

module.exports = () => {
    return 'hello package';
}

