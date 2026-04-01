//exc2.
function abbrevName(name) {
    const names = name.trim().split(" ");
    if (names.length > 1) {
        return `${names[0]} ${names[1].charAt(0)}.`;
    }
    return names[0];
}

console.log(abbrevName("Robin Singh")); // "Robin S."
