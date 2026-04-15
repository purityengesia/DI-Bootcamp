//exc.1
class Employee {
    public name: string;
    private age: number;
    protected salary: number;

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    protected calculateBonus(): number {
        return this.salary * 0.1; // 10% bonus
    }
}

class Manager extends Employee {
    public getSalaryDetails(): string {
        // Accessing 'salary' (protected) and 'calculateBonus' (protected) is allowed here
        const total = this.salary + this.calculateBonus();
        return `${this.name}'s total compensation is ${total}`;
    }
}

class ExecutiveManager extends Manager {
    public approveBudget(): string {
        return `Budget approved by Executive Manager ${this.name}`;
    }
}

const exec = new ExecutiveManager("Alice", 45, 100000);
console.log(exec.getSalaryDetails()); // Works
console.log(exec.approveBudget());    // Works
// console.log(exec.salary);        // Error: 'salary' is protected
// console.log(exec.age);           // Error: 'age' is private

//exc.2 static methods and properties
class Shape {
    static totalShapes: number = 0;

    constructor() {
        Shape.totalShapes++;
    }

    static getType(): string {
        return "Generic Shape";
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }

    static getType(): string {
        return "Circle";
    }

    getArea(): number {
        return Math.PI * this.radius ** 2;
    }
}

class Square extends Shape {
    constructor(public side: number) {
        super();
    }

    static getType(): string {
        return "Square";
    }

    getArea(): number {
        return this.side * this.side;
    }
}

const c1 = new Circle(5);
const s1 = new Square(10);

console.log(Shape.getType());       // Generic Shape
console.log(Circle.getType());      // Circle
console.log(Shape.totalShapes);     // 2

 //exc.3 complex interface
interface Calculator {
    a: number;
    b: number;
    // Defining 'operate' as a method that takes a function
    operate(operation: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements Calculator {
    constructor(public a: number, public b: number) {}

    operate(operation: (x: number, y: number) => number): number {
        return operation(this.a, this.b);
    }

    // Helper operations to pass into 'operate'
    add = (x: number, y: number) => x + y;
    subtract = (x: number, y: number) => x - y;
    multiply = (x: number, y: number) => x * y;
}

const calc = new AdvancedCalculator(10, 5);
console.log(calc.operate(calc.add));      // 15
console.log(calc.operate(calc.multiply)); // 50

//exc4.readonly
class Device {
    constructor(public readonly serialNumber: string) {}

    getDeviceInfo(): string {
        return `Device SN: ${this.serialNumber}`;
    }
}

class Laptop extends Device {
    constructor(serialNumber: string, public model: string, public price: number) {
        super(serialNumber);
    }

    override getDeviceInfo(): string {
        return `${this.model} (SN: ${this.serialNumber}) costs $${this.price}`;
    }
}

const myLaptop = new Laptop("XYZ-123", "MacBook Pro", 2000);
myLaptop.price = 1900; // Allowed
// myLaptop.serialNumber = "ABC"; // Error: Cannot assign to 'serialNumber' because it is a read-only property.

//exc.5 extending multiple interfaces
interface Product {
    readonly name: string;
    price: number;
    discount?: number; // Optional
}

interface Electronics extends Product {
    warrantyPeriod: number;
}

class Smartphone implements Electronics {
    constructor(
        public readonly name: string,
        public price: number,
        public warrantyPeriod: number,
        public discount?: number
    ) {}

    getPriceAfterDiscount(): number {
        if (this.discount) {
            return this.price - this.discount;
        }
        return this.price;
    }
}

const phone = new Smartphone("Pixel 8", 800, 24, 50);
console.log(phone.getPriceAfterDiscount()); // 750
// phone.name = "iPhone"; // Error: 'name' is readonly

