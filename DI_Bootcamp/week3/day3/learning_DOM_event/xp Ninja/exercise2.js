//method 1.without regex
function validateEmailManual(email) {
    const atPos = email.indexOf("@");
    const dotPos = email.lastIndexOf(".");

    // Check if @ exists, if . exists after @, and if there is text after the .
    if (atPos < 1 || dotPos < atPos + 2 || dotPos + 2 >= email.length) {
        return false;
    }
    return true;
}

//method .with regex
function validateEmailRegex(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Implementation on a form
document.getElementById("emailForm").onsubmit = function(e) {
    e.preventDefault();
    const emailValue = document.getElementById("userEmail").value;
    
    if (validateEmailRegex(emailValue)) {
        alert("Valid Email!");
    } else {
        alert("Invalid Email structure.");
    }
};
