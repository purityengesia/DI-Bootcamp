// Runtime type validation using a union of allowed type strings.

function validateUnionType(value: any, allowedTypes: string[]): boolean {
    const currentType = typeof value;
    return allowedTypes.includes(currentType);
}

// Testing and logging
console.log("%c--- Runtime Validation Results ---", "color: #2ecc71; font-weight: bold; font-size: 1.1rem;");

const test1 = validateUnionType(42, ["string", "number"]);
console.log(`Is 42 a string or number? %c${test1}`, test1 ? "color: green" : "color: red");

const test2 = validateUnionType("TypeScript", ["number", "boolean"]);
console.log(`Is "TypeScript" a number or boolean? %c${test2}`, test2 ? "color: green" : "color: red");

const test3 = validateUnionType(true, ["boolean", "string"]);
console.log(`Is true a boolean or string? %c${test3}`, test3 ? "color: green" : "color: red");

const test4 = validateUnionType({ name: "Alice" }, ["object", "undefined"]);
console.log(`Is the object valid? %c${test4}`, test4 ? "color: green" : "color: red");
