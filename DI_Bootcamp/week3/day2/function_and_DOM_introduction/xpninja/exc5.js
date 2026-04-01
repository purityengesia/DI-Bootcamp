function getUniqueElements(arr) {
  return [...new Set(arr)];
}

const list = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(getUniqueElements(list)); // [1, 2, 3, 4, 5]