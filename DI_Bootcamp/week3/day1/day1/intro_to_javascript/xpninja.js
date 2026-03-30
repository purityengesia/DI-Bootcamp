//Checking the BMI
// 1. Create the person objects
const person1 = {
    fullName: "John Doe",
    mass: 80, // kg
    height: 1.8, // meters
    // Method to calculate BMI
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

const person2 = {
    fullName: "Jane Smith",
    mass: 75,
    height: 1.7,
    calcBMI: function() {
        this.bmi = this.mass / (this.height * this.height);
        return this.bmi;
    }
};

// 2. Function to compare BMI
function compareBMI(p1, p2) {
    // We call the methods first to ensure the .bmi property exists
    if (p1.calcBMI() > p2.calcBMI()) {
        console.log(`${p1.fullName} has the largest BMI.`);
    } else if (p2.bmi > p1.bmi) {
        console.log(`${p2.fullName} has the largest BMI.`);
    } else {
        console.log("Both have the same BMI.");
    }
}

compareBMI(person1, person2);

//ex2. grade average
// Function 1: Purely calculates the average numerical value
function calculateAverage(gradesList) {
    let sum = 0;
    for (let grade of gradesList) {
        sum += grade;
    }
    return sum / gradesList.length;
}

// Function 2: Manages the output and logic
function findAvg(gradesList) {
    // We "call" the first function here
    const average = calculateAverage(gradesList);
    
    console.log("Average Grade:", average);

    if (average >= 65) {
        console.log("Congratulations! You passed.");
    } else {
        console.log("You failed and must repeat the course.");
    }
}
// Testing the function
const myGrades = [70, 85, 60, 90, 45];
findAvg(myGrades);