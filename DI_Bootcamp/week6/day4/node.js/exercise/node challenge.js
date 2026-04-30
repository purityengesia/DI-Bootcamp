//exercise1
function timeUntilNewYear() {
    const now = new Date();
    const nextYear = now.getFullYear() + 1;
    const newYearDate = new Date(`January 1, ${nextYear} 00:00:00`);
    
    const diff = newYearDate - now; // Difference in milliseconds

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `the 1st January is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = timeUntilNewYear;

//script.js
const timeUntilNewYear = require('./date.js');

console.log(timeUntilNewYear());

//exercise2
//date
function minutesLived(birthdateStr) {
    const birthdate = new Date(birthdateStr);
    const now = new Date();
    
    const diffInMs = now - birthdate;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    
    return diffInMinutes;
}

module.exports = minutesLived;

//script.js
const minutesLived = require('./date.js');
const prompt = require('prompt-sync')();

// Hardcoded example
const hardcodedBirthdate = "1995-05-15";
console.log(`Minutes lived (hardcoded): ${minutesLived(hardcodedBirthdate)}`);

// Bonus: Prompting the user
const userBirthdate = prompt('Enter your birthdate (YYYY-MM-DD): ');
console.log(`You have lived for ${minutesLived(userBirthdate)} minutes!`);

//exercise3
//date
const Holidays = require('date-holidays');

function getNextHoliday() {
    const now = new Date();
    const hd = new Holidays('US'); // Using US holidays as an example
    const holidays = hd.getHolidays(now.getFullYear());
    
    // Find the first holiday that is after "now"
    const nextHoliday = holidays.find(h => new Date(h.date) > now);

    if (!nextHoliday) return "No more holidays this year!";

    const holidayDate = new Date(nextHoliday.date);
    const diff = holidayDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return {
        today: now.toDateString(),
        holidayName: nextHoliday.name,
        timeLeft: `${days} days and ${hours}:${minutes}:${seconds} hours`
    };
}

module.exports = getNextHoliday;

//script.js
const getNextHoliday = require('./date.js');

const info = getNextHoliday();
console.log(`Today's Date: ${info.today}`);
console.log(`The next holiday is ${info.holidayName}, which is in ${info.timeLeft}`);

