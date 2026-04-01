// Second Part: Hide the totalTip div initially
document.getElementById("totalTip").style.display = "none";

function calculateTip() {
    // First Part: Fetch values
    const billAmount = document.getElementById("billAmt").value;
    const serviceQuality = document.getElementById("serviceQual").value;
    let numberOfPeople = document.getElementById("numOfPeople").value;

    // Condition: Check for empty values
    if (serviceQuality == 0 || billAmount === "") {
        alert("Please enter the bill amount and service quality!");
        return; // Stop the function
    }

    // Condition: Validate number of people
    if (numberOfPeople === "" || numberOfPeople < 1) {
        numberOfPeople = 1;
        document.getElementById("each").style.display = "none";
    } else {
        document.getElementById("each").style.display = "block";
    }

    // Calculation
    let total = (billAmount * serviceQuality) / numberOfPeople;
    total = total.toFixed(2);

    // Display the results
    document.getElementById("totalTip").style.display = "block";
    document.getElementById("tip").innerHTML = total;
}

// Second Part: Call function on click
document.getElementById("calculate").onclick = function() {
    calculateTip();
};