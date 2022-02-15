// OUTDATED. I thought of a better way to do this.


const cities = require('./USCities.json'); // Reference to change ZIP codes into LAT/LON. This is needed to get info from the onecall weather API.
const fetch = require("node-fetch"); // This sends / receives data to the onecall weather API.
const NodeCache = require("node-cache"); // Cache the Data for 10 minutes?


//Begin
const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: async (message) => {
        const { trimmedText, fromUser, fromChannel } = message;


        // Begin Weather Call
        if(trimmedText.toLowerCase().startsWith("weather")){
            // Array Handling, to get the ZIP out.
            const split = trimmedText.split(" ");
            const command = split.shift(); 
            const zip = split.shift();
            const param = split.shift();
            let format = "";

            // Testing out params...
            if(param) {
                // Parameter 1: "inline"
                if(param.toLowerCase() === "inline") {
                    format = "\`";
                }
            }

            // REGEX to test for valid ZIP. Transfer string to number.
            const isValidZip = /(^\d{5}$)/.test(zip);
            console.log("Did it pass the ZIP regex? " + isValidZip);
            const realZip = Number(zip);

            // Search the array.
            const findLongLat = cities.find(element => element.zip_code === realZip);

            // If you enetered an invalid zip... (including if the ZIP entered was regex valid, but not found in the JSON)
            if(!isValidZip || typeof realZip != 'number' || findLongLat === undefined) { 
                this.bot.postMessage(fromChannel, `<@${fromUser}> You must enter a valid zip.`);
            }

            // If the zip code was entered properly, and it returns a lon / lat from the city list JSON:
            if(isValidZip && typeof realZip === 'number' && findLongLat !== undefined) { // Overkill!
                let lat = findLongLat.latitude;
                let lon = findLongLat.longitude;
                let city = findLongLat.city;
                let state = findLongLat.state;

                // Send a call to the OpenWeatherMap API using Lat / Lon data from USCities.JSON - ZIP code not available for this API.

                const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=[KEY REDACTED]`);
                const weatherFetch = await response.json();

                if(weatherFetch) {
                    this.bot.postMessage(fromChannel, `${format}Weather for ${city}, ${state}: Current Conditions: ${weatherFetch.current.weather[0].main}. Current Temp: ${weatherFetch.current.temp}°F. (Hi:  ${Math.floor(Math.round(weatherFetch.daily[0].temp.max))} | Lo: ${Math.floor(Math.round(weatherFetch.daily[0].temp.min))}) Feels like ${Math.floor(Math.round(weatherFetch.current.feels_like))}.${format}`);
                }
                
                // Check for Severe Weather
                if(weatherFetch.alerts !== undefined) {
                    console.log("Current Severe Weather Alerts: " + weatherFetch.alerts.length);
                    this.bot.postMessage(fromChannel, ` \`\`\`${weatherFetch.alerts[0].event} \n ${weatherFetch.alerts[0].description} \`\`\``);
                }
            }
        }
    }
}

module.exports = plugin;