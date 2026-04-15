export {};

//exercise1
class Employee {
    protected name: string;
    protected salary: number;

    constructor(name: string, salary: number) {
        this.name = name;
        this.salary = salary;
    }

    public getDetails(): string {
        return `Employee: ${this.name}, Salary: $${this.salary}`;
    }
}

class Manager extends Employee {
    public department: string;

    constructor(name: string, salary: number, department: string) {
        super(name, salary); // Passes name and salary to the base class constructor
        this.department = department;
    }

    // Overriding the base method
    public getDetails(): string {
        // Accessing protected properties 'name' and 'salary' from parent
        return `${this.name} manages ${this.department} with a salary of $${this.salary}`;
    }
}

const manager = new Manager("Sarah", 95000, "Engineering");
console.log(manager.getDetails());

//exercise2
class Car {
    public readonly make: string;
    private readonly model: string;
    public year: number;

    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    public getCarDetails(): string {
        return `${this.year} ${this.make} ${this.model}`;
    }
}

const myCar = new Car("Tesla", "Model 3", 2024);

// Observation:
// myCar.make = "Ford";    // ❌ Error: Cannot assign to 'make' (readonly)
// myCar.model = "F-150";  // ❌ Error: 'model' is private and readonly
myCar.year = 2025;         // ✅ Works: 'year' is neither private nor readonly

//exercise3
class MathUtils {
    public static PI: number = 3.14159;

    public static circumference(radius: number): number {
        // Access static property via ClassName.PropertyName
        return 2 * MathUtils.PI * radius;
    }
}

console.log(MathUtils.PI); // 3.14159
console.log(MathUtils.circumference(10)); // 62.8318

//exercise4
interface Operation {
    execute(a: number, b: number): number;
}

class Addition implements Operation {
    execute(a: number, b: number): number {
        return a + b;
    }
}

class Multiplication implements Operation {
    execute(a: number, b: number): number {
        return a * b;
    }
}

const add = new Addition();
const multi = new Multiplication();

console.log(add.execute(10, 5));   // 15
console.log(multi.execute(10, 5)); // 50

//exercise5
interface Shape {
    color: string;
    getArea(): number;
}

interface Rectangle extends Shape {
    readonly width: number;
    readonly height: number;
    getPerimeter(): number;
}

class Rect implements Rectangle {
    constructor(
        public color: string,
        public readonly width: number,
        public readonly height: number
    ) {}

    getArea(): number {
        return this.width * this.height;
    }

    getPerimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const myRect = new Rect("Blue", 10, 20);
console.log(myRect.getArea());      // 200
console.log(myRect.getPerimeter()); // 60