const OriginObj = {a : 1, b : 2, c : 3}  // 원본 오브젝트
const CloneObj = {}                      // 복사 받을 껍데기 선언
for (key in OriginObj){
    CloneObj[key] = OriginObj[key]     // 반복문으로 일일이 프로퍼티 하나하나 복사해서 생성하는 것이다. 
}

console.log(OriginObj)
console.log(CloneObj)

OriginObj.a = 8
console.log(OriginObj)
console.log(CloneObj)
