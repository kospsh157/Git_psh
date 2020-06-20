let obj = {}
const map = new WeakMap();
map.set(obj, {key: "some_value"})
console.log(map.get(obj)) // {key: "some_value"} 출력

console.log(map.has(obj)) // true 출력

obj = null // 객체를 지워버림
console.log(map.has(obj)) // 해당값 존재하지 않음. false 출력 