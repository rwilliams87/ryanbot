const fetch = require("node-fetch"); // This sends / receives data to the flights API. Remember, limit is 500 a month!

const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: async (message) => {
        const { trimmedText, fromUser, fromChannel } = message;
        //Do Stuff Here.
        

        //Check for keyword.
        if(trimmedText.toLowerCase().startsWith("flights")){
            var split = trimmedText.split(" ");
            var command = split.shift();
            var test = split.shift();
            var depAr = split.shift();
            var node = "";

            if(test === undefined){
                this.bot.postMessage(fromChannel, "You must state an airport code. Ex: KGRR or GRR");
            } else {
                    if (test.length === 4){
                        test = test.substring(1);
                    }
                    test = test.toUpperCase();
                    var reg = /^[A-Z]{3}$/.test(test);

                    if(!reg){
                        this.bot.postMessage(fromChannel, "Invalid Airport Code");
                    } else {

                        if(depAr.startsWith("dep")){
                            depAr = "dep_iata";
                            node = "Departures";
                        } else {
                            depAr = "arr_iata";
                            node = "Arrivals";
                        }


                    // Grab data from API.
                    var getFlights = await fetch(`http://api.aviationstack.com/v1/flights?access_key=[KEY REDACTED]&${depAr}=${test}&limit=20`);
                    var flights = await getFlights.json();

                    var text = test + " " + node;
                    console.log(flights.data[0].airline.name);

                    for(i in flights.data){
                        if(flights.data[i].flight.number != null) {
                            let landingTime = "";
                            let left = "(";
                            let right = ")";

                            if(flights.data[i].flight_status === "landed"){
                                landingTime = flights.data[i].arrival.actual;
                                let left = "(";
                                let right = ")";
                            }
                            var text = text + flights.data[i].airline.name + " " + flights.data[i].flight.number + " - (" + flights.data[i].departure.iata + " -> " + flights.data[i].arrival.iata + ")\n    Status: " + flights.data[i].flight_status + "\n";
                        }
                    }

                    this.bot.postMessage(fromChannel, "```" + text + "```");
                }
            }
        }


        if(trimmedText.toLowerCase().startsWith("find flight")){
            var splitMe = trimmedText.split(" ");
            var find = splitMe.shift();
            var flt = splitMe.shift();
            var code = splitMe.shift();
            var spec = "";

            if(code !== undefined){
                const iatacheck = (/[a-zA-Z]/).test(code.charAt(2));
                console.log(iatacheck);

                if(iatacheck === true){
                    spec = "flight_icao";
                } else {
                    spec = "flight_iata";
                }
                var getFlights = await fetch(`http://api.aviationstack.com/v1/flights?access_key=[KEY REDACTED]&${spec}=${code}&limit=1`);
                var flights = await getFlights.json();

                if(flights.data[0].airline.name !== undefined){
                    this.bot.postMessage(fromChannel, `\`${flights.data[0].airline.name} ${flights.data[0].flight.number} (${flights.data[0].departure.iata} -> ${flights.data[0].arrival.iata}) Flight Status: ${flights.data[0].flight_status}\``);
                } else {
                    this.bot.postMessage(fromChannel, `Flight not found.`);
                }
            }
        }
    }
}

module.exports = plugin;