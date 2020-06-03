console.log('running');

const person = {
    name: 'Ian',
    age: 24, 
    location: {
        city: 'Winnipeg',
        temp: 101,
    }
};

const {name, age} = person;
console.log(`${name} is ${age}`);