function isOmnipresent(arr, val) {
  // .every() returns true only if the callback returns true for ALL items
  return arr.every(subArray => subArray.includes(val));
}

// Test Cases
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); // ➞ true
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6)); // ➞ false
console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3]], 3)); // ➞ true