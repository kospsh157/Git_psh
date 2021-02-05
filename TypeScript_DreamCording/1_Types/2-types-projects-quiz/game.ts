/**
 * Let's make a game 🕹
 */
type Order = 'up' | 'down' | 'left' | 'right';


// 여기서 배울 점 1 : position은 오브젝트 타입이다. 따라서 const로 해도 프로퍼티들의 가변성은 막지 못한다.
const position = {
    x : 0,
    y : 0
}

function move(order: Order): void{
    switch(order){
        case 'up':
            position.y += 1;
            // 배울 점 2: 스위치 문에서는 return이 없다면, 반드시 break문을 case문 마다 넣어줘야 한다.
            break;
        case 'down':
            position.y -= 1;
            break;
        case 'left':
            position.x -= 1;
            break;
        case 'right':
            position.x += 1;
            break;
        // 배울점 3: 스위치 문에는 반드시 default문이 들어가야 한다. 
        default : 
            throw new Error(`unknown direction: ${order}`);
    }
}



console.log(position); // { x: 0, y: 0}
move('up');
console.log(position); // { x: 0, y: 1}
move('down');
console.log(position); // { x: 0, y: 0}
move('left');
console.log(position); // { x: -1, y: 0}
move('right');
console.log(position); // { x: 0, y: 0}
