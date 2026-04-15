// TypeScript Intermediate Exercises

// Exercise 1: Union Types & Type Guards
function processValue(value: string | number): string {
    if (typeof value === "number") {
        return `$${value.toFixed(2)}`;
    } else {
        return value.split("").reverse().join("");
    }
}

console.log("Ex 1 (Number):", processValue(100));
console.log("Ex 1 (String):", processValue("Typescript"));

// Exercise 2: Array Type Annotations
function sumNumbersInArray(arr: (number | string)[]): number {
    let total = 0;
    arr.forEach(item => {
        if (typeof item === "number") total += item;
    });
    return total;
}

console.log("Ex 2 (Sum):", sumNumbersInArray([10, "apple", 20, "banana", 5]));

// Exercise 3: Type Aliases & Optional Props
type AdvancedUser = {
    name: string;
    age: number;
    address?: string;
};

function introduceAdvancedUser(user: AdvancedUser): string {
    let msg = `Hello, I am ${user.name} (${user.age}).`;
    if (user.address) msg += ` Address: ${user.address}`;
    return msg;
}

console.log("Ex 3 (No Address):", introduceAdvancedUser({ name: "Alice", age: 28 }));
console.log("Ex 3 (With Address):", introduceAdvancedUser({ name: "Bob", age: 35, address: "123 TS Road" }));

// Exercise 4: Optional Parameters
function welcomeUser(name: string, greeting?: string): string {
    return `${greeting || "Hello"}, ${name}!`;
}

console.log("Ex 4 (Default):", welcomeUser("Charlie"));
console.log("Ex 4 (Custom):", welcomeUser("Charlie", "Greetings"));
