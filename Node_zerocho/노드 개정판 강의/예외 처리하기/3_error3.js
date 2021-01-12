// 프로미스의 에러는 catch하지 않아도 알아서 처리된다.

const fs = require('fs').promises;

setInterval( () => {
    fs.unlink('./abcdefg.js');
}, 1000);


// 다만, 프로미스의 에러를 알아서 처리하는 동작은 노드버전이 올라감에 따라 바뀔 수 있다.
// 따라서 그냥 catch를 붙여주는 것을 권장한다. 

/*
(node:3617) UnhandledPromiseRejectionWarning: Error: ENOENT: no such file or directory, 
unlink './abcdefg.js'
(Use `node --trace-warnings ...` to show where the warning was created)

(node:3617) UnhandledPromiseRejectionWarning: Unhandled promise rejection. 
This error originated either by throwing inside of an async function without a catch block, 
or by rejecting a promise which was not handled with .catch(). To terminate the node process 
on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` 
(see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)

(node:3617) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. 
In the future, promise rejections that are not handled will terminate the Node.js 
process with a non-zero exit code.

위에 보면 이제 프로미스에 catch문 안달면 노드 프로세스가 종료된다고 하니 항상 붙이도록 하자.
*/