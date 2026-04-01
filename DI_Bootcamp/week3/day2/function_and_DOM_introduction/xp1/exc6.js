//exc6.change nav bar
// 1. Change ID
const nav = document.getElementById('navBar');
nav.setAttribute('id', 'socialNetworkNavigation');

// 2. Add Logout
const ul = nav.querySelector('ul');
const newLi = document.createElement('li');
newLi.textContent = "Logout";
ul.appendChild(newLi);

// 3. First and Last
console.log("First:", ul.firstElementChild.textContent);
console.log("Last:", ul.lastElementChild  .textContent);