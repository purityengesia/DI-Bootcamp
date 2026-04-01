//exc3
function swapCase(str) {
    let newString = "";
    for (let char of str) {
        if (char === char.toUpperCase()) {
            newString += char.toLowerCase();
        } else {
            newString += char.toUpperCase();
        }
    }
    return newString;
}

console.log(swapCase('The Quick Brown Fox')); // 'tHE qUICK bROWN fOX'
