//exercise1
type Person = {
  name: string;
  age: number;
};

type Address = {
  street: string;
  city: string;
};

// Intersection Type
type PersonWithAddress = Person & Address;

const user: PersonWithAddress = {
  name: "Alice",
  age: 30,
  street: "123 TypeScript Lane",
  city: "Codersville"
};

//exercise2
function describeValue(value: number | string): string {
  if (typeof value === "string") {
    return "This is a string";
  } else {
    return "This is a number";
  }
}

console.log(describeValue(42));      // "This is a number"
console.log(describeValue("Hello")); // "This is a string"

//exercise3
let someValue: any = "I am a hidden string";

// Casting using 'as' syntax
let strLength: number = (someValue as string).length;

// Casting using 'as' syntax instead of angle-bracket syntax
let strUpper: string = (someValue as string).toUpperCase();

console.log(strUpper); // "I AM A HIDDEN STRING"

//exercise4
function getFirstElement(arr: (number | string)[]): string {
  // Asserting the first element is a string
  return arr[0] as string;
}

const mixedArr = ["Hello", 10, "World"];
console.log(getFirstElement(mixedArr).toUpperCase()); // "HELLO"

//exercise5
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`The length is: ${item.length}`);
}

logLength("TypeScript"); // 10
logLength([1, 2, 3, 4]); // 4
// logLength(123);       // Error: number doesn't have a .length property

//exercise6
type EmployeePerson = { name: string; age: number };
type Job = { position: "Manager" | "Developer"; department: string };

type Employee = EmployeePerson & Job;

function describeEmployee(employee: Employee): string {
  if (employee.position === "Manager") {
    return `${employee.name} manages the ${employee.department} department.`;
  } else {
    return `${employee.name} is a developer in ${employee.department}.`;
  }
}

const emp: Employee = { 
    name: "Bob", 
    age: 40, 
    position: "Manager", 
    department: "Engineering" 
};

console.log(describeEmployee(emp));

//exercise7
function formatInput<T extends { toString(): string }>(input: T): string {
  // Using type assertion to treat the result of toString() as a string specifically
  const result = (input.toString() as string).trim();
  return `Formatted Output: ${result}`;
}

console.log(formatInput(123.45));   // "Formatted Output: 123.45"
console.log(formatInput("  Hi!  ")); // "Formatted Output: Hi!"