// 1. Prompt the user for words and split them into an array
const userInput = prompt("Please enter several words separated by commas:");
// Use map(word => word.trim()) to remove accidental spaces around the commas
const words = userInput.split(",").map(word => word.trim());

// 2. Find the length of the longest word
let maxLength = 0;
for (let word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

// 3. Create the top and bottom borders
// We add 4 to the maxLength: 2 for the stars and 2 for the spaces padding the words
const border = "*".repeat(maxLength + 4);

// 4. Construct the frame and log it
console.log(border); // Top border

for (let word of words) {
    // Calculate how many spaces are needed to keep the right border aligned
    const spacesNeeded = maxLength - word.length;
    const padding = " ".repeat(spacesNeeded);
    
    console.log(`* ${word}${padding} *`);
}

console.log(border); // Bottom border