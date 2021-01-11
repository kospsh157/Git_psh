const message:string = 'hello world';
console.log(message);

let count = 0; 
count += 1;
count = '갑자기 분위기 문자열';

const done: boolean = true;

const numbers: number[] = [1, 2, 3];

const messages: string[] = ['hello', 'world'];

messages.push(1); 

let mightBeUndefined: string | undefined = undefined; 
// string 일수도 있고, undefined 일수도 있음

let nullableNumber: number | null = null; 
// number 일수도 있고, null 일수도 있음

let color: 'red' | 'orange' | 'yellow' = 'red'; 
// red, orango, yello 중 하나임

color = 'yellow';
color = 'green';