const square = function (x) {
    return x * x; 
};

// const squareArrow = (x) => {
//     return x * x;
// }

const squareArrow = (x) => x * x; 

console.log(square(8));
console.log(squareArrow(7)); 

// Challenge - Use arrow functions

const getFirstName = (fullName) => fullName.split(' ')[0];
console.log(getFirstName('Ian Veloso'));