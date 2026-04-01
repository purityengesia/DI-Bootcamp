const select = document.getElementById('genres');

// 1. Display the value of the selected option
console.log("Initially selected:", select.value);

// 2. Add an additional option: <option value="classic">Classic</option>
const newOption = new Option("Classic", "classic");
select.add(newOption);

// 3. Make the newly added option selected by default
newOption.selected = true;

// Verify the change
console.log("New selected value:", select.value);