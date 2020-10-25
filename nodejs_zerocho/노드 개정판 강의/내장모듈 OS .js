// 일단 os 모듈을 쓰기 위해 os 가져옴
const os = require('os');   // 내장 모듈은 경로대신에 그냥 이름을 적어주면 된다.

console.log('운영체제 정보-------------------------------------------------')
console.log('os.arch():' , os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime());
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release());


console.log('경로----------------------------------------------------------')
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('cpu 정보------------------------------------------------------')
console.log('os.cpus():', os.cpus());
console.log('os.cpus().length:', os.cpus().length);


console.log('메모리 정보----------------------------------------------------')
console.log('os.freemem():', os.freemem());
console.log('os.totalmem():', os.totalmem());




