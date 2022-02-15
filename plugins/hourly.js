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
        if(trimmedText.toLowerCase().startsWith("hourly ")){
            // Array Handling, to get the ZIP out.
            const split = trimmedText.split(" ");
            const command = split.shift(); 
            const address = split.join(" ");

            if(address) {
                // If an 'Address' was entered, send a call to Google Maps API (GeoCoding)
                const getGeoCode = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=[KEY REDACTED]`);
                const geoCode = await getGeoCode.json();
                console.log("geoCode.result: " + geoCode.result); //Will be undefined if no results were found.
                console.log(JSON.stringify(geoCode));

                // If NO results were found...
                if(geoCode.status === "ZERO_RESULTS") {
                    this.bot.postMessage(fromChannel, `No results were found for \"${address}\"`);
                }

                // If results were found -- two IFs are appropriate as undefined === false, no else if needed.
                if(geoCode.status !== "ZERO_RESULTS") {
                    // Gather what we need from google. Multiple results may be returned, we use the first as it's 'best match'. 
                    let lat = geoCode.results[0].geometry.location.lat;
                    let lon = geoCode.results[0].geometry.location.lng;
                    let place = geoCode.results[0].formatted_address;

                    // Make a call to the weather API with the proper latitude and longitude. 
                    const response = await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&APPID=[KEY REDACTED]`);
                    const weatherFetch = await response.json();

                    // If the response isn't empty, part II:
                    if (weatherFetch) {
                        let finalMessage = "";
                        for (let x = 0; x < 24; x++) {
                            let time = new Date(weatherFetch.hourly[x].dt * 1000).toLocaleTimeString('en-US', {timeZone: 'America/New_York', hour: '2-digit'});
                            finalMessage += `${time}: ${weatherFetch.hourly[x].weather[0].main} ${Math.floor(Math.round(weatherFetch.hourly[x].temp))}F (Feels Like: ${Math.floor(Math.round(weatherFetch.hourly[x].feels_like))}F) \n`;
                        }
                        this.bot.postMessage(fromChannel, `\`\`\`${finalMessage}\`\`\``);
                    }
                }
            }
        }
    }
}

module.exports = plugin;