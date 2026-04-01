// --- Part I ---
// Calls the function once after 2 seconds (2000ms)
setTimeout(function() {
    alert("Hello World");
}, 2000);


// --- Part II ---
// Adds one paragraph after 2 seconds
setTimeout(addParagraph, 2000);


// --- Part III ---
const container = document.getElementById("container");
const clearBtn = document.getElementById("clear");

// Start the interval and store the ID in a variable so we can stop it later
let timer = setInterval(addParagraph, 2000);

// Function to create and append the paragraph
function addParagraph() {
    const newP = document.createElement("p");
    newP.textContent = "Hello World";
    container.appendChild(newP);

    // Stop the interval if we reach 5 paragraphs
    const allParagraphs = container.querySelectorAll("p");
    if (allParagraphs.length >= 5) {
        console.log("Reached 5 paragraphs. Clearing interval...");
        clearInterval(timer);
    }
}

// Clear the interval when the button is clicked
clearBtn.addEventListener("click", function() {
    console.log("Button clicked. Clearing interval...");
    clearInterval(timer);
});