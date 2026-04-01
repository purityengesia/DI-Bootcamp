//ex1. divisible by three
let numbers = [123, 8409, 100053, 333333333, 7];

for (let num of numbers) {
    if (num % 3 === 0) {
        console.log(true);
    } else {
        console.log(false);
    }
}

//exc2.attendance
let guestList = {
  randy: "Germany",
  karla: "France",
  wendy: "Japan",
  norman: "England",
  sam: "Argentina"
};

let studentName = prompt("What is your name?").toLowerCase();

if (studentName in guestList) {
    let country = guestList[studentName];
    console.log(`Hi! I'm ${studentName}, and I'm from ${country}.`);
} else {
    console.log("Hi! I'm a guest.");
}

//ex3.playing with number
let age = [20, 5, 12, 43, 98, 55];

// 1. Sum of all numbers
let sum = 0;
for (let i = 0; i < age.length; i++) {
    sum += age[i];
}
console.log("The sum is:", sum);

// 2. Highest age in the array
let highest = age[0]; // Start by assuming the first number is the biggest
for (let i = 1; i < age.length; i++) {
    if (age[i] > highest) {
        highest = age[i]; // Update 'highest' if we find a bigger number
    }
}
console.log("The highest age is:", highest);
