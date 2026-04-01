function biggestNumberInArray(arrayNumber) {
  if (arrayNumber.length === 0) return 0;

  let max = -Infinity;

  for (let item of arrayNumber) {
    // Check if the item is a number or can be converted to one
    if (typeof item === 'number') {
      if (item > max) max = item;
    }
  }

  // If no numbers were found in a non-empty array (like ['a', 'b']), return 0 per logic
  return max === -Infinity ? 0 : max;
}

console.log(biggestNumberInArray([-1, 0, 3, 100, 99, 2, 99])); // 100
console.log(biggestNumberInArray(['a', 3, 4, 2]));             // 4
console.log(biggestNumberInArray([]));                         // 0