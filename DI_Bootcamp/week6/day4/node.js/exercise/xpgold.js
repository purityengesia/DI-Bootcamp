//exercise1
//file info.js
const path = require('path');
const fs = require('fs');

function getFileInfo() {
    // path.join handles different operating system slash directions
    const filePath = path.join(__dirname, 'data', 'example.txt');

    const exists = fs.existsSync(filePath);
    console.log(`File exists: ${exists}`);

    if (exists) {
        const stats = fs.statSync(filePath);
        console.log(`Size: ${stats.size} bytes`);
        console.log(`Birthtime (Created): ${stats.birthtime}`);
    }
}

module.exports = getFileInfo;

//app.js
const getFileInfo = require('./file-info');

getFileInfo();

//exercise2
//fetchData.js
const axios = require('axios');

async function fetchPosts() {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        const posts = response.data;
        
        posts.forEach(post => {
            console.log(`Title: ${post.title}`);
        });
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

module.exports = fetchPosts;

//app.js
const fetchPosts = require('./fetch-data');

fetchPosts();

//exercise3
//date-operations.js
const { addDays, format } = require('date-fns');

function performDateOps() {
    const now = new Date();
    const futureDate = addDays(now, 5);
    const formatted = format(futureDate, 'yyyy-MM-dd HH:mm:ss');
    
    console.log(`Current Date: ${now}`);
    console.log(`Date after 5 days: ${formatted}`);
}

module.exports = performDateOps;

//app.js
const performDateOps = require('./date-operations');

performDateOps();

//exercise4
//fake module
const { faker } = require('@faker-js/faker');
const readline = require('readline-sync');

let users = [];

function addFakeUser() {
    const user = {
        name: faker.person.fullName(),
        street: faker.location.streetAddress(),
        country: faker.location.country()
    };
    users.push(user);
}

// Bonus: Prompt user
function addUserFromPrompt() {
    const name = readline.question('Enter Name: ');
    const street = readline.question('Enter Street: ');
    const country = readline.question('Enter Country: ');
    
    users.push({ name, street, country });
}

addFakeUser();
addUserFromPrompt();
console.log(users);

//exercise5
function returnNumbers(str) {
    // \d matches digits, 'g' is global flag to find all instances
    const numbers = str.match(/\d/g); 
    return numbers ? numbers.join('') : '';
}

console.log(returnNumbers('k5k3q2g5z6x9bn')); // Output: 532569

//exercise6
const readline = require('readline-sync');

function validateFullName() {
    const name = readline.question('Please enter your full name (First Last): ');
    
    /**
     * Regex Breakdown:
     * ^[A-Z][a-z]+  : Starts with uppercase, followed by lowercase letters
     * \s            : Exactly one space
     * [A-Z][a-z]+$  : Ends with uppercase followed by lowercase letters
     */
    const nameRegex = /^[A-Z][a-z]+\s[A-Z][a-z]+$/;

    if (nameRegex.test(name)) {
        console.log("Valid Name!");
    } else {
        console.log("Invalid Name. Ensure only letters, one space, and proper capitalization (e.g., 'John Doe').");
    }
}

validateFullName();

