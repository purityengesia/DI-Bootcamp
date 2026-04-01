function isPalindrome(str) {
  // Reverse the string: split into array -> reverse array -> join back to string
  const reversed = str.split('').reverse().join('');
  return str.toLowerCase() === reversed.toLowerCase();
}

console.log(isPalindrome("madam")); // true
console.log(isPalindrome("hello")); // false