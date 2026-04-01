const btn = document.querySelector('input[type="button"]');

// Add click event listener
btn.addEventListener('click', removecolor);

function removecolor() {
    const select = document.getElementById('colorSelect');
    
    // Check if there is an option selected
    if (select.selectedIndex !== -1) {
        // Remove the option at the current selected index
        select.remove(select.selectedIndex);
    }
}