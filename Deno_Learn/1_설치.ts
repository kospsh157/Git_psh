// curl -fsSL https://deno.land/x/install/install.sh | sh
// 이 한 줄 이면 설치가 완료된다.

// deno 를 입력하면 deno 인터프린터 환경이 켜진다.


import {serve} from "https://deno.land/std@0.83.0/http/server.ts";

const s = serve({port:8000});
console.log("http://localhost:8000/");
for await (const req of s){
    req.respond({body: "Hello World!\n"});
}


// deno run deno.ts 를 실행하면  최소에는 에러가 나온다.
// 그 에러는 네트워크 권한 때문에 생기는 에러이고 
// deno run --allow-net deno.ts 를 입력하고 허용해주면 다음부터는 에러가 나지 않는다.
