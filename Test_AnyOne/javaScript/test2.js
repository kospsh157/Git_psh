const person = {
    name : 'george',
    surname : 'boole',

    get fullname(){
        return this.name +  ' ' + this.surname
    },
    set fullname(fullname){
        let parts = fullname.split(' ')
        this.name = parts[0]
        this.surname = parts[1]
    }
}


console.log(person.fullname)
console.log(person.fullname = 'psh touch')
console.log(person.name)