//method1.using one loop
let rows = 6;

for (let i = 1; i <= rows; i++) {
    console.log("* ".repeat(i));
}

//method2 using nested for loop
let maxRows = 6;

for (let i = 1; i <= maxRows; i++) {
    let rowContent = "";
    
    // Inner loop: adds the stars for the current row
    for (let j = 1; j <= i; j++) {
        rowContent += "* ";
    }
    
    console.log(rowContent);
}