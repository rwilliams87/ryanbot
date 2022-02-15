const fetch = require("node-fetch");
const NodeCache = require("node-cache");
const { WebClient, LogLevel } = require("@slack/web-api");
const client = new WebClient("[KEY REDACTED]", {
    logLevel: LogLevel.DEBUG
});
const myCache = new NodeCache({stdTTL: 600});

let temp = "";


const plugin = {
    init: async (bot) => {
        this.bot = bot;
        // Post a message, connect to a database, etc
    },
    handleMessage: async (message) => {
        const { trimmedText, fromUser, fromChannel } = message;

        if (trimmedText.toLowerCase().startsWith("!whisper") && fromUser === "U01S32ZGV18") {
            let split = trimmedText.split(" ");
            console.log(split);
            let command = split[0];
            let user = split[1];
            let channel = split[2];
            let sentence;
            for (var i = 3; i < split.length; i++) {
                if (sentence === undefined) { sentence = "" }
                sentence = sentence + split[i] + " ";
            }
            console.log(sentence);
            try {
                const wresult = await client.chat.postEphemeral({
                    channel: channel,
                    user: user,
                    text: sentence
                });
            }
            catch (error) {
                console.error(error);
                this.bot.postMessage(fromChannel, "Whisper failed.");
            }
        }


        if(trimmedText.toLowerCase().startsWith("!yell") && fromUser === "U01S32ZGV18"){
            let split = trimmedText.split(" ");
            let command = split.shift();
            let channel = split.shift();
            let sentence = split.join(" ");

            try{
                const wresult = await client.chat.postMessage({
                    channel: channel,
                    text: sentence
                });
            }
            catch (h) {
                console.error(h);
            }
        }

        if(trimmedText.toLowerCase().startsWith("!getmembers") && fromUser === "U01S32ZGV18"){
            let split = trimmedText.split(" ");
            let command = split.shift();
            let channel = split.shift();

            try{
                const wresult = await client.conversations.members({
                    channel: fromChannel
                });
                this.bot.postMessage(fromChannel, wresult);
            }
            catch (h) {
                console.error(h);
            }
        }

        // if(trimmedText.toLowerCase().startsWith("weather") || trimmedText.toLowerCase().startsWith("!weather")){

        //     let getKey = myCache.get("myWeather");
        //     if (getKey == undefined){
        //         this.bot.postMessage(fromChannel, "Cache not found, making call.");
        //         const response = await fetch('http://api.openweathermap.org/data/2.5/weather?zip=49512&units=imperial&APPID=[KEY REDACTED]');
        //         const myJson = await response.json();
        //         let storeKey = myCache.set("myWeather", myJson);
        //         let getKey = myCache.get("myWeather");
        //         this.bot.postMessage(fromChannel, `The current temperature in Grand Rapids is ${getKey.main.temp}F`);
        //     }
        //         this.bot.postMessage(fromChannel, `The current temperature in Grand Rapids is ${getKey.main.temp}F`);
        //         console.log(getKey);
        // }

        if(trimmedText.toLowerCase().startsWith("oldweather")){
            
            let split = trimmedText.split(" ");
            let command = split.shift();
            let zip = split.shift();
            var isValidZip = /(^\d{5}$)/.test(zip);
            if(!isValidZip) {
                this.bot.postMessage(fromChannel, "ZIP code format error.");
            } else {
                let getKey = myCache.get(zip);
                if(getKey == undefined) {
                    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=imperial&APPID=[KEY REDACTED]`);
                    const myJson = await response.json();
                    let storeKey = myCache.set(zip, myJson);
                    let getKey = myCache.get(zip);
                    if(getKey.cod === "404") {
                        this.bot.postMessage(fromChannel, "No match found for ZIP code entered.");
                    } else {
                        this.bot.postMessage(fromChannel, `Weather for ${getKey.name}: Temp: ${getKey.main.temp} (Hi: ${Math.round(getKey.main.temp_max)} | Lo: ${Math.round(getKey.main.temp_min)})`);
                        console.log(getKey);
                    }
                } else {
                    let ttl = Math.round(((Date.now() - myCache.getTtl(zip)) / 1000));
                    this.bot.postMessage(fromChannel, `Weather for ${getKey.name}: Temp: ${getKey.main.temp} (Hi: ${Math.round(getKey.main.temp_max)} | Lo: ${Math.round(getKey.main.temp_min)}) (c${ttl})`);
                    console.log(getKey);
                }
            }
        }
    }
}

module.exports = plugin;