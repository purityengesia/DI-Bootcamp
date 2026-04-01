// 1. Data structure: Array of objects
const planets = [
    { name: "Mercury", color: "#A5A5A5", moons: 0 },
    { name: "Venus", color: "#E3BB76", moons: 0 },
    { name: "Earth", color: "#2271B3", moons: 1 },
    { name: "Mars", color: "#E27B58", moons: 2 },
    { name: "Jupiter", color: "#D39C7E", moons: 79 },
    { name: "Saturn", color: "#C5AB6E", moons: 82 },
    { name: "Uranus", color: "#BBE1E4", moons: 27 },
    { name: "Neptune", color: "#6081FF", moons: 14 }
];

// 2. Select the parent section
const section = document.querySelector(".listPlanets");

// 3. Iterate and create elements
planets.forEach((planetData, index) => {
    // Create Planet Div
    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet");
    planetDiv.textContent = planetData.name;
    planetDiv.style.backgroundColor = planetData.color;

    // 4. Bonus: Create and append Moons
    for (let i = 0; i < planetData.moons; i++) {
        const moonDiv = document.createElement("div");
        moonDiv.classList.add("moon");
        
        // Position moons in a simple spread so they don't overlap
        // We use some basic math to fan them out around the planet
        moonDiv.style.left = (i * 8) + "px"; 
        moonDiv.style.top = "-15px"; 

        planetDiv.appendChild(moonDiv);
    }

    // 5. Append the planet (with its moons) to the section
    section.appendChild(planetDiv);
});