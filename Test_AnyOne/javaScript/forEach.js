const arr = [1,2,3,4,5]
arr.forEach(function (arr, index, AllInfoArray){
    console.log(arr)
    console.log(index)
    console.log(AllInfoArray)
})

arr.forEach( (value) => console.log(value))  

arr.pop()
console.log(arr)

arr.shift()
console.log(arr)
// arr.shift(1)
// console.log(arr)

