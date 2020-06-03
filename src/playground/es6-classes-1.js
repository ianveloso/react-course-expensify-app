
class Person {
    constructor(name = 'No-Name', age = 0) {
        this.name = name; 
        this.age = age;
    }

    getGreeting() {
        return `Hello, I am ${this.name}.`
    }
    getDescription() {
        return `${this.name} is ${this.age} year(s) old.`
    }
}

class Student extends Person {
    constructor(name, age, major) {
        super(name, age);
        this.major = major;
    }
    hasMajor() {
        return !!this.major;
    }
    getDescription() {
        let description = super.getDescription();
        if(this.hasMajor())
            description += ` ${this.name} majors in ${this.major}`;
        return description;
    }

}

class Traveler extends Person {
    constructor(name, age, home) {
        super(name, age); 
        this.home = home; 
    }
    hasHome() {
        return !!this.home;
    }
    getGreeting() {
        let description = super.getGreeting();
        if(this.hasHome())
            description += ` I'm visiting from ${this.home}`;
        return description; 
    }
}

const me = new Student('ian', 26, 'engineering'); 
console.log(me); 
console.log(me.getDescription());
console.log(me.hasMajor());

const you = new Traveler('caroline', 24, 'winnipeg');
console.log(you.getGreeting());