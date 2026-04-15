//exercise1
class Employee {
    private name: string;
    private salary: number;
    public position: string;
    protected department: string;

    constructor(name: string, salary: number, position: string, department: string) {
        this.name = name;
        this.salary = salary;
        this.position = position;
        this.department = department;
    }

    public getEmployeeInfo(): string {
        // Even though name is private, we can access it inside the class
        return `Name: ${this.name}, Position: ${this.position}`;
    }
}

//ecx2
class Product {
    readonly id: number;
    public name: string;
    public price: number;

    constructor(id: number, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    getProductInfo(): string {
        return `Product: ${this.name}, Price: $${this.price}`;
    }
}

const myProduct = new Product(101, "Mechanical Keyboard", 120);
console.log(myProduct.getProductInfo());

// Attempting to modify id:
// myProduct.id = 202; 
// ❌ Error: Cannot assign to 'id' because it is a read-only property.

//exercise3
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return "Some generic animal sound";
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name); // Must call the parent constructor
    }

    // Overriding the parent method
    override makeSound(): string {
        return "Bark";
    }
}

const myDog = new Dog("Buddy");
console.log(myDog.makeSound()); // Output: Bark

//exercise4
class Calculator {
    static add(a: number, b: number): number {
        return a + b;
    }

    static subtract(a: number, b: number): number {
        return a - b;
    }
}

// Call methods directly on the Class name, no 'new' keyword needed
console.log(Calculator.add(10, 5));      // Output: 15
console.log(Calculator.subtract(10, 5)); // Output: 5

//exercise5
interface User {
    readonly id: number;
    name: string;
    email: string;
}

// PremiumUser inherits all properties from User
interface PremiumUser extends User {
    membershipLevel?: string; // The '?' makes it optional
}

function printUserDetails(user: PremiumUser): void {
    console.log(`ID: ${user.id}, Name: ${user.name}, Email: ${user.email}`);
    
    if (user.membershipLevel) {
        console.log(`Membership: ${user.membershipLevel}`);
    } else {
        console.log("Membership: Standard");
    }
}

const goldMember: PremiumUser = {
    id: 1,
    name: "Jane Doe",
    email: "jane@example.com",
    membershipLevel: "Gold"
};

printUserDetails(goldMember);

