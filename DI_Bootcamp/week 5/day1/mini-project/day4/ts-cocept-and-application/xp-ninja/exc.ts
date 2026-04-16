//exercise1
type Identifiable = { id: number };
type Named = { name: string };

// T is constrained to be both Identifiable AND Named
class Container<T extends Identifiable & Named> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
  }

  list(): T[] {
    return this.items;
  }
}

// Usage
const userContainer = new Container<{ id: number; name: string; email: string }>();
userContainer.add({ id: 1, name: "Alice", email: "alice@example.com" });
console.log(userContainer.list());

//exercise2
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

function parseResponse<T>(response: any): ApiResponse<T> {
  // Casting the raw 'any' response to our structured Generic interface
  return response as ApiResponse<T>;
}

// Example: Casting to a specific User type
interface UserProfile {
  username: string;
  avatar: string;
}

const rawData = { data: { username: "DevMaster", avatar: "dev.png" }, status: 200, message: "Success" };
const parsed = parseResponse<UserProfile>(rawData);

console.log(parsed.data.username); // "DevMaster"

//exercise3
class Repository<T> {
  private collection: T[] = [];

  add(item: T): void {
    this.collection.push(item);
  }

  // Using a type assertion to guarantee the return type
  get(index: number): T {
    const item = this.collection[index];
    if (!item) {
      throw new Error("Item not found");
    }
    return item as T; 
  }

  listAll(): T[] {
    return [...this.collection] as T[];
  }
}

// Usage
const stringRepo = new Repository<string>();
stringRepo.add("First Entry");
console.log(stringRepo.get(0).toUpperCase()); // "FIRST ENTRY"

