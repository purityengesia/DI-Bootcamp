// TypeScript Exercise Solutions

// Exercise 1: Hello, World!
const message: string = "Hello, World!";
console.log(message);

// Exercise 2: Type Annotations
let age: number = 25;
let userName: string = "Alice";
console.log(`Name: ${userName}, Age: ${age}`);

// Exercise 3: Union Types
let id: string | number;
id = 101;
console.log("ID as number:", id);
id = "A101";
console.log("ID as string:", id);

// Exercise 4: Control Flow (if...else)
function checkNumber(num: number): string {
    if (num > 0) return "positive";
    else if (num < 0) return "negative";
    else return "zero";
}
console.log("Check 10:", checkNumber(10));
console.log("Check -5:", checkNumber(-5));

// Exercise 5: Tuple Types
function getDetails(name: string, age: number): [string, number, string] {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}
const details = getDetails("Alice", 25);
console.log(details);

// Exercise 6: Object Type Annotations
type Person = { name: string; age: number };

function createPerson(name: string, age: number): Person {
    return { name, age };
}
console.log(createPerson("Bob", 30));

// Exercise 7: Type Assertions
const inputElement = document.getElementById("user-input") as HTMLInputElement | null;
if (inputElement) {
    inputElement.value = "Updated via Type Assertion!";
    console.log("Input value updated successfully.");
}

// Exercise 8: Switch Statement
function getAction(role: string): string {
    switch (role) {
        case "admin":
            return "Manage users and settings";
        case "editor":
            return "Edit content";
        case "viewer":
            return "View content";
        case "guest":
            return "Limited access";
        default:
            return "Invalid role";
    }
}
console.log(getAction("admin"));
console.log(getAction("guest"));

// Exercise 9: Function Overloading
function greet(): string;
function greet(name: string): string;
function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}
console.log(greet());
console.log(greet("Alice"));
