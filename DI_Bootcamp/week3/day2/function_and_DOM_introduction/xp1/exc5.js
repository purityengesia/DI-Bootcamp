
//exc5.DOM manipulation
// 1. Retrieve div
const container = document.getElementById('container');
console.log(container);

// 2. Pete to Richard
const lists = document.querySelectorAll('.list');
lists[0].children[1].textContent = "Richard";

// 3. Delete second <li> of second <ul> (Dan)
lists[1].children[1].remove();

// 4. Change first names to "YourName"
for (let list of lists) {
    list.children[0].textContent = "YourName";
}

// Classes & Styles
for (let list of lists) list.classList.add("student_list");
lists[0].classList.add("university", "attendance");

container.style.backgroundColor = "lightblue";
container.style.padding = "10px";

// Hide Dan (the 3rd element of the 2nd list now)
// Note: Exercise logic varies based on previous removals; 
// Adjusting to find text "Dan":
const allLis = document.querySelectorAll('li');
allLis.forEach(li => {
    if (li.textContent === "Dan") li.style.display = "none";
    if (li.textContent === "Richard") li.style.border = "1px solid black";
});

document.body.style.fontSize = "18px";