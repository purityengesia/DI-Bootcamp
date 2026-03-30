// string conversion
const numbers = [5,0,9,1,7,4,2,6,3,8];

// 1. Using .toString() - Always uses commas
console.log("toString:", numbers.toString()); 

// 2. Using .join() - Customizable separators
console.log("join with '+':", numbers.join("+"));
console.log("join with space:", numbers.join(" "));
console.log("join with nothing:", numbers.join(""));

//the bonus
const numbersBubbleSort = [5,0,9,1,7,4,2,6,3,8];

// Outer loop: Tells the code how many times to pass through the whole array
for (let i = 0; i < numbersBubbleSort.length; i++) {
    
    // Inner loop: Compares adjacent elements
    // We use numbers.length - 1 because we are comparing 'j' to 'j + 1'
    for (let j = 0; j < numbersBubbleSort.length - 1; j++) {
        
        // If the current number is SMALLER than the next one, swap them
        // (This ensures the larger numbers move to the front/left)
        if (numbersBubbleSort[j] < numbersBubbleSort[j + 1]) {
            
            // 1. Save the current value in a temporary "holding" variable
            let temp = numbersBubbleSort[j];
            
            // 2. Overwrite the current position with the larger value
            numbersBubbleSort[j] = numbersBubbleSort[j + 1];
            
            // 3. Put the temporary value into the next position
            numbersBubbleSort[j + 1] = temp;
            
            console.log(`Swapped ${temp} with ${numbersBubbleSort[j]}: [${numbersBubbleSort}]`);
        }
    }
}

console.log("Final Sorted Array:", numbersBubbleSort);

