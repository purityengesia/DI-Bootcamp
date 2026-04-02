// #1 
// Prediction: 3. 
// Explanation: 'a' is initialized as 5, the if-condition (5 > 1) is true, so 'a' is reassigned to 3.
// #1.2: If declared with const, it will throw a TypeError because you cannot reassign a constant.

// #2
// Prediction: First alert: 0. Second alert: 5.
// Explanation: funcThree runs first, seeing the global 'a = 0'. funcTwo runs and reassigns the global 'a' to 5. The next funcThree sees the updated global value.
// #2.2: If 'const a = 0', funcTwo will throw a TypeError on 'a = 5'.

// #3
// Prediction: "hello"
// Explanation: funcFour attaches 'a' to the global window object. funcFive can access it globally.

// #4
// Prediction: "test"
// Explanation: funcSix declares a local 'a' inside its scope. This "shadows" the global 'a', so the alert uses the local version.
// #4.2: If 'const a = "test"', it still works because it's a new variable in a different scope.

// #5
// Prediction: "in the if block 5", then "outside of the if block 2"
// Explanation: 'let' is block-scoped. The 'a' inside the {} is a different variable than the 'a' outside.
// #5.2: With 'const', the behavior remains exactly the same due to block scoping.