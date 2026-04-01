//ex1
function displayNumbersDivisible(divisor = 23) {
    let sum = 0;
    let outcomes = "";

    for (let i = 0; i <= 500; i++) {
        if (i % divisor === 0) {
            outcomes += i + " ";
            sum += i;
        }
    }
    console.log("Outcome:", outcomes.trim());
    console.log("Sum:", sum);
}

// To run the default (23):
displayNumbersDivisible();
