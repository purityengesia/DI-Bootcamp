// 1. Create empty array
let shoppingList = [];

const root = document.getElementById('root');

// 2. Create the Form elements
const form = document.createElement('form');

const input = document.createElement('input');
input.setAttribute('type', 'text');
input.setAttribute('placeholder', 'Enter item...');

const addBtn = document.createElement('button');
addBtn.textContent = 'AddItem';
addBtn.setAttribute('type', 'button'); // Prevent form submission refresh

// Add ClearAll button
const clearBtn = document.createElement('button');
clearBtn.textContent = 'ClearAll';
clearBtn.setAttribute('type', 'button');

// Append elements to DOM
form.appendChild(input);
form.appendChild(addBtn);
root.appendChild(form);
root.appendChild(clearBtn);

// 3. addItem function
function addItem() {
    const item = input.value.trim();
    if (item !== "") {
        shoppingList.push(item);
        console.log("Current List:", shoppingList);
        input.value = ""; // Clear input after adding
    }
}

// 4. clearAll function
function clearAll() {
    shoppingList = [];
    console.log("List cleared:", shoppingList);
}

// Attach listeners
addBtn.addEventListener('click', addItem);
clearBtn.addEventListener('click', clearAll);