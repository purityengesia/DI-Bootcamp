const btn = document.getElementById("getCoords");
const output = document.getElementById("displayCoords");

btn.onclick = function() {
    // Check if the browser supports Geolocation
    if (navigator.geolocation) {
        // getCurrentPosition takes a success callback and an error callback
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        output.innerHTML = "Geolocation is not supported by this browser.";
    }
};

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    output.innerHTML = `Latitude: ${lat}<br>Longitude: ${lon}`;
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            output.innerHTML = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            output.innerHTML = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            output.innerHTML = "The request to get user location timed out.";
            break;
        default:
            output.innerHTML = "An unknown error occurred.";
            break;
    }
}