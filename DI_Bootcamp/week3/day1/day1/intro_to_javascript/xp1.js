// ex1. list of people
let people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift();

// 2. Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

// 3. Add your name to the end
people.push("Gemini");

// 4. Print Mary's index
console.log(people.indexOf("Mary"));  // Output: 0 (since Greg was removed)

// 5. Slice copy (Excluding "Mary" and "Gemini")
// Current state: ["Mary", "Devon", "Jason", "Gemini"]
let peopleCopy = people.slice(1, 3);
console.log(peopleCopy);  // ["Devon", "Jason"]

// 6. Index of "Foo"
if (people.indexOf("Foo") !== -1) {
    console.log(people.indexOf("Foo"));
} else {
    console.log(-1);  // "Foo" does not exist in the list
}

// 7. Variable 'last'
let last = people[people.length - 1];

// loop
// 1. Iterate and log everyone
for (let person of people) {
    console.log(person);
}

// 2. Iterate and break after "Devon"
for (let person of people) {
    console.log(person);
    if (person === "Devon") {
        break;
    }
}

// ex2. favorite colors
let colors = ["blue", "red", "green", "purple", "black"];
let suffixes = ["st", "nd", "rd", "th", "th"];

for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}

// ex3. Repeat the question
// A loop is perfect here because we need to ask at least once
while (true) {
    let number = prompt("Please enter a number: ");
    number = parseInt(number);  // Convert string to number
    if (number >= 10) {
        break;
    }
}

// ex4. building management
let building = {
    numberOfFloors: 4,
    numberOfAptByFloor: {
        firstFloor: 3,
        secondFloor: 4,
        thirdFloor: 9,
        fourthFloor: 2,
    },
    nameOfTenants: ["Sarah", "Dan", "David"],
    numberOfRoomsAndRent: {
        sarah: [3, 990],
        dan: [4, 1000],
        david: [1, 500],
    },
};

// 1. Number of floors
console.log(building.numberOfFloors);

// 2. Apartments on floor 1 and 3
let apts = building.numberOfAptByFloor.firstFloor + building.numberOfAptByFloor.thirdFloor;
console.log(apts);

// 3. Second tenant name and rooms
let tenant = building.nameOfTenants[1];
console.log(`${tenant} has ${building.numberOfRoomsAndRent.dan[0]} rooms.`);

// 4. Rent Check
let sarahRent = building.numberOfRoomsAndRent.sarah[1];
let davidRent = building.numberOfRoomsAndRent.david[1];
let danRent = building.numberOfRoomsAndRent.dan[1];

if (sarahRent + davidRent > danRent) {
    building.numberOfRoomsAndRent.dan[1] = 1200;
}

// ex5. family
let family = {
    father: "John",
    mother: "Jane",
    son: "Jack"
};

// Log Keys
for (let key in family) {
    console.log(key);
}

// Log Values
for (let key in family) {
    console.log(family[key]);
}

// ex6. rudolph
let details = {
    my: "name",
    is: "Rudolf",
    the: "reindeer"
};

let sentence = "";
for (let key in details) {
    sentence += `${key} ${details[key]} `;
}
console.log(sentence.trim());

// ex7. secret group
let names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];
let initials = [];

for (let name of names) {
    initials.push(name[0]);
}

// Sort alphabetically and join into a string
let societyName = initials.sort().join("");
console.log(societyName);

