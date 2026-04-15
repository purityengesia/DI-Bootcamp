//exercise1
class Employee {
    public name: string;
    private age: number; // Only accessible inside Employee
    protected salary: number; // Accessible in Employee and subclasses

    constructor(name: string, age: number, salary: number) {
        this.name = name;
        this.age = age;
        this.salary = salary;
    }

    protected calculateBonus(): number {
        return this.salary * 0.1;
    }
}

class Manager extends Employee {
    public getSalaryDetails(): string {
        // We can access 'salary' and 'calculateBonus' because they are protected
        const bonus = this.calculateBonus();
        return `${this.name} earns a base of ${this.salary} with a bonus of ${bonus}.`;
    }
}

class ExecutiveManager extends Manager {
    public approveBudget(): string {
        return `Budget approved by Executive: ${this.name}`;
    }
}

const exec = new ExecutiveManager("Marcus", 50, 150000);
console.log(exec.getSalaryDetails());
console.log(exec.approveBudget());

// Encapsulation check:
// console.log(exec.age);    // ❌ Error: Property 'age' is private
// console.log(exec.salary); // ❌ Error: Property 'salary' is protected

//exercise2
class Shape {
    static totalShapes: number = 0;

    constructor() {
        Shape.totalShapes++; // Increments the shared global counter
    }

    static getType(): string {
        return "Generic Shape";
    }
}

class Circle extends Shape {
    constructor(public radius: number) {
        super();
    }

    static override getType(): string {
        return "Circle";
    }
}

class Square extends Shape {
    constructor(public side: number) {
        super();
    }

    static override getType(): string {
        return "Square";
    }
}

const c1 = new Circle(5);
const s1 = new Square(10);

console.log(Circle.getType());  // "Circle"
console.log(Square.getType());  // "Square"
console.log(Shape.totalShapes); // 2

//exercise3
interface Calculator {
    a: number;
    b: number;
    // 'operate' takes a function that matches this signature
    operate(fn: (num1: number, num2: number) => number): number;
}

class AdvancedCalculator implements Calculator {
    constructor(public a: number, public b: number) {}

    operate(fn: (num1: number, num2: number) => number): number {
        return fn(this.a, this.b);
    }

    // Static helpers to pass into operate
    static add = (x: number, y: number) => x + y;
    static multiply = (x: number, y: number) => x * y;
}

const myCalc = new AdvancedCalculator(10, 5);
console.log(myCalc.operate(AdvancedCalculator.add));      // 15
console.log(myCalc.operate((x, y) => x / y));            // 2 (Anonymous function)

//exercise4
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
        return `Laptop: ${this.model}, Price: $${this.price}, SN: ${this.serialNumber}`;
    }
}

const workLaptop = new Laptop("SN-9988-XP", "ThinkPad", 1200);
workLaptop.price = 1100; // ✅ Allowed
// workLaptop.serialNumber = "NEW-SN"; // ❌ Error: Read-only property

//exercise5
interface Product {
    readonly name: string;
    price: number;
    discount?: number; // Optional property
}

interface Electronics extends Product {
    warrantyPeriod: number;
}

class Smartphone implements Electronics {
    constructor(
        public readonly name: string,
        public price: number,
        public warrantyPeriod: number,
        public discount: number = 0 // Default value for the optional property
    ) {}

    calculateFinalPrice(): number {
        return this.price - this.discount;
    }
}

const pixel = new Smartphone("Pixel 9", 900, 24, 100);
console.log(`${pixel.name} Final Price: $${pixel.calculateFinalPrice()}`);
// pixel.name = "iPhone"; // ❌ Error: Cannot assign to 'name' because it is a read-only property.
