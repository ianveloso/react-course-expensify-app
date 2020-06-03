// arguments objec t- no longer bound with arrow function

const add = function(a, b) {
    console.log(arguments)
    return a + b;
};
console.log(add(5, 1)); 

// this keyword - no longer bound

const user = {
    name: 'Ian', 
    cities: ['Winnipeg', 'Vancouver','Toronto'],
    printPlacesLived() {
        console.log(this.name);
        console.log(this.cities);
        const cityMessages = this.cities.map((city) => {
            return this.name + ' has lived in ' + city + '!';
        });

        return cityMessages;
    }
}
console.log(user.printPlacesLived())

const multiplier = {
    numbers: [1, 2, 3, 4, 5],
    multiplyBy: 5, 
    mulitply() {
        return this.numbers.map((number) => number * this.multiplyBy);
    }
}
console.log(multiplier.mulitply());