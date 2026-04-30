//exercise1
//products.js
const products = [
    { name: "Laptop", price: 1200, category: "Electronics" },
    { name: "Coffee Maker", price: 80, category: "Appliances" },
    { name: "Desk Chair", price: 150, category: "Furniture" }
];

module.exports = products;

//shop.js
const products = require('./products');

function findProduct(productName) {
    const product = products.find(p => p.name.toLowerCase() === productName.toLowerCase());
    if (product) {
        console.log(`Product Found: ${product.name} | Price: $${product.price} | Category: ${product.category}`);
    } else {
        console.log("Product not found.");
    }
}

findProduct("Laptop");
findProduct("Desk Chair");

//exercise2
//data.js
export const people = [
    { name: "Alice", age: 25, location: "New York" },
    { name: "Bob", age: 30, location: "London" },
    { name: "Charlie", age: 35, location: "Paris" }
];

//app.js
export const people = [
    { name: "Alice", age: 25, location: "New York" },
    { name: "Bob", age: 30, location: "London" },
    { name: "Charlie", age: 35, location: "Paris" }
];

//exercise3
//filemanager.js
const fs = require('fs');

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (err) {
        return `Error reading file: ${err.message}`;
    }
}

function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content);
        console.log(`Successfully wrote to ${filePath}`);
    } catch (err) {
        console.log(`Error writing file: ${err.message}`);
    }
}

module.exports = { readFile, writeFile };

//app.js
const { readFile, writeFile } = require('./fileManager');

const content = readFile('Hello World.txt');
console.log(`Read content: ${content}`);

writeFile('Bye World.txt', 'Writing to the file');

//exercise4
//todo.js
export class TodoList {
    constructor() {
        this.tasks = [];
    }

    add(task) {
        this.tasks.push({ task, completed: false });
    }

    complete(index) {
        if (this.tasks[index]) {
            this.tasks[index].completed = true;
        }
    }

    list() {
        this.tasks.forEach((t, i) => {
            console.log(`${i}. [${t.completed ? 'X' : ' '}] ${t.task}`);
        });
    }
}

//app.js
import { TodoList } from './todo.js';

const myTodos = new TodoList();
myTodos.add("Buy groceries");
myTodos.add("Finish Node.js exercise");
myTodos.complete(0);
myTodos.list();

//exercise5
//math.js
module.exports = {
    add: (a, b) => a + b,
    multiply: (a, b) => a * b
};

//app.js
const _ = require('lodash');
const math = require('./math');

const sum = math.add(10, 5);
const product = math.multiply(10, 5);
const randomNum = _.random(1, 100);

console.log(`Sum: ${sum}, Product: ${product}, Random: ${randomNum}`);

//exercise6
//npm.js
const chalk = require('chalk');

console.log(chalk.blue.bold('Hello world!'));
console.log(chalk.green.underline('Success: Operation complete.'));
console.log(chalk.red.bgWhite(' Alert: Check your logs! '));

//exercise7
//file explore and copy file.js
const fs = require('fs');

// Ensure source.txt exists for the demo
fs.writeFileSync('source.txt', 'This is the secret content of source.txt');

const content = fs.readFileSync('source.txt', 'utf8');
fs.writeFileSync('destination.txt', content);
console.log('Content copied to destination.txt');

//file explorer and read directory.js
const fs = require('fs');

const files = fs.readdirSync('./');
console.log('Files in directory:');
files.forEach(file => console.log(file));

