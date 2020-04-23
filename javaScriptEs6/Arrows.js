// 기존의 function보다 빠르며 간결한 구문을 보여주는 함수이다.
// 항상 익명함수이다.
// 생성자를 사용할 수 없다.

//가장 중요한 특징 중 첫번째는 간결한 구문이다.
var result = function (a, b) {
  return a * b
}
var result2 = (a, b) => a * b

//이전 방식
var plus1 = function (a, b) {
  var result = a + b
  return result
}
//arrow function 방식
let plus2 = (a, b) => {
  let result = a + b
  return result
}

//arrow function의 this값은 해당 스코프의 this값과 같다.
//기존의 ES5에서의 this는 주로 self(that)나 bind를 사용하여 this를 속박하고 있었다.
function phone() {
  var self = this,
    name = "Galaxy s",
    version = 6

  versionUp = function () {
    console.log(this)
    self.version++
  }
}
console.log(phone.versionUp)

//ES6에서는 이러한 this의 번거로움을 줄이고 해당 arrow function을 감싸고 있는 블록을 this로 가리킨다.
function phone() {
  this.sName = "Galaxy s"
  this.sVersion = 0
  ;(test) => {
    console.log(this)
    this.version++
  }
}
//무엇보다 arrow function은 기존의 function을 사용하는 것보다 좋은 성능을 보여준다.(이 부분은 추후 따로 챕터를 만들어 다루겠다)

console.log("왜 안나오냐")

// #2: 화살표 내의 this는 ES5의 function 내의 this와 다름
console.log(this)

let basket = {
  _name: "ball",
  _mates: ["rebound", "shoot", "pass"],
  matesCount() {
    console.log(this) // basket 객체를 가리킴  ==> 가장 가까운 자신을 포함하고 있는 객체를 가리킴 (함수나 변수는 안됨 객체임 객체!)
    this._mates.forEach((f) => console.log(this._name + " is " + f))
  },
}
basket.matesCount()






//기존 es5 이하에서는 함수가 실행되는 context를 명확히 하기 위해 (this 같은 놈들) 함수 실행시 bind 명령을 이용한다.
//특히 콜백을 다를 때 특히 많이 사용한다.

var callbackFunc = function(val){
  console.log("DO something");
}.bind(this)


//es6 에서는 화살표를 사용하면 자동으로 바인딩된다 
var callbackFunc2 = (val) =>{
  console.log("DO something2")
}


// 또한 파라미터값에 기본값을 입력할 수 있다.
var helloworldd = (name = "default") => {
  console.log("Hello, " + name);
}
helloworldd("newName") // Hello, newName
helloworldd(); // Hello, default




