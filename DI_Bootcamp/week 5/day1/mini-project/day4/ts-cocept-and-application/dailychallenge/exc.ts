// 1. Define the types
type User = {
  type: 'user';
  name: string;
  age: number;
};

type Product = {
  type: 'product';
  id: number;
  price: number;
};

type Order = {
  type: 'order';
  orderId: string;
  amount: number;
};

// Create a Union Type for the array
type DataItem = User | Product | Order;

// 2. Implement handleData
function handleData(data: DataItem[]): string[] {
  return data.map(item => {
    switch (item.type) {
      case 'user':
        // TypeScript knows item is User here
        return `Hello, ${item.name}! You are ${item.age} years old.`;

      case 'product':
        // TypeScript knows item is Product here
        return `Product ID: ${item.id} costs $${item.price}.`;

      case 'order':
        // TypeScript knows item is Order here
        return `Order ${item.orderId} summary: Total amount is $${item.amount}.`;

      default:
        // 3. Handle unexpected cases
        const _exhaustiveCheck: never = item;
        return "Unknown data type encountered.";
    }
  });
}

// Testing the function
const mixedData: DataItem[] = [
  { type: 'user', name: 'Alice', age: 30 },
  { type: 'product', id: 101, price: 29.99 },
  { type: 'order', orderId: 'ORD-552', amount: 150.00 }
];

console.log(handleData(mixedData));