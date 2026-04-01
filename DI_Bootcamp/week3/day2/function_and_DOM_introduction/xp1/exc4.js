//exc4.vacation cost
function hotelCost() {
    let nights;
    while (isNaN(nights) || nights <= 0) {
        nights = parseInt(prompt("How many nights would you like to stay?"));
    }
    return nights * 140;
}

function planeRideCost() {
    let destination = "";
    while (destination === "" || !isNaN(destination)) {
        destination = prompt("Where are you going?");
    }
    if (destination === "London") return 183;
    if (destination === "Paris") return 220;
    return 300;
}

function rentalCarCost() {
    let days;
    while (isNaN(days) || days <= 0) {
        days = parseInt(prompt("How many days for the car rental?"));
    }
    let cost = days * 40;
    if (days > 10) cost *= 0.95; // 5% discount
    return cost;
}

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();

    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}.`);
    return hotel + plane + car;
}

totalVacationCost();

