//exercise1
function greet(name) {
    return `Hello, ${name}! Welcome to the Node.js Daily Challenge.`;
}

// Export the function
module.exports = greet;

//exercise2
const chalk = require('chalk');

function displayColorMessage() {
    const message = chalk.blue.bold.bgYellow(' This is a very colorful message! ');
    console.log(message);
}

module.exports = displayColorMessage;

//exercise3
const fs = require('fs');
const path = require('path');

function readFileContent() {
    // Using path.join ensures it works on Windows and Mac/Linux
    const filePath = path.join(__dirname, 'files', 'file-data.txt');
    
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log('File Content:', data);
    } catch (err) {
        console.error('Error reading the file:', err.message);
    }
}

module.exports = readFileContent;

//challenge task
// Import our custom modules
const greet = require('./greeting');
const displayColorMessage = require('./colorful-message');
const readFileContent = require('./read-file');

// 1. Use the greet function
const welcomeGreeting = greet('Coding Ninja');
console.log(welcomeGreeting);

// 2. Display the colorful message
displayColorMessage();

// 3. Read and display the file content
readFileContent();