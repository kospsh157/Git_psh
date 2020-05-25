function sayHello(name, age){
    console.log(`hello ${name} you are ${age} years old`)
}

const greetPsh = sayHello("psh", 32);


const calculator = {
    plus: function(a,b){
        return a + b;
    }
}

let plus = calculator.plus(4,5);
console.log(plus);



