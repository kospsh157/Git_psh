function test() {
    const promiseFunction = () =>
        new Promise((resolve) => setTimeout(() => resolve("result"), 1000));
  
    Array(10)
        .fill(0)
        .forEach(async () => {
            const result = await promiseFunction();
            console.log(result);
        });
}

test();


// 위 코드를 순차적인 동기코드로 바꿔서 옳바르게 실해애보자.


// 힌트는 forEach()는 비동기로 작동한다는 점이다.


// https://velog.io/@hanameee/배열에-비동기-작업을-실시할-때-알아두면-좋을법한-이야기들

// 위에 답이 있다.