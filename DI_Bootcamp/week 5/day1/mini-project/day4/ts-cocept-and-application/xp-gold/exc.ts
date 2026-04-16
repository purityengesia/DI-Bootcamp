//exercise1
interface User {
  name: string;
  email: string;
}

interface Admin {
  adminLevel: number;
}

// Combining Interfaces
type AdminUser = User & Admin;

function getProperty(obj: AdminUser, key: string): any {
  // The 'in' operator acts as a type guard
  if (key in obj) {
    // We cast to 'any' or use indexed access to bypass strict property checks
    return (obj as any)[key];
  }
  return undefined;
}

const superUser: AdminUser = {
  name: "Aris",
  email: "aris@dev.com",
  adminLevel: 1
};

console.log(getProperty(superUser, "adminLevel")); // 1
console.log(getProperty(superUser, "salary"));     // undefined

//exercise2
function castToType<T>(value: any, converter: (value: any) => T): T {
  // Using the converter function to cast/convert the value
  return converter(value);
}

const num = castToType<number>("42", Number);
const bool = castToType<boolean>("true", Boolean);

console.log(typeof num); // "number"
console.log(bool);       // true (Note: non-empty strings in JS are truthy)

//exercise3
// Constraint: T must be either a number array or a string array
function getArrayLength<T extends number[] | string[]>(items: T): number {
  // We assert 'items' as an array to access length safely
  return (items as any[]).length;
}

console.log(getArrayLength([1, 2, 3]));       // 3
console.log(getArrayLength(["A", "B"]));       // 2
// getArrayLength([true, false]);              // Error: Argument not assignable to constraint

//exercise4
interface StorageInterface<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class Box<T> implements StorageInterface<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

const stringBox = new Box<string>();
stringBox.add("Secret Note");
console.log(stringBox.get(0)); // "Secret Note"

const numberBox = new Box<number>();
numberBox.add(500);

//exercise5
interface Item<T> {
  value: T;
}

// T is constrained: it must be an object that follows the Item interface
class Queue<T extends Item<any>> {
  private data: T[] = [];

  add(item: T): void {
    this.data.push(item);
  }

  remove(): T | undefined {
    return this.data.shift();
  }
}

// Usage
const taskQueue = new Queue<{ value: string; priority: number }>();
taskQueue.add({ value: "Clean room", priority: 1 });

const result = taskQueue.remove();
console.log(result?.value); // "Clean room"