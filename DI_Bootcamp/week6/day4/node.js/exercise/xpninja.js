//exercise1
//greet.js
const chalk = require('chalk');

module.exports = function() {
    console.log(chalk.bold.magenta('🥷  Welcome, Ninja! You have accessed the shadow utility.'));
};

//fetch.js
const axios = require('axios');

module.exports = async function() {
    try {
        console.log('Fetching a random quote...');
        const response = await axios.get('https://api.quotable.io/random');
        console.log(`\n"${response.data.content}" — ${response.data.author}`);
    } catch (error) {
        console.log('Failed to fetch data. Ensure you have an internet connection.');
    }
};

//read.js
const fs = require('fs');

module.exports = function(filePath) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        console.log(`--- Content of ${filePath} ---`);
        console.log(content);
    } else {
        console.log(`Error: File "${filePath}" not found.`);
    }
};

//index.js
const { program } = require('commander');
const greet = require('./commands/greet');
const fetchApi = require('./commands/fetch');
const readFile = require('./commands/read');

program
    .version('1.0.0')
    .description('Ninja Utility CLI');

program
    .command('greet')
    .description('Display a colorful greeting')
    .action(greet);

program
    .command('fetch')
    .description('Fetch data from a public API')
    .action(fetchApi);

program
    .command('read <file>')
    .description('Read and display the contents of a file')
    .action((file) => readFile(file));

program.parse(process.argv);

//exercise2
//weather.js
const axios = require('axios');
const chalk = require('chalk');

async function getWeather(city) {
    const API_KEY = 'YOUR_OPENWEATHER_API_KEY'; // Replace with a real key if you have one
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const { main, weather, name } = response.data;

        console.log('\n' + chalk.blue.bold(`--- Weather Report for ${name} ---`));
        console.log(chalk.yellow(`Temperature: `) + `${main.temp}°C`);
        console.log(chalk.cyan(`Condition:   `) + `${weather[0].description}`);
        console.log(chalk.blue.bold('------------------------------\n'));
    } catch (error) {
        console.log(chalk.red(`\nCould not find weather for "${city}". Please check the name.`));
    }
}

module.exports = getWeather;

//dashboard.js
const readline = require('readline');
const getWeather = require('./weather');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function startDashboard() {
    rl.question('Enter a city name (or type "exit" to quit): ', (city) => {
        if (city.toLowerCase() === 'exit') {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        getWeather(city).then(() => {
            // Ask again after displaying weather
            startDashboard();
        });
    });
}

module.exports = startDashboard;

//index.js
const startDashboard = require('./dashboard');

console.log('--- Welcome to the Weather Dashboard ---');
startDashboard();